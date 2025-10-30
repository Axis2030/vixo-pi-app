"use client";

import React, { useState, useContext } from "react";
import axiosClient from "@/lib/axiosClient";
import { AppContext } from "@/context/AppContext";

export default function UploadVisionPage() {
  const { currentUser, showAlert } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !currentUser) return showAlert("تأكد من الملف وأنك مسجل الدخول.");
    setLoading(true);
    try {
      // مثال رفع إلى S3 أو خدمة upload الخاصة بك
      const form = new FormData();
      form.append("file", file);
      // upload service returns url
      const up = await axiosClient.post("/api/uploads", form, { headers: { "Content-Type": "multipart/form-data" }});
      const url = up.data.url;
      const res = await axiosClient.post("/api/videos", {
        title, description: "", url, thumbnail: "", uploaderId: currentUser.id, isShort: false
      });
      showAlert("تم رفع الفيديو بنجاح");
    } catch (err) {
      showAlert("فشل الرفع");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2>رفع فيديو جديد</h2>
      <form onSubmit={onSubmit}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="عنوان الفيديو" />
        <input type="file" accept="video/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        <button type="submit" disabled={loading}>{loading ? "جارٍ الرفع..." : "رفع"}</button>
      </form>
    </div>
  );
}