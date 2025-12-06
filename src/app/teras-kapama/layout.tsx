import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teras Kapama | Profesyonel Teras Kapama | İstanbul",
  description: "İstanbul'da profesyonel teras kapama sistemleri. Modern tasarım, kaliteli malzeme, uzman montaj ekibi. Ücretsiz keşif ve fiyat teklifi. 15+ yıllık tecrübe, 2500+ tamamlanan proje.",
  keywords: "teras kapama, teras kapama istanbul, teras kapama fiyatları, teras kapama modelleri, cam teras kapama, alüminyum teras kapama, teras kapama tasarımı, teras kapama montajı",
  openGraph: {
    title: "Teras Kapama | Profesyonel Teras Kapama | İstanbul",
    description: "İstanbul'da profesyonel teras kapama sistemleri. Modern tasarım, kaliteli malzeme, uzman montaj ekibi.",
    type: "website",
    locale: "tr_TR",
  },
  alternates: {
    canonical: "https://www.vipkisbahcesi.com/teras-kapama",
  },
};

export default function TerasKapamaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

