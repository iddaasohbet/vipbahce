import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function GET() {
  const results: any[] = [];
  
  // Farklı host seçeneklerini test et
  const testConfigs = [
    {
      name: "Localhost (Varsayılan)",
      config: {
        host: "localhost",
        user: "vipkisba_vip",
        password: "Ciko5744**",
        database: "vipkisba_bahce",
        port: 3306,
      }
    },
    {
      name: "127.0.0.1",
      config: {
        host: "127.0.0.1",
        user: "vipkisba_vip",
        password: "Ciko5744**",
        database: "vipkisba_bahce",
        port: 3306,
      }
    },
    {
      name: "Root kullanıcı (Test)",
      config: {
        host: "localhost",
        user: "root",
        password: "",
        database: "vipkisba_bahce",
        port: 3306,
      }
    },
  ];

  for (const test of testConfigs) {
    let connection;
    try {
      connection = await mysql.createConnection({
        ...test.config,
        connectTimeout: 3000,
      });
      
      await connection.ping();
      await connection.end();
      
      results.push({
        name: test.name,
        success: true,
        message: "Bağlantı başarılı!",
        config: test.config,
      });
    } catch (error: any) {
      results.push({
        name: test.name,
        success: false,
        message: error.message,
        code: error.code,
        config: test.config,
      });
    }
  }

  return NextResponse.json({
    tests: results,
    summary: {
      total: results.length,
      successful: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length,
    },
    recommendations: results.find(r => r.success) 
      ? `✅ Çalışan konfigürasyon bulundu: ${results.find(r => r.success)?.name}`
      : "❌ Hiçbir konfigürasyon çalışmıyor. MySQL servisinin çalıştığından emin olun.",
  });
}







