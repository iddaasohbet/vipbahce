"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FileText, Scale, CheckCircle2, AlertCircle, Shield, Users } from "lucide-react";

export default function KosullarPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-teal-900 via-teal-800 to-teal-900 py-20 md:py-28">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-teal-900/50 to-transparent" />
          
          <div className="relative mx-auto max-w-7xl px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-teal-100 backdrop-blur-sm">
                Yasal Bilgilendirme
              </span>
              <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                Kullanım Koşulları
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-teal-100 md:text-xl">
                Web sitemizi kullanmadan önce lütfen kullanım koşullarımızı okuyunuz.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="prose prose-lg max-w-none"
            >
              <div className="space-y-8">
                {/* Son Güncelleme */}
                <div className="mb-8 rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100">
                      <FileText className="h-5 w-5 text-teal-900" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Son Güncelleme</h2>
                      <p className="text-sm text-gray-600">{new Date().toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Bu kullanım koşulları, Kış Bahçesi web sitesinin kullanımına ilişkin şartları ve koşulları belirlemektedir. 
                    Web sitemizi kullanarak bu koşulları kabul etmiş sayılırsınız.
                  </p>
                </div>

                {/* Section 1 */}
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100">
                      <Scale className="h-5 w-5 text-teal-900" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">1. Genel Hükümler</h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Bu kullanım koşulları, Kış Bahçesi web sitesinin (vipkisbahcesi.com) kullanımına ilişkin tüm şartları ve koşulları kapsar. 
                    Web sitemizi ziyaret ederek ve kullanarak, bu koşulları kabul etmiş sayılırsınız.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Kış Bahçesi, bu koşulları önceden haber vermeksizin değiştirme hakkını saklı tutar. 
                    Değişiklikler web sitemizde yayınlandığı anda yürürlüğe girer.
                  </p>
                </div>

                {/* Section 2 */}
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100">
                      <Users className="h-5 w-5 text-teal-900" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">2. Hizmetlerimiz</h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Web sitemiz aracılığıyla aşağıdaki hizmetleri sunmaktayız:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-teal-900 mt-0.5 flex-shrink-0" />
                      <span>Kış bahçesi sistemleri hakkında bilgilendirme</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-teal-900 mt-0.5 flex-shrink-0" />
                      <span>Ürün ve hizmet kataloğu</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-teal-900 mt-0.5 flex-shrink-0" />
                      <span>Ücretsiz keşif ve teklif talebi</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-teal-900 mt-0.5 flex-shrink-0" />
                      <span>Müşteri iletişim formu</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-teal-900 mt-0.5 flex-shrink-0" />
                      <span>Proje galerisi ve referanslar</span>
                    </li>
                  </ul>
                </div>

                {/* Section 3 */}
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100">
                      <Shield className="h-5 w-5 text-teal-900" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">3. Kullanıcı Yükümlülükleri</h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Web sitemizi kullanırken aşağıdaki kurallara uymanız gerekmektedir:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-teal-900 mt-0.5 flex-shrink-0" />
                      <span>Web sitemizi yasalara aykırı amaçlarla kullanamazsınız</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-teal-900 mt-0.5 flex-shrink-0" />
                      <span>Web sitemizin güvenliğini tehdit edecek veya zarar verecek faaliyetlerde bulunamazsınız</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-teal-900 mt-0.5 flex-shrink-0" />
                      <span>Başkalarının haklarını ihlal edemezsiniz</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-teal-900 mt-0.5 flex-shrink-0" />
                      <span>Yanlış, yanıltıcı veya eksik bilgi vermemelisiniz</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-teal-900 mt-0.5 flex-shrink-0" />
                      <span>Web sitemizin içeriğini izinsiz olarak kopyalayamaz veya dağıtamazsınız</span>
                    </li>
                  </ul>
                </div>

                {/* Section 4 */}
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100">
                      <FileText className="h-5 w-5 text-teal-900" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">4. Fikri Mülkiyet Hakları</h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Web sitemizdeki tüm içerikler (metinler, görseller, logolar, tasarımlar vb.) Kış Bahçesi'nin fikri mülkiyetidir 
                    ve telif hakları ile korunmaktadır. İçeriklerimizi izinsiz kullanmak yasaktır.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Web sitemizdeki içerikleri kopyalamak, çoğaltmak, dağıtmak veya ticari amaçlarla kullanmak için 
                    önceden yazılı izin almanız gerekmektedir.
                  </p>
                </div>

                {/* Section 5 */}
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100">
                      <AlertCircle className="h-5 w-5 text-teal-900" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">5. Sorumluluk Reddi</h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Web sitemizdeki bilgiler genel bilgilendirme amaçlıdır ve "olduğu gibi" sunulmaktadır. 
                    Kış Bahçesi, web sitesindeki bilgilerin doğruluğu, güncelliği veya eksiksizliği konusunda garanti vermez.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Web sitemizin kesintisiz, hatasız veya güvenli çalışacağı garanti edilmez. 
                    Teknik sorunlar, bakım çalışmaları veya diğer nedenlerle hizmet kesintileri yaşanabilir.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Web sitemizde yer alan üçüncü taraf bağlantılarının içeriğinden Kış Bahçesi sorumlu değildir.
                  </p>
                </div>

                {/* Section 6 */}
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100">
                      <Scale className="h-5 w-5 text-teal-900" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">6. Sözleşme ve Ödeme Koşulları</h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Web sitemiz üzerinden yapılan teklif talepleri, sözleşme teklifi niteliğindedir. 
                    Kesin sözleşme, yazılı olarak imzalanan sözleşme ile oluşur.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-teal-900 mt-0.5 flex-shrink-0" />
                      <span>Fiyatlar, keşif sonrası netleşir ve yazılı teklif ile sunulur</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-teal-900 mt-0.5 flex-shrink-0" />
                      <span>Ödeme koşulları sözleşmede belirtilir</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-teal-900 mt-0.5 flex-shrink-0" />
                      <span>Garanti koşulları sözleşme ve garanti belgesinde yer alır</span>
                    </li>
                  </ul>
                </div>

                {/* Section 7 */}
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100">
                      <Shield className="h-5 w-5 text-teal-900" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">7. Gizlilik</h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Kişisel verilerinizin işlenmesi ve korunması hakkında detaylı bilgi için 
                    <a href="/gizlilik" className="text-teal-900 font-semibold hover:underline"> Gizlilik Politikamızı</a> inceleyebilirsiniz.
                  </p>
                </div>

                {/* Section 8 */}
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100">
                      <FileText className="h-5 w-5 text-teal-900" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">8. Değişiklikler</h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Kış Bahçesi, bu kullanım koşullarını önceden haber vermeksizin değiştirme hakkını saklı tutar. 
                    Değişiklikler web sitemizde yayınlandığı anda yürürlüğe girer. 
                    Web sitemizi kullanmaya devam ederek güncel koşulları kabul etmiş sayılırsınız.
                  </p>
                </div>

                {/* Section 9 */}
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100">
                      <Scale className="h-5 w-5 text-teal-900" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">9. Uygulanacak Hukuk ve Yetkili Mahkeme</h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Bu kullanım koşulları Türkiye Cumhuriyeti yasalarına tabidir. 
                    Bu koşullardan kaynaklanan uyuşmazlıkların çözümünde İstanbul Mahkemeleri yetkilidir.
                  </p>
                </div>

                {/* Section 10 */}
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100">
                      <Users className="h-5 w-5 text-teal-900" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">10. İletişim</h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Kullanım koşulları hakkında sorularınız için bizimle iletişime geçebilirsiniz:
                  </p>
                  <div className="rounded-lg bg-gray-50 p-4 border-l-4 border-teal-900">
                    <p className="text-gray-700 font-semibold mb-2">Kış Bahçesi</p>
                    <p className="text-gray-600 text-sm mb-1">E-posta: info@vipkisbahcesi.com</p>
                    <p className="text-gray-600 text-sm mb-1">Telefon: +90 533 359 34 66</p>
                    <p className="text-gray-600 text-sm">Adres: İstanbul, Türkiye</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-teal-900 py-16">
          <div className="mx-auto max-w-4xl px-4 md:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                Sorularınız mı var?
              </h2>
              <p className="mb-8 text-teal-100">
                Kullanım koşulları hakkında daha fazla bilgi almak için bizimle iletişime geçin.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/teklif-al"
                  className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 font-semibold text-teal-900 shadow-lg transition-all hover:bg-gray-100 hover:scale-105"
                >
                  İletişime Geçin
                </a>
                <a
                  href="tel:+905333593466"
                  className="inline-flex items-center justify-center rounded-full border-2 border-white px-8 py-4 font-semibold text-white transition-all hover:bg-white/10"
                >
                  0533 359 34 66
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

