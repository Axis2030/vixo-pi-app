// vixo-pi-app/app/api/videos/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prismaServer';

export async function GET() {
  const data = await prisma.video.findMany({ orderBy: { createdAt: 'desc' }, take: 50 });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();
  const v = await prisma.video.create({ data: body });
  return NextResponse.json(v);
}