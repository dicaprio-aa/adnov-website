// ==============================================================================
// ADNOV Creative Media & Digital Solutions - Supabase Edge Function
// Automated Dual Email Notification & Acknowledgement via Resend API
// ==============================================================================

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const NOTIFY_EMAIL = "adnovinnovations@gmail.com";
const FROM_EMAIL = "ADNOV <no-reply@adnov.in>";

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

    const requiredText = (value: unknown) =>
      typeof value === "string" && value.trim().length > 0;

    if (
      !requiredText(payload.full_name) ||
      !requiredText(payload.email) ||
      !requiredText(payload.phone) ||
      !requiredText(payload.service) ||
      !requiredText(payload.contact_method) ||
      !requiredText(payload.message) ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)
    ) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid enquiry payload" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

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

    // 1. Premium customer acknowledgement email.
    const customerHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Thank you for contacting ADNOV</title>
      </head>
      <body style="margin:0; padding:0; background:#08070d; font-family:Arial, Helvetica, sans-serif;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#08070d;">
          <tr><td align="center" style="padding:32px 12px;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px; overflow:hidden; background:#120d20; border:1px solid #352052; border-radius:12px;">
              <tr><td style="padding:34px 38px 28px; background:linear-gradient(135deg,#2c1450,#11162b); border-bottom:1px solid #4a2179;">
                <div style="color:#fff; font-size:30px; font-weight:800; letter-spacing:-1px;">AD<span style="color:#55c3ff;">NOV</span></div>
                <div style="margin-top:6px; color:#bdb4cc; font-size:10px; letter-spacing:2px; text-transform:uppercase;">Where Innovation Meets Solutions.</div>
              </tr>
              <tr><td style="padding:36px 38px 18px;">
                <div style="display:inline-block; margin-bottom:18px; padding:7px 11px; border:1px solid #8c63c8; border-radius:999px; color:#d7c4f7; font-size:10px; font-weight:bold; letter-spacing:1px;">ENQUIRY RECEIVED</div>
                <h1 style="margin:0 0 14px; color:#fff; font-size:28px; line-height:1.2;">Thank you, ${payload.full_name}</h1>
                <p style="margin:0 0 16px; color:#c3bccd; font-size:15px; line-height:1.75;">We have received your enquiry and appreciate you trusting ADNOV with your project. Our team will review your requirements and respond through your preferred contact method.</p>
              </td></tr>
              <tr><td style="padding:0 38px 28px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#0b0814; border:1px solid #3b2557; border-radius:8px;">
                  <tr><td style="padding:18px; color:#e8e2ef; font-size:14px; line-height:1.8;">
                    <strong style="color:#d8b4fe;">Service:</strong> ${payload.service}<br>
                    ${payload.budget ? `<strong style="color:#d8b4fe;">Estimated budget:</strong> ${payload.budget}<br>` : ""}
                    <strong style="color:#d8b4fe;">Preferred contact:</strong> ${payload.contact_method}<br>
                    <strong style="color:#d8b4fe;">Your message:</strong><br>${payload.message.replace(/\n/g, "<br>")}
                  </td></tr>
                </table>
              </td></tr>
              <tr><td style="padding:0 38px 30px;">
                <p style="margin:0 0 10px; color:#fff; font-size:14px; font-weight:bold;">Need to reach us?</p>
                <a href="mailto:adnovinnovations@gmail.com" style="color:#55c3ff; text-decoration:none;">adnovinnovations@gmail.com</a><br>
                <a href="tel:+918137803065" style="color:#55c3ff; text-decoration:none;">+91 81378 03065</a>&nbsp;&nbsp;
                <a href="tel:+919744754648" style="color:#55c3ff; text-decoration:none;">+91 97447 54648</a>
              </td></tr>
              <tr><td style="padding:24px 38px; background:#0d0916; border-top:1px solid #281b3a; text-align:center; color:#857f91; font-size:11px; line-height:1.7;">
                Best regards, Team ADNOV<br>
                © ${new Date().getFullYear()} ADNOV Creative Media &amp; Digital Solutions.
              </td></tr>
            </table>
          </td></tr>
        </table>
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

    const sendResendEmail = async (email: {
      to: string[];
      subject: string;
      html: string;
    }) => {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          ...email,
          ...(email.to[0] === payload.email ? { reply_to: "adnovinnovations@gmail.com" } : {}),
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || result.error || `Resend request failed with status ${response.status}`);
      }

      return result;
    };

    const customerEmailResult = await sendResendEmail({
      to: [payload.email],
      subject: "Thank You for Contacting ADNOV!",
      html: customerHtml,
    });

    const adminEmailResult = await sendResendEmail({
      to: [NOTIFY_EMAIL],
      subject: `[New Enquiry] ${payload.service} - ${payload.full_name}`,
      html: adminHtml,
    });

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
