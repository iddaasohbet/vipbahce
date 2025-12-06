import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kullanım Koşulları | Kış Bahçesi",
  description: "Kış Bahçesi kullanım koşulları. Web sitemizi kullanmadan önce lütfen kullanım koşullarımızı okuyunuz.",
  keywords: "kullanım koşulları, şartlar ve koşullar, yasal bilgilendirme",
  openGraph: {
    title: "Kullanım Koşulları | Kış Bahçesi",
    description: "Web sitemizi kullanmadan önce lütfen kullanım koşullarımızı okuyunuz.",
    type: "website",
    locale: "tr_TR",
  },
  alternates: {
    canonical: "https://www.vipkisbahcesi.com/kosullar",
  },
};

export default function KosullarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

