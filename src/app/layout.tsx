import type { Metadata } from "next";
import "./globals.css";
import profileData from '@/data/profile.json';

const siteUrl = "https://scottryanhoward.info";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profileData.name} - ${profileData.title}`,
    template: `%s | ${profileData.name}`,
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
    <html lang="en">
      <head>
        <link rel="canonical" href={siteUrl} />
      </head>
      <body>{children}</body>
    </html>
  );
}
