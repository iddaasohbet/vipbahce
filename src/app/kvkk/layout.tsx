import { Metadata } from "next";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni | Kış Bahçesi",
  description: "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında KVKK aydınlatma metni. KVKK kapsamındaki haklarınız hakkında bilgi.",
  keywords: "kvkk, kişisel verilerin korunması kanunu, kvkk aydınlatma metni, kişisel veri hakları",
  openGraph: {
    title: "KVKK Aydınlatma Metni | Kış Bahçesi",
    description: "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında bilgilendirme",
    type: "website",
    locale: "tr_TR",
  },
  alternates: {
    canonical: "https://kisbahcesi.com/kvkk",
  },
};

export default function KVKKLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

