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
  title: "George Watkins - Systems Administrator",
  description: "Accomplished systems administrator with 15+ years of progressive experience managing complex IT infrastructures across diverse industries including healthcare, managed services, and construction.",
  keywords: ["systems administrator", "IT infrastructure", "cloud engineer", "cybersecurity", "hybrid cloud", "system optimization", "portfolio"],
  authors: [{ name: "George Watkins" }],
  creator: "George Watkins",
  openGraph: {
    title: "George Watkins - Systems Administrator",
    description: "Accomplished systems administrator with 15+ years of progressive experience managing complex IT infrastructures.",
    type: "website",
    locale: "en_US",
    siteName: "George Watkins Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "George Watkins - Systems Administrator",
    description: "Accomplished systems administrator with 15+ years of progressive experience managing complex IT infrastructures.",
    creator: "@gwatkins2090",
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
