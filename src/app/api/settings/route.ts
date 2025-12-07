import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

// Veritabanı bağlantısı oluştur
async function getConnection() {
  return mysql.createConnection({
    host: process.env.DB_HOST || "5.39.8.160",
    user: process.env.DB_USER || "vipkisba_vip",
    password: process.env.DB_PASSWORD || "Ciko5744**",
    database: process.env.DB_NAME || "vipkisba_bahce",
    connectTimeout: 10000,
    port: 3306,
  });
}

// Varsayılan ayarlar (veritabanı bağlantısı yoksa)
const defaultSettings = {
  phone: "+90 555 123 4567",
  email: "info@vipkisbahcesi.com",
  address: "Örnek Mahallesi, Örnek Sokak No:1",
  city: "İstanbul",
  district: "Sarıyer",
  facebook: "https://facebook.com/vipkisbahcesi",
  instagram: "https://instagram.com/vipkisbahcesi",
  twitter: "https://twitter.com/vipkisbahcesi",
  youtube: "https://youtube.com/@vipkisbahcesi",
  linkedin: "",
  whatsapp: "+905551234567",
  site_title: "VIP Kış Bahçesi",
  site_description: "Modern Bioklimatik Çözümler",
  working_hours: "Pazartesi - Cumartesi: 09:00 - 18:00",
};

// Public API - Site ayarlarını getir (Footer vb. için)
export async function GET() {
  try {
    const connection = await getConnection();
    
    try {
      const [rows] = await connection.query(
        "SELECT setting_key, setting_value FROM site_settings"
      );
      await connection.end();

      // Ayarları düz objeye çevir
      const settings: Record<string, string> = { ...defaultSettings };
      if (Array.isArray(rows)) {
        rows.forEach((row: any) => {
          settings[row.setting_key] = row.setting_value || "";
        });
      }

      return NextResponse.json({
        success: true,
        settings,
      });
    } catch (queryError) {
      await connection.end();
      throw queryError;
    }
  } catch (error: any) {
    console.error("Get public settings error:", error);
    // Hata durumunda varsayılan ayarları döndür
    return NextResponse.json({
      success: true,
      settings: defaultSettings,
    });
  }
}




