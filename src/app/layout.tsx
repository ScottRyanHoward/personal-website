import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import { profile } from '@/lib/content';
import WebVitals from '@/components/WebVitals';

// Optimize font loading with font-display: swap
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
});

const siteUrl = "https://scottryanhoward.info";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} - ${profile.title}`,
    template: `%s | ${profile.name}`,
  },
  icons: {
    icon: [
      { url: '/favicon.ico?v=2', sizes: '32x32', type: 'image/x-icon' },
      { url: '/favicon-16x16.png?v=2', sizes: '16x16', type: 'image/png' },
      { url: '/icon.png?v=2', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon.ico?v=2',
    apple: '/apple-touch-icon.png?v=2',
  },
  description: profile.summary,
  keywords: [
    "Software Engineer",
    "Full Stack Developer",
    "Web Development",
    "React",
    "TypeScript",
    "Next.js",
    "JavaScript",
    "Portfolio",
    "Resume",
    profile.name,
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  publisher: profile.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: profile.name,
    title: `${profile.name} - ${profile.title}`,
    description: profile.summary,
    images: [
      {
        url: `${siteUrl}${profile.profileImage}`,
        width: 1200,
        height: 630,
        alt: `${profile.name} - Profile Picture`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} - ${profile.title}`,
    description: profile.summary,
    creator: "@scottryanhoward",
    images: [`${siteUrl}${profile.profileImage}`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code", // Replace with actual verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="canonical" href={siteUrl} />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <WebVitals />
        {children}
      </body>
    </html>
  );
}
