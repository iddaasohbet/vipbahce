import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bioklimatik | Profesyonel Bioklimatik Tavan | İstanbul",
  description: "İstanbul'da profesyonel bioklimatik tavan sistemleri. Modern tasarım, kaliteli malzeme, uzman montaj ekibi. Ücretsiz keşif ve fiyat teklifi. 15+ yıllık tecrübe, 2500+ tamamlanan proje.",
  keywords: "bioklimatik, bioklimatik istanbul, bioklimatik fiyatları, bioklimatik modelleri, bioklimatik tavan, alüminyum bioklimatik, bioklimatik sistemleri, bioklimatik montajı",
  openGraph: {
    title: "Bioklimatik | Profesyonel Bioklimatik Tavan | İstanbul",
    description: "İstanbul'da profesyonel bioklimatik tavan sistemleri. Modern tasarım, kaliteli malzeme, uzman montaj ekibi.",
    type: "website",
    locale: "tr_TR",
  },
  alternates: {
    canonical: "https://kisbahcesi.com/bioklimatik",
  },
};

export default function BioklimatikLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

