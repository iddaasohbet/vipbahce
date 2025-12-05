"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Award, Users, Wrench } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Kalite Garantisi",
    description: "Yüksek kaliteli malzemeler ve uzun ömürlü sistemler",
  },
  {
    icon: Users,
    title: "Uzman Ekip",
    description: "Alanında deneyimli ve sertifikalı profesyoneller",
  },
  {
    icon: Wrench,
    title: "Profesyonel Montaj",
    description: "Hızlı ve kusursuz montaj hizmeti",
  },
];

const benefits = [
  "Modern ve estetik tasarımlar",
  "Enerji verimli sistemler",
  "Uzun ömürlü dayanıklı malzemeler",
  "Ücretsiz keşif ve danışmanlık",
  "Rekabetçi fiyatlar",
  "Satış sonrası destek hizmeti",
];

export default function About() {
  return (
    <section id="hakkimizda" className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-4 inline-block rounded-full bg-green-100 px-4 py-1.5 text-sm font-medium text-green-700">
              Hakkımızda
            </span>
            <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
              Neden Bizi Tercih Etmelisiniz?
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-gray-600">
              Yılların deneyimi ve binlerce mutlu müşteri ile kış bahçesi sektöründe öncü konumdayız. 
              Modern tasarım anlayışımız, kaliteli malzemelerimiz ve uzman ekibimizle hayalinizdeki 
              yaşam alanını oluşturuyoruz.
            </p>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-green-600" />
                  <span className="text-gray-700">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-lg transition-all hover:shadow-xl"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-bold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300 group-hover:w-full" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}


