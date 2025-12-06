import { NextResponse } from "next/server";
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

// Test endpoint - Veritabanı bağlantısını ve projeleri test et
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

    const results: any = {
      admin: admin,
      dbConfig: {
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "vipkisba_vip",
        database: process.env.DB_NAME || "vipkisba_bahce",
      },
      connectionTest: false,
      tableExists: false,
      projectCount: 0,
      projects: [],
      errors: [],
    };

    // Veritabanı bağlantısı testi
    try {
      connection = await mysql.createConnection({
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "vipkisba_vip",
        password: process.env.DB_PASSWORD || "Ciko5744**",
        database: process.env.DB_NAME || "vipkisba_bahce",
        connectTimeout: 5000,
      });
      results.connectionTest = true;
    } catch (dbError: any) {
      results.errors.push(`Veritabanı bağlantı hatası: ${dbError.message}`);
      return NextResponse.json({
        success: false,
        ...results,
      });
    }

    // Tablo kontrolü
    try {
      const [tableCheck] = await connection.query(
        "SHOW TABLES LIKE 'projects'"
      );
      results.tableExists = Array.isArray(tableCheck) && tableCheck.length > 0;
    } catch (tableError: any) {
      results.errors.push(`Tablo kontrolü hatası: ${tableError.message}`);
    }

    // Proje sayısı ve listesi
    if (results.tableExists) {
      try {
        const [rows] = await connection.query(
          "SELECT id, title, image_url, category, is_active FROM projects ORDER BY created_at DESC"
        );
        results.projects = Array.isArray(rows) ? rows : [];
        results.projectCount = results.projects.length;
      } catch (queryError: any) {
        results.errors.push(`Sorgu hatası: ${queryError.message}`);
      }
    }

    await connection.end();

    return NextResponse.json({
      success: true,
      ...results,
    });
  } catch (error: any) {
    console.error("Test error:", error);
    if (connection) {
      try {
        await connection.end();
      } catch {}
    }
    return NextResponse.json(
      { success: false, message: error.message, errors: [error.message] },
      { status: 500 }
    );
  }
}

