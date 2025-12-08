import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Oturum bulunamadı" },
        { status: 401 }
      );
    }

    const admin = JSON.parse(session.value);
    
    return NextResponse.json({ 
      success: true, 
      admin: {
        id: admin.id,
        username: admin.username,
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Oturum kontrolü başarısız" },
      { status: 500 }
    );
  }
}






