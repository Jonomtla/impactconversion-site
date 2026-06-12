import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import GAEventListener from "@/components/GAEventListener";
import MotionProvider from "@/components/motion/MotionProvider";
import "./globals.css";

const satoshi = localFont({
  src: [
    { path: "./fonts/satoshi/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/satoshi/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/satoshi/Satoshi-Bold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/satoshi/Satoshi-Bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/satoshi/Satoshi-Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://impactconversion.com"),
  title: {
    default: "CRO Agency for D2C & Online Education · Impact Conversion",
    template: "%s · Impact Conversion",
  },
  description:
    "Conversion rate optimisation for direct-to-consumer brands. Research-led testing that compounds revenue on the same ad spend. $1M+ added on a single engagement.",
  // No title/description/url here: each page's og tags then inherit that
  // page's own resolved title and description instead of the homepage's.
  openGraph: {
    siteName: "Impact Conversion",
    type: "website",
    locale: "en_NZ",
    images: [
      {
        url: "/assets/og-default.png",
        width: 1200,
        height: 630,
        alt: "Impact Conversion: more revenue from the traffic you already have.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
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
      className={`${satoshi.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        {/* If JS never loads, scroll-reveal content must still be visible */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="bg-cream text-text min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://impactconversion.com/#organization",
                  name: "Impact Conversion",
                  legalName: "Impact Conversion Limited",
                  url: "https://impactconversion.com",
                  logo: "https://impactconversion.com/assets/logo.png",
                  description:
                    "A conversion rate optimisation agency for D2C and online education brands. Research-led experimentation that turns existing traffic into revenue.",
                  founder: {
                    "@type": "Person",
                    name: "Jono Matla",
                  },
                  areaServed: [
                    { "@type": "Country", name: "New Zealand" },
                    { "@type": "Country", name: "Australia" },
                    { "@type": "Country", name: "United States" },
                    { "@type": "Country", name: "United Kingdom" },
                  ],
                  knowsAbout: [
                    "Conversion Rate Optimisation",
                    "A/B Testing",
                    "Shopify CRO",
                    "D2C Optimisation",
                    "Online Education Funnel Optimisation",
                    "Statistical Testing",
                  ],
                  sameAs: [
                    "https://www.linkedin.com/company/impactconversion",
                  ],
                  contactPoint: {
                    "@type": "ContactPoint",
                    email: "jono@impactconversion.com",
                    contactType: "sales",
                    areaServed: ["NZ", "AU", "US", "GB"],
                  },
                },
                {
                  "@type": "ProfessionalService",
                  "@id": "https://impactconversion.com/#localbusiness",
                  name: "Impact Conversion",
                  image: "https://impactconversion.com/assets/logo.png",
                  url: "https://impactconversion.com",
                  email: "jono@impactconversion.com",
                  priceRange: "$$$",
                  serviceType: "Conversion Rate Optimisation",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Queenstown",
                    addressRegion: "Otago",
                    addressCountry: "NZ",
                  },
                  areaServed: [
                    { "@type": "Country", name: "New Zealand" },
                    { "@type": "Country", name: "Australia" },
                    { "@type": "Country", name: "United States" },
                    { "@type": "Country", name: "United Kingdom" },
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://impactconversion.com/#website",
                  url: "https://impactconversion.com",
                  name: "Impact Conversion",
                  publisher: {
                    "@id": "https://impactconversion.com/#organization",
                  },
                },
              ],
            }),
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-purple focus:px-4 focus:py-2 focus:text-white focus:shadow-lg"
        >
          Skip to content
        </a>
        <MotionProvider>{children}</MotionProvider>
        <GAEventListener />
        <StickyMobileCTA />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
