# 🏡 Kış Bahçesi - Premium Sistemler

Modern ve şık kış bahçesi sistemleri için kurumsal web sitesi. Next.js 16, React 19, Tailwind CSS 4 ve Framer Motion ile geliştirilmiştir.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black)
![React](https://img.shields.io/badge/React-19.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)

## ✨ Özellikler

- 🎨 **Modern Tasarım** - Minimalist ve profesyonel arayüz
- 🚀 **Hızlı Performans** - Next.js 16 Turbopack ile optimize edilmiş
- 📱 **Responsive** - Tüm cihazlarda mükemmel görünüm
- ⚡ **Animasyonlar** - Framer Motion ile akıcı geçişler
- 🎬 **Galeri Sistemi** - Fotoğraf ve video lightbox
- 📝 **Teklif Formu** - Kolay iletişim sistemi
- 🎯 **SEO Optimize** - Arama motorları için optimize edilmiş
- 🌐 **Türkçe** - Tam Türkçe dil desteği

## 🛠️ Teknolojiler

- **Framework:** Next.js 16.0 (App Router)
- **UI Library:** React 19.2
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion 12.23
- **Icons:** Lucide React
- **Image Optimization:** Next/Image

## 📦 Kurulum

### Gereksinimler

- Node.js 18.17 veya üzeri
- npm veya yarn

### Adımlar

1. Repoyu klonlayın:
```bash
git clone https://github.com/kullaniciadi/kisbahcesi.git
cd kisbahcesi
```

2. Bağımlılıkları yükleyin:
```bash
npm install
# veya
yarn install
```

3. Geliştirme sunucusunu başlatın:
```bash
npm run dev
# veya
yarn dev
```

4. Tarayıcınızda açın: [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment

### Vercel (Önerilen)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/kullaniciadi/kisbahcesi)

1. Vercel hesabınıza giriş yapın
2. "Import Project" butonuna tıklayın
3. GitHub repository'sini seçin
4. Deploy edin!

### Production Build

```bash
npm run build
npm run start
```

## 📁 Proje Yapısı

```
kisbahcesi/
├── public/
│   ├── images/
│   │   └── projects/      # Proje görselleri
│   └── videos/            # Proje videoları
├── src/
│   ├── app/
│   │   ├── galeri/        # Galeri sayfası
│   │   ├── teklif-al/     # Teklif formu sayfası
│   │   ├── kis-bahcesi/   # Kış bahçesi sayfası
│   │   ├── bioklimatik/   # Bioklimatik sayfası
│   │   └── ...            # Diğer sayfalar
│   └── components/
│       ├── Header.tsx     # Ana navigasyon
│       ├── Hero.tsx       # Ana başlık
│       ├── Gallery.tsx    # Galeri komponenti
│       ├── Contact.tsx    # İletişim formu
│       ├── SplashScreen.tsx  # Giriş animasyonu
│       ├── ComingSoon.tsx # Yakında overlay (geçici)
│       └── ...            # Diğer komponentler
├── .gitignore
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 🎨 Özelleştirme

### Renk Teması

`src/app/globals.css` dosyasından renk paletini değiştirebilirsiniz:

```css
:root {
  --accent-green: #0d4c4a;
  --accent-green-light: #115e59;
  --accent-cream: #f5f1e8;
}
```

### İletişim Bilgileri

Tüm iletişim bilgilerini güncellemek için:
- `src/components/Header.tsx` - Telefon numarası
- `src/components/Footer.tsx` - Tüm iletişim bilgileri
- `src/components/Contact.tsx` - İletişim formu

### "Yakında Geliyoruz" Overlay'ini Kaldırma

`src/components/HomeContent.tsx` dosyasında:

```tsx
// Bu satırları silin:
import ComingSoon from "@/components/ComingSoon";
<ComingSoon />
```

## 📄 Sayfalar

- **Ana Sayfa** (`/`) - Hero, hizmetler, galeri, iletişim
- **Galeri** (`/galeri`) - Fotoğraf ve video galerisi
- **Teklif Al** (`/teklif-al`) - İletişim formu
- **Kış Bahçesi** (`/kis-bahcesi`) - Kış bahçesi bilgileri
- **Kış Bahçesi Fiyatları** (`/kis-bahcesi-fiyatlari`)
- **Kış Bahçesi Modelleri** (`/kis-bahcesi-modelleri`)
- **Model Fiyatları** (`/kis-bahcesi-modelleri-fiyatlari`)
- **Bioklimatik** (`/bioklimatik`) - Bioklimatik sistemler

## 🎬 Animasyonlar

Proje Framer Motion kullanarak şu animasyonları içerir:
- ✅ Splash screen (giriş animasyonu)
- ✅ Page transitions
- ✅ Scroll animasyonları
- ✅ Hover efektleri
- ✅ Lightbox galerisi
- ✅ Snake border animasyonları

## 📱 Responsive Tasarım

Tüm sayfalar mobil, tablet ve desktop için optimize edilmiştir:
- 📱 Mobile: 320px - 768px
- 📱 Tablet: 768px - 1024px
- 💻 Desktop: 1024px+

## 🔧 Geliştirme Komutları

```bash
# Geliştirme sunucusu (Turbopack ile)
npm run dev

# Production build
npm run build

# Production sunucusu
npm run start

# Linting
npm run lint
```

## 📝 Lisans

Bu proje özel bir projedir. Tüm hakları saklıdır.

## 🤝 İletişim

- **Website:** https://kisbahcesi.com
- **Email:** support@kisbahcesi.com
- **Telefon:** 0542 526 34 66
- **Adres:** İstanbul, Türkiye

---

⭐ **Beğendiyseniz yıldız vermeyi unutmayın!**

Made with ❤️ using Next.js & Tailwind CSS
