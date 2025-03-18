'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import QueryProvider from '@/services/Provider';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ variable: '--font-inter', subsets: ['latin'] });

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
        <body className={`${inter.variable} antialiased`}>
          <QueryProvider>
            {children}
            <Toaster />
          </QueryProvider>
        </body>
      </head>
      {/* ✅ Moved outside */}
    </html>
  );
}
