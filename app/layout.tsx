import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Impact Conversion — Turn existing traffic into revenue",
  description:
    "A CRO agency for D2C ecommerce and online education. We find the leaks in your funnel and fix them with data — not guesswork. $1M+ in extra revenue, 21% average uplift.",
  openGraph: {
    title: "Impact Conversion — Turn existing traffic into revenue",
    description:
      "We find the leaks in your funnel and fix them with data. $1M+ extra revenue generated for clients. 21% average uplift.",
    url: "https://impactconversion.com",
    siteName: "Impact Conversion",
    type: "website",
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
      <body className="bg-cream text-text min-h-screen">{children}</body>
    </html>
  );
}
