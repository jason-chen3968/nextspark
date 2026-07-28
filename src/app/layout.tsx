import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NextSpark – Connect Donations to Communities",
  description:
    "NextSpark connects individual donors with local shelters, food banks, and donation centers. Sign up to donate or register your organization today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
