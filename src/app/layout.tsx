import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scott Ryan Howard",
  description: "Personal website and digital resume",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
