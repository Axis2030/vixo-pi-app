// vixo-pi-app/app/api/projects/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prismaServer';

export async function GET() { const list = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } }); return NextResponse.json(list); }
export async function POST(req: Request) { const body = await req.json(); const p = await prisma.project.create({ data: body }); return NextResponse.json(p); }