import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import mysql from "mysql2/promise";

// Admin kontrolü
async function checkAdmin() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  
  if (!session) {
    return null;
  }
  
  try {
    const admin = JSON.parse(session.value);
    return admin;
  } catch {
    return null;
  }
}

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

// Tüm projeleri getir
export async function GET() {
  const admin = await checkAdmin();
  if (!admin) {
    return NextResponse.json(
      { success: false, message: "Yetkisiz erişim" },
      { status: 401 }
    );
  }

  try {
    const connection = await getConnection();
    
    try {
      // Tablo var mı kontrol et
      const [tableCheck] = await connection.query(
        "SHOW TABLES LIKE 'projects'"
      );
      
      if (Array.isArray(tableCheck) && tableCheck.length === 0) {
        await connection.end();
        return NextResponse.json({
          success: true,
          projects: [],
          message: "Projects tablosu bulunamadı. Lütfen database.sql dosyasını çalıştırın.",
        });
      }

      const [rows] = await connection.query(
        "SELECT * FROM projects WHERE is_active = 1 ORDER BY created_at DESC"
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
      message: error.message || "Veritabanı hatası",
    });
  }
}

// Yeni proje ekle
export async function POST(request: NextRequest) {
  const admin = await checkAdmin();
  if (!admin) {
    return NextResponse.json(
      { success: false, message: "Yetkisiz erişim" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { image_url } = body;

    if (!image_url) {
      return NextResponse.json(
        { success: false, message: "Resim URL'si gereklidir" },
        { status: 400 }
      );
    }

    // Otomatik başlık oluştur
    const title = `Proje ${Date.now()}`;

    const connection = await getConnection();
    
    try {
      const [result] = await connection.query(
        "INSERT INTO projects (title, description, image_url, category, is_featured, is_active) VALUES (?, ?, ?, ?, ?, ?)",
        [title, null, image_url, null, 0, 1]
      );
      await connection.end();

      return NextResponse.json({
        success: true,
        message: "Proje başarıyla eklendi",
        project: result,
      });
    } catch (queryError) {
      await connection.end();
      throw queryError;
    }
  } catch (error: any) {
    console.error("Add project error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Bir hata oluştu" },
      { status: 500 }
    );
  }
}
