"use client";

import React, { Suspense } from "react";
import PayPalPayment from "./Paypal";
import PayPalProvider from "./PayPalProvider"; // Import the provider

export default function Page() {
  return (
    <PayPalProvider>
      <Suspense fallback={<p>Loading...</p>}>
        <PayPalPayment />
      </Suspense>
    </PayPalProvider>
  );
}
