-- Blog/Haberler Tablosu
-- Veritabanı: vipkisba_bahce

USE `vipkisba_bahce`;

-- Blog yazıları tablosu
CREATE TABLE IF NOT EXISTS `blog_posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `excerpt` text NOT NULL,
  `content` longtext DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `author` varchar(100) DEFAULT NULL,
  `is_published` tinyint(1) NOT NULL DEFAULT 1,
  `is_featured` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `is_published` (`is_published`),
  KEY `is_featured` (`is_featured`),
  KEY `category` (`category`),
  KEY `created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Örnek blog yazıları ekle (mevcut demo içerikler)
INSERT INTO `blog_posts` (`title`, `excerpt`, `image_url`, `category`, `is_published`, `is_featured`) VALUES
('Bioklimatik Pergola Sistemlerinde Yeni Teknolojiler', '2024 yılında kış bahçesi sektöründe çığır açan yeni teknolojiler ve akıllı otomasyon sistemleri.', '/images/projects/110810ab-64f2-4728-a238-2a003508a302.jpg', 'Teknoloji', 1, 1),
('Kış Bahçesi Bakım Rehberi', 'Kış aylarında kış bahçenizin bakımı için uzman önerileri ve ipuçları.', '/images/projects/1cf74c9f-4258-4639-b8f8-028cfa3af530.jpg', 'Rehber', 1, 1),
('Enerji Tasarruflu Cam Sistemleri', 'Isı yalıtımlı cam teknolojileri ile enerji maliyetlerinizi nasıl düşürebilirsiniz?', '/images/projects/23423c76-bf9b-4e4d-9d1a-c6be73a68a50.jpg', 'Ürünler', 1, 1);

-- Kontrol için blog sayısını göster
SELECT COUNT(*) as total_posts FROM blog_posts WHERE is_published = 1;

