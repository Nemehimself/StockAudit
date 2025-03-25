"use client";

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useSearchParams, useRouter } from "next/navigation";
// import { useEffect } from "react";

const PayPalCheckout = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const amount = searchParams?.get("amount") ?? "500";
  const season = searchParams?.get("season") ?? "Not Selected";

  return (
    <PayPalScriptProvider options={{ clientId: "YOUR_CLIENT_ID", currency: "GBP" }}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
        <div className="bg-white shadow-xl p-6 rounded-lg w-full max-w-md text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">Pay with PayPal</h1>
          <p className="text-lg text-gray-700">
            Amount: <span className="text-blue-600">£{amount}</span>
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Season: <span className="text-blue-600">{season}</span>
          </p>

          <PayPalButtons
            style={{ layout: "vertical", color: "blue", shape: "rect" }}
            createOrder={(_data, actions) => {
              return actions.order.create({
                intent: "CAPTURE",
                purchase_units: [
                  {
                    amount: {
                      currency_code: "GBP",
                      value: amount,
                    },
                  },
                ],
              });
            }}
            onApprove={async (_data, actions) => {
              if (!actions.order) return;
              await actions.order.capture();
              router.push("/success");
            }}
            onCancel={() => router.push("/cancel")}
          />
        </div>
      </div>
    </PayPalScriptProvider>
  );
};

export default PayPalCheckout;
