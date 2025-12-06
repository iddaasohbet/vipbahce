import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sürgülü Cam | Profesyonel Sürgülü Cam | İstanbul",
  description: "İstanbul'da profesyonel sürgülü cam sistemleri. Modern tasarım, kaliteli malzeme, uzman montaj ekibi. Ücretsiz keşif ve fiyat teklifi. 15+ yıllık tecrübe, 2500+ tamamlanan proje.",
  keywords: "sürgülü cam, sürgülü cam istanbul, sürgülü cam fiyatları, sürgülü cam modelleri, motorlu cam, alüminyum sürgülü cam, sürgülü cam sistemleri, sürgülü cam montajı",
  openGraph: {
    title: "Sürgülü Cam | Profesyonel Sürgülü Cam | İstanbul",
    description: "İstanbul'da profesyonel sürgülü cam sistemleri. Modern tasarım, kaliteli malzeme, uzman montaj ekibi.",
    type: "website",
    locale: "tr_TR",
  },
  alternates: {
    canonical: "https://kisbahcesi.com/surgulu-cam",
  },
};

export default function SurguluCamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

