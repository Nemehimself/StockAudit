"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/services/Provider";
import { Toaster } from "@/components/ui/sonner";
import { ReduxProvider } from "./store/ReduxProvider";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
          :root {
            --font-inter: ${inter.variable};
          }
        `}</style>
      </head>
      <body className={`${inter.variable} antialiased`}>
        {/* ✅ Wrap the entire app inside ReduxProvider */}
        <ReduxProvider>
          <QueryProvider>
            {children}
            <Toaster />
          </QueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
