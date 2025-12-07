# Veritabanı Bağlantı Kontrolü

## Sorun
Admin panelinde projeler görünmüyor ve konsolda "Veritabanı bağlantısı kurulamadı" hatası alınıyor.

## Çözüm Adımları

### 1. Environment Variables Kontrolü

`.env.local` dosyasını kontrol edin veya oluşturun:

```env
DB_HOST=5.39.8.160
DB_USER=vipkisba_vip
DB_PASSWORD=Ciko5744**
DB_NAME=vipkisba_bahce
NODE_ENV=development
```

**Önemli:** 
- Localhost'ta çalışıyorsanız ve veritabanı uzak sunucudaysa `DB_HOST=5.39.8.160` kullanın
- Eğer veritabanı localhost'ta ise `DB_HOST=localhost` veya `DB_HOST=127.0.0.1` kullanın

### 2. Veritabanı Bağlantı Testi

Tarayıcıda şu URL'yi açın:
```
http://localhost:3000/api/admin/projects/test
```

Bu endpoint size şunları gösterecek:
- Veritabanı bağlantısı başarılı mı?
- Projects tablosu var mı?
- Kaç proje var?

### 3. Vercel Environment Variables

Eğer Vercel'de deploy ediyorsanız, Vercel dashboard'da şu environment variables'ları ekleyin:

```
DB_HOST=5.39.8.160
DB_USER=vipkisba_vip
DB_PASSWORD=Ciko5744**
DB_NAME=vipkisba_bahce
```

### 4. Veritabanı Sunucusu Kontrolü

Veritabanı sunucusunun:
- ✅ Çalıştığından emin olun
- ✅ 3306 portunun açık olduğundan emin olun
- ✅ Uzak bağlantılara izin verdiğinden emin olun
- ✅ Firewall'un MySQL portunu engellemediğinden emin olun

### 5. Hosting IP Kontrolü

Eğer `5.39.8.160` IP'si çalışmıyorsa, hosting sağlayıcınızdan doğru IP adresini alın.

### 6. Alternatif: Localhost Test

Eğer localhost'ta MySQL çalışıyorsa:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=vipkisba_bahce
```

## Debug İçin

Konsolda (F12) şu bilgileri kontrol edin:
- API response'da `error` ve `errorCode` alanlarına bakın
- `dbConfig` bilgilerini kontrol edin

## Hızlı Test

Admin panelinde `/admin/projects` sayfasına gidin ve konsolu açın (F12). 
API response'da detaylı hata mesajı göreceksiniz.




