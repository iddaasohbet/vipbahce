import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import mysql from "mysql2/promise";

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

// Giriş geçmişini getir
export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("admin_session");
    
    if (!sessionCookie) {
      return NextResponse.json({ success: false, message: "Yetkisiz erişim" }, { status: 401 });
    }

    const session = JSON.parse(sessionCookie.value);
    const connection = await getConnection();

    try {
      // Son 50 giriş kaydını getir
      const [rows] = await connection.query(
        `SELECT 
          id,
          ip_address,
          device,
          browser,
          location,
          status,
          failure_reason,
          created_at
        FROM admin_login_history 
        WHERE admin_id = ? OR username = ?
        ORDER BY created_at DESC
        LIMIT 50`,
        [session.id, session.username]
      );

      await connection.end();

      return NextResponse.json({
        success: true,
        history: rows
      });
    } catch (queryError) {
      await connection.end();
      throw queryError;
    }
  } catch (error: any) {
    console.error("Get login history error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Bir hata oluştu" },
      { status: 500 }
    );
  }
}

