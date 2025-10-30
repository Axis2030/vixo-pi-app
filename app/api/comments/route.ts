import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const targetId = url.searchParams.get("targetId");
  const targetType = url.searchParams.get("targetType");
  if (!targetId || !targetType) return NextResponse.json([], { status: 200 });
  
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("target_id", targetId)
    .eq("target_type", targetType)
    .order("created_at", { ascending: false });
  
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { data, error } = await supabase.from("comments").insert(body);
  
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}