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

// Tüm ayarları getir
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
      const [rows] = await connection.query(
        "SELECT * FROM site_settings ORDER BY setting_group, id"
      );
      await connection.end();

      // Ayarları grupla
      const settings: Record<string, Record<string, any>> = {};
      if (Array.isArray(rows)) {
        rows.forEach((row: any) => {
          if (!settings[row.setting_group]) {
            settings[row.setting_group] = {};
          }
          settings[row.setting_group][row.setting_key] = {
            value: row.setting_value,
            type: row.setting_type,
            label: row.setting_label,
          };
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
    console.error("Get settings error:", error);
    return NextResponse.json({
      success: false,
      message: error.message || "Ayarlar yüklenemedi",
    });
  }
}

// Ayarları güncelle
export async function PUT(request: NextRequest) {
  const admin = await checkAdmin();
  if (!admin) {
    return NextResponse.json(
      { success: false, message: "Yetkisiz erişim" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { settings } = body;

    if (!settings || typeof settings !== "object") {
      return NextResponse.json(
        { success: false, message: "Geçersiz ayarlar" },
        { status: 400 }
      );
    }

    const connection = await getConnection();
    
    try {
      // Her ayarı güncelle
      for (const [key, value] of Object.entries(settings)) {
        await connection.query(
          "UPDATE site_settings SET setting_value = ? WHERE setting_key = ?",
          [value, key]
        );
      }
      
      await connection.end();

      return NextResponse.json({
        success: true,
        message: "Ayarlar başarıyla güncellendi",
      });
    } catch (queryError) {
      await connection.end();
      throw queryError;
    }
  } catch (error: any) {
    console.error("Update settings error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Ayarlar güncellenemedi" },
      { status: 500 }
    );
  }
}







