import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, phone, email } = body;

    const response = await fetch(
      "https://api.brevo.com/v3/smtp/email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.BREVO_API_KEY || "",
        },
        body: JSON.stringify({
          sender: {
            name: "Sharma Paints",
            email: process.env.BREVO_SENDER_EMAIL,
          },

          to: [
            {
              email,
              name,
            },
          ],

          subject: "Thank You For Contacting Sharma Paints",
          htmlContent: `
          <!DOCTYPE html>
          <html>
          <head>
          <meta charset="UTF-8">
          <title>Sharma Paints</title>
          </head>
          
          <body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
          
          <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
          <td align="center">
          
          <table width="600" cellpadding="0" cellspacing="0"
          style="background:#ffffff;margin-top:30px;border-radius:12px;overflow:hidden;">
          
          <!-- Header -->
          <tr>
          <td align="center"
          style="background:#f97316;padding:30px;">
          
          <img
          src="Images/logo.png"
          alt="Sharma Paints"
          width="120"
          />
          
          <h1 style="color:white;margin-top:15px;">
          Sharma Paints
          </h1>
          
          <p style="color:white;margin:0;">
          Premium Paint Solutions
          </p>
          
          </td>
          </tr>
          
          <!-- Content -->
          <tr>
          <td style="padding:40px;">
          
          <h2 style="color:#222;">
          Hello ${name},
          </h2>
          
          <p style="font-size:16px;color:#555;line-height:1.7;">
          Thank you for contacting
          <strong>Sharma Paints</strong>.
          We have successfully received your inquiry.
          Our team will contact you shortly.
          </p>
          
          <!-- Customer Details -->
          <table
          width="100%"
          style="
          margin-top:25px;
          background:#f8fafc;
          border-radius:10px;
          padding:20px;
          "
          >
          
          <tr>
          <td>
          
          <h3 style="margin-top:0;color:#111;">
          Your Details
          </h3>
          
          <p>
          <strong>Name:</strong> ${name}
          </p>
          
          <p>
          <strong>Phone:</strong> ${phone}
          </p>
          
          <p>
          <strong>Email:</strong> ${email}
          </p>
          
          </td>
          </tr>
          
          </table>
          
          <!-- Button -->
          <div style="text-align:center;margin-top:30px;">
          
          <a
          href="https://yourwebsite.com"
          style="
          background:#f97316;
          color:white;
          padding:14px 28px;
          text-decoration:none;
          border-radius:8px;
          display:inline-block;
          font-weight:bold;
          "
          >
          Visit Our Website
          </a>
          
          </div>
          
          </td>
          </tr>
          
          <!-- Footer -->
          <tr>
          <td
          align="center"
          style="
          background:#111827;
          padding:25px;
          color:#d1d5db;
          font-size:14px;
          "
          >
          
          <p style="margin:0;">
          Sharma Paints
          </p>
          
          <p style="margin-top:10px;">
          Premium Paint & Waterproofing Solutions
          </p>
          
          <p style="margin-top:10px;">
          📞 +91 8920324753
          </p>
          
          <p>
          📧 info@sharmapaints.com
          </p>
          
          </td>
          </tr>
          
          </table>
          
          </td>
          </tr>
          </table>
          
          </body>
          </html>
          `,
        }),
      }
    );

    const data = await response.json();

    console.log(data);

    if (response.ok) {
      return NextResponse.json({
        success: true,
      });
    } else {
      return NextResponse.json({
        success: false,
        error: data,
      });
    }
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
    });
  }
}