import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const targetId = url.searchParams.get("targetId");
  const targetType = url.searchParams.get("targetType");
  const userId = url.searchParams.get("userId");
  if (!targetId || !targetType || !userId) return NextResponse.json([], { status: 200 });
  
  const { data, error } = await supabase
    .from("likes")
    .select("*")
    .eq("target_id", targetId)
    .eq("target_type", targetType)
    .eq("user_id", userId);
  
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { data, error } = await supabase.from("likes").insert(body);
  
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const likeId = url.searchParams.get("likeId");
  if (!likeId) return NextResponse.json({ error: "Missing likeId" }, { status: 400 });
  
  const { data, error } = await supabase.from("likes").delete().eq("id", likeId);
  
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}