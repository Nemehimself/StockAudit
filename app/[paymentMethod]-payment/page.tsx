"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, Suspense } from "react";

function PaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const amount = searchParams?.get("amount") ?? "500";
  const season = searchParams?.get("season") ?? "Not Selected";
  const paymentMethod = searchParams?.get("paymentMethod") ?? "";

  useEffect(() => {
    setTimeout(() => {
      alert(`Payment of £${amount} for ${season} using ${paymentMethod} was successful!`);
      updateAuditCalculator(season, Number(amount));
      router.push("/budget-summary");
    }, 2000);
  }, [amount, paymentMethod, router, season]);

  const updateAuditCalculator = (season: string | null, amount: number) => {
    if (!season) return;

    const storedPayment = localStorage.getItem("paymentDetails");
    const paymentData = storedPayment ? JSON.parse(storedPayment) : { amount: 0, season: "" };

    paymentData.amount = Number(paymentData.amount) + amount;

    const seasonsSet: Set<string> = new Set<string>(paymentData.season.split(",").map((s: string) => s.trim()));
    seasonsSet.add(season);
    paymentData.season = Array.from(seasonsSet).join(", ");

    localStorage.setItem("paymentDetails", JSON.stringify(paymentData));
    console.log(`Updated payment details:`, paymentData);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-xl font-bold">Processing {paymentMethod} payment for {season}...</h1>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen"><h1>Loading payment details...</h1></div>}>
      <PaymentContent />
    </Suspense>
  );
}
