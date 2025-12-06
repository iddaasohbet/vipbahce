import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kış Bahçesi | Profesyonel Kış Bahçesi | İstanbul",
  description: "İstanbul'da profesyonel kış bahçesi sistemleri. Modern tasarım, kaliteli malzeme, uzman montaj ekibi. Ücretsiz keşif ve fiyat teklifi. 15+ yıllık tecrübe, 2500+ tamamlanan proje.",
  keywords: "kış bahçesi, kış bahçesi istanbul, kış bahçesi fiyatları, kış bahçesi modelleri, cam kış bahçesi, alüminyum kış bahçesi, kış bahçesi tasarımı, kış bahçesi montajı",
  openGraph: {
    title: "Kış Bahçesi | Profesyonel Kış Bahçesi | İstanbul",
    description: "İstanbul'da profesyonel kış bahçesi sistemleri. Modern tasarım, kaliteli malzeme, uzman montaj ekibi.",
    type: "website",
    locale: "tr_TR",
  },
  alternates: {
    canonical: "https://www.vipkisbahcesi.com/kis-bahcesi",
  },
};

export default function KisBahcesiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

