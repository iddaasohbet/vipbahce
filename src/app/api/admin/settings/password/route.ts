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

// Şifre değiştir
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
    const { currentPassword, newPassword, confirmPassword } = body;

    // Validasyon
    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { success: false, message: "Tüm alanları doldurun" },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { success: false, message: "Yeni şifreler eşleşmiyor" },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { success: false, message: "Yeni şifre en az 6 karakter olmalıdır" },
        { status: 400 }
      );
    }

    const connection = await getConnection();
    
    try {
      // Mevcut şifreyi kontrol et
      const [rows] = await connection.query(
        "SELECT id FROM admin_users WHERE id = ? AND password = ?",
        [admin.id, currentPassword]
      );

      if (!Array.isArray(rows) || rows.length === 0) {
        await connection.end();
        return NextResponse.json(
          { success: false, message: "Mevcut şifre hatalı" },
          { status: 400 }
        );
      }

      // Yeni şifreyi kaydet
      await connection.query(
        "UPDATE admin_users SET password = ? WHERE id = ?",
        [newPassword, admin.id]
      );
      
      await connection.end();

      return NextResponse.json({
        success: true,
        message: "Şifre başarıyla değiştirildi",
      });
    } catch (queryError) {
      await connection.end();
      throw queryError;
    }
  } catch (error: any) {
    console.error("Change password error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Şifre değiştirilemedi" },
      { status: 500 }
    );
  }
}












