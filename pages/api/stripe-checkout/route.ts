import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: "2023-10-16" as Stripe.LatestApiVersion });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
        const { amount } = req.body;

        if (!amount || isNaN(amount)) {
            return res.status(400).json({ error: "Invalid amount" });
        }

        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [{
                price_data: {
                    currency: "gbp",
                    product_data: { name: "Audit Payment" },
                    unit_amount: amount,
                },
                quantity: 1,
            }],
            mode: "payment",
            success_url: `${baseUrl}/success`,
            cancel_url: `${baseUrl}/cancel`,
        });

        return res.status(200).json({ url: session.url });

    } catch (error) {
        console.error("❌ Stripe API Error:", error);
        return res.status(500).json({ error: "Failed to create checkout session" });
    }
}