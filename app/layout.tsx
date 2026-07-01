import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

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
  title: "Café Literario — 16 años siendo tu lugar",
  description: "Un espacio donde el café y las palabras construyen comunidad. Desde 2008.",
  openGraph: {
    title: "Café Literario — 16 años siendo tu lugar",
    description: "Un espacio donde el café y las palabras construyen comunidad. Desde 2008.",
    type: "website",
    locale: "es_CO",
    siteName: "Café Literario",
  },
  twitter: {
    card: "summary_large_image",
    title: "Café Literario — 16 años siendo tu lugar",
    description: "Un espacio donde el café y las palabras construyen comunidad. Desde 2008.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${dmSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
