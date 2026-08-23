import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/data/site";
import { getBaseUrl } from "@/lib/seo";
import { buildLocalBusinessJsonLd } from "@/lib/structured-data";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  metadataBase: getBaseUrl(),
  title: {
    template: siteConfig.seo.titleTemplate,
    default: siteConfig.seo.defaultTitle,
  },
  description: siteConfig.seo.description,
  applicationName: siteConfig.name,
  creator: siteConfig.name,
  keywords: [...siteConfig.brandKeywords],
  openGraph: {
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.description,
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  // Verificación de Google Search Console: sin `NEXT_PUBLIC_GSC_VERIFICATION`
  // configurada, Next.js simplemente omite el meta tag (no-op).
  ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessJsonLd = buildLocalBusinessJsonLd();

  return (
    <html lang="es" className={`${playfair.variable} ${dmSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {localBusinessJsonLd.map((entry, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(entry).replace(/</g, "\\u003c"),
            }}
          />
        ))}
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
