import type { Metadata } from "next";
import HomeClient from "./HomeClient";
import { PLATFORM_CONFIG } from "@/data/config";

export const metadata: Metadata = {
  title: `${PLATFORM_CONFIG.name} — ${PLATFORM_CONFIG.tagline}`,
  description: PLATFORM_CONFIG.heroSubline,
  openGraph: {
    title: `${PLATFORM_CONFIG.name} — ${PLATFORM_CONFIG.tagline}`,
    description: PLATFORM_CONFIG.heroSubline,
    url: "https://sapedia.vercel.app",
    images: [
      {
        url: "https://sapedia.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "SAPedia — SAP Explained Simply",
      },
    ],
  },
};

export default function Page() {
  return <HomeClient />;
}
