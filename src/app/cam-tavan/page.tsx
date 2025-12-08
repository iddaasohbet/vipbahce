"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Phone, ChevronDown, Shield, Award, Sparkles, Leaf, Sun, Droplets, X, Layers } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Cam tavan kategorisindeki proje görselleri
const camTavanProjects = [
  { 
    src: "/images/projects/94ceb7d1-7e61-4612-bf9c-6a2623cd45fe.jpg", 
    title: "Modern Cam Tavan",
    alt: "Modern tasarım cam tavan projesi"
  },
  { 
    src: "/images/projects/a2a54c7a-f684-47ad-861a-3b5c02a4fd94.jpg", 
    title: "Panoramik Cam Tavan",
    alt: "Panoramik görünümlü cam tavan"
  },
  { 
    src: "/images/projects/a77c368b-8476-4a92-a01c-6c08f705b980.jpg", 
    title: "Villa Cam Tavan",
    alt: "Villa için özel tasarım cam tavan"
  },
  { 
    src: "/images/projects/cf3777cd-a53c-44d5-aa2b-f0562621a607.jpg", 
    title: "Lüks Cam Tavan",
    alt: "Lüks cam tavan projesi"
  },
  { 
    src: "/images/projects/df5971d9-c105-4b7e-bbe5-17f182ae8bc8.jpg", 
    title: "Bahçe Entegrasyonlu Cam Tavan",
    alt: "Bahçe ile entegre cam tavan"
  },
  { 
    src: "/images/projects/e327a0bb-698e-448b-94e1-126291cb38be.jpg", 
    title: "Premium Cam Tavan",
    alt: "Premium kalite cam tavan sistemi"
  },
];

const advantages = [
  {
    image: "/images/projects/94ceb7d1-7e61-4612-bf9c-6a2623cd45fe.jpg",
    imageAlt: "Modern cam tavan tasarımı",
    title: "Doğal Işık ve Görünüm",
    content: "Cam tavan sisteminiz, iç mekanınıza bol doğal ışık sağlar ve gökyüzünü izleme imkanı sunar. Modern mimaride şık ve estetik bir görünüm yaratır. Geniş cam yüzeyler sayesinde mekanınız daha ferah ve aydınlık görünür. Cam tavan modelleri arasından size en uygun olanını seçebilirsiniz.",
    keywords: ["cam tavan", "cam tavan modelleri"]
  },
  {
    image: "/images/projects/a2a54c7a-f684-47ad-861a-3b5c02a4fd94.jpg",
    imageAlt: "Panoramik cam tavan görünümü",
    title: "Modern ve Şık Tasarım",
    content: "Cam tavan sisteminiz, modern mimariye uyumlu, şık ve estetik bir tasarıma sahip olur. İç mekanınızı genişletir ve ferah bir atmosfer yaratır. Profesyonel tasarım ekibimiz, projenizi baştan sona planlar ve size özel çözümler sunar. Cam tavan sistemleri ile yaşam alanlarınızı dönüştürün.",
    keywords: ["cam tavan", "cam tavan sistemleri"]
  },
  {
    image: "/images/projects/cf3777cd-a53c-44d5-aa2b-f0562621a607.jpg",
    imageAlt: "Lüks cam tavan iç mekan",
    title: "Enerji Verimliliği",
    content: "Isı yalıtımlı cam tavan sistemlerimiz sayesinde enerji tasarrufu sağlarsınız. Çift cam veya izolasyonlu cam seçenekleriyle kış aylarında ısı kaybını minimuma indirirsiniz. Modern teknoloji ile üretilmiş cam tavan sistemleri, uzun vadede size tasarruf sağlar. Cam tavan firmaları arasında kaliteli hizmet sunuyoruz.",
    keywords: ["cam tavan", "cam tavan firmaları"]
  },
  {
    image: "/images/projects/df5971d9-c105-4b7e-bbe5-17f182ae8bc8.jpg",
    imageAlt: "Bahçe entegrasyonlu cam tavan",
    title: "Yaşam Kalitesini Artırır",
    content: "Cam tavan sisteminiz, yaşam kalitenizi önemli ölçüde artırır. Doğal ışık sayesinde daha sağlıklı bir yaşam alanı yaratır. Gökyüzünü izleme imkanı sunarak iç mekanınızı dışarıya bağlar. Modern ve bakımlı görünümüyle mekanınızın çekiciliğini artırır.",
    keywords: ["cam tavan"]
  },
];

