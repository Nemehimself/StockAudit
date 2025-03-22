'use client';

import React, { Suspense } from "react";
import PayPalPayment from "./Paypal";

export default function Page() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <PayPalPayment />
        </Suspense>
    );
}
