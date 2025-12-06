import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import FloatingContactBar from "@/components/FloatingContactBar";
import ContactSidebar from "@/components/ContactSidebar";
import PageTransition from "@/components/PageTransition";
import CookieConsent from "@/components/CookieConsent";

const poppins = Poppins({
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Kış Bahçesi | Modern Bioklimatik Çözümler",
    template: "%s | Kış Bahçesi",
  },
  description:
    "Modern kış bahçesi ve bioklimatik tavan sistemleri. Profesyonel montaj, uygun fiyatlar ve kaliteli hizmet. Kış bahçesi modelleri ve fiyatları için bizi arayın.",
  keywords: [
    "kış bahçesi",
    "kış bahçesi fiyatları",
    "kış bahçesi modelleri",
    "bioklimatik tavan",
    "bioklimatik kış bahçesi",
    "cam balkon",
    "kış bahçesi sistemleri",
    "pergola sistemleri",
  ],
  metadataBase: new URL("https://kisbahcesi.com"),
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        <style dangerouslySetInnerHTML={{ __html: `
          *,::before,::after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}
          html{line-height:1.5;-webkit-text-size-adjust:100%;tab-size:4;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif;scroll-behavior:smooth}
          body{margin:0;line-height:inherit;background-color:#ffffff;color:#1a1a1a;overflow-x:hidden}
          .antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
          @media (prefers-reduced-motion: reduce) {
            *,::before,::after{animation-duration:0.01ms!important;animation-iteration-count:1!important;transition-duration:0.01ms!important;scroll-behavior:auto!important}
          }
        `}} />
      </head>
      <body className={`${poppins.variable} ${playfair.variable} antialiased`} suppressHydrationWarning>
        <PageTransition>
          {children}
        </PageTransition>
        <FloatingContactBar />
        <ContactSidebar />
        <CookieConsent />
      </body>
    </html>
  );
}

