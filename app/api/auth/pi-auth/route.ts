// vixo-pi-app/app/api/auth/pi-auth/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prismaServer';

export async function POST(req: Request) {
  const headers = Object.fromEntries(req.headers.entries());
  const authHeader = headers.authorization || headers.Authorization;
  if (!authHeader) return NextResponse.json({ error: 'Missing token' }, { status: 400 });
  const accessToken = (authHeader as string).replace('Bearer ', '');
  
  // TODO: تحقق من token مع Pi إذا أردت، أو فك التوقيع
  // مؤقت: استخراج بيانات تجريبية
  const piPayload = { username: `pi_${accessToken.slice(0,6)}`, wallet_address: `pi-wallet-${accessToken.slice(0,6)}` };
  
  const user = await prisma.user.upsert({
    where: { username: piPayload.username },
    update: { walletAddress: piPayload.wallet_address },
    create: { username: piPayload.username, walletAddress: piPayload.wallet_address },
  });
  
  // هنا أنشئ جلسة أو أعد JWT
  return NextResponse.json({ user, membership_class: user.membershipClass });
}