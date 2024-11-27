import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { inter } from "@/lib/fonts";
import { siteConfig } from "@/lib/data/site";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.title, template: "%s | Linkwell" },
  description: siteConfig.description,
  openGraph: { title: siteConfig.title, description: siteConfig.description, siteName: siteConfig.name, type: "website" },
};

export const viewport: Viewport = { themeColor: "#D6336C" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
