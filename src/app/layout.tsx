import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title:       "GeoMotoRoutes — Georgian Motorcycle Route Planner",
  description: "Discover premium motorcycle routes across Georgia. Real-time road conditions, gravel warnings, biker-friendly spots, and community-verified alerts.",
  keywords:    ["motorcycle routes Georgia", "biker Georgia", "Georgian roads", "road conditions Georgia"],
  authors:     [{ name: "GeoMotoRoutes" }],
  openGraph: {
    title:       "GeoMotoRoutes",
    description: "Premium motorcycle route platform for Georgia (Caucasus)",
    type:        "website",
  },
};

export const viewport: Viewport = {
  width:        "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor:   "#0b0d11",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): React.ReactElement {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
