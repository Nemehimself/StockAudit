"use client";

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

const PayPalCheckout = () => {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-gray-600 text-lg">Loading...</div>}>
      <PayPalCheckoutContent />
    </Suspense>
  );
};

const PayPalCheckoutContent = () => {
  const searchParams = useSearchParams();
  const amount = searchParams?.get("amount") ?? "500";
  const season = searchParams?.get("season") ?? "Not Selected";

  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  if (!clientId) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600 text-lg">
        PayPal Client ID is missing. Please check your environment variables.
      </div>
    );
  }

  return (
    <PayPalScriptProvider options={{ clientId, currency: "GBP" }}>
      <CheckoutContent amount={amount} season={season} />
    </PayPalScriptProvider>
  );
};

const CheckoutContent = ({ amount, season }: { amount: string; season: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="bg-white shadow-xl p-6 rounded-lg w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Pay with PayPal</h1>
        <p className="text-lg text-gray-700">
          Amount: <span className="text-blue-600">£{amount}</span>
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Season: <span className="text-blue-600">{season}</span>
        </p>

        {loading ? (
          <p className="text-lg font-semibold text-gray-600">Processing...</p>
        ) : (
          <PayPalButtons
            style={{ layout: "vertical", color: "blue", shape: "rect" }}
            createOrder={(_data, actions) => {
              return actions.order.create({
                intent: "CAPTURE",
                purchase_units: [{ amount: { currency_code: "GBP", value: amount } }],
              });
            }}
            onApprove={async (_data, actions) => {
                if (!actions.order) return;
                await actions.order.capture();
                
                // ✅ Store payment details in localStorage
                localStorage.setItem("paymentDetails", JSON.stringify({ amount, season }));
              
                router.push("/success");
              }}
            onCancel={() => router.push("/cancel")}
          />
        )}
      </div>
    </div>
  );
};

export default PayPalCheckout;
