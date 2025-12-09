-- Site Ayarları Tablosu
-- Veritabanı: vipkisba_bahce

USE `vipkisba_bahce`;

-- Önce tabloyu sil (varsa)
DROP TABLE IF EXISTS `site_settings`;

-- Ayarlar tablosu
CREATE TABLE `site_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `setting_key` varchar(100) NOT NULL,
  `setting_value` text,
  `setting_type` varchar(20) DEFAULT 'text',
  `setting_group` varchar(50) DEFAULT 'general',
  `setting_label` varchar(100),
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `setting_key` (`setting_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Varsayılan ayarları ekle
INSERT INTO `site_settings` (`setting_key`, `setting_value`, `setting_type`, `setting_group`, `setting_label`) VALUES
('phone', '+90 555 123 4567', 'phone', 'contact', 'Telefon Numarası'),
('email', 'info@vipkisbahcesi.com', 'email', 'contact', 'E-posta Adresi'),
('address', 'Örnek Mahallesi, Örnek Sokak No:1', 'textarea', 'contact', 'Adres'),
('city', 'İstanbul', 'text', 'contact', 'İl'),
('district', 'Sarıyer', 'text', 'contact', 'İlçe'),
('facebook', 'https://facebook.com/vipkisbahcesi', 'url', 'social', 'Facebook'),
('instagram', 'https://instagram.com/vipkisbahcesi', 'url', 'social', 'Instagram'),
('twitter', 'https://twitter.com/vipkisbahcesi', 'url', 'social', 'Twitter/X'),
('youtube', 'https://youtube.com/@vipkisbahcesi', 'url', 'social', 'YouTube'),
('linkedin', '', 'url', 'social', 'LinkedIn'),
('whatsapp', '+905425263466', 'phone', 'social', 'WhatsApp'),
('site_title', 'VIP Kış Bahçesi', 'text', 'general', 'Site Başlığı'),
('site_description', 'Modern Bioklimatik Çözümler', 'textarea', 'general', 'Site Açıklaması'),
('working_hours', 'Pazartesi - Cumartesi: 09:00 - 18:00', 'text', 'general', 'Çalışma Saatleri');

-- Kontrol
SELECT * FROM site_settings;
