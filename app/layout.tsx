import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import GAEventListener from "@/components/GAEventListener";
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
                    "A CRO agency for D2C ecommerce and online education brands. Research-led experimentation that turns existing traffic into revenue.",
                  founder: {
                    "@type": "Person",
                    name: "Jono Matla",
                  },
                  sameAs: [
                    "https://www.linkedin.com/company/impactconversion",
                  ],
                  contactPoint: {
                    "@type": "ContactPoint",
                    email: "jono@impactconversion.com",
                    contactType: "sales",
                    areaServed: "Worldwide",
                  },
                },
                {
                  "@type": "LocalBusiness",
                  "@id": "https://impactconversion.com/#localbusiness",
                  name: "Impact Conversion",
                  image: "https://impactconversion.com/assets/logo.png",
                  url: "https://impactconversion.com",
                  email: "jono@impactconversion.com",
                  priceRange: "$$$",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Queenstown",
                    addressRegion: "Otago",
                    addressCountry: "NZ",
                  },
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
