import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email } = body;

    const commonHeaders = {
      "Content-Type": "application/json",
      "api-key": process.env.BREVO_API_KEY || "",
    };

    // ✅ Email 1: Confirmation email to the user
    const userEmailResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: commonHeaders,
      body: JSON.stringify({
        sender: {
          name: "Sharma Paints",
          email: process.env.BREVO_SENDER_EMAIL,
        },
        to: [{ email, name }],
        subject: "Thank You For Contacting Sharma Paints",
        htmlContent: `
          <!DOCTYPE html>
          <html>
          <head><meta charset="UTF-8"><title>Sharma Paints</title></head>
          <body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0">
          <tr><td align="center">
          <table width="600" cellpadding="0" cellspacing="0"
            style="background:#ffffff;margin-top:30px;border-radius:12px;overflow:hidden;">
            <!-- Header -->
            <tr>
              <td align="center" style="background:#f97316;padding:30px;">
                <img src="Images/logo.png" alt="Sharma Paints" width="120" />
                <h1 style="color:white;margin-top:15px;">Sharma Paints</h1>
                <p style="color:white;margin:0;">Premium Paint Solutions</p>
              </td>
            </tr>
            <!-- Content -->
            <tr>
              <td style="padding:40px;">
                <h2 style="color:#222;">Hello ${name},</h2>
                <p style="font-size:16px;color:#555;line-height:1.7;">
                  Thank you for contacting <strong>Sharma Paints</strong>.
                  We have successfully received your inquiry. Our team will contact you shortly.
                </p>
                <table width="100%" style="margin-top:25px;background:#f8fafc;border-radius:10px;padding:20px;">
                  <tr><td>
                    <h3 style="margin-top:0;color:#111;">Your Details</h3>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Phone:</strong> ${phone}</p>
                    <p><strong>Email:</strong> ${email}</p>
                  </td></tr>
                </table>
                <div style="text-align:center;margin-top:30px;">
                  <a href="https://yourwebsite.com"
                    style="background:#f97316;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;display:inline-block;font-weight:bold;">
                    Visit Our Website
                  </a>
                </div>
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td align="center" style="background:#111827;padding:25px;color:#d1d5db;font-size:14px;">
                <p style="margin:0;">Sharma Paints</p>
                <p style="margin-top:10px;">Premium Paint & Waterproofing Solutions</p>
                <p style="margin-top:10px;">📞 +91 8920324753</p>
                <p>📧 bhattshrey21@gmail.com</p>
              </td>
            </tr>
          </table>
          </td></tr>
          </table>
          </body>
          </html>
        `,
      }),
    });

    // ✅ Email 2: Notification email to the owner
    const ownerEmailResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: commonHeaders,
      body: JSON.stringify({
        sender: {
          name: "Sharma Paints Website",
          email: process.env.BREVO_SENDER_EMAIL,
        },
        to: [{ email: process.env.BREVO_SENDER_EMAIL, name: "Sharma Paints Owner" }],
        subject: `🔔 New Inquiry Received from ${name}`,
        htmlContent: `
          <!DOCTYPE html>
          <html>
          <head><meta charset="UTF-8"><title>New Inquiry</title></head>
          <body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0">
          <tr><td align="center">
          <table width="600" cellpadding="0" cellspacing="0"
            style="background:#ffffff;margin-top:30px;border-radius:12px;overflow:hidden;">
            <!-- Header -->
            <tr>
              <td align="center" style="background:#111827;padding:30px;">
                <h1 style="color:#f97316;margin:0;">📬 New Customer Inquiry</h1>
                <p style="color:#d1d5db;margin-top:8px;">Someone filled the contact form on your website</p>
              </td>
            </tr>
            <!-- Content -->
            <tr>
              <td style="padding:40px;">
                <h2 style="color:#222;">Customer Details</h2>
                <table width="100%" style="background:#f8fafc;border-radius:10px;padding:20px;">
                  <tr><td>
                    <p style="font-size:16px;"><strong>👤 Name:</strong> ${name}</p>
                    <p style="font-size:16px;"><strong>📞 Phone:</strong> ${phone}</p>
                    <p style="font-size:16px;"><strong>📧 Email:</strong> ${email}</p>
                  </td></tr>
                </table>
                <p style="margin-top:25px;color:#555;font-size:15px;">
                  Please follow up with the customer as soon as possible.
                </p>
                <div style="text-align:center;margin-top:20px;">
                  <a href="mailto:${email}"
                    style="background:#f97316;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;display:inline-block;font-weight:bold;">
                    Reply to Customer
                  </a>
                </div>
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td align="center" style="background:#111827;padding:20px;color:#d1d5db;font-size:13px;">
                <p style="margin:0;">This is an automated notification from Sharma Paints website.</p>
              </td>
            </tr>
          </table>
          </td></tr>
          </table>
          </body>
          </html>
        `,
      }),
    });

    const userData = await userEmailResponse.json();
    const ownerData = await ownerEmailResponse.json();

    if (userEmailResponse.ok && ownerEmailResponse.ok) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({
        success: false,
        error: { userData, ownerData },
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false });
  }
}