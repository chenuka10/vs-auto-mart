import type { Metadata, Viewport } from "next";
import { Oswald, Inter, JetBrains_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import AnimatedBackground from "@/components/AnimatedBackground";
import GlobalLoader from "@/components/GlobalLoader";

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
    default: "VS Auto Mart — Premier Kadawatha Car Sale | Quality Used Vehicles in Sri Lanka",
    template: "%s | VS Auto Mart Kadawatha",
  },
  description:
    "VS Auto Mart is the premier Kadawatha car sale offering fully inspected, high-quality used vehicles in Sri Lanka. Buy trusted Toyota, Honda, Suzuki, and more.",
  keywords: [
    "VS Auto Mart",
    "Kadawatha car sale",
    "car sale Kadawatha",
    "used cars Sri Lanka",
    "buy cars Colombo",
    "Japanese cars Sri Lanka",
    "used vehicles Sri Lanka",
    "Toyota for sale Kadawatha",
    "Honda cars Sri Lanka",
    "Suzuki cars for sale",
    "trusted car dealers Sri Lanka",
    "VS Auto Mart Kadawatha",
  ],
  authors: [{ name: "VS Auto Mart" }],
  creator: "VS Auto Mart",
  publisher: "VS Auto Mart",
  alternates: {
    canonical: "https://vsautomart.lk",
  },
  openGraph: {
    type: "website",
    locale: "en_LK",
    url: "https://vsautomart.lk",
    siteName: "VS Auto Mart Kadawatha",
    title: "VS Auto Mart — Premier Kadawatha Car Sale",
    description:
      "Looking for a reliable car? Visit VS Auto Mart, the most trusted Kadawatha car sale for high-quality, inspected used vehicles in Sri Lanka.",
    images: [
      {
        url: "/og-image.jpg", // 1200x630, obsidian bg + gold logo
        width: 1200,
        height: 630,
        alt: "VS Auto Mart — Kadawatha Car Sale",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VS Auto Mart — Premier Kadawatha Car Sale",
    description: "Discover high-quality, inspected used vehicles at VS Auto Mart Kadawatha.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  // Middleware sets x-pathname on every request; fall back to empty string
  // (= show public nav) when running without middleware (e.g. during `next build`).
  const pathname = headersList.get("x-pathname") ?? "";
  const isAdmin = pathname.startsWith("/admin");

  // Define AutoDealer schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    name: "VS Auto Mart",
    image: "https://vsautomart.lk/og-image.jpg",
    "@id": "https://vsautomart.lk",
    url: "https://vsautomart.lk",
    telephone: "+94772500320",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kandy Road",
      addressLocality: "Kadawatha",
      addressRegion: "Western Province",
      addressCountry: "LK",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 7.0011, // General Kadawatha latitude
      longitude: 79.9500, // General Kadawatha longitude
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "08:30",
        closes: "18:00",
      },
    ],
    priceRange: "LKR",
  };

  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${plate.variable}`}>
      <head>
        <script
          // Runs before paint so a saved theme applies immediately
          // instead of flashing the dark default first.
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem("vs-auto-mart-theme")==="light"){document.documentElement.setAttribute("data-theme","light");}}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body>
        {!isAdmin && <GlobalLoader />}
        {!isAdmin && <AnimatedBackground />}
        {!isAdmin && <Header />}
        <main className="min-h-screen relative z-10">{children}</main>
        {!isAdmin && <Footer />}
        {!isAdmin && <WhatsAppButton />}
      </body>
    </html>
  );
}
