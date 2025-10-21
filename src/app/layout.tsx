import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import profileData from '@/data/profile.json';
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
    default: `${profileData.name} - ${profileData.title}`,
    template: `%s | ${profileData.name}`,
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
  description: profileData.summary,
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
    profileData.name,
  ],
  authors: [{ name: profileData.name }],
  creator: profileData.name,
  publisher: profileData.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: profileData.name,
    title: `${profileData.name} - ${profileData.title}`,
    description: profileData.summary,
    images: [
      {
        url: `${siteUrl}${profileData.profileImage}`,
        width: 1200,
        height: 630,
        alt: `${profileData.name} - Profile Picture`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profileData.name} - ${profileData.title}`,
    description: profileData.summary,
    creator: "@scottryanhoward",
    images: [`${siteUrl}${profileData.profileImage}`],
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
