// ==============================================================================
// ADNOV Creative Media & Digital Solutions - Supabase Edge Function
// Automated Dual Email Notification & Acknowledgement via Resend API
// ==============================================================================

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EnquiryPayload {
  full_name: string;
  email: string;
  phone: string;
  company?: string | null;
  service: string;
  budget?: string | null;
  contact_method: string;
  message: string;
  created_at?: string;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const payload: EnquiryPayload = await req.json();

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    const NOTIFY_EMAIL = Deno.env.get("OFFICIAL_NOTIFICATION_EMAIL") || "hello@adnovcreative.com";
    const FROM_EMAIL = Deno.env.get("FROM_EMAIL") || "ADNOV Agency <notifications@adnovcreative.com>";

    if (!RESEND_API_KEY) {
      console.warn("RESEND_API_KEY is not configured in Supabase Secrets.");
      return new Response(
        JSON.stringify({
          success: false,
          error: "Email automation service unconfigured (RESEND_API_KEY missing)",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        }
      );
    }

    // 1. Customer Acknowledgement Email HTML (Dark purple branded aesthetic)
    const customerHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #08070d; color: #f4f2f9; margin: 0; padding: 40px 15px; }
          .container { max-width: 580px; margin: 0 auto; background-color: #130d22; border: 1px solid #3b1d60; border-radius: 14px; padding: 36px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
          .logo-text { font-size: 26px; font-weight: 800; letter-spacing: -1px; color: #ffffff; margin-bottom: 4px; }
          .logo-text span { color: #c084fc; }
          .tagline { font-size: 11px; letter-spacing: 2px; color: #a9a2b8; text-transform: uppercase; margin-bottom: 28px; }
          .divider { height: 1px; background: #2d184a; margin: 24px 0; }
          h2 { font-size: 20px; color: #ffffff; margin-top: 0; }
          p { font-size: 14.5px; line-height: 1.7; color: #bcb5c9; }
          .recap-box { background-color: #0b0714; border: 1px solid #4a2179; border-radius: 8px; padding: 18px; margin: 22px 0; }
          .recap-item { margin-bottom: 8px; font-size: 13.5px; }
          .recap-item strong { color: #e9d5ff; }
          .footer { font-size: 12px; color: #7f788e; text-align: center; margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo-text">AD<span>NOV</span></div>
          <div class="tagline">Where Innovation Meets Solutions.</div>
          
          <h2>Thank You for Contacting ADNOV!</h2>
          
          <p>Hello <strong>${payload.full_name}</strong>,</p>
          
          <p>Thank you for reaching out to <strong>ADNOV</strong>.</p>
          
          <p>We have successfully received your enquiry regarding <strong>${payload.service}</strong>.</p>
          
          <p>Our creative directors and production team will review your project brief and get back to you as soon as possible via your preferred contact method (<strong>${payload.contact_method}</strong>).</p>
          
          <div class="recap-box">
            <div class="recap-item"><strong>Service Requested:</strong> ${payload.service}</div>
            ${payload.budget ? `<div class="recap-item"><strong>Estimated Budget:</strong> ${payload.budget}</div>` : ""}
            <div class="recap-item"><strong>Your Phone:</strong> ${payload.phone}</div>
            <div class="recap-item"><strong>Message Summary:</strong><br>${payload.message}</div>
          </div>
          
          <p>We appreciate your interest in ADNOV and look forward to collaborating.</p>
          
          <div class="divider"></div>
          
          <p style="margin-bottom: 4px;"><strong>Best Regards,</strong></p>
          <p style="color: #c084fc; font-weight: 700; margin: 0;">Team ADNOV</p>
          <p style="font-size: 12px; color: #9c95ab; margin: 2px 0 0;">Where Innovation Meets Solutions.</p>
          
          <div class="footer">
            © ${new Date().getFullYear()} ADNOV Creative Media & Digital Solutions.<br>All rights reserved.
          </div>
        </div>
      </body>
      </html>
    `;

    // 2. Admin Team Notification Email HTML
    const adminHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: sans-serif; background-color: #0c0816; color: #ffffff; padding: 25px; }
          .box { background-color: #19102c; border: 1px solid #7e22ce; border-radius: 10px; padding: 25px; max-width: 600px; margin: 0 auto; }
          h2 { color: #c084fc; margin-top: 0; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; }
          td { padding: 10px; border-bottom: 1px solid #2e1c4a; font-size: 14px; }
          .lbl { font-weight: bold; color: #d8b4fe; width: 35%; }
        </style>
      </head>
      <body>
        <div class="box">
          <h2>🚨 New Client Project Enquiry Received</h2>
          <p>A new enquiry was submitted via the ADNOV website:</p>
          <table>
            <tr><td class="lbl">Client Name</td><td>${payload.full_name}</td></tr>
            <tr><td class="lbl">Email</td><td><a href="mailto:${payload.email}" style="color:#c084fc;">${payload.email}</a></td></tr>
            <tr><td class="lbl">Phone</td><td><a href="tel:${payload.phone}" style="color:#c084fc;">${payload.phone}</a></td></tr>
            <tr><td class="lbl">Company</td><td>${payload.company || "N/A"}</td></tr>
            <tr><td class="lbl">Service</td><td><strong>${payload.service}</strong></td></tr>
            <tr><td class="lbl">Budget</td><td>${payload.budget || "Unspecified"}</td></tr>
            <tr><td class="lbl">Preferred Contact</td><td>${payload.contact_method}</td></tr>
            <tr><td class="lbl">Message / Brief</td><td>${payload.message}</td></tr>
          </table>
        </div>
      </body>
      </html>
    `;

    // Send Customer Acknowledgement Email
    const customerEmailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [payload.email],
        subject: "Thank You for Contacting ADNOV!",
        html: customerHtml,
      }),
    });

    // Send Internal Notification Email
    const adminEmailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [NOTIFY_EMAIL],
        subject: `[New Enquiry] ${payload.service} - ${payload.full_name}`,
        html: adminHtml,
      }),
    });

    const customerEmailResult = await customerEmailRes.json();
    const adminEmailResult = await adminEmailRes.json();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Automated emails sent successfully.",
        customerEmailId: customerEmailResult.id,
        adminEmailId: adminEmailResult.id,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Edge function error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
