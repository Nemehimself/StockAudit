"use client";

import React, { Suspense } from "react";
import StripePayment from "./Stripe";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
        <StripePayment />
    </Suspense>
    );
}