import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/lib/models/Order";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Save order to DB
    await connectDB();
    const order = await Order.create({
      name: body.customer.name,
      email: body.customer.email,
      phone: body.customer.phone,
      address: body.customer.address,
      city: body.customer.city,
      items: body.items,
      subtotal: body.subtotal,
      deliveryFee: body.deliveryFee,
      discount: body.discount,
      total: body.grandTotal,
      paymentMethod: "cod",
      paymentStatus: "pending",
    });

    // Build items HTML table for email
    const itemsRows = body.items
      .map(
        (item: any) => `
        <tr>
          <td style="padding: 10px 12px; border-bottom: 1px solid #f0f0f0; font-size: 14px; color: #333;">${item.name}</td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #f0f0f0; font-size: 14px; color: #555; text-align: center;">${item.size}</td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #f0f0f0; font-size: 14px; color: #555; text-align: center;">${item.quantity}</td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #f0f0f0; font-size: 14px; color: #333; text-align: right; font-weight: 500;">Rs.${(item.price * item.quantity).toLocaleString("en-IN")}</td>
        </tr>`
      )
      .join("");

    const emailHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
<body style="margin: 0; padding: 0; background-color: #f9f9f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9f9f9; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #eee; max-width: 600px; width: 100%;">

          <!-- Header -->
          <tr>
            <td style="background: #059669; padding: 28px 32px;">
              <p style="margin: 0; font-size: 22px; font-weight: 600; color: #ffffff;">Order confirmed</p>
              <p style="margin: 6px 0 0; font-size: 14px; color: #a7f3d0;">Cash on Delivery · Order #${order._id.toString().slice(-8).toUpperCase()}</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 28px 32px 0;">
              <p style="margin: 0 0 4px; font-size: 15px; color: #111; font-weight: 500;">Hi ${body.customer.name},</p>
              <p style="margin: 8px 0 0; font-size: 14px; color: #555; line-height: 1.6;">
                Thank you for your order! Please keep the exact amount ready at the time of delivery.
              </p>
            </td>
          </tr>

          <!-- Order Items -->
          <tr>
            <td style="padding: 24px 32px 0;">
              <p style="margin: 0 0 12px; font-size: 12px; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.08em;">Order items</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #f0f0f0; border-radius: 10px; overflow: hidden;">
                <thead>
                  <tr style="background: #f9fafb;">
                    <th style="padding: 10px 12px; font-size: 12px; color: #9ca3af; text-align: left; font-weight: 500;">Item</th>
                    <th style="padding: 10px 12px; font-size: 12px; color: #9ca3af; text-align: center; font-weight: 500;">Size</th>
                    <th style="padding: 10px 12px; font-size: 12px; color: #9ca3af; text-align: center; font-weight: 500;">Qty</th>
                    <th style="padding: 10px 12px; font-size: 12px; color: #9ca3af; text-align: right; font-weight: 500;">Price</th>
                  </tr>
                </thead>
                <tbody>${itemsRows}</tbody>
              </table>
            </td>
          </tr>

          <!-- Totals -->
          <tr>
            <td style="padding: 20px 32px 0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size: 13px; color: #6b7280; padding: 4px 0;">Subtotal</td>
                  <td style="font-size: 13px; color: #6b7280; text-align: right; padding: 4px 0;">Rs.${body.subtotal.toLocaleString("en-IN")}</td>
                </tr>
                ${body.discount > 0 ? `
                <tr>
                  <td style="font-size: 13px; color: #059669; padding: 4px 0;">Promo discount</td>
                  <td style="font-size: 13px; color: #059669; text-align: right; padding: 4px 0;">-Rs.${body.discount.toLocaleString("en-IN")}</td>
                </tr>` : ""}
                <tr>
                  <td style="font-size: 13px; color: #6b7280; padding: 4px 0;">Delivery fee</td>
                  <td style="font-size: 13px; color: ${body.deliveryFee === 0 ? "#059669" : "#6b7280"}; text-align: right; padding: 4px 0;">${body.deliveryFee === 0 ? "Free" : `Rs.${body.deliveryFee}`}</td>
                </tr>
                <tr>
                  <td colspan="2" style="padding: 8px 0;"><div style="height: 1px; background: #f0f0f0;"></div></td>
                </tr>
                <tr>
                  <td style="font-size: 16px; font-weight: 600; color: #111; padding: 4px 0;">Total to pay</td>
                  <td style="font-size: 16px; font-weight: 600; color: #111; text-align: right; padding: 4px 0;">Rs.${body.grandTotal.toLocaleString("en-IN")}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Delivery Address -->
          <tr>
            <td style="padding: 24px 32px 0;">
              <p style="margin: 0 0 10px; font-size: 12px; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.08em;">Delivering to</p>
              <div style="background: #f9fafb; border-radius: 10px; padding: 14px 16px; border: 1px solid #f0f0f0;">
                <p style="margin: 0; font-size: 14px; font-weight: 500; color: #111;">${body.customer.name}</p>
                <p style="margin: 4px 0 0; font-size: 13px; color: #555;">${body.customer.address}, ${body.customer.city}</p>
                <p style="margin: 4px 0 0; font-size: 13px; color: #555;">+91 ${body.customer.phone}</p>
              </div>
            </td>
          </tr>

          <!-- COD reminder -->
          <tr>
            <td style="padding: 20px 32px 0;">
              <div style="background: #fffbeb; border-radius: 10px; padding: 14px 16px; border: 1px solid #fde68a;">
                <p style="margin: 0; font-size: 13px; color: #92400e; font-weight: 500;">&#9888; Cash on Delivery reminder</p>
                <p style="margin: 6px 0 0; font-size: 13px; color: #92400e; line-height: 1.5;">
                  Please keep <strong>Rs.${body.grandTotal.toLocaleString("en-IN")}</strong> in exact change ready when your order arrives.
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 28px 32px; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #9ca3af;">Questions? Reply to this email and we'll help you out.</p>
              <p style="margin: 6px 0 0; font-size: 12px; color: #d1d5db;">© 2025 Your Store. All rights reserved.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    const orderId = order._id.toString().slice(-8).toUpperCase();
    const orderTime = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit", hour12: true,
    });

    // ── Owner alert email ──────────────────────────────────────────
    const ownerEmailHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e5e7eb; max-width: 600px; width: 100%;">

          <!-- Header -->
          <tr>
            <td style="background: #111827; padding: 24px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin: 0; font-size: 11px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.1em;">Sharma Paints</p>
                    <p style="margin: 6px 0 0; font-size: 22px; font-weight: 700; color: #ffffff;">🛎️ New order received</p>
                  </td>
                  <td style="text-align: right; vertical-align: top;">
                    <span style="display: inline-block; background: #fbbf24; color: #78350f; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 20px; letter-spacing: 0.05em;">COD</span>
                  </td>
                </tr>
              </table>
              <p style="margin: 10px 0 0; font-size: 13px; color: #9ca3af;">Order #${orderId} · ${orderTime} IST</p>
            </td>
          </tr>

          <!-- Customer Info -->
          <tr>
            <td style="padding: 24px 32px 0;">
              <p style="margin: 0 0 12px; font-size: 11px; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.1em;">Customer details</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="background: #f9fafb; border-radius: 12px; border: 1px solid #f0f0f0; overflow: hidden;">
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #f0f0f0;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="font-size: 12px; color: #9ca3af; width: 100px;">Name</td>
                        <td style="font-size: 14px; font-weight: 600; color: #111;">${body.customer.name}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #f0f0f0;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="font-size: 12px; color: #9ca3af; width: 100px;">Email</td>
                        <td style="font-size: 14px; color: #2563eb;">${body.customer.email}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #f0f0f0;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="font-size: 12px; color: #9ca3af; width: 100px;">Phone</td>
                        <td style="font-size: 14px; font-weight: 600; color: #111;">+91 ${body.customer.phone}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="font-size: 12px; color: #9ca3af; width: 100px; vertical-align: top; padding-top: 2px;">Address</td>
                        <td style="font-size: 14px; color: #111; line-height: 1.5;">${body.customer.address},<br/>${body.customer.city}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Order Items -->
          <tr>
            <td style="padding: 24px 32px 0;">
              <p style="margin: 0 0 12px; font-size: 11px; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.1em;">Items ordered</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #f0f0f0; border-radius: 12px; overflow: hidden;">
                <thead>
                  <tr style="background: #f9fafb;">
                    <th style="padding: 10px 14px; font-size: 11px; color: #9ca3af; text-align: left; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Product</th>
                    <th style="padding: 10px 14px; font-size: 11px; color: #9ca3af; text-align: center; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Size</th>
                    <th style="padding: 10px 14px; font-size: 11px; color: #9ca3af; text-align: center; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Qty</th>
                    <th style="padding: 10px 14px; font-size: 11px; color: #9ca3af; text-align: right; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${body.items.map((item: any) => `
                  <tr>
                    <td style="padding: 12px 14px; border-top: 1px solid #f0f0f0; font-size: 14px; font-weight: 500; color: #111;">${item.name}</td>
                    <td style="padding: 12px 14px; border-top: 1px solid #f0f0f0; font-size: 13px; color: #555; text-align: center;">${item.size}</td>
                    <td style="padding: 12px 14px; border-top: 1px solid #f0f0f0; font-size: 13px; color: #555; text-align: center;">
                      <span style="background: #dbeafe; color: #1e40af; font-size: 12px; font-weight: 600; padding: 2px 8px; border-radius: 20px;">×${item.quantity}</span>
                    </td>
                    <td style="padding: 12px 14px; border-top: 1px solid #f0f0f0; font-size: 14px; font-weight: 600; color: #111; text-align: right;">Rs.${(item.price * item.quantity).toLocaleString("en-IN")}</td>
                  </tr>`).join("")}
                </tbody>
              </table>
            </td>
          </tr>

          <!-- Payment Summary -->
          <tr>
            <td style="padding: 20px 32px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background: #f9fafb; border-radius: 12px; border: 1px solid #f0f0f0; padding: 16px;">
                <tr><td style="padding: 4px 16px;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="font-size: 13px; color: #6b7280; padding: 3px 0;">Subtotal</td>
                      <td style="font-size: 13px; color: #6b7280; text-align: right; padding: 3px 0;">Rs.${body.subtotal.toLocaleString("en-IN")}</td>
                    </tr>
                    ${body.discount > 0 ? `
                    <tr>
                      <td style="font-size: 13px; color: #059669; padding: 3px 0;">Promo discount</td>
                      <td style="font-size: 13px; color: #059669; text-align: right; padding: 3px 0;">- Rs.${body.discount.toLocaleString("en-IN")}</td>
                    </tr>` : ""}
                    <tr>
                      <td style="font-size: 13px; color: #6b7280; padding: 3px 0;">Delivery fee</td>
                      <td style="font-size: 13px; color: ${body.deliveryFee === 0 ? "#059669" : "#6b7280"}; text-align: right; padding: 3px 0;">${body.deliveryFee === 0 ? "Free" : `Rs.${body.deliveryFee}`}</td>
                    </tr>
                    <tr>
                      <td colspan="2" style="padding: 8px 0;"><div style="height: 1px; background: #e5e7eb;"></div></td>
                    </tr>
                    <tr>
                      <td style="font-size: 16px; font-weight: 700; color: #111; padding: 3px 0;">Amount to collect</td>
                      <td style="font-size: 18px; font-weight: 700; color: #059669; text-align: right; padding: 3px 0;">Rs.${body.grandTotal.toLocaleString("en-IN")}</td>
                    </tr>
                  </table>
                </td></tr>
              </table>
            </td>
          </tr>

          <!-- Action reminder -->
          <tr>
            <td style="padding: 20px 32px 0;">
              <div style="background: #fef3c7; border-radius: 10px; padding: 14px 16px; border: 1px solid #fde68a;">
                <p style="margin: 0; font-size: 13px; color: #92400e; font-weight: 700;">⚡ Action required</p>
                <p style="margin: 6px 0 0; font-size: 13px; color: #92400e; line-height: 1.6;">
                  Process and dispatch this order at the earliest. Collect <strong>Rs.${body.grandTotal.toLocaleString("en-IN")}</strong> in cash upon delivery to <strong>${body.customer.city}</strong>.
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; border-top: 1px solid #f3f4f6; margin-top: 24px;">
              <p style="margin: 0; font-size: 11px; color: #9ca3af; text-align: center;">This is an automated alert from Sharma Paints · Order #${orderId}</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    // Send customer confirmation email
    const customerRes = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { "Content-Type": "application/json", "api-key": process.env.BREVO_API_KEY! },
      body: JSON.stringify({
        sender: { name: process.env.BREVO_SENDER_NAME || "Sharma Paints", email: process.env.BREVO_SENDER_EMAIL },
        to: [{ email: body.customer.email, name: body.customer.name }],
        subject: `Order confirmed — Rs.${body.grandTotal.toLocaleString("en-IN")} (Cash on Delivery)`,
        htmlContent: emailHtml,
      }),
    });

    if (!customerRes.ok) {
      console.error("Brevo customer email error:", await customerRes.text());
    }

    // Send owner alert email (separate, different content)
    if (process.env.OWNER_EMAIL) {
      const ownerRes = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: { "Content-Type": "application/json", "api-key": process.env.BREVO_API_KEY! },
        body: JSON.stringify({
          sender: { name: process.env.BREVO_SENDER_NAME || "Sharma Paints", email: process.env.BREVO_SENDER_EMAIL },
          to: [{ email: process.env.OWNER_EMAIL, name: "Owner" }],
          subject: `🛎️ New COD Order #${orderId} — Rs.${body.grandTotal.toLocaleString("en-IN")} from ${body.customer.name}`,
          htmlContent: ownerEmailHtml,
        }),
      });

      if (!ownerRes.ok) {
        console.error("Brevo owner email error:", await ownerRes.text());
      }
    }

    return NextResponse.json({ success: true, orderId: order._id });
  } catch (error) {
    console.error("COD order error:", error);
    return NextResponse.json({ error: "Failed to place order" }, { status: 500 });
  }
}