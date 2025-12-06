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

// Tüm projeleri getir
export async function GET() {
  let connection;
  
  try {
    const admin = await checkAdmin();
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Yetkisiz erişim" },
        { status: 401 }
      );
    }

    // Veritabanı bağlantısı
    const dbConfig = {
      host: process.env.DB_HOST || "5.39.8.160",
      user: process.env.DB_USER || "vipkisba_vip",
      password: process.env.DB_PASSWORD || "Ciko5744**",
      database: process.env.DB_NAME || "vipkisba_bahce",
      connectTimeout: 10000,
      port: 3306,
    };

    console.log("Attempting DB connection with config:", {
      host: dbConfig.host,
      user: dbConfig.user,
      database: dbConfig.database,
      port: dbConfig.port,
    });

    try {
      connection = await mysql.createConnection(dbConfig);
      await connection.ping(); // Bağlantıyı test et
      console.log("Database connection successful!");
    } catch (dbError: any) {
      console.error("Database connection error:", dbError);
      console.error("Error code:", dbError.code);
      console.error("Error message:", dbError.message);
      
      // Veritabanı yoksa boş array döndür ama hata mesajı da ekle
      return NextResponse.json({
        success: true,
        projects: [],
        message: `Veritabanı bağlantısı kurulamadı: ${dbError.message || dbError.code || "Bilinmeyen hata"}. Lütfen veritabanı ayarlarını kontrol edin.`,
        error: dbError.message,
        errorCode: dbError.code,
        dbConfig: {
          host: dbConfig.host,
          user: dbConfig.user,
          database: dbConfig.database,
        },
      });
    }

    // Tablo var mı kontrol et
    try {
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
    } catch (tableError: any) {
      console.error("Table check error:", tableError);
    }

    const [rows] = await connection.query(
      "SELECT * FROM projects WHERE is_active = 1 ORDER BY created_at DESC"
    );

    await connection.end();

    return NextResponse.json({
      success: true,
      projects: Array.isArray(rows) ? rows : [],
    });
  } catch (error: any) {
    console.error("Get projects error:", error);
    if (connection) {
      try {
        await connection.end();
      } catch {}
    }
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// Yeni proje ekle
export async function POST(request: NextRequest) {
  let connection;
  
  try {
    const admin = await checkAdmin();
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Yetkisiz erişim" },
        { status: 401 }
      );
    }

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
    const description = null;
    const category = null;

    // Veritabanı bağlantısı
    try {
      connection = await mysql.createConnection({
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "vipkisba_vip",
        password: process.env.DB_PASSWORD || "Ciko5744**",
        database: process.env.DB_NAME || "vipkisba_bahce",
        connectTimeout: 5000,
      });
    } catch (dbError: any) {
      return NextResponse.json(
        { success: false, message: "Veritabanı bağlantı hatası" },
        { status: 500 }
      );
    }

    const [result] = await connection.query(
      "INSERT INTO projects (title, description, image_url, category, is_featured, is_active) VALUES (?, ?, ?, ?, ?, ?)",
      [title, description || null, image_url, category || null, 0, 1]
    );

    await connection.end();

    return NextResponse.json({
      success: true,
      message: "Proje başarıyla eklendi",
      project: result,
    });
  } catch (error: any) {
    console.error("Add project error:", error);
    if (connection) {
      try {
        await connection.end();
      } catch {}
    }
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

