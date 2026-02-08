import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://yohannestakata.com";

export const viewport: Viewport = {
  themeColor: "#0e0e0e",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Yohannes Takata — Creative Developer & Designer",
    template: "%s | Yohannes Takata",
  },
  description:
    "Creative developer and designer based in Ethiopia, building polished web and mobile experiences — from interactive 3D to full-stack platforms. Available for freelance.",
  keywords: [
    "Yohannes Takata",
    "creative developer",
    "web developer Ethiopia",
    "frontend developer",
    "full-stack developer",
    "freelance developer",
    "portfolio",
    "React developer",
    "Next.js developer",
    "Three.js",
    "React Three Fiber",
    "React Native",
    "UI/UX designer",
    "web design",
    "mobile app developer",
    "3D web experiences",
    "Framer Motion",
    "Tailwind CSS",
  ],
  authors: [{ name: "Yohannes Takata", url: siteUrl }],
  creator: "Yohannes Takata",
  publisher: "Yohannes Takata",
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
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Yohannes Takata — Creative Developer & Designer",
    description:
      "Building polished web and mobile experiences — from interactive 3D to full-stack platforms.",
    url: siteUrl,
    siteName: "Yohannes Takata",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Yohannes Takata — Creative Developer & Designer",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yohannes Takata — Creative Developer & Designer",
    description:
      "Building polished web and mobile experiences — from interactive 3D to full-stack platforms.",
    images: ["/og.png"],
  },
  category: "technology",
};

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Yohannes Takata",
  url: siteUrl,
  jobTitle: "Creative Developer & Designer",
  description:
    "Creative developer and designer based in Ethiopia, building polished web and mobile experiences.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "ET",
  },
  sameAs: [
    "https://github.com/yohannestakata",
    "https://www.linkedin.com/in/yohannes-takata",
  ],
  knowsAbout: [
    "Web Development",
    "React",
    "Next.js",
    "Three.js",
    "React Native",
    "TypeScript",
    "UI/UX Design",
    "Full-Stack Development",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Yohannes Takata",
  url: siteUrl,
  description:
    "Portfolio of Yohannes Takata — creative developer and designer.",
  author: {
    "@type": "Person",
    name: "Yohannes Takata",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="canonical" href={siteUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body
        className={`${spaceGrotesk.className} bg-dark text-primary antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
