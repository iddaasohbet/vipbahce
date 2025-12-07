import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cam Tavan | Profesyonel Cam Tavan Sistemleri | İstanbul",
  description: "İstanbul'da profesyonel cam tavan sistemleri. Modern tasarım, kaliteli malzeme, uzman montaj ekibi. Ücretsiz keşif ve fiyat teklifi. 15+ yıllık tecrübe, 2500+ tamamlanan proje.",
  keywords: "cam tavan, cam tavan istanbul, cam tavan fiyatları, cam tavan modelleri, cam tavan sistemleri, cam tavan tasarımı, cam tavan montajı, kış bahçesi cam tavan",
  openGraph: {
    title: "Cam Tavan | Profesyonel Cam Tavan Sistemleri | İstanbul",
    description: "İstanbul'da profesyonel cam tavan sistemleri. Modern tasarım, kaliteli malzeme, uzman montaj ekibi.",
    type: "website",
    locale: "tr_TR",
  },
  alternates: {
    canonical: "https://www.vipkisbahcesi.com/cam-tavan",
  },
};

export default function CamTavanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}




