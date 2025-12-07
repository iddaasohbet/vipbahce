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

// Aktif oturumları getir
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
      const [rows] = await connection.query(
        `SELECT 
          id, 
          session_token,
          device, 
          browser, 
          ip_address, 
          location, 
          is_current,
          created_at,
          last_active
        FROM admin_sessions 
        WHERE admin_id = ? AND expires_at > NOW()
        ORDER BY last_active DESC`,
        [session.id]
      );

      await connection.end();

      // Mevcut session'ı belirle
      const currentToken = sessionCookie.value;
      const sessions = (rows as any[]).map(s => ({
        ...s,
        is_current: s.session_token === currentToken
      }));

      return NextResponse.json({
        success: true,
        sessions
      });
    } catch (queryError) {
      await connection.end();
      throw queryError;
    }
  } catch (error: any) {
    console.error("Get sessions error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Bir hata oluştu" },
      { status: 500 }
    );
  }
}

// Oturum sonlandır
export async function DELETE(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("admin_session");
    
    if (!sessionCookie) {
      return NextResponse.json({ success: false, message: "Yetkisiz erişim" }, { status: 401 });
    }

    const session = JSON.parse(sessionCookie.value);
    const { sessionId, terminateAll } = await request.json();

    const connection = await getConnection();

    try {
      if (terminateAll) {
        // Mevcut oturum hariç tümünü sonlandır
        await connection.query(
          `DELETE FROM admin_sessions 
           WHERE admin_id = ? AND session_token != ?`,
          [session.id, sessionCookie.value]
        );
      } else if (sessionId) {
        // Belirli bir oturumu sonlandır
        await connection.query(
          `DELETE FROM admin_sessions 
           WHERE id = ? AND admin_id = ? AND session_token != ?`,
          [sessionId, session.id, sessionCookie.value]
        );
      }

      await connection.end();

      return NextResponse.json({
        success: true,
        message: terminateAll ? "Tüm oturumlar sonlandırıldı" : "Oturum sonlandırıldı"
      });
    } catch (queryError) {
      await connection.end();
      throw queryError;
    }
  } catch (error: any) {
    console.error("Delete session error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Bir hata oluştu" },
      { status: 500 }
    );
  }
}

