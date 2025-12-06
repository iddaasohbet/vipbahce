import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Otomatik Pergola | Profesyonel Otomatik Pergola | İstanbul",
  description: "İstanbul'da profesyonel otomatik pergola sistemleri. Modern tasarım, kaliteli malzeme, uzman montaj ekibi. Ücretsiz keşif ve fiyat teklifi. 15+ yıllık tecrübe, 2500+ tamamlanan proje.",
  keywords: "otomatik pergola, otomatik pergola istanbul, otomatik pergola fiyatları, otomatik pergola modelleri, motorlu pergola, alüminyum pergola, pergola sistemleri, pergola montajı",
  openGraph: {
    title: "Otomatik Pergola | Profesyonel Otomatik Pergola | İstanbul",
    description: "İstanbul'da profesyonel otomatik pergola sistemleri. Modern tasarım, kaliteli malzeme, uzman montaj ekibi.",
    type: "website",
    locale: "tr_TR",
  },
  alternates: {
    canonical: "https://kisbahcesi.com/otomatik-pergola",
  },
};

export default function OtomatikPergolaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

