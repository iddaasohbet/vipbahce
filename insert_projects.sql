-- Mevcut Projeleri Veritabanına Ekleme Script'i
-- Bu script'i çalıştırmadan önce projects tablosunun oluşturulduğundan emin olun

-- Veritabanını seç
USE `vipkisba_bahce`;

-- Önce mevcut projeleri temizle (isteğe bağlı - sadece ilk kurulumda)
-- TRUNCATE TABLE projects;

-- Mevcut projeleri ekle
INSERT INTO `projects` (`title`, `description`, `image_url`, `category`, `is_featured`, `is_active`) VALUES
('Modern Kış Bahçesi', NULL, '/images/projects/110810ab-64f2-4728-a238-2a003508a302.jpg', 'Kış Bahçesi', 1, 1),
('Bioklimatik Sistem', NULL, '/images/projects/1cf74c9f-4258-4639-b8f8-028cfa3af530.jpg', 'Bioklimatik', 1, 1),
('Panoramik Kış Bahçesi', NULL, '/images/projects/23423c76-bf9b-4e4d-9d1a-c6be73a68a50.jpg', 'Kış Bahçesi', 1, 1),
('Cam Balkon', NULL, '/images/projects/23dd0ae8-c2ea-45ba-ad0e-272c0628a12d.jpg', 'Cam Balkon', 0, 1),
('Villa Projesi', NULL, '/images/projects/24929279-47c0-4aad-b65f-f7ba24e86f5d.jpg', 'Kış Bahçesi', 1, 1),
('Lüks Kış Bahçesi', NULL, '/images/projects/3ad4c9ba-779e-4b89-9442-42e1be96dfbf.jpg', 'Kış Bahçesi', 1, 1),
('Minimal Tasarım', NULL, '/images/projects/54bf52db-878e-4d73-816a-61a561f97f15.jpg', 'Bioklimatik', 0, 1),
('Bahçe Kış Bahçesi', NULL, '/images/projects/615a9bb3-45f2-42e9-9a4f-dae84b4f64de.jpg', 'Kış Bahçesi', 1, 1),
('Teras Sistemi', NULL, '/images/projects/6f262068-8523-46bb-8db4-89d9a2cfb385.jpg', 'Teras', 0, 1),
('Premium Kış Bahçesi', NULL, '/images/projects/72d1c386-41de-4199-8b88-d1e92457f134.jpg', 'Kış Bahçesi', 1, 1),
('Modern Villa', NULL, '/images/projects/7920ba6f-b67e-47a0-9b09-5760f7bd139d.jpg', 'Kış Bahçesi', 0, 1),
('Cam Tavan Sistemi', NULL, '/images/projects/7c30fee6-861f-4949-bd08-95dd9f9a16f2.jpg', 'Bioklimatik', 0, 1),
('Modern Tasarım', NULL, '/images/projects/86e1cccf-d01f-4c17-83a1-a89b14f60477.jpg', 'Kış Bahçesi', 0, 1),
('Lüks Villa', NULL, '/images/projects/8e0ee8dd-3e22-4322-95c7-17a507f0ed28.jpg', 'Kış Bahçesi', 1, 1),
('Bioklimatik Tavan', NULL, '/images/projects/94ceb7d1-7e61-4612-bf9c-6a2623cd45fe.jpg', 'Bioklimatik', 0, 1),
('Teras Kapatma', NULL, '/images/projects/9ece48f1-4fd1-4573-8fb0-2a8684db1be0.jpg', 'Teras', 0, 1),
('Panoramik Görünüm', NULL, '/images/projects/a2a54c7a-f684-47ad-861a-3b5c02a4fd94.jpg', 'Cam Balkon', 0, 1),
('Cam Sistem', NULL, '/images/projects/a77c368b-8476-4a92-a01c-6c08f705b980.jpg', 'Cam Balkon', 0, 1),
('Premium Proje', NULL, '/images/projects/c84d2298-dd03-4a2f-80ab-4224e9e1b272.jpg', 'Kış Bahçesi', 1, 1),
('Bahçe Entegrasyonu', NULL, '/images/projects/cf3777cd-a53c-44d5-aa2b-f0562621a607.jpg', 'Kış Bahçesi', 0, 1),
('Modern Çözüm', NULL, '/images/projects/df5971d9-c105-4b7e-bbe5-17f182ae8bc8.jpg', 'Bioklimatik', 0, 1),
('Premium Sistem', NULL, '/images/projects/e327a0bb-698e-448b-94e1-126291cb38be.jpg', 'Kış Bahçesi', 1, 1),
('Teras Entegrasyonu', NULL, '/images/projects/e672ed00-ee93-49eb-8ff6-5f95772ae59e.jpg', 'Teras', 0, 1);

-- Kontrol için proje sayısını göster
SELECT COUNT(*) as total_projects FROM projects WHERE is_active = 1;

-- Kategori bazında proje sayısı
SELECT category, COUNT(*) as count FROM projects WHERE is_active = 1 GROUP BY category;

