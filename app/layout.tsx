import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "TaxWise | Smart Tax Solutions for Nigeria - Payroll & Personal Tax",
  description: "TaxWise offers smart tax solutions for businesses and individuals. Free payroll for small teams, tax calculators, filing assistance, and FIRS-compliant reports.",
  keywords: "TaxWise, Nigeria tax software, payroll software, PAYE calculator, 2026 tax compliance, tax filing, tax management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
