import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/layout/Providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets:  ["latin"],
  display:  "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets:  ["latin"],
  display:  "swap",
});

export const metadata: Metadata = {
  title:       "GeoMotoRoutes — ქართველი ბიკერების სოციალური ქსელი",
  description:
    "საქართველოს მოტოციკლისტების პრემიუმ სოციალური ქსელი. პოულობდეთ " +
    "მარშრუტებს, ჰყვებოდეთ ამბებს და დაამატეთ რეალური საფრთხეები ინტერაქტიულ რუკაზე.",
  keywords: ["მოტოციკლი", "georgia motorcycle", "ბიკერი", "GeoMotoRoutes"],
  authors:  [{ name: "GeoMotoRoutes" }],
  openGraph: {
    title:       "GeoMotoRoutes",
    description: "ქართველი ბიკერების სოციალური ქსელი",
    type:        "website",
  },
};

export const viewport: Viewport = {
  width:        "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor:   "#09090b",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <html lang="ka" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-[#09090b] text-zinc-50 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
