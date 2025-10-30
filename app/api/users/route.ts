// app/api/users/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  const users = [{ id: 1, name: "Majid" }]
  return NextResponse.json(users)
}

export async function POST(req: Request) {
  const data = await req.json()
  return NextResponse.json({ message: "User created", data })
}