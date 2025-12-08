# Localhost Kurulum Rehberi

## Sorun
Localhost'ta (`http://localhost:3000/admin/projects`) projeler görünmüyor çünkü environment variables ayarlanmamış.

## Çözüm

### 1. `.env.local` Dosyası Oluşturun

Proje klasörünüzde (kisbahcesi klasöründe) `.env.local` dosyası oluşturun:

**Windows'ta:**
```bash
# PowerShell veya CMD'de:
cd C:\Users\A\Desktop\kisbahcesi
notepad .env.local
```

**İçeriği:**
```env
DB_HOST=5.39.8.160
DB_USER=vipkisba_vip
DB_PASSWORD=Ciko5744**
DB_NAME=vipkisba_bahce
NODE_ENV=development
```

### 2. Development Server'ı Yeniden Başlatın

Environment variables değişikliklerinin yüklenmesi için:

1. Terminal'de `Ctrl+C` ile server'ı durdurun
2. Tekrar başlatın:
```bash
npm run dev
```

### 3. Test Edin

1. `http://localhost:3000/admin/projects` sayfasına gidin
2. Konsolu açın (F12)
3. Artık projeler görünmeli

## Önemli Notlar

- ✅ `.env.local` dosyası `.gitignore`'da olduğu için Git'e commit edilmeyecek (güvenli)
- ✅ Vercel'de environment variables ayrıca ayarlanmalı (VERCEL_ENV_SETUP.md'ye bakın)
- ✅ Localhost'ta test ederken uzak veritabanına bağlanıyorsunuz (5.39.8.160)

## Sorun Devam Ederse

1. `.env.local` dosyasının doğru yerde olduğundan emin olun (proje root'unda)
2. Server'ı yeniden başlatın
3. Konsolda (F12) hata mesajlarını kontrol edin
4. Test endpoint'ini deneyin: `http://localhost:3000/api/admin/projects/test`






