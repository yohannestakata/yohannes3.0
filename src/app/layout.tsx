import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yohannes Takata | Creative Developer & Designer",
  description:
    "I'm Yohannes Takata, a creative developer and designer turning bold ideas into polished digital products – from interactive 3D experiences to full-stack platforms.",
  keywords: [
    "Yohannes Takata",
    "creative developer",
    "web developer",
    "portfolio",
    "React",
    "Next.js",
    "Three.js",
    "full-stack",
    "designer",
  ],
  authors: [{ name: "Yohannes Takata" }],
  openGraph: {
    title: "Yohannes Takata | Creative Developer & Designer",
    description:
      "Turning bold ideas into polished digital products – from interactive 3D experiences to full-stack platforms.",
    url: "https://yohannestakata.com",
    siteName: "Yohannes Takata",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yohannes Takata | Creative Developer & Designer",
    description:
      "Turning bold ideas into polished digital products – from interactive 3D experiences to full-stack platforms.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.className} bg-dark text-primary antialiased`}>
        {children}
      </body>
    </html>
  );
}
