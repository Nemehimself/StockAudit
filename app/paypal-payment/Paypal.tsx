import { useSearchParams } from "next/navigation";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useState } from "react";

const PayPalPayment = () => {
    const searchParams = useSearchParams();
    const amount = searchParams?.get("amount") ?? "500";
    const season = searchParams?.get("season") ?? "Not Selected";
    const [isProcessing, setIsProcessing] = useState(false);
    const [showPayPalButtons, setShowPayPalButtons] = useState(false);

    const handlePayNowClick = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setShowPayPalButtons(true);
        }, 1000); // Simulating a brief delay before showing PayPal buttons
    };

    return (
        <PayPalScriptProvider options={{ clientId: "YOUR_PAYPAL_CLIENT_ID" }}>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
                {/* Glassmorphism Card */}
                <div className="bg-white/80 backdrop-blur-lg shadow-2xl p-6 rounded-2xl w-full max-w-md text-center transition-transform transform hover:scale-105">
                    <h1 className="text-3xl font-bold text-gray-800 mb-3">Pay with PayPal</h1>
                    <p className="text-lg font-semibold text-gray-700">
                        Amount: <span className="text-blue-600">£{amount}</span>
                    </p>
                    <p className="text-lg font-semibold text-gray-700 mb-4">
                        Season: <span className="text-blue-600">{season}</span>
                    </p>

                    {/* Payment Button */}
                    {!showPayPalButtons && (
                        <button
                            onClick={handlePayNowClick}
                            disabled={isProcessing}
                            className={`mt-4 w-full py-3 px-6 rounded-lg font-semibold text-white transition-all ${
                                isProcessing
                                    ? "bg-blue-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                            }`}
                        >
                            {isProcessing ? "Processing Payment..." : "Pay Now"}
                        </button>
                    )}

                    {/* PayPal Buttons (Only Show After Clicking "Pay Now") */}
                    {showPayPalButtons && (
                        <div className="mt-4">
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
                                    if (!actions.order) return Promise.resolve();
                                    await actions.order.capture();
                                    alert("Payment Successful!");
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </PayPalScriptProvider>
    );
};

export default PayPalPayment;
