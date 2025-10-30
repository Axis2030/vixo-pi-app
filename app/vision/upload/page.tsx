"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useApp } from "@/context/AppContext";

export default function UploadVisionPage() {
  const { user, fetchVideos } = useApp();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState < File | null > (null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  const handleUpload = async () => {
    if (!file || !user) {
      setMessage("اختر ملفًا وأكد تسجيل الدخول");
      return;
    }
    
    setLoading(true);
    
    // رفع الملف إلى Supabase Storage
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;
    
    const { error: uploadError } = await supabase.storage
      .from("videos")
      .upload(filePath, file);
    
    if (uploadError) {
      setMessage("فشل رفع الفيديو: " + uploadError.message);
      setLoading(false);
      return;
    }
    
    // الحصول على رابط قابل للعرض
    const { data: urlData } = supabase.storage
      .from("videos")
      .getPublicUrl(filePath);
    
    // إضافة الفيديو إلى جدول الفيديوهات
    const { error: dbError } = await supabase
      .from("videos")
      .insert({
        title,
        description,
        video_url: urlData.publicUrl,
        user_id: user.id,
      });
    
    if (dbError) {
      setMessage("فشل حفظ الفيديو في قاعدة البيانات: " + dbError.message);
    } else {
      setMessage("تم رفع الفيديو بنجاح!");
      setTitle("");
      setDescription("");
      setFile(null);
      fetchVideos();
    }
    
    setLoading(false);
  };
  
  return (
    <div className="p-4 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">رفع فيديو جديد</h1>

      <input
        type="text"
        placeholder="عنوان الفيديو"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border rounded p-2"
      />
      <textarea
        placeholder="وصف الفيديو"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border rounded p-2"
      />

      <input
        type="file"
        accept="video/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="w-full"
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "جاري الرفع..." : "رفع الفيديو"}
      </button>

      {message && <p className="text-sm text-red-500">{message}</p>}
    </div>
  );
}