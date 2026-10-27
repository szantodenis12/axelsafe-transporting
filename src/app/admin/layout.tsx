import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import "./admin.css";

/**
 * Root layout for the admin CRM (separate root from the public /[locale] tree).
 * Everything under /admin is noindex; the proxy also sets X-Robots-Tag.
 */

const geist = Geist({ subsets: ["latin", "latin-ext"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin", "latin-ext"], variable: "--font-geist-mono", display: "swap" });

export const metadata: Metadata = {
  title: { default: "CRM · AXEL SAFE TRANSPORTING", template: "%s · AXEL SAFE CRM" },
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#060B16",
  colorScheme: "dark",
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" className={`${geist.variable} ${geistMono.variable} admin-root`}>
      <body className="min-h-dvh text-ink antialiased">
        <div aria-hidden className="admin-ambient" />
        {children}
      </body>
    </html>
  );
}
