"use client";

import { useSearchParams, useRouter } from "next/navigation";

const PayPalPayment = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const amount = searchParams?.get("amount") ?? "500";
  const season = searchParams?.get("season") ?? "Not Selected";

  const handlePayment = () => {
    const checkoutUrl = `/paypal-payment/checkout?amount=${amount}&season=${season}`;
    console.log("Navigating to:", checkoutUrl); // Debugging log
    router.push(checkoutUrl);
  };

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

        <button
          onClick={handlePayment}
          className="w-full py-3 px-6 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default PayPalPayment;
