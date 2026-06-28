import Stripe from "stripe";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/lib/models/Order";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Create Stripe session first — don't wait for DB
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: body.items.map((item: any) => ({
        price_data: {
          currency: "inr",
          product_data: { name: item.name },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
    });

    // Save order to DB in the background — don't block the response
    (async () => {
      try {
        await connectDB();
        await Order.create({
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
          stripeSessionId: session.id,
          paymentStatus: "pending",
        });
        console.log("Order saved:", session.id);
      } catch (dbErr) {
        console.error("Background DB save failed:", dbErr);
      }
    })();

    // Return Stripe URL immediately
    return NextResponse.json({ url: session.url });

  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Stripe session failed" }, { status: 500 });
  }
}