import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: "2023-10-16" as Stripe.LatestApiVersion });

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const amount = body.amount;

        if (!amount || isNaN(amount)) {
            return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
        }

        const baseUrl = req.nextUrl.origin || process.env.NEXT_PUBLIC_BASE_URL; // ✅ Ensure correct URL
        console.log("Redirect URLs:");
        console.log("Success URL:", `${baseUrl}/success`);
        console.log("Cancel URL:", `${baseUrl}/cancel`);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "gbp",
                        product_data: { name: "Audit Payment" },
                        unit_amount: amount,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${baseUrl}/success`,  // ✅ Use corrected base URL
            cancel_url: `${baseUrl}/cancel`,
        });

        console.log("✅ Stripe Session Created:", session);
        return NextResponse.json({ url: session.url }, { status: 200 });

    } catch (error) {
        console.error("❌ Stripe API Error:", error);
        return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
    }
}
