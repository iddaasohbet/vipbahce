import HomeContent from "@/components/HomeContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kış Bahçesi Sistemleri | Modern Bioklimatik Çözümler",
  description:
    "Modern kış bahçesi ve bioklimatik tavan sistemleri. Profesyonel montaj, uygun fiyatlar ve kaliteli hizmet. Kış bahçesi modelleri ve fiyatları için bizi arayın.",
};

export default function Home() {
  return <HomeContent />;
}

