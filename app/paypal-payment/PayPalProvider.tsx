"use client";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const PayPalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!, currency: "GBP" }}>
      {children}
    </PayPalScriptProvider>
  );
};

export default PayPalProvider;
