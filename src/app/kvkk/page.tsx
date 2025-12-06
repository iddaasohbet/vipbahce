"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, FileText, CheckCircle2, Mail, Phone, AlertCircle, Lock, Eye } from "lucide-react";
import Link from "next/link";

export default function KVKKPage() {
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
                KVKK Aydınlatma Metni
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-teal-100 md:text-xl">
                6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında bilgilendirme
              </p>
            </motion.div>
          </div>
        </section>

        {/* KVKK Content */}
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
                      <Shield className="h-5 w-5 text-teal-900" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Son Güncelleme</h2>
                      <p className="text-sm text-gray-600">{new Date().toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, kişisel verilerinizin işlenmesi 
                    hakkında sizleri bilgilendirmek isteriz. Detaylı bilgi için{" "}
                    <Link href="/gizlilik" className="text-teal-900 font-semibold hover:underline">
                      Gizlilik Politikamızı
                    </Link>{" "}
                    inceleyebilirsiniz.
                  </p>
                </div>

                {/* Section 1 */}
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100">
                      <FileText className="h-5 w-5 text-teal-900" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">1. Veri Sorumlusu</h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    KVKK'nın 10. maddesi uyarınca, kişisel verileriniz aşağıdaki veri sorumlusu tarafından işlenmektedir:
                  </p>
                  <div className="rounded-lg bg-gray-50 p-4 border-l-4 border-teal-900">
                    <p className="text-gray-700 font-semibold mb-2">Kış Bahçesi</p>
                    <p className="text-gray-600 text-sm mb-1">Adres: İstanbul, Türkiye</p>
                    <p className="text-gray-600 text-sm mb-1">E-posta: info@vipkisbahcesi.com</p>
                    <p className="text-gray-600 text-sm">Telefon: +90 533 359 34 66</p>
                  </div>
                </div>

                {/* Section 2 */}
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100">
                      <Eye className="h-5 w-5 text-teal-900" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">2. Kişisel Verilerin İşlenme Amaçları</h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Kişisel verileriniz, KVKK'nın 5. ve 6. maddelerinde belirtilen işleme şartlarına uygun olarak 
                    aşağıdaki amaçlarla işlenmektedir:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-teal-900 mt-0.5 flex-shrink-0" />
                      <span>Hizmetlerimizi sunmak ve müşteri taleplerini karşılamak</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-teal-900 mt-0.5 flex-shrink-0" />
                      <span>Sözleşme ilişkisinin kurulması ve yürütülmesi</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-teal-900 mt-0.5 flex-shrink-0" />
                      <span>Yasal yükümlülüklerimizi yerine getirmek</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-teal-900 mt-0.5 flex-shrink-0" />
                      <span>Müşteri ilişkilerini yönetmek ve iletişim sağlamak</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-teal-900 mt-0.5 flex-shrink-0" />
                      <span>Güvenlik ve hukuki uyumluluk sağlamak</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-teal-900 mt-0.5 flex-shrink-0" />
                      <span>Web sitemizin işleyişini sağlamak ve geliştirmek</span>
                    </li>
                  </ul>
                </div>

                {/* Section 3 */}
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100">
                      <Lock className="h-5 w-5 text-teal-900" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">3. Kişisel Verilerin İşlenme Hukuki Sebepleri</h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Kişisel verileriniz, KVKK'nın 5. ve 6. maddelerinde belirtilen aşağıdaki hukuki sebeplere dayanarak işlenmektedir:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-teal-900 mt-0.5 flex-shrink-0" />
                      <span>Açık rızanızın bulunması</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-teal-900 mt-0.5 flex-shrink-0" />
                      <span>Sözleşmenin kurulması veya ifası ile doğrudan ilgili olması</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-teal-900 mt-0.5 flex-shrink-0" />
                      <span>Yasal yükümlülüğümüzün yerine getirilmesi</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-teal-900 mt-0.5 flex-shrink-0" />
                      <span>Hukuki yükümlülüğümüzün yerine getirilmesi</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-teal-900 mt-0.5 flex-shrink-0" />
                      <span>Meşru menfaatlerimiz için zorunlu olması</span>
                    </li>
                  </ul>
                </div>

                {/* Section 4 */}
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100">
                      <Shield className="h-5 w-5 text-teal-900" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">4. KVKK Kapsamındaki Haklarınız</h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    KVKK'nın 11. maddesi uyarınca, kişisel verilerinizle ilgili olarak aşağıdaki haklara sahipsiniz:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-teal-900 mt-0.5 flex-shrink-0" />
                      <span><strong>Öğrenme hakkı:</strong> Kişisel verilerinizin işlenip işlenmediğini öğrenme</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-teal-900 mt-0.5 flex-shrink-0" />
                      <span><strong>Bilgi talep etme hakkı:</strong> İşlenmişse buna ilişkin bilgi talep etme</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-teal-900 mt-0.5 flex-shrink-0" />
                      <span><strong>Amaç öğrenme hakkı:</strong> İşlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-teal-900 mt-0.5 flex-shrink-0" />
                      <span><strong>Yurt içi/yurt dışı aktarım bilgisi:</strong> Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-teal-900 mt-0.5 flex-shrink-0" />
                      <span><strong>Düzeltme hakkı:</strong> Eksik veya yanlış işlenmişse düzeltilmesini isteme</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-teal-900 mt-0.5 flex-shrink-0" />
                      <span><strong>Silme/yok etme hakkı:</strong> Kişisel verilerinizin silinmesini veya yok edilmesini isteme</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-teal-900 mt-0.5 flex-shrink-0" />
                      <span><strong>Üçüncü kişilere bildirme hakkı:</strong> Düzeltme, silme veya yok etme işlemlerinin, kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-teal-900 mt-0.5 flex-shrink-0" />
                      <span><strong>İtiraz hakkı:</strong> İşlenen verilerin münhasıran otomatik sistemler ile analiz edilmesi suretiyle kişinin kendisi aleyhine bir sonucun ortaya çıkmasına itiraz etme</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-teal-900 mt-0.5 flex-shrink-0" />
                      <span><strong>Zararın giderilmesini talep etme hakkı:</strong> Kanuna aykırı olarak işlenmesi sebebiyle zarara uğraması halinde zararın giderilmesini talep etme</span>
                    </li>
                  </ul>
                </div>

                {/* Section 5 */}
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100">
                      <Mail className="h-5 w-5 text-teal-900" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">5. Haklarınızı Nasıl Kullanabilirsiniz?</h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    KVKK kapsamındaki haklarınızı kullanmak için aşağıdaki yöntemlerden birini kullanabilirsiniz:
                  </p>
                  <div className="rounded-lg bg-gray-50 p-6 border-l-4 border-teal-900 space-y-4">
                    <div>
                      <p className="text-gray-700 font-semibold mb-2">1. E-posta ile:</p>
                      <p className="text-gray-600 text-sm">info@vipkisbahcesi.com adresine kimliğinizi tespit edici belgelerle birlikte talebinizi gönderebilirsiniz.</p>
                    </div>
                    <div>
                      <p className="text-gray-700 font-semibold mb-2">2. Yazılı başvuru ile:</p>
                      <p className="text-gray-600 text-sm">İstanbul, Türkiye adresine noter onaylı kimlik belgenizle birlikte yazılı başvuruda bulunabilirsiniz.</p>
                    </div>
                    <div>
                      <p className="text-gray-700 font-semibold mb-2">3. Telefon ile:</p>
                      <p className="text-gray-600 text-sm">+90 533 359 34 66 numaralı telefonu arayarak bilgi alabilirsiniz.</p>
                    </div>
                  </div>
                  <div className="mt-4 rounded-lg bg-yellow-50 p-4 border-l-4 border-yellow-500">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-yellow-800">
                        <strong>Önemli:</strong> Başvurularınızın işleme alınabilmesi için kimliğinizi tespit edici belgelerin 
                        (nüfus cüzdanı, pasaport vb.) başvurunuza eklenmesi gerekmektedir.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 6 */}
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100">
                      <Shield className="h-5 w-5 text-teal-900" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">6. Kişisel Verilerin Saklanma Süresi</h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Kişisel verileriniz, işleme amaçlarının gerektirdiği süre boyunca ve yasal saklama süreleri 
                    çerçevesinde saklanmaktadır. İşleme amacının ortadan kalkması veya saklama süresinin dolması 
                    halinde, kişisel verileriniz KVKK ve ilgili mevzuat hükümlerine uygun olarak silinir, yok edilir 
                    veya anonim hale getirilir.
                  </p>
                </div>

                {/* Section 7 */}
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100">
                      <FileText className="h-5 w-5 text-teal-900" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">7. Şikayet Hakkı</h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Kişisel verilerinizin işlenmesi ile ilgili şikayetlerinizi, Kişisel Verileri Koruma Kurulu'na 
                    iletebilirsiniz:
                  </p>
                  <div className="rounded-lg bg-gray-50 p-4 border-l-4 border-teal-900">
                    <p className="text-gray-700 font-semibold mb-2">Kişisel Verileri Koruma Kurulu</p>
                    <p className="text-gray-600 text-sm mb-1">Web: www.kvkk.gov.tr</p>
                    <p className="text-gray-600 text-sm mb-1">E-posta: kvkk@kvkk.gov.tr</p>
                    <p className="text-gray-600 text-sm">Telefon: 0312 216 50 00</p>
                  </div>
                </div>

                {/* Section 8 */}
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100">
                      <Lock className="h-5 w-5 text-teal-900" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">8. Kişisel Verilerin Güvenliği</h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Kişisel verilerinizin güvenliğini sağlamak için teknik ve idari güvenlik önlemleri almaktayız:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-teal-900 mt-0.5 flex-shrink-0" />
                      <span>SSL sertifikası ile şifreli veri iletimi</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-teal-900 mt-0.5 flex-shrink-0" />
                      <span>Güvenli sunucu altyapısı</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-teal-900 mt-0.5 flex-shrink-0" />
                      <span>Düzenli güvenlik güncellemeleri</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-teal-900 mt-0.5 flex-shrink-0" />
                      <span>Sınırlı erişim kontrolleri</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-teal-900 mt-0.5 flex-shrink-0" />
                      <span>Personel eğitimleri</span>
                    </li>
                  </ul>
                </div>

                {/* Section 9 */}
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100">
                      <FileText className="h-5 w-5 text-teal-900" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">9. İletişim</h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    KVKK kapsamındaki haklarınızı kullanmak veya sorularınız için bizimle iletişime geçebilirsiniz:
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
                KVKK kapsamındaki haklarınız hakkında daha fazla bilgi almak için bizimle iletişime geçin.
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

