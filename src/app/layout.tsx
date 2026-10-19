import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { BRAND } from "@/lib/brand";

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
  metadataBase: new URL(process.env.APP_URL ?? "http://localhost:3000"),
  title: "Taskora | Project Management Made Simple",
  description: BRAND.description,
  applicationName: BRAND.name,
  openGraph: {
    type: "website",
    siteName: BRAND.name,
    title: "Taskora | Project Management Made Simple",
    description: BRAND.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Taskora | Project Management Made Simple",
    description: BRAND.description,
  },
};

export const viewport: Viewport = {
  themeColor: BRAND.colors.mark,
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
