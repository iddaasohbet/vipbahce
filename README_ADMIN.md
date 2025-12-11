# Admin Panel Kurulumu

## Veritabanı Kurulumu

1. Veritabanınızda `database.sql` dosyasını çalıştırın:
   ```sql
   -- phpMyAdmin veya MySQL client üzerinden çalıştırın
   ```

2. Varsayılan admin kullanıcı:
   - **Kullanıcı Adı:** `admin`
   - **Şifre:** `admin123`

## Environment Variables

`.env.local` dosyası oluşturun ve aşağıdaki bilgileri ekleyin:

```env
DB_HOST=localhost
DB_USER=vipkisba_vip
DB_PASSWORD=Ciko5744**
DB_NAME=vipkisba_bahce
```

**Not:** Shared hosting kullanıyorsanız, `DB_HOST` değerini hosting sağlayıcınızın veritabanı sunucusu adresi ile değiştirin (genellikle `localhost` veya bir IP adresi).

## Admin Panel Erişimi

- **Login Sayfası:** `/admin/login`
- **Dashboard:** `/admin`

## Güvenlik Notları

1. İlk girişten sonra varsayılan şifreyi değiştirin
2. Production ortamında şifreleri hash'leyin (bcrypt, argon2 vb.)
3. HTTPS kullanın
4. Rate limiting ekleyin
5. IP whitelist kullanabilirsiniz

## Veritabanı Tabloları

- `admin_users` - Admin kullanıcılar
- `contact_messages` - İletişim mesajları (opsiyonel)
- `projects` - Projeler (opsiyonel)
- `admin_sessions` - Admin oturumları (opsiyonel)