const faqData = [
  {
    question: "Cam tavan fiyatları ne kadar?",
    answer: "Cam tavan fiyatları, projenin büyüklüğüne, kullanılan cam tipine, alüminyum profil kalitesine ve özel tasarım gereksinimlerine göre değişiklik gösterir. Standart bir cam tavan için fiyat aralığı 30.000 TL ile 150.000 TL arasında değişebilir. Detaylı fiyat teklifi için ücretsiz keşif hizmetimizden yararlanabilirsiniz.",
  },
  {
    question: "Cam tavan montajı ne kadar sürer?",
    answer: "Montaj süresi, projenin büyüklüğüne ve karmaşıklığına bağlı olarak 1-2 hafta arasında değişir. Standart bir cam tavan montajı genellikle 1 hafta içinde tamamlanır. Özel tasarım projelerde bu süre biraz daha uzayabilir.",
  },
  {
    question: "Cam tavan hangi malzemelerden yapılır?",
    answer: "Cam tavanlarımız, 6063-T6 alaşımlı özel ekstrüzyon alüminyum profillerden üretilir. Cam olarak temperli cam, çift cam (izolasyonlu) veya lamine cam kullanılır. Tüm malzemelerimiz TSE ve CE belgeli, 25 yıl garanti kapsamındadır.",
  },
  {
    question: "Cam tavan izolasyonlu mu?",
    answer: "Evet, tüm cam tavan sistemlerimiz ısı yalıtımlı cam sistemleri ve alüminyum profillerle üretilir. Bu sayede kış aylarında ısı kaybı minimuma iner ve enerji tasarrufu sağlanır.",
  },
  {
    question: "Cam tavan için ruhsat gerekir mi?",
    answer: "Cam tavan için genellikle ruhsat gerekmez, ancak belediyenizin düzenlemelerine göre değişiklik gösterebilir. Projeniz için gerekli tüm izin ve ruhsat işlemlerinde size yardımcı oluyoruz.",
  },
  {
    question: "Cam tavan bakımı nasıl yapılır?",
    answer: "Alüminyum profillerin bakımı çok kolaydır. Düzenli olarak su ve sabunlu bezle temizlenmesi yeterlidir. Cam yüzeyler için cam temizleyici kullanabilirsiniz. Yılda bir kez profesyonel bakım önerilir.",
  },
];

