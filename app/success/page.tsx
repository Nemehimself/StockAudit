"use client";

import { Suspense } from "react";
import Success from "./success";

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
          <Success />
        </Suspense>
      );
    };