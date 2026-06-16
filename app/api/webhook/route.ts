import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Order from "@/lib/models/Order";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.text();

  const signature = (await headers()).get("stripe-signature");

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook Error:", err);

    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  switch (event.type) {
    case "checkout.session.completed": {
      try {
        const session = event.data.object as Stripe.Checkout.Session;

        await connectDB();

        const order = await Order.findOneAndUpdate(
          {
            stripeSessionId: session.id,
          },
          {
            paymentStatus: "paid",
          },
          {
            new: true,
          }
        );

        if (!order) {
          console.log("Order not found");
          break;
        }

        const itemsHtml = order.items
          .map(
            (item: any) => `
              <tr>
                <td style="padding:10px;border:1px solid #ddd;">
                  ${item.name}
                </td>
                <td style="padding:10px;border:1px solid #ddd;">
                  ${item.size}
                </td>
                <td style="padding:10px;border:1px solid #ddd;">
                  ${item.quantity}
                </td>
                <td style="padding:10px;border:1px solid #ddd;">
                  ₹${item.price}
                </td>
              </tr>
            `
          )
          .join("");

        await fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-key": process.env.BREVO_API_KEY!,
          },
          body: JSON.stringify({
            sender: {
              name: "Sharma Paints",
              email: process.env.BREVO_SENDER_EMAIL,
            },

            to: [
              {
                email: order.email,
                name: order.name,
              },
            ],

            subject: "🎉 Order Confirmed - Sharma Paints",

            htmlContent: `
              <div style="font-family:Arial,sans-serif;background:#f5f5f5;padding:30px;">
                <div style="max-width:700px;margin:auto;background:white;border-radius:12px;overflow:hidden;">

                  <div style="background:#f97316;padding:25px;text-align:center;">
                    <h1 style="color:white;margin:0;">
                      Sharma Paints
                    </h1>
                  </div>

                  <div style="padding:30px;">

                    <h2>Hello ${order.name},</h2>

                    <p>
                      Thank you for your purchase. Your payment has been received successfully.
                    </p>

                    <h3>Order Details</h3>

                    <table
                      width="100%"
                      cellspacing="0"
                      cellpadding="0"
                      style="border-collapse:collapse;"
                    >
                      <thead>
                        <tr style="background:#f3f4f6;">
                          <th style="padding:10px;border:1px solid #ddd;">Product</th>
                          <th style="padding:10px;border:1px solid #ddd;">Size</th>
                          <th style="padding:10px;border:1px solid #ddd;">Qty</th>
                          <th style="padding:10px;border:1px solid #ddd;">Price</th>
                        </tr>
                      </thead>

                      <tbody>
                        ${itemsHtml}
                      </tbody>
                    </table>

                    <br/>

                    <h3>Delivery Address</h3>

                    <p>
                      ${order.address}<br/>
                      ${order.city}
                    </p>

                    <hr/>

                    <p><strong>Subtotal:</strong> ₹${order.subtotal}</p>
                    <p><strong>Delivery Fee:</strong> ₹${order.deliveryFee}</p>
                    <p><strong>Discount:</strong> ₹${order.discount}</p>

                    <h2 style="color:#16a34a;">
                      Total Paid: ₹${order.total}
                    </h2>

                    <p>
                      We will process and dispatch your order shortly.
                    </p>

                  </div>

                  <div
                    style="
                      background:#f3f4f6;
                      padding:20px;
                      text-align:center;
                      color:#666;
                    "
                  >
                    © ${new Date().getFullYear()} Sharma Paints
                  </div>

                </div>
              </div>
            `,
          }),
        });

        console.log("Payment Successful:", session.id);
      } catch (error) {
        console.error("Webhook Processing Error:", error);
      }

      break;
    }

    default:
      console.log(`Unhandled event: ${event.type}`);
  }

  return NextResponse.json({
    received: true,
  });
}