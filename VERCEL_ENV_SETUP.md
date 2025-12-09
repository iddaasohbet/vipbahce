# Vercel Environment Variables Kurulumu

## Adımlar

### 1. Vercel Dashboard'a Giriş
1. https://vercel.com adresine gidin
2. Projenizi seçin (`kisbahcesi`)

### 2. Environment Variables Ekleme
1. **Settings** sekmesine gidin
2. Sol menüden **Environment Variables** seçin
3. Şu değişkenleri ekleyin:

#### Production, Preview ve Development için ekleyin:

```
DB_HOST = 5.39.8.160
DB_USER = vipkisba_vip
DB_PASSWORD = Ciko5744**
DB_NAME = vipkisba_bahce
NODE_ENV = production
```

**Önemli:** Her değişken için:
- ✅ **Production** seçeneğini işaretleyin
- ✅ **Preview** seçeneğini işaretleyin  
- ✅ **Development** seçeneğini işaretleyin

### 3. Deploy Yenileme
Environment variables ekledikten sonra:
1. **Deployments** sekmesine gidin
2. Son deployment'ın yanındaki **"..."** menüsüne tıklayın
3. **Redeploy** seçin
4. ✅ **Use existing Build Cache** seçeneğini kaldırın (environment variables'ların yüklenmesi için)

### 4. Test
Deploy tamamlandıktan sonra:
1. Admin paneline gidin: `https://yourdomain.com/admin/projects`
2. Konsolu açın (F12)
3. Hata mesajlarını kontrol edin

## Alternatif: Vercel CLI ile

Eğer Vercel CLI kullanıyorsanız:

```bash
vercel env add DB_HOST
# Değer: 5.39.8.160
# Environment: Production, Preview, Development

vercel env add DB_USER
# Değer: vipkisba_vip
# Environment: Production, Preview, Development

vercel env add DB_PASSWORD
# Değer: Ciko5744**
# Environment: Production, Preview, Development

vercel env add DB_NAME
# Değer: vipkisba_bahce
# Environment: Production, Preview, Development

vercel env add NODE_ENV
# Değer: production
# Environment: Production, Preview, Development
```

Sonra redeploy:
```bash
vercel --prod
```

## Sorun Giderme

### Environment Variables görünmüyor
- Redeploy yapın (cache'i temizleyerek)
- Vercel dashboard'da **Settings > Environment Variables**'da kontrol edin

### Hala bağlantı hatası
- Veritabanı sunucusunun uzak bağlantılara izin verdiğinden emin olun
- Firewall'un 3306 portunu engellemediğinden emin olun
- Hosting sağlayıcınızdan MySQL'in uzak bağlantılara açık olduğunu doğrulayın

### Test Endpoint
Şu URL'yi açarak test edin:
```
https://yourdomain.com/api/admin/projects/test
```

Bu size detaylı bağlantı bilgileri verecek.












