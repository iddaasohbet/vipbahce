# Veritabanı Bağlantı Sorunları ve Çözümleri

## Sorun: "Veritabanı bağlantı hatası: Bağlantı kurulamadı"

### Geçici Çözüm (Şu an çalışıyor)
Sistem şu anda veritabanı olmadan da çalışacak şekilde ayarlandı:
- **Kullanıcı adı:** `admin`
- **Şifre:** `admin123`

### Kalıcı Çözüm

#### 1. Veritabanı Bilgilerini Kontrol Edin

`.env.local` dosyası oluşturun (proje kök dizininde):

```env
DB_HOST=localhost
DB_USER=vipkisba_vip
DB_PASSWORD=Ciko5744**
DB_NAME=vipkisba_bahce
```

**ÖNEMLİ:** Shared hosting kullanıyorsanız:
- `DB_HOST` genellikle `localhost` değildir
- Hosting panelinizden veritabanı bilgilerini kontrol edin
- Genellikle şu formatta olur: `mysql.example.com` veya bir IP adresi

#### 2. Veritabanını Oluşturun

1. phpMyAdmin veya MySQL client ile veritabanınıza bağlanın
2. `database.sql` dosyasını çalıştırın
3. `admin_users` tablosunun oluşturulduğundan emin olun

#### 3. Veritabanı Bağlantısını Test Edin

Tarayıcıda şu adresi açın:
```
http://localhost:3000/api/admin/test-db
```

Bu endpoint size şunları gösterecek:
- Veritabanı bağlantısı durumu
- Tablo var mı?
- Kaç kullanıcı var?

#### 4. Yaygın Sorunlar ve Çözümleri

**Sorun 1: "ECONNREFUSED" hatası**
- MySQL sunucusu çalışmıyor olabilir
- Host bilgisi yanlış olabilir
- Port (varsayılan 3306) kapalı olabilir

**Sorun 2: "Access denied" hatası**
- Kullanıcı adı veya şifre yanlış
- Kullanıcının veritabanına erişim izni yok

**Sorun 3: "Unknown database" hatası**
- Veritabanı adı yanlış
- Veritabanı henüz oluşturulmamış

**Sorun 4: Shared Hosting'de bağlantı kurulamıyor**
- `DB_HOST` değerini hosting sağlayıcınızdan öğrenin
- Genellikle `localhost` yerine farklı bir hostname kullanılır
- Örnek: `mysql.yourhosting.com` veya `123.45.67.89`

#### 5. Localhost'ta MySQL Kurulumu

Eğer localhost'ta test ediyorsanız:

**Windows:**
- XAMPP veya WAMP kurun
- MySQL servisini başlatın
- phpMyAdmin'den veritabanı oluşturun

**Mac:**
```bash
brew install mysql
brew services start mysql
```

**Linux:**
```bash
sudo apt-get install mysql-server
sudo systemctl start mysql
```

#### 6. Veritabanı Bağlantısını Manuel Test Etme

Node.js ile test:
```javascript
const mysql = require('mysql2/promise');

async function test() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'vipkisba_vip',
      password: 'Ciko5744**',
      database: 'vipkisba_bahce'
    });
    console.log('Bağlantı başarılı!');
    await connection.end();
  } catch (error) {
    console.error('Hata:', error.message);
  }
}

test();
```

### Güvenlik Notu

⚠️ **ÖNEMLİ:** Production ortamında:
1. Şifreleri hash'leyin (bcrypt, argon2)
2. `.env.local` dosyasını `.gitignore`'a ekleyin
3. Veritabanı bilgilerini asla kod içine yazmayın
4. HTTPS kullanın
5. Rate limiting ekleyin







