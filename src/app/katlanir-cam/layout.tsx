import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Katlanır Cam | Profesyonel Katlanır Cam | İstanbul",
  description: "İstanbul'da profesyonel katlanır cam sistemleri. Modern tasarım, kaliteli malzeme, uzman montaj ekibi. Ücretsiz keşif ve fiyat teklifi. 15+ yıllık tecrübe, 2500+ tamamlanan proje.",
  keywords: "katlanır cam, katlanır cam istanbul, katlanır cam fiyatları, katlanır cam modelleri, motorlu cam, alüminyum katlanır cam, katlanır cam sistemleri, katlanır cam montajı",
  openGraph: {
    title: "Katlanır Cam | Profesyonel Katlanır Cam | İstanbul",
    description: "İstanbul'da profesyonel katlanır cam sistemleri. Modern tasarım, kaliteli malzeme, uzman montaj ekibi.",
    type: "website",
    locale: "tr_TR",
  },
  alternates: {
    canonical: "https://www.vipkisbahcesi.com/katlanir-cam",
  },
};

export default function KatlanirCamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

