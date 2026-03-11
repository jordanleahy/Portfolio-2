import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

const SITE_URL = "https://www.jordanleahy.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Jordan Leahy — Product Designer",
    template: "%s — Jordan Leahy",
  },
  description:
    "Product designer specializing in clinical AI and healthcare. Case studies, process, and writing.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Jordan Leahy",
    title: "Jordan Leahy — Product Designer",
    description:
      "Product designer specializing in clinical AI and healthcare. Case studies, process, and writing.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jordan Leahy — Product Designer",
    description:
      "Product designer specializing in clinical AI and healthcare. Case studies, process, and writing.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Jordan Leahy",
              url: SITE_URL,
              jobTitle: "Product Design Engineer",
              description:
                "Product designer specializing in clinical AI and healthcare applications.",
              sameAs: ["https://linkedin.com/in/jordanleahy"],
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-background text-foreground`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
