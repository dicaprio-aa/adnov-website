// ADNOV Supabase Integration Client
// Manages enquiry submissions, database persistence, and Edge Function triggers.
// Includes graceful fallback mode for development before live API keys are populated.

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const supabase = SUPABASE_URL && SUPABASE_ANON_KEY
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

export const isSupabaseConfigured = () => {
  return (
    SUPABASE_URL &&
    SUPABASE_ANON_KEY &&
    !SUPABASE_URL.includes("your_supabase") &&
    !SUPABASE_ANON_KEY.includes("your_supabase")
  );
};

/**
 * Submits an enquiry to the Supabase database and invokes email automation edge function.
 * If credentials are not configured, saves to localStorage demo storage and returns simulated success.
 */
export async function submitEnquiry(enquiryData) {
  // Keep the component payload readable while matching the existing database and Edge Function contract.
  const payload = {
    full_name: enquiryData.fullName,
    email: enquiryData.email,
    phone: enquiryData.phone,
    company: enquiryData.company || null,
    service: enquiryData.service,
    budget: enquiryData.budget || null,
    contact_method: enquiryData.contactMethod,
    message: enquiryData.message,
    created_at: new Date().toISOString(),
    status: "new",
    source: "website_enquiry_form",
  };

  if (!isSupabaseConfigured()) {
    // Graceful Demo Mode: Persist to localStorage so the developer/client can see it works
    try {
      const existing = JSON.parse(localStorage.getItem("adnov_enquiries") || "[]");
      existing.unshift({ id: "demo-" + Date.now(), ...payload });
      localStorage.setItem("adnov_enquiries", JSON.stringify(existing));
    } catch {
      // Storage quota or private browsing fallback
    }

    // Simulate realistic network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    return {
      success: true,
      mode: "demo",
      message:
        "Enquiry saved in Demo Mode! Connect your Supabase project in .env to activate live database sync and email automation.",
      data: payload,
    };
  }

  try {
    // 1. Insert into Supabase 'enquiries' table via PostgREST
    const dbResponse = await fetch(`${SUPABASE_URL}/rest/v1/enquiries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify(payload),
    });

    if (!dbResponse.ok) {
      const errText = await dbResponse.text();
      throw new Error(`Supabase insert failed: ${dbResponse.status} ${errText}`);
    }

    const insertedRows = await dbResponse.json();
    const insertedRecord = insertedRows[0] || payload;

    // 2. Trigger Supabase Edge Function for automated email notification & acknowledgement
    try {
      const emailResponse = await fetch(`${SUPABASE_URL}/functions/v1/send-enquiry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(insertedRecord),
      });

      if (!emailResponse.ok) {
        const emailError = await emailResponse.json().catch(() => null);
        console.warn("Email delivery note:", emailError?.error || emailResponse.statusText);
      }
    } catch (edgeErr) {
      console.warn("Edge function trigger note:", edgeErr.message);
      // Even if edge function has a delay, the database record was safely preserved
    }

    return {
      success: true,
      mode: "live",
      message: "Enquiry submitted successfully and confirmed by database.",
      data: insertedRecord,
    };
  } catch (error) {
    console.error("Supabase submission error:", error);
    return {
      success: false,
      error: error.message || "Failed to submit enquiry. Please try again.",
    };
  }
}
