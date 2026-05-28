import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import LenisProvider from "@/components/lenis-provider";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KAISAA | Luxury Arabic Gifting Boutique",
  description: "Premium customized gifting, perfume engraving, bouquet design, and luxury hamper curation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-[#1a1a1a]"><LenisProvider>{children}</LenisProvider></body>
    </html>
  );
}
