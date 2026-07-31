import type { Metadata, Viewport } from "next";
import { Oswald, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const display = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const plate = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-plate",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vsautomart.lk"),
  title: {
    default: "VS Auto Mart — Quality Used Vehicles in Sri Lanka",
    template: "%s | VS Auto Mart",
  },
  description:
    "Browse inspected, quality used vehicles in Sri Lanka. Suzuki, Toyota, and more — trusted by 500+ happy customers.",
  openGraph: {
    type: "website",
    locale: "en_LK",
    siteName: "VS Auto Mart",
    title: "VS Auto Mart — Quality Used Vehicles in Sri Lanka",
    description:
      "Browse inspected, quality used vehicles in Sri Lanka. Suzuki, Toyota, and more.",
    images: ["/og-image.jpg"], // 1200x630, obsidian bg + gold logo
  },
  twitter: {
    card: "summary_large_image",
    title: "VS Auto Mart",
    description: "Quality used vehicles in Sri Lanka.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0B0B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${plate.variable}`}>
      <body>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
