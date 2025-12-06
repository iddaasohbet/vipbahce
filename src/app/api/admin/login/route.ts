import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import mysql from "mysql2/promise";

export async function POST(request: NextRequest) {
  let connection;
  
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "Kullanıcı adı ve şifre gereklidir!" },
        { status: 400 }
      );
    }

    // Veritabanı bağlantısı
    let useDatabase = true;
    try {
      connection = await mysql.createConnection({
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "vipkisba_vip",
        password: process.env.DB_PASSWORD || "Ciko5744**",
        database: process.env.DB_NAME || "vipkisba_bahce",
        connectTimeout: 5000, // 5 saniye timeout
      });
      
      // Bağlantıyı test et
      await connection.ping();
    } catch (dbError: any) {
      console.error("Database connection error:", dbError);
      useDatabase = false;
      
      // Veritabanı bağlantısı başarısızsa, geçici olarak hardcoded kontrol yap
      // NOT: Production'da bu kısmı kaldırın ve veritabanı bağlantısını düzeltin!
      if (username === "admin" && password === "admin123") {
        const cookieStore = await cookies();
        cookieStore.set("admin_session", JSON.stringify({
          id: 1,
          username: "admin",
          loginTime: Date.now(),
        }), {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 7, // 7 gün
        });

        return NextResponse.json({ 
          success: true, 
          message: "Giriş başarılı (Geçici mod - Veritabanı bağlantısı yok)",
          warning: "Veritabanı bağlantısı kurulamadı. Lütfen veritabanı ayarlarını kontrol edin."
        });
      }
      
      return NextResponse.json(
        { 
          success: false, 
          message: `Veritabanı bağlantı hatası: ${dbError.message || "Bağlantı kurulamadı"}. Lütfen veritabanı ayarlarını kontrol edin.` 
        },
        { status: 500 }
      );
    }

    // Admin kullanıcı kontrolü (sadece veritabanı bağlantısı varsa)
    if (!useDatabase || !connection) {
      return NextResponse.json(
        { success: false, message: "Veritabanı bağlantısı kurulamadı!" },
        { status: 500 }
      );
    }

    try {
      const [rows] = await connection.query(
        "SELECT id, username, email, full_name FROM admin_users WHERE username = ? AND password = ? AND is_active = 1",
        [username, password]
      );

      if (Array.isArray(rows) && rows.length > 0) {
        const admin = rows[0] as any;
        
        // Session oluştur
        const cookieStore = await cookies();
        cookieStore.set("admin_session", JSON.stringify({
          id: admin.id,
          username: admin.username,
          loginTime: Date.now(),
        }), {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 7, // 7 gün
        });

        // Son giriş zamanını güncelle
        await connection.query(
          "UPDATE admin_users SET last_login = NOW() WHERE id = ?",
          [admin.id]
        );

        return NextResponse.json({ 
          success: true, 
          message: "Giriş başarılı" 
        });
      } else {
        return NextResponse.json(
          { success: false, message: "Kullanıcı adı veya şifre hatalı!" },
          { status: 401 }
        );
      }
    } catch (queryError: any) {
      console.error("Query error:", queryError);
      return NextResponse.json(
        { 
          success: false, 
          message: `Sorgu hatası: ${queryError.message || "Veritabanı sorgusu başarısız"}` 
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: `Giriş sırasında bir hata oluştu: ${error.message || "Bilinmeyen hata"}` 
      },
      { status: 500 }
    );
  } finally {
    // Bağlantıyı kapat
    if (connection) {
      try {
        await connection.end();
      } catch (closeError) {
        console.error("Connection close error:", closeError);
      }
    }
  }
}

