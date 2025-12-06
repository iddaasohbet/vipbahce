import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gizlilik Politikası | Kış Bahçesi",
  description: "Kış Bahçesi gizlilik politikası. Kişisel verilerinizin korunması ve KVKK kapsamındaki haklarınız hakkında bilgi.",
  keywords: "gizlilik politikası, kvkk, kişisel verilerin korunması, gizlilik",
  openGraph: {
    title: "Gizlilik Politikası | Kış Bahçesi",
    description: "Kişisel verilerinizin korunması bizim için önemlidir.",
    type: "website",
    locale: "tr_TR",
  },
  alternates: {
    canonical: "https://www.vipkisbahcesi.com/gizlilik",
  },
};

export default function GizlilikLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

