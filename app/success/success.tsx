"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Success = () => {
    const router = useRouter();

    useEffect(() => {
        // ✅ Redirect to /auditcalculator after 3 seconds
        router.replace("/auditcalculator");
    }, [router]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-6">
            <div className="bg-white shadow-lg p-6 rounded-lg text-center">
                <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
                <p className="text-lg text-gray-700 mt-2">Redirecting to Audit Calculator...</p>
            </div>
        </div>
    );
};

export default Success;
