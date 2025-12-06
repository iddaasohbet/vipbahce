import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

// Veritabanı bağlantısı oluştur
async function getConnection() {
  return mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "vipkisba_vip",
    password: process.env.DB_PASSWORD || "Ciko5744**",
    database: process.env.DB_NAME || "vipkisba_bahce",
    connectTimeout: 5000,
  });
}

// Public API - Tüm projeleri getir (anasayfa ve galeri için)
export async function GET() {
  try {
    const connection = await getConnection();
    
    try {
      const [rows] = await connection.query(
        "SELECT id, title, description, image_url, category, is_featured FROM projects WHERE is_active = 1 AND image_url IS NOT NULL AND image_url != '' AND image_url NOT LIKE 'data:%' ORDER BY created_at DESC"
      );
      await connection.end();

      return NextResponse.json({
        success: true,
        projects: Array.isArray(rows) ? rows : [],
      });
    } catch (queryError) {
      await connection.end();
      throw queryError;
    }
  } catch (error: any) {
    console.error("Get projects error:", error);
    return NextResponse.json({
      success: true,
      projects: [],
    });
  }
}
