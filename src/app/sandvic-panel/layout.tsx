import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sandviç Panel | Profesyonel Sandviç Panel Sistemleri | İstanbul",
  description: "İstanbul'da profesyonel sandviç panel sistemleri. Modern tasarım, kaliteli malzeme, uzman montaj ekibi. Ücretsiz keşif ve fiyat teklifi. 15+ yıllık tecrübe, 2500+ tamamlanan proje.",
  keywords: "sandviç panel, sandviç panel istanbul, sandviç panel fiyatları, sandviç panel modelleri, sandviç panel sistemleri, sandviç panel tasarımı, sandviç panel montajı",
  openGraph: {
    title: "Sandviç Panel | Profesyonel Sandviç Panel Sistemleri | İstanbul",
    description: "İstanbul'da profesyonel sandviç panel sistemleri. Modern tasarım, kaliteli malzeme, uzman montaj ekibi.",
    type: "website",
    locale: "tr_TR",
  },
  alternates: {
    canonical: "https://www.vipkisbahcesi.com/sandvic-panel",
  },
};

export default function SandvicPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}




