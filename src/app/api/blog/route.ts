import { NextResponse } from "next/server";
import mysql, { Connection } from "mysql2/promise";

// Public API - Yayınlanmış blog yazılarını getir (anasayfa için)
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  let connection: Connection | null = null;
  
  try {
    // Veritabanı bağlantısı
    const dbConfig = {
      host: process.env.DB_HOST || "5.39.8.160",
      user: process.env.DB_USER || "vipkisba_vip",
      password: process.env.DB_PASSWORD || "Ciko5744**",
      database: process.env.DB_NAME || "vipkisba_bahce",
      connectTimeout: 10000,
      port: 3306,
    };

    try {
      connection = await mysql.createConnection(dbConfig);
    } catch (dbError: any) {
      // Veritabanı yoksa boş array döndür
      return NextResponse.json({
        success: true,
        posts: [],
      });
    }

    const [rows] = await connection.query(
      "SELECT id, title, excerpt, image_url, category, author, created_at FROM blog_posts WHERE is_published = 1 AND image_url IS NOT NULL AND image_url != '' AND image_url NOT LIKE 'data:%' ORDER BY created_at DESC LIMIT 10"
    );

    await connection.end();

    return NextResponse.json({
      success: true,
      posts: Array.isArray(rows) ? rows : [],
    });
  } catch (error: any) {
    console.error("Get blog posts error:", error);
    if (connection) {
      try {
        await connection.end();
      } catch {}
    }
    return NextResponse.json({
      success: true,
      posts: [],
    });
  }
}

