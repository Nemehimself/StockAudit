"use client"; // Only for App Router

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const amount = searchParams?.get("amount") ?? "500";
  const season = searchParams?.get("season") ?? "Not Selected";
  const paymentMethod = searchParams?.get("paymentMethod") ?? ""; // paypal or stripe

  useEffect(() => {
    // Simulate payment success (Replace with real API call)
    setTimeout(() => {
      alert(`Payment of £${amount} for ${season} using ${paymentMethod} was successful!`);

      // ✅ Update auditCalculator (Replace this with your actual state update logic)
      updateAuditCalculator(season, Number(amount));

      // ✅ Redirect back to main budget page
      router.push("/budget-summary"); // Change this to your actual summary page
    }, 2000);
  }, [amount, paymentMethod, router, season]);

  // Function to update auditCalculator
  const updateAuditCalculator = (season: string | null, amount: number) => {
    if (!season) return;
  
    // Retrieve existing payment details
    const storedPayment = localStorage.getItem("paymentDetails");
    const paymentData = storedPayment ? JSON.parse(storedPayment) : { amount: 0, season: "" };
  
    // ✅ Update amount (add new payment to existing)
    paymentData.amount = Number(paymentData.amount) + amount;
  
    // ✅ Ensure seasons are tracked correctly
    const seasonsSet: Set<string> = new Set<string>(paymentData.season.split(",").map((s: string) => s.trim()));
    seasonsSet.add(season);
    paymentData.season = Array.from(seasonsSet).join(", ");
  
    // ✅ Save back to localStorage
    localStorage.setItem("paymentDetails", JSON.stringify(paymentData));
    console.log(`Updated payment details:`, paymentData);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-xl font-bold">Processing {paymentMethod} payment for {season}...</h1>
    </div>
  );
}
