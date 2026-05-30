import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Skin Analyzer Admin",
  description: "Private Admin Web scaffold for Skin Analyzer operations.",
  robots: {
    index: false,
    follow: false
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
