import type { Metadata } from "next";
import Script from "next/script";
import "@/app/globals.css";
import { PLATFORM_CONFIG } from "@/data/config";

// ─── Site-wide SEO defaults ───────────────────────────────
// Each page/lesson overrides these with its own metadata
export const metadata: Metadata = {
  title: {
    default: `${PLATFORM_CONFIG.name} — ${PLATFORM_CONFIG.tagline}`,
    template: `%s | ${PLATFORM_CONFIG.name}`,
  },
  description: PLATFORM_CONFIG.heroSubline,
  keywords: ["SAP learning", "RISE with SAP", "SAP S/4HANA", "Clean Core", "SAP BTP", "SAP certification", "SAP training"],
  authors: [{ name: "SAPedia" }],
  creator: "SAPedia",
  openGraph: {
    type:        "website",
    locale:      "en_IN",
    url:         "https://sapedia.in",   // ← Update when domain is ready
    siteName:    PLATFORM_CONFIG.name,
    title:       `${PLATFORM_CONFIG.name} — ${PLATFORM_CONFIG.tagline}`,
    description: PLATFORM_CONFIG.heroSubline,
  },
  twitter: {
    card:        "summary_large_image",
    title:       `${PLATFORM_CONFIG.name} — ${PLATFORM_CONFIG.tagline}`,
    description: PLATFORM_CONFIG.heroSubline,
  },
  robots: {
    index:  true,
    follow: true,
  },
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics — only loads when GA_ID is set in .env.local */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className="min-h-screen bg-[#F8FAFC] font-body antialiased">
        {children}
      </body>
    </html>
  );
}
