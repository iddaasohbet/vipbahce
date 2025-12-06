import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rolling Roof | Profesyonel Rolling Roof | İstanbul",
  description: "İstanbul'da profesyonel rolling roof sistemleri. Modern tasarım, kaliteli malzeme, uzman montaj ekibi. Ücretsiz keşif ve fiyat teklifi. 15+ yıllık tecrübe, 2500+ tamamlanan proje.",
  keywords: "rolling roof, rolling roof istanbul, rolling roof fiyatları, rolling roof modelleri, motorlu tavan, alüminyum rolling roof, rolling roof sistemleri, rolling roof montajı",
  openGraph: {
    title: "Rolling Roof | Profesyonel Rolling Roof | İstanbul",
    description: "İstanbul'da profesyonel rolling roof sistemleri. Modern tasarım, kaliteli malzeme, uzman montaj ekibi.",
    type: "website",
    locale: "tr_TR",
  },
  alternates: {
    canonical: "https://kisbahcesi.com/rolling-roof",
  },
};

export default function RollingRoofLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

