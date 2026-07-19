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
  title: {
    default: "YK Associates | Premium HVAC Design, Contracting & Commissioning",
    template: "%s | YK Associates"
  },
  description: "YK Associates provides professional commercial, industrial, and residential HVAC contracting solutions—covering planning, system sizing calculations, ducting network execution, and air balancing checks.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ykassociates.in'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "YK Associates | Premium HVAC Engineering Solutions",
    description: "Complete commercial and residential HVAC contracting, design, and execution from planning to commissioning.",
    url: "https://www.ykassociates.in",
    siteName: "YK Associates",
    locale: "en_IN",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Cloudflare Turnstile Verification Script */}
        <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
