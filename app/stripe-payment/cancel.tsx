import { useRouter } from "next/router";

const Cancel = () => {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 p-6">
            <div className="bg-white shadow-lg p-6 rounded-lg text-center">
                <h1 className="text-3xl font-bold text-red-600">Payment Canceled</h1>
                <p className="text-lg text-gray-700 mt-2">You can try again anytime.</p>

                <button
                    onClick={() => router.push("/auditpricing")}
                    className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-red-700 transition-all"
                >
                    Return to Audit Pricing
                </button>
            </div>
        </div>
    );
};

export default Cancel;
