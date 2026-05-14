import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import GAEventListener from "@/components/GAEventListener";
import "./globals.css";

const satoshi = localFont({
  src: [
    { path: "./fonts/satoshi/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/satoshi/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/satoshi/Satoshi-Medium.woff2", weight: "600", style: "normal" },
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
    default: "Conversion Rate Optimisation for D2C Ecommerce & Online Education · Impact Conversion",
    template: "%s · Impact Conversion",
  },
  description:
    "Conversion rate optimisation for $5M to $20M D2C ecommerce and online education brands. Research-led testing, statistical rigour, 35% win rate, $1M+ added revenue on a single engagement.",
  openGraph: {
    title: "Conversion Rate Optimisation for D2C Ecommerce & Online Education · Impact Conversion",
    description:
      "Research-led conversion rate optimisation for $5M to $20M D2C ecommerce and online education brands. $1M+ added revenue on a single engagement. 35% win rate on shipped tests.",
    url: "https://impactconversion.com",
    siteName: "Impact Conversion",
    type: "website",
    locale: "en_NZ",
  },
  twitter: {
    card: "summary_large_image",
    title: "Conversion Rate Optimisation for D2C Ecommerce & Online Education",
    description:
      "Research-led CRO for D2C ecommerce and online education brands. 35% win rate, $1M+ added revenue on a single engagement.",
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
      className={`${satoshi.variable} ${geistMono.variable} antialiased`}
    >
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
                  legalName: "Peak Digital Ltd",
                  url: "https://impactconversion.com",
                  logo: "https://impactconversion.com/assets/logo.png",
                  description:
                    "A conversion rate optimisation agency for D2C ecommerce and online education brands. Research-led experimentation that turns existing traffic into revenue.",
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
                    "Ecommerce Optimisation",
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
        {children}
        <GAEventListener />
        <StickyMobileCTA />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
