import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hebeshiebe | Profesyonel Hebeshiebe | İstanbul",
  description: "İstanbul'da profesyonel hebeshiebe sistemleri. Modern tasarım, kaliteli malzeme, uzman montaj ekibi. Ücretsiz keşif ve fiyat teklifi. 15+ yıllık tecrübe, 2500+ tamamlanan proje.",
  keywords: "hebeshiebe, hebeshiebe istanbul, hebeshiebe fiyatları, hebeshiebe modelleri, motorlu cam, alüminyum hebeshiebe, hebeshiebe sistemleri, hebeshiebe montajı",
  openGraph: {
    title: "Hebeshiebe | Profesyonel Hebeshiebe | İstanbul",
    description: "İstanbul'da profesyonel hebeshiebe sistemleri. Modern tasarım, kaliteli malzeme, uzman montaj ekibi.",
    type: "website",
    locale: "tr_TR",
  },
  alternates: {
    canonical: "https://kisbahcesi.com/hebeshiebe",
  },
};

export default function HebeshiebeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

