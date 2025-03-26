"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const Success = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [paymentDetails, setPaymentDetails] = useState<Record<string, number> | null>(null);
  const [isUpdatedPayment, setIsUpdatedPayment] = useState(false);

  useEffect(() => {
    // Check if payment is from increaseBudgetModal
    const paymentSource = searchParams.get("source"); // `source` will be either 'auditPricing' or 'increaseBudgetModal'
    setIsUpdatedPayment(paymentSource === "increaseBudgetModal");

    // Retrieve past payments and ensure it's an array
    const storedPayments = JSON.parse(localStorage.getItem("paymentDetails") || "[]");

    if (!Array.isArray(storedPayments)) {
      console.error("Invalid paymentDetails format in localStorage:", storedPayments);
      return;
    }

    // Aggregate payments by season
    const updatedBudgets: Record<string, number> = {};
    storedPayments.forEach(({ season, amount }: { season: string; amount: string }) => {
      updatedBudgets[season] = (updatedBudgets[season] || 0) + parseFloat(amount);
    });

    // Save the new aggregated budgets
    localStorage.setItem("seasonBudgets", JSON.stringify(updatedBudgets));
    setPaymentDetails(updatedBudgets);

    // Ensure redirect works properly
    const timeout = setTimeout(() => {
      router.prefetch("/auditcalculator"); // ✅ Prefetch to ensure it's ready
      router.replace("/auditcalculator");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [router, searchParams]);

  useEffect(() => {
    // ✅ Redirect to /auditcalculator after 3 seconds
    router.replace("/auditcalculator");
}, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-6">
      <div className="bg-white shadow-lg p-6 rounded-lg text-center">
        <h1 className="text-3xl font-bold text-green-600">
          Payment Successful!
        </h1>

        {isUpdatedPayment && <p className="text-lg text-gray-700 mt-2">Updated Budgets:</p>}

        {isUpdatedPayment && paymentDetails &&
          Object.entries(paymentDetails).map(([season, amount]) => (
            <p key={season} className="text-lg text-gray-700">
              {season}: <span className="text-green-600">£{amount}</span>
            </p>
          ))}

        <p className="text-lg text-gray-700 mt-2">
          Redirecting to Audit Calculator...
        </p>
      </div>
    </div>
  );
};

export default Success;
