# Production Deployment Rehberi

## Veritabanı Kurulumu (Production)

### 1. Veritabanı Bilgilerini Alın

Hosting panelinizden (cPanel, Plesk vb.) veritabanı bilgilerinizi alın:
- **Host:** Genellikle `localhost` değildir, örnek: `mysql.yourhosting.com` veya `123.45.67.89`
- **Kullanıcı:** `vipkisba_vip`
- **Şifre:** `Ciko5744**`
- **Veritabanı Adı:** `vipkisba_bahce`

### 2. Veritabanını Oluşturun

1. phpMyAdmin'e giriş yapın
2. `database.sql` dosyasını içe aktarın (Import)
3. Veya SQL sekmesinde `database.sql` içeriğini çalıştırın

### 3. Environment Variables Ayarlayın

Production sunucunuzda `.env.local` dosyası oluşturun:

```env
DB_HOST=mysql.yourhosting.com
DB_USER=vipkisba_vip
DB_PASSWORD=Ciko5744**
DB_NAME=vipkisba_bahce
NODE_ENV=production
```

**ÖNEMLİ:** 
- `DB_HOST` değerini hosting sağlayıcınızdan öğrenin
- `.env.local` dosyasını asla Git'e commit etmeyin (zaten .gitignore'da)

### 4. Vercel/Netlify Deploy İçin

Eğer Vercel veya Netlify kullanıyorsanız:

1. Dashboard'a gidin
2. Project Settings > Environment Variables
3. Şu değişkenleri ekleyin:
   - `DB_HOST`
   - `DB_USER`
   - `DB_PASSWORD`
   - `DB_NAME`
   - `NODE_ENV=production`

### 5. Test Edin

Deploy sonrası şu endpoint'i test edin:
```
https://yourdomain.com/api/admin/test-db
```

Başarılı olursa:
- ✅ Veritabanı bağlantısı çalışıyor
- ✅ Admin panel kullanılabilir

### 6. İlk Giriş

Production'da ilk giriş:
- **Kullanıcı adı:** `admin`
- **Şifre:** `admin123`

**GÜVENLİK:** İlk girişten sonra şifreyi değiştirin!

## Localhost'ta Test (Opsiyonel)

Eğer localhost'ta da test etmek isterseniz:

### Windows:
1. XAMPP veya WAMP kurun
2. MySQL servisini başlatın
3. phpMyAdmin'den veritabanı oluşturun
4. `database.sql` dosyasını çalıştırın

### Mac:
```bash
brew install mysql
brew services start mysql
mysql -u root -p
CREATE DATABASE vipkisba_bahce;
# Sonra database.sql dosyasını çalıştırın
```

### Linux:
```bash
sudo apt-get install mysql-server
sudo systemctl start mysql
mysql -u root -p
CREATE DATABASE vipkisba_bahce;
# Sonra database.sql dosyasını çalıştırın
```

## Sorun Giderme

### "ECONNREFUSED" Hatası
- MySQL servisi çalışmıyor
- Port 3306 kapalı
- Host bilgisi yanlış

### "Access Denied" Hatası
- Kullanıcı adı/şifre yanlış
- Kullanıcının veritabanına erişim izni yok

### "Unknown Database" Hatası
- Veritabanı oluşturulmamış
- Veritabanı adı yanlış

## Güvenlik Kontrol Listesi

- [ ] Production'da şifreleri hash'leyin (bcrypt)
- [ ] `.env.local` dosyasını `.gitignore`'a ekleyin
- [ ] HTTPS kullanın
- [ ] Rate limiting ekleyin
- [ ] İlk girişten sonra varsayılan şifreyi değiştirin
- [ ] Düzenli yedekleme yapın












