import { NextRequest, NextResponse } from "next/server";
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

// Tek blog yazısını getir
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const connection = await getConnection();
    
    try {
      const [rows] = await connection.query(
        "SELECT * FROM blog_posts WHERE id = ? AND is_published = 1",
        [id]
      );
      await connection.end();

      if (!Array.isArray(rows) || rows.length === 0) {
        return NextResponse.json({
          success: false,
          message: "Blog yazısı bulunamadı",
        }, { status: 404 });
      }

      return NextResponse.json({
        success: true,
        post: rows[0],
      });
    } catch (queryError) {
      await connection.end();
      throw queryError;
    }
  } catch (error: any) {
    console.error("Get blog post error:", error);
    return NextResponse.json({
      success: false,
      message: error.message || "Blog yazısı yüklenemedi",
    }, { status: 500 });
  }
}






