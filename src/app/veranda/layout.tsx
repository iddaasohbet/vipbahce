import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Veranda | Profesyonel Veranda Sistemleri | İstanbul",
  description: "İstanbul'da profesyonel veranda sistemleri. Modern tasarım, kaliteli malzeme, uzman montaj ekibi. Ücretsiz keşif ve fiyat teklifi. 15+ yıllık tecrübe, 2500+ tamamlanan proje.",
  keywords: "veranda, veranda istanbul, veranda fiyatları, veranda modelleri, veranda sistemleri, veranda tasarımı, veranda montajı",
  openGraph: {
    title: "Veranda | Profesyonel Veranda Sistemleri | İstanbul",
    description: "İstanbul'da profesyonel veranda sistemleri. Modern tasarım, kaliteli malzeme, uzman montaj ekibi.",
    type: "website",
    locale: "tr_TR",
  },
  alternates: {
    canonical: "https://www.vipkisbahcesi.com/veranda",
  },
};

export default function VerandaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}












