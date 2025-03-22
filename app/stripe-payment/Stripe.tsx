import { useSearchParams } from "next/navigation";
import { useState } from "react";

const StripePayment = () => {
    const searchParams = useSearchParams();
    const amount = searchParams?.get("amount") ?? "500";
    const season = searchParams?.get("season") ?? "Not Selected";
    const [loading, setLoading] = useState(false);

    const handleStripePayment = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/stripe-checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: parseFloat(amount) * 100 }),
            });
    
            if (!response.ok) {
                const errorData = await response.json(); // ✅ Read error response properly
                throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log("✅ Stripe API Response:", data);
    
            if (data.url) {
                window.location.href = data.url; // ✅ Redirect to Stripe Checkout
            } else {
                throw new Error("Stripe checkout session creation failed.");
            }
        } catch (error) {
            console.error("❌ Payment error:", error);
            if (error instanceof Error) {
                alert(`Payment failed: ${error.message}`); // ✅ Show a user-friendly error
            } else {
                alert('Payment failed: An unknown error occurred.'); // Handle unknown error type
            }
            setLoading(false);
        }
    };
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            {/* Glassmorphism Card */}
            <div className="bg-white/70 backdrop-blur-md shadow-xl p-6 rounded-xl w-full max-w-md text-center transition-transform transform hover:scale-105">
                <h1 className="text-3xl font-bold text-gray-800 mb-3">Pay with Stripe</h1>
                <p className="text-lg font-semibold text-gray-700">
                    Amount: <span className="text-purple-600">£{amount}</span>
                </p>
                <p className="text-lg font-semibold text-gray-700 mb-4">
                    Season: <span className="text-purple-600">{season}</span>
                </p>

                {/* Payment Button */}
                <button
                    onClick={handleStripePayment}
                    className="mt-4 bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-purple-700 transition-all duration-300 w-full font-bold text-lg flex items-center justify-center"
                    disabled={loading}
                >
                    {loading ? (
                        <span className="animate-pulse">Processing...</span>
                    ) : (
                        "Pay with Stripe"
                    )}
                </button>
            </div>
        </div>
    );
};

export default StripePayment;