export default function CamTavanPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const openProjectModal = (index: number) => {
    setSelectedProject(index);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
  };

  // ESC tuşu ile modal'ı kapat
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedProject !== null) {
        closeProjectModal();
      }
    };

    if (selectedProject !== null) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Cam Tavan Sistemleri",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Cam Tavan",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "İstanbul",
        "addressCountry": "TR"
      },
      "telephone": "+905333593466"
    },
    "areaServed": {
      "@type": "City",
      "name": "İstanbul"
    },
    "description": "İstanbul'da profesyonel cam tavan sistemleri. Modern tasarım, kaliteli malzeme, uzman montaj ekibi.",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="bg-white">
        <Header />
        
        <main className="min-h-screen pt-24">
          {/* Hero Section */}
          <section className="relative isolate overflow-hidden bg-gradient-to-br from-teal-50 via-white to-cyan-50 pt-8 pb-16 md:pt-16 md:pb-24">
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#0d4c4a08_1px,transparent_1px),linear-gradient(to_bottom,#0d4c4a08_1px,transparent_1px)] bg-[size:64px_64px]" />
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -left-1/4 top-0 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-teal-200/30 to-cyan-300/20 blur-[120px]"
              />
              <motion.div
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.1, 0.15, 0.1],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -right-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-l from-cyan-200/20 to-teal-300/15 blur-[100px]"
              />
            </div>

            <div className="mx-auto max-w-7xl px-4 md:px-6">
              <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mb-6 inline-block rounded-full bg-teal-100 px-4 py-1.5 text-sm font-medium text-teal-800"
                  >
                    Premium Cam Tavan Sistemleri
                  </motion.div>
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl leading-tight"
                  >
                    Hayalinizdeki{" "}
                    <span className="bg-gradient-to-r from-teal-900 via-teal-800 to-teal-900 bg-clip-text text-transparent">
                      Cam Tavan
                    </span>{" "}
                    Burada
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mb-8 text-lg leading-relaxed text-gray-700 md:text-xl"
                  >
                    15+ yıllık tecrübemiz ve 2500+ tamamlanan projemizle, mekanınıza değer katacak modern cam tavan sistemleri sunuyoruz. Profesyonel tasarım, kaliteli malzeme ve uzman montaj ekibimizle hayalinizdeki yaşam alanını gerçeğe dönüştürüyoruz.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <Link
                      href="https://wa.me/905333593466?text=Cam%20tavan%20hakkında%20bilgi%20almak%20istiyorum"
                      target="_blank"
                      className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-teal-800 to-teal-900 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105"
                    >
                      <Phone className="h-5 w-5" />
                      Ücretsiz Keşif
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link
                      href="/teklif-al"
                      className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-teal-900 bg-white px-8 py-4 font-semibold text-teal-900 transition-all hover:bg-teal-50"
                    >
                      Teklif Alın
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl">
                    <Image
                      src="/images/projects/94ceb7d1-7e61-4612-bf9c-6a2623cd45fe.jpg"
                      alt="Modern Cam Tavan"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </div>
                  {/* Decorative elements */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-6 -right-6 hidden lg:block"
                  >
                    <div className="rounded-2xl bg-white p-4 shadow-xl border border-teal-100">
                      <Award className="h-8 w-8 text-teal-900" />
                    </div>
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute -bottom-6 -left-6 hidden lg:block"
                  >
                    <div className="rounded-2xl bg-white p-4 shadow-xl border border-teal-100">
                      <Shield className="h-8 w-8 text-teal-900" />
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
            <div className="mx-auto max-w-7xl px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16 text-center"
              >
                <span className="mb-4 inline-block rounded-full bg-teal-100 px-4 py-1.5 text-sm font-medium text-teal-800">
                  Özellikler
                </span>
                <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                  Neden Cam Tavan?
                </h2>
                <p className="mx-auto max-w-2xl text-lg text-gray-600">
                  Cam tavanınız, mekanınıza değer katan ve yaşam kalitenizi artıran özel bir alan
                </p>
              </motion.div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {[
                  { icon: Sun, title: "Doğal Işık", desc: "Bol doğal ışık ile aydınlık mekanlar" },
                  { icon: Layers, title: "Modern Tasarım", desc: "Şık ve estetik görünüm" },
                  { icon: Droplets, title: "Enerji Tasarrufu", desc: "Isı yalıtımlı sistemlerle tasarruf" },
                  { icon: Sparkles, title: "Değer Artışı", desc: "Mekanınızın değerini artırır" },
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group rounded-2xl bg-white p-6 transition-all border-2 border-gray-200 hover:border-teal-300"
                  >
                    <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-teal-50 to-cyan-50 p-3 text-teal-900 group-hover:scale-110 transition-transform">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Content Sections - Image Left, Text Right */}
          {advantages.map((advantage, index) => (
            <section
              key={advantage.title}
              className={`py-16 md:py-24 ${index % 2 === 0 ? "bg-white" : "bg-gradient-to-br from-gray-50 to-white"}`}
            >
              <div className="mx-auto max-w-7xl px-4 md:px-6">
                <div className={`grid gap-12 lg:grid-cols-2 lg:gap-16 items-center ${
                  index % 2 === 1 ? "lg:grid-flow-dense" : ""
                }`}>
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className={index % 2 === 1 ? "lg:col-start-2" : ""}
                  >
                    <div className="group relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl">
                      <Image
                        src={advantage.image}
                        alt={advantage.imageAlt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {/* Decorative border */}
                      <div className="absolute inset-0 rounded-3xl border-2 border-white/20" />
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className={index % 2 === 1 ? "lg:col-start-1" : ""}
                  >
                    <div className="mb-4 inline-block rounded-full bg-teal-100 px-3 py-1 text-xs font-medium text-teal-800">
                      {index + 1}. Avantaj
                    </div>
                    <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
                      {advantage.title}
                    </h2>
                    <p className="text-lg leading-relaxed text-gray-700 md:text-xl">
                      {advantage.keywords ? advantage.content.split(new RegExp(`(${advantage.keywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi')).map((part, i) => {
                        const isKeyword = advantage.keywords?.some(k => part.toLowerCase() === k.toLowerCase());
                        return isKeyword ? <strong key={i}>{part}</strong> : <span key={i}>{part}</span>;
                      }) : advantage.content}
                    </p>
                    {index === advantages.length - 1 && (
                      <div className="mt-8">
                        <Link
                          href="/teklif-al"
                          className="inline-flex items-center gap-2 rounded-full bg-teal-900 px-6 py-3 font-semibold text-white transition-all hover:bg-teal-800 hover:scale-105"
                        >
                          Hemen Teklif Alın
                          <ArrowRight className="h-5 w-5" />
                        </Link>
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>
            </section>
          ))}

          {/* SEO Content Section */}
          <section className="py-16 md:py-24 bg-white">
            <div className="mx-auto max-w-7xl px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="prose prose-lg max-w-none"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6 md:text-4xl">
                  Cam Tavan: Modern Mimarinin Vazgeçilmezi
                </h2>
                
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p className="text-lg">
                    <strong>Cam tavan</strong>, modern mimaride iç mekanları aydınlatan ve gökyüzünü izleme imkanı sunan özel tasarım yapılardır. 
                    <strong> Cam tavan fiyatları</strong>, projenin büyüklüğü, kullanılan cam tipi ve tasarım özelliklerine göre değişiklik gösterir. 
                    Kaliteli bir <strong>cam tavan sistemi</strong>, mekanınıza değer katar ve yaşam kalitenizi artırır. İstanbul'un Sarıyer, Bahçeşehir, Beykoz, Şile, Büyükçekmece, Florya, Silivri, Tuzla, Çekmeköy ve Kurtköy gibi bölgelerinde profesyonel <strong>cam tavan firmaları</strong> arasında yer alıyoruz.
                  </p>

                  <p>
                    <strong>Cam tavan modelleri</strong> arasında düz cam tavan, eğimli cam tavan ve panoramik cam tavan tasarımlar yer alır. 
                    Her model, farklı ihtiyaçlara ve zevklere hitap eder. <strong>Cam tavan modelleri fiyatları</strong> ise 
                    seçtiğiniz modelin özelliklerine, boyutlarına ve ekstra donanımlarına göre belirlenir. <strong>Kış bahçesi cam tavan</strong> sistemleri de çözümlerimiz arasında yer alır.
                  </p>

                  <p>
                    <strong>Sarıyer cam tavan</strong>, <strong>Bahçeşehir cam tavan</strong>, <strong>Beykoz cam tavan</strong>, <strong>Şile cam tavan</strong>, <strong>Büyükçekmece cam tavan</strong>, <strong>Florya cam tavan</strong>, <strong>Silivri cam tavan</strong>, <strong>Tuzla cam tavan</strong>, <strong>Çekmeköy cam tavan</strong>, <strong>Kurtköy cam tavan</strong> projelerimizle İstanbul genelinde hizmet veriyoruz. Ayrıca <strong>Tekirdağ cam tavan</strong>, <strong>Kayseri cam tavan</strong>, <strong>Kocaeli cam tavan</strong> ve <strong>Bodrum cam tavan</strong> projelerimizle Türkiye'nin farklı şehirlerinde de hizmetinizdeyiz.
                  </p>

                  <p>
                    <strong>Cam tavan sistemleri</strong> ile modern ve şık bir yaşam alanı yaratabilirsiniz. Isı yalıtımlı cam seçenekleriyle enerji tasarrufu sağlarken, doğal ışık sayesinde daha sağlıklı bir ortam yaratırsınız.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Projects Gallery */}
          <section className="py-16 md:py-24 bg-gradient-to-b from-white via-gray-50 to-white">
            <div className="mx-auto max-w-7xl px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16 text-center"
              >
                <span className="mb-4 inline-block rounded-full bg-teal-100 px-4 py-1.5 text-sm font-medium text-teal-800">
                  Portföyümüz
                </span>
                <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
                  Tamamlanan Projelerimiz
                </h2>
                <p className="mx-auto max-w-2xl text-lg text-gray-600 md:text-xl">
                  15+ yıllık tecrübemizle tamamladığımız başarılı cam tavan projelerinden örnekler
                </p>
              </motion.div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {camTavanProjects.map((project, index) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative overflow-hidden rounded-3xl bg-gray-100 shadow-xl transition-all hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
                    onClick={() => openProjectModal(index)}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={project.src}
                        alt={project.alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 border-2 border-teal-500/0 group-hover:border-teal-500/50 rounded-3xl transition-all duration-300" />
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="mt-16 text-center"
              >
                <Link
                  href="/galeri"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-800 to-teal-900 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105"
                >
                  Tüm Projeleri İnceleyin
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>
          </section>

          {/* Project Modal */}
          <AnimatePresence>
            {selectedProject !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                onClick={closeProjectModal}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="relative max-w-6xl w-full max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close Button */}
                  <button
                    onClick={closeProjectModal}
                    className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-gray-900 shadow-lg transition-all hover:bg-white hover:scale-110"
                    aria-label="Kapat"
                  >
                    <X className="h-6 w-6" />
                  </button>

                  {/* Image */}
                  <div className="relative w-full h-[90vh] bg-gray-100">
                    <Image
                      src={camTavanProjects[selectedProject].src}
                      alt={camTavanProjects[selectedProject].alt}
                      fill
                      className="object-contain"
                      sizes="100vw"
                      priority
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* FAQ Section */}
          <section className="py-16 md:py-24 bg-gradient-to-b from-white via-teal-50/30 to-white">
            <div className="mx-auto max-w-4xl px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16 text-center"
              >
                <span className="mb-4 inline-block rounded-full bg-teal-100 px-4 py-1.5 text-sm font-medium text-teal-800">
                  SSS
                </span>
                <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
                  Sıkça Sorulan Sorular
                </h2>
                <p className="mx-auto max-w-2xl text-lg text-gray-600 md:text-xl">
                  Cam tavan hakkında merak ettikleriniz ve cevapları
                </p>
              </motion.div>

              <div className="space-y-4">
                {faqData.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <motion.div
                      key={faq.question}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className="group overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-xl border border-gray-100 hover:border-teal-200"
                    >
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full px-6 py-5 text-left transition-colors hover:bg-gradient-to-r hover:from-teal-50/50 hover:to-transparent md:px-8 md:py-6"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-start gap-4 flex-1">
                            <div className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                              isOpen ? "bg-teal-900 text-white" : "bg-teal-100 text-teal-900 group-hover:bg-teal-200"
                            }`}>
                              <span className="text-sm font-bold">{index + 1}</span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 md:text-xl pr-8">
                              {faq.question}
                            </h3>
                          </div>
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex-shrink-0"
                          >
                            <ChevronDown className={`h-6 w-6 transition-colors ${isOpen ? "text-teal-900" : "text-teal-600"}`} />
                          </motion.div>
                        </div>
                      </button>
                      
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-5 md:px-8 md:pb-6 ml-12">
                              <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent mb-5" />
                              <p className="text-gray-700 leading-relaxed md:text-lg">
                                {faq.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>

              {/* Additional CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="mt-16 rounded-3xl bg-gradient-to-br from-teal-900 via-teal-800 to-teal-900 p-8 md:p-12 text-center shadow-2xl relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px]" />
                <div className="relative z-10">
                  <div className="mb-4 inline-flex rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
                    <Phone className="mr-2 h-4 w-4" />
                    Hemen İletişime Geçin
                  </div>
                  <h3 className="mb-3 text-2xl font-bold text-white md:text-3xl">
                    Sorunuz mu var?
                  </h3>
                  <p className="mb-6 text-teal-100 md:text-lg">
                    Aradığınız cevabı bulamadınız mı? Bizimle iletişime geçin, size yardımcı olalım.
                  </p>
                  <Link
                    href="https://wa.me/905333593466?text=Cam%20tavan%20hakkında%20soru%20sormak%20istiyorum"
                    target="_blank"
                    className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-teal-900 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                  >
                    <Phone className="h-5 w-5" />
                    Bize Ulaşın
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="relative py-20 md:py-28 bg-gradient-to-br from-teal-900 via-teal-800 to-teal-900 overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px]" />
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -left-1/4 top-0 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-white/10 to-transparent blur-[120px]"
              />
              <motion.div
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.1, 0.15, 0.1],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -right-1/4 bottom-0 h-[500px] w-[500px] rounded-full bg-gradient-to-l from-white/10 to-transparent blur-[100px]"
              />
            </div>

            <div className="relative mx-auto max-w-5xl px-4 text-center md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mb-6 inline-flex rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Hayalinizdeki Yaşam Alanı
                </motion.div>
                <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                  Hayalinizdeki Cam Tavana{" "}
                  <span className="bg-gradient-to-r from-white via-teal-100 to-white bg-clip-text text-transparent">
                    Kavuşun
                  </span>
                </h2>
                <p className="mb-10 text-lg text-teal-100 md:text-xl max-w-2xl mx-auto">
                  Ücretsiz keşif ve fiyat teklifi için hemen bizimle iletişime geçin. 
                  Uzman ekibimiz size en uygun çözümü sunacaktır.
                </p>
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Link
                    href="https://wa.me/905333593466?text=Cam%20tavan%20hakkında%20bilgi%20almak%20istiyorum"
                    target="_blank"
                    className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-teal-800 shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
                  >
                    <Phone className="h-5 w-5" />
                    Ücretsiz Keşif
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/teklif-al"
                    className="group inline-flex items-center gap-2 rounded-full border-2 border-white/40 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/60"
                  >
                    Teklif Alın
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}








