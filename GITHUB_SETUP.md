# 🚀 GitHub'a Yükleme Rehberi

## Adım 1: Git Kurulumu Kontrol

Terminal/PowerShell'de kontrol edin:
```bash
git --version
```

Eğer git yüklü değilse: https://git-scm.com/download/win

## Adım 2: GitHub'da Yeni Repo Oluştur

1. https://github.com adresine gidin
2. "New repository" butonuna tıklayın
3. Repository adı: `kisbahcesi`
4. Public veya Private seçin
5. **README.md eklemeyin** (zaten var)
6. "Create repository" butonuna tıklayın

## Adım 3: Projeyi GitHub'a Yükle

Terminal/PowerShell'i açın ve proje klasörüne gidin:

```bash
cd C:\Users\A\Desktop\kisbahcesi
```

### İlk Kez Yüklüyorsanız:

```bash
# Git'i başlat
git init

# Git kullanıcı bilgilerini ayarla (ilk kez kullanıyorsanız)
git config --global user.name "Adınız Soyadınız"
git config --global user.email "email@example.com"

# Tüm dosyaları staging area'ya ekle
git add .

# İlk commit
git commit -m "🎉 Initial commit: Kış Bahçesi website"

# Ana branch'i main olarak ayarla
git branch -M main

# GitHub repository'sini remote olarak ekle
# ⚠️ KULLANICI_ADINIZ yerine GitHub kullanıcı adınızı yazın
git remote add origin https://github.com/KULLANICI_ADINIZ/kisbahcesi.git

# GitHub'a push et
git push -u origin main
```

### Güncellemeler için:

```bash
# Değişiklikleri kontrol et
git status

# Tüm değişiklikleri ekle
git add .

# Commit yap
git commit -m "✨ Açıklama: Ne değişti"

# Push et
git push
```

## 🎯 Faydalı Git Komutları

```bash
# Mevcut durumu görüntüle
git status

# Commit geçmişini gör
git log --oneline

# Belirli dosyaları ekle
git add src/components/Header.tsx

# Son commit'i geri al (dosyalar kalır)
git reset --soft HEAD~1

# Değişiklikleri geri al (dikkatli!)
git checkout -- .

# Branch oluştur
git checkout -b feature/yeni-ozellik

# Branch'ler arası geçiş
git checkout main
```

## 📦 Vercel'e Deploy (Bonus)

1. https://vercel.com adresine gidin
2. GitHub ile giriş yapın
3. "New Project" tıklayın
4. `kisbahcesi` repo'sunu seçin
5. "Deploy" butonuna tıklayın
6. 🎉 Canlı siteniz hazır!

## ⚠️ Önemli Notlar

- `.gitignore` dosyası `node_modules` klasörünü otomatik ignore eder
- Hassas bilgileri (API keys) `.env.local` dosyasına koyun
- Düzenli commit atın (küçük değişiklikler daha iyi)
- Anlamlı commit mesajları kullanın

## 🏷️ Commit Mesajı Örnekleri

```
🎉 Initial commit
✨ Yeni özellik eklendi
🐛 Bug düzeltildi
🎨 Tasarım iyileştirildi
♻️ Kod refactor edildi
📝 Dokümantasyon güncellendi
🚀 Performance iyileştirmesi
🔧 Konfigürasyon değişikliği
```

---

**Başarılar!** 🚀

Sorularınız için: support@kisbahcesi.com

