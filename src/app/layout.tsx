import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import SacredMandalaBackground from "@/components/portfolio/sacred-mandala-background";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Your Name - Full Stack Developer",
  description: "Passionate full-stack developer with expertise in modern web technologies. Explore my portfolio showcasing React, Next.js, Node.js projects and technical skills.",
  keywords: ["full stack developer", "web developer", "React", "Next.js", "Node.js", "TypeScript", "portfolio", "software engineer"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  openGraph: {
    title: "Your Name - Full Stack Developer",
    description: "Passionate full-stack developer with expertise in modern web technologies. Explore my portfolio and projects.",
    type: "website",
    locale: "en_US",
    siteName: "Your Name Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Name - Full Stack Developer",
    description: "Passionate full-stack developer with expertise in modern web technologies. Explore my portfolio and projects.",
    creator: "@yourusername",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfairDisplay.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var s=localStorage.getItem('theme');var d=(s==='light')?false:(s==='dark'||!s);var e=document.documentElement;d?e.classList.add('dark'):e.classList.remove('dark');}catch(e){document.documentElement.classList.add('dark');}})();` }} />
      </head>
      <body className="antialiased">
        <SacredMandalaBackground />
        <Header />
        <main className="min-h-screen relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
