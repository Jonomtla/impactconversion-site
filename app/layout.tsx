import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://impactconversion.com"),
  title: {
    default: "Impact Conversion · Turn existing traffic into revenue",
    template: "%s · Impact Conversion",
  },
  description:
    "A CRO agency for D2C ecommerce and online education. We find the leaks in your funnel and fix them with data, not guesswork. $1M+ in extra revenue, 35% win rate on tests we ship.",
  openGraph: {
    title: "Impact Conversion · Turn existing traffic into revenue",
    description:
      "We find the leaks in your funnel and fix them with data. $1M+ extra revenue generated for clients. 35% win rate on tests shipped.",
    url: "https://impactconversion.com",
    siteName: "Impact Conversion",
    type: "website",
    locale: "en_NZ",
  },
  twitter: {
    card: "summary_large_image",
    title: "Impact Conversion · Turn existing traffic into revenue",
    description:
      "Research-led CRO for D2C ecommerce and online education. $1M+ extra revenue generated. 35% win rate.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="bg-cream text-text min-h-screen">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-purple focus:px-4 focus:py-2 focus:text-white focus:shadow-lg"
        >
          Skip to content
        </a>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
      <GoogleAnalytics gaId="G-LDW54LST21" />
    </html>
  );
}
