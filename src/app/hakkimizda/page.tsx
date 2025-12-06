"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle2, Target, Eye, Heart, Award, Users, Clock, Wrench } from "lucide-react";

const stats = [
  { number: "15+", label: "Yıllık Tecrübe", icon: Clock },
  { number: "2500+", label: "Tamamlanan Proje", icon: Award },
  { number: "50+", label: "Uzman Ekip", icon: Users },
  { number: "98%", label: "Müşteri Memnuniyeti", icon: Heart },
];

const values = [
  {
    title: "Kalite",
    description: "En kaliteli malzemeler ve işçilikle kusursuz sonuçlar sunuyoruz.",
  },
  {
    title: "Güvenilirlik",
    description: "Verdiğimiz sözleri tutar, zamanında ve eksiksiz teslim ederiz.",
  },
  {
    title: "Müşteri Odaklılık",
    description: "Her projeyi müşterimizin ihtiyaçlarına özel tasarlıyoruz.",
  },
  {
    title: "Yenilikçilik",
    description: "Sektördeki en son teknolojileri ve trendleri takip ediyoruz.",
  },
];

export default function HakkimizdaPage() {
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
                Kurumsal
              </span>
              <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                Hakkımızda
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-teal-100 md:text-xl">
                15 yılı aşkın tecrübemizle kış bahçesi sektörünün öncü firmalarından biriyiz.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative -mt-12 z-10 mx-auto max-w-6xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="rounded-2xl bg-white p-6 text-center shadow-xl border border-gray-100"
              >
                <stat.icon className="mx-auto mb-3 h-8 w-8 text-teal-800" />
                <p className="text-3xl font-bold text-gray-900 md:text-4xl">{stat.number}</p>
                <p className="mt-1 text-sm text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* About Content */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
                  Kış Bahçesi Sektöründe <span className="text-teal-900">Güvenilir Çözüm Ortağınız</span>
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    2009 yılından bu yana kış bahçesi, bioklimatik pergola ve cam balkon sistemleri alanında 
                    hizmet vermekteyiz. Müşteri memnuniyetini ön planda tutarak, her projeye özel çözümler 
                    üretiyoruz.
                  </p>
                  <p>
                    Deneyimli ekibimiz, modern üretim tesislerimiz ve kaliteli malzemelerimizle 
                    Türkiye genelinde binlerce projeyi başarıyla tamamladık. Her bir projemizde 
                    estetik, dayanıklılık ve fonksiyonelliği bir arada sunuyoruz.
                  </p>
                  <p>
                    Amacımız, yaşam alanlarınızı dört mevsim keyifle kullanabileceğiniz, 
                    modern ve şık mekanlara dönüştürmektir.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid gap-6"
              >
                {/* Mission */}
                <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100">
                      <Target className="h-6 w-6 text-teal-900" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Misyonumuz</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Müşterilerimize en kaliteli malzeme ve işçilikle, bütçelerine uygun kış bahçesi 
                    çözümleri sunarak yaşam alanlarını zenginleştirmek.
                  </p>
                </div>

                {/* Vision */}
                <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100">
                      <Eye className="h-6 w-6 text-teal-900" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Vizyonumuz</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Türkiye'nin en güvenilir ve tercih edilen kış bahçesi markası olmak, 
                    sektörde yenilikçi çözümlerle öncü konumumuzu sürdürmek.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-gray-50 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Değerlerimiz
              </h2>
              <p className="mx-auto max-w-2xl text-gray-600">
                İş yapış şeklimizi belirleyen temel değerlerimiz
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-900 text-white">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-gray-900">{value.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Us Section */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Neden Bizi Tercih Etmelisiniz?
              </h2>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Award, title: "Kalite Garantisi", desc: "Kullandığımız tüm malzemeler TSE ve CE belgeli, en yüksek kalite standartlarına sahiptir." },
                { icon: Users, title: "Uzman Kadro", desc: "Alanında uzman mühendis ve teknisyenlerden oluşan deneyimli ekibimiz her zaman yanınızda." },
                { icon: Wrench, title: "Profesyonel Montaj", desc: "Kendi montaj ekiplerimizle hızlı, temiz ve kusursuz montaj hizmeti sunuyoruz." },
                { icon: Clock, title: "Zamanında Teslimat", desc: "Projelerinizi söz verdiğimiz sürede, eksiksiz teslim ediyoruz." },
                { icon: Heart, title: "Satış Sonrası Destek", desc: "Montaj sonrası da yanınızdayız. 7/24 teknik destek hattımız hizmetinizde." },
                { icon: Target, title: "Uygun Fiyat", desc: "Kaliteden ödün vermeden, bütçenize uygun çözümler sunuyoruz." },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-teal-100">
                    <item.icon className="h-6 w-6 text-teal-900" />
                  </div>
                  <div>
                    <h3 className="mb-2 font-bold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
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
                Hayalinizdeki Kış Bahçesi İçin Bize Ulaşın
              </h2>
              <p className="mb-8 text-teal-100">
                Ücretsiz keşif ve fiyat teklifi için hemen iletişime geçin.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/teklif-al"
                  className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 font-semibold text-teal-900 shadow-lg transition-all hover:bg-gray-100 hover:scale-105"
                >
                  Ücretsiz Teklif Alın
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

