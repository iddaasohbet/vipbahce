"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function SEOArticle() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="relative overflow-hidden bg-white py-16">
      <div className="mx-auto max-w-6xl px-6">
        {/* Article Content */}
        <article className="prose prose-lg max-w-none text-gray-700">
          {/* Always Visible Content */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">
              Kış Bahçesi: Modern Yaşam Alanlarının Vazgeçilmezi
            </h2>
            
            <p className="text-lg leading-relaxed">
              <strong>Kış bahçesi</strong>, modern mimaride yaşam alanlarını genişleten ve dört mevsim kullanılabilen özel tasarım yapılardır. 
              <strong> Kış bahçesi fiyatları</strong>, projenin büyüklüğü, kullanılan malzemeler ve tasarım özelliklerine göre değişiklik gösterir. 
              Kaliteli bir kış bahçesi sistemi, evinize değer katar ve yaşam kalitenizi artırır.
            </p>

            <p className="leading-relaxed">
              <strong>Kış bahçesi modelleri</strong> arasında klasik, modern, bioklimatik ve panoramik tasarımlar yer alır. 
              Her model, farklı ihtiyaçlara ve zevklere hitap eder. <strong>Kış bahçesi modelleri fiyatları</strong> ise 
              seçtiğiniz modelin özelliklerine, boyutlarına ve ekstra donanımlarına göre belirlenir.
            </p>
          </div>

          {/* Expandable Content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="mt-6 space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Kış Bahçesi Nedir ve Neden Tercih Edilir?
                  </h3>
                  
                  <p className="leading-relaxed">
                    Kış bahçesi, evinizin veya işyerinizin bahçe, teras ya da balkon alanını cam ve alüminyum yapılarla kapatarak 
                    dört mevsim kullanılabilir hale getiren modern bir çözümdür. Özellikle İstanbul, Ankara, İzmir gibi büyük şehirlerde 
                    <strong> kış bahçesi</strong> sistemleri, hem konut hem de ticari alanlarda yaygın olarak tercih edilmektedir.
                  </p>

                  <h3 className="text-2xl font-bold text-gray-900">
                    Kış Bahçesi Fiyatları: Nelere Dikkat Etmelisiniz?
                  </h3>
                  
                  <p className="leading-relaxed">
                    <strong>Kış bahçesi fiyatları</strong>, birçok faktöre bağlı olarak değişir. Kullanılan cam kalitesi, 
                    alüminyum profil markası, ısıcam sistemi, motorlu veya manuel açılım seçenekleri fiyatı etkileyen ana unsurlardır. 
                    Kaliteli markaların (Schüco, Reynaers gibi) kullanılması, uzun vadede daha ekonomik ve dayanıklı bir yatırım sağlar.
                  </p>

                  <p className="leading-relaxed">
                    Ortalama bir kış bahçesi m2 fiyatı, projenin özelliklerine göre farklılık gösterir. Ücretsiz keşif ve teklif hizmeti 
                    ile bütçenize uygun en iyi çözümü bulabilirsiniz. Fiyat karşılaştırması yaparken, sadece maliyet değil, 
                    aynı zamanda garanti süresi, servis hizmetleri ve kullanılan malzemelerin kalitesini de göz önünde bulundurmalısınız.
                  </p>

                  <h3 className="text-2xl font-bold text-gray-900">
                    Kış Bahçesi Modelleri ve Özellikleri
                  </h3>
                  
                  <p className="leading-relaxed">
                    <strong>Kış bahçesi modelleri</strong>, kullanım amacına ve estetik beklentilere göre çeşitlilik gösterir:
                  </p>

                  <ul className="ml-6 space-y-2 list-disc text-gray-700">
                    <li><strong>Klasik Kış Bahçesi:</strong> Geleneksel tasarım, geniş cam yüzeyler, sabit tavan yapısı</li>
                    <li><strong>Modern Kış Bahçesi:</strong> Minimal çizgiler, ince profiller, şık görünüm</li>
                    <li><strong>Bioklimatik Kış Bahçesi:</strong> Açılır kapanır tavan, doğal havalandırma, akıllı kontrol</li>
                    <li><strong>Panoramik Kış Bahçesi:</strong> 180 derece cam yüzey, kesintisiz manzara</li>
                    <li><strong>Sürme Kış Bahçesi:</strong> Yan açılır sistemler, esnek kullanım</li>
                  </ul>

                  <h3 className="text-2xl font-bold text-gray-900">
                    Kış Bahçesi Modelleri Fiyatları Nasıl Belirlenir?
                  </h3>
                  
                  <p className="leading-relaxed">
                    <strong>Kış bahçesi modelleri fiyatları</strong>, seçilen modelin teknik özellikleri ile doğru orantılıdır. 
                    Bioklimatik sistemler, motorlu açılım mekanizmaları ve akıllı kontrol sistemleri içerdiği için klasik modellere 
                    göre daha yüksek maliyetlidir. Ancak enerji tasarrufu, konfor ve uzun ömürlü kullanım açısından değerlendirildiğinde 
                    en avantajlı seçeneklerdir.
                  </p>

                  <p className="leading-relaxed">
                    Model seçerken dikkat edilmesi gerekenler:
                  </p>

                  <ul className="ml-6 space-y-2 list-disc text-gray-700">
                    <li>Alanın metrekaresi ve geometrik yapısı</li>
                    <li>İklim koşulları ve rüzgar yükü</li>
                    <li>Kullanım amacı (konut, restoran, kafe vb.)</li>
                    <li>Isı yalıtımı ve enerji verimliliği</li>
                    <li>Bakım kolaylığı ve garanti şartları</li>
                  </ul>

                  <h3 className="text-2xl font-bold text-gray-900">
                    Bioklimatik Sistemler: Gelecek Nesil Kış Bahçesi
                  </h3>
                  
                  <p className="leading-relaxed">
                    <strong>Bioklimatik</strong> sistemler, modern teknoloji ve doğal havalandırmanın bir araya geldiği en gelişmiş 
                    kış bahçesi çözümüdür. Açılır kapanır alüminyum lameller sayesinde hava sirkülasyonu, ışık geçirgenliği ve 
                    sıcaklık kontrolü otomatik olarak ayarlanabilir. Bu sistemler, yaz aylarında gölgelendirme, kış aylarında ise 
                    ısı yalıtımı sağlayarak dört mevsim konfor sunar.
                  </p>

                  <p className="leading-relaxed">
                    Bioklimatik kış bahçesi avantajları:
                  </p>

                  <ul className="ml-6 space-y-2 list-disc text-gray-700">
                    <li>Akıllı sensörler ile otomatik kontrol (rüzgar, yağmur, güneş)</li>
                    <li>Enerji tasarrufu ve çevre dostu kullanım</li>
                    <li>Uzaktan kumanda ve mobil uygulama desteği</li>
                    <li>%100 su geçirmezlik ve dayanıklılık</li>
                    <li>Estetik ve modern görünüm</li>
                    <li>10 yıla kadar garanti süresi</li>
                  </ul>

                  <h3 className="text-2xl font-bold text-gray-900">
                    Kış Bahçesi Montajı ve Bakımı
                  </h3>
                  
                  <p className="leading-relaxed">
                    Profesyonel montaj hizmeti, kış bahçenizin uzun ömürlü ve sorunsuz çalışmasının temelidir. 
                    Deneyimli ekipler tarafından yapılan montaj, su sızıntısı, yalıtım problemleri ve mekanik arızaların önüne geçer. 
                    Montaj sonrası periyodik bakım hizmetleri ile sisteminizin performansı korunur ve garanti kapsamınız devam eder.
                  </p>

                  <p className="leading-relaxed">
                    Düzenli bakım kapsamında; cam temizliği, profil yağlaması, conta kontrolü, motor ve mekanizma ayarları yapılır. 
                    Yılda en az bir kez profesyonel bakım yaptırmak, kış bahçenizin değerini korur ve ömrünü uzatır.
                  </p>

                  <h3 className="text-2xl font-bold text-gray-900">
                    Neden Bizimle Çalışmalısınız?
                  </h3>
                  
                  <p className="leading-relaxed">
                    15 yıllık sektör tecrübemiz, uluslararası kalite standartlarına uygun malzemeler, profesyonel montaj ekibi ve 
                    müşteri memnuniyeti odaklı hizmet anlayışımızla kış bahçesi projelerinizde güvenilir çözüm ortağınızız. 
                    Ücretsiz keşif, detaylı proje çizimi, şeffaf fiyatlandırma ve 10 yıla kadar garanti ile hizmetinizdeyiz.
                  </p>

                  <p className="leading-relaxed">
                    <strong>Kış bahçesi</strong> projeniz için bugün iletişime geçin, hayalinizdeki yaşam alanını birlikte tasarlayalım.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Read More Button */}
          <div className="mt-8 flex justify-center">
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-2 rounded-xl border-2 border-[#0d4c4a] px-8 py-3 text-sm font-semibold text-[#0d4c4a] transition-all hover:bg-[#0d4c4a] hover:text-white"
            >
              {isExpanded ? (
                <>
                  Daha Az Göster
                  <ChevronUp className="h-5 w-5 transition-transform group-hover:translate-y-0.5" />
                </>
              ) : (
                <>
                  Devamını Oku
                  <ChevronDown className="h-5 w-5 transition-transform group-hover:translate-y-0.5" />
                </>
              )}
            </motion.button>
          </div>
        </article>
      </div>
    </section>
  );
}

