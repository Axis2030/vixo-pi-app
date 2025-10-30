// vixo-pi-app/app/api/auth/route.ts
import { NextResponse } from 'next/server';
import prismaClient from '@/lib/prismaServer';

export async function GET() {
  // مثال: جلب user من الجلسة (استبدل بالتحقق الفعلي)
  return NextResponse.json({ user: null });
}

export async function POST(req: Request) {
  // غير مستخدم هنا — استخدم endpoints مفصولة
  return NextResponse.json({});
}

// منفصل: POST /api/auth/pi-auth  -> handler في مسار api/auth/pi-auth/route.ts