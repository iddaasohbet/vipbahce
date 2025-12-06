import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function GET() {
  let connection;
  
  try {
    // Veritabanı bağlantısı testi
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "vipkisba_vip",
      password: process.env.DB_PASSWORD || "Ciko5744**",
      database: process.env.DB_NAME || "vipkisba_bahce",
      connectTimeout: 10000,
    });

    // Tablo kontrolü
    const [tables] = await connection.query(
      "SHOW TABLES LIKE 'admin_users'"
    );

    const tableExists = Array.isArray(tables) && tables.length > 0;

    if (!tableExists) {
      return NextResponse.json({
        success: false,
        message: "admin_users tablosu bulunamadı. Lütfen database.sql dosyasını çalıştırın.",
        connection: "OK",
        tableExists: false,
      });
    }

    // Kullanıcı sayısı kontrolü
    const [users] = await connection.query(
      "SELECT COUNT(*) as count FROM admin_users"
    );
    const userCount = Array.isArray(users) && (users[0] as any)?.count || 0;

    return NextResponse.json({
      success: true,
      message: "Veritabanı bağlantısı başarılı!",
      connection: "OK",
      tableExists: true,
      userCount: userCount,
      dbConfig: {
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "vipkisba_vip",
        database: process.env.DB_NAME || "vipkisba_bahce",
      },
    });
  } catch (error: any) {
    console.error("Database test error:", error);
    
    // Detaylı hata analizi
    let errorMessage = error.message || "Bilinmeyen hata";
    let errorCode = error.code || "UNKNOWN";
    let suggestions: string[] = [];

    if (error.code === "ECONNREFUSED") {
      errorMessage = "MySQL sunucusuna bağlanılamıyor. MySQL çalışıyor mu?";
      suggestions.push("MySQL servisinin çalıştığından emin olun");
      suggestions.push("XAMPP/WAMP kullanıyorsanız MySQL servisini başlatın");
      suggestions.push("Port 3306'ın açık olduğundan emin olun");
    } else if (error.code === "ER_ACCESS_DENIED_ERROR") {
      errorMessage = "Kullanıcı adı veya şifre hatalı";
      suggestions.push("Veritabanı kullanıcı adı ve şifresini kontrol edin");
    } else if (error.code === "ER_BAD_DB_ERROR") {
      errorMessage = "Veritabanı bulunamadı";
      suggestions.push("Veritabanının oluşturulduğundan emin olun");
      suggestions.push("Veritabanı adını kontrol edin");
    } else if (error.code === "ENOTFOUND" || error.code === "ETIMEDOUT") {
      errorMessage = "Veritabanı sunucusu bulunamadı";
      suggestions.push("DB_HOST değerini kontrol edin");
      suggestions.push("Shared hosting kullanıyorsanız host bilgisini hosting panelinizden öğrenin");
    }

    return NextResponse.json(
      {
        success: false,
        message: `Veritabanı bağlantı hatası: ${errorMessage}`,
        connection: "FAILED",
        error: errorMessage,
        errorCode: errorCode,
        suggestions: suggestions,
        dbConfig: {
          host: process.env.DB_HOST || "localhost",
          user: process.env.DB_USER || "vipkisba_vip",
          database: process.env.DB_NAME || "vipkisba_bahce",
          port: 3306,
        },
        troubleshooting: {
          step1: "MySQL servisinin çalıştığını kontrol edin",
          step2: "phpMyAdmin veya MySQL client ile bağlantıyı test edin",
          step3: "Host bilgisini kontrol edin (shared hosting'de localhost yerine farklı bir hostname olabilir)",
          step4: "Veritabanının oluşturulduğundan emin olun",
        },
      },
      { status: 500 }
    );
  } finally {
    if (connection) {
      try {
        await connection.end();
      } catch (closeError) {
        console.error("Connection close error:", closeError);
      }
    }
  }
}

