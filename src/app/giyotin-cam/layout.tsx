import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giyotin Cam | Profesyonel Giyotin Cam | İstanbul",
  description: "İstanbul'da profesyonel giyotin cam sistemleri. Modern tasarım, kaliteli malzeme, uzman montaj ekibi. Ücretsiz keşif ve fiyat teklifi. 15+ yıllık tecrübe, 2500+ tamamlanan proje.",
  keywords: "giyotin cam, giyotin cam istanbul, giyotin cam fiyatları, giyotin cam modelleri, motorlu cam, alüminyum giyotin cam, giyotin cam sistemleri, giyotin cam montajı",
  openGraph: {
    title: "Giyotin Cam | Profesyonel Giyotin Cam | İstanbul",
    description: "İstanbul'da profesyonel giyotin cam sistemleri. Modern tasarım, kaliteli malzeme, uzman montaj ekibi.",
    type: "website",
    locale: "tr_TR",
  },
  alternates: {
    canonical: "https://www.vipkisbahcesi.com/giyotin-cam",
  },
};

export default function GiyotinCamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

