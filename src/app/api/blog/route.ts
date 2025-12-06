import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

// Public API - Yayınlanmış blog yazılarını getir (anasayfa için)
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Veritabanı bağlantısı oluştur
async function getConnection() {
  const dbConfig = {
    host: process.env.DB_HOST || "5.39.8.160",
    user: process.env.DB_USER || "vipkisba_vip",
    password: process.env.DB_PASSWORD || "Ciko5744**",
    database: process.env.DB_NAME || "vipkisba_bahce",
    connectTimeout: 10000,
    port: 3306,
  };
  return mysql.createConnection(dbConfig);
}

export async function GET() {
  try {
    const connection = await getConnection();
    
    try {
      const [rows] = await connection.query(
        "SELECT id, title, excerpt, image_url, category, author, created_at FROM blog_posts WHERE is_published = 1 AND image_url IS NOT NULL AND image_url != '' AND image_url NOT LIKE 'data:%' ORDER BY created_at DESC LIMIT 10"
      );
      
      await connection.end();
      
      return NextResponse.json({
        success: true,
        posts: Array.isArray(rows) ? rows : [],
      });
    } catch (queryError) {
      await connection.end();
      throw queryError;
    }
  } catch (error: any) {
    console.error("Get blog posts error:", error);
    return NextResponse.json({
      success: true,
      posts: [],
    });
  }
}
