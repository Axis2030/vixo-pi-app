"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useApp } from "@/context/AppContext";

export default function UploadProjectPage() {
  const { user } = useApp();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState < File | null > (null);
  const [fundingGoal, setFundingGoal] = useState < number > (0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  const handleUpload = async () => {
    if (!file || !user) {
      setMessage("اختر صورة المشروع وأكد تسجيل الدخول");
      return;
    }
    
    setLoading(true);
    
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;
    
    const { error: uploadError } = await supabase.storage
      .from("projects")
      .upload(filePath, file);
    
    if (uploadError) {
      setMessage("فشل رفع الصورة: " + uploadError.message);
      setLoading(false);
      return;
    }
    
    const { data: urlData } = supabase.storage
      .from("projects")
      .getPublicUrl(filePath);
    
    const { error: dbError } = await supabase.from("projects").insert({
      title,
      description,
      image_url: urlData.publicUrl,
      owner_id: user.id,
      funding_goal: fundingGoal,
    });
    
    if (dbError) setMessage("فشل حفظ المشروع: " + dbError.message);
    else {
      setMessage("تم إنشاء المشروع بنجاح!");
      setTitle("");
      setDescription("");
      setFundingGoal(0);
      setFile(null);
    }
    
    setLoading(false);
  };
  
  return (
    <div className="p-4 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">إنشاء مشروع جديد</h1>

      <input
        type="text"
        placeholder="عنوان المشروع"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border rounded p-2"
      />

      <textarea
        placeholder="وصف المشروع"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border rounded p-2"
      />

      <input
        type="number"
        placeholder="التمويل المطلوب"
        value={fundingGoal}
        onChange={(e) => setFundingGoal(Number(e.target.value))}
        className="w-full border rounded p-2"
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="w-full"
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "جاري الرفع..." : "إنشاء المشروع"}
      </button>

      {message && <p className="text-sm text-red-500">{message}</p>}
    </div>
  );
}