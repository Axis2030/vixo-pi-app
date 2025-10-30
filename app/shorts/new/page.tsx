"use client";

import React, { useState, useContext } from "react";
import axiosClient from "@/lib/axiosClient";
import { AppContext } from "@/context/AppContext";

export default function CreateShort() {
  const { currentUser, showAlert } = useContext(AppContext);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !file) return showAlert("أرفق المقطع وسجل الدخول");
    setLoading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const up = await axiosClient.post("/api/uploads", form);
      const url = up.data.url;
      await axiosClient.post("/api/videos", {
        title, url, uploaderId: currentUser.id, isShort: true
      });
      showAlert("تم نشر الـ Short");
    } catch (err) {
      showAlert("فشل النشر");
    } finally { setLoading(false); }
  };

  return (
    <div className="p-4">
      <h2>رفع Short</h2>
      <form onSubmit={onSubmit}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="عنوان" />
        <input type="file" accept="video/*,image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        <button type="submit" disabled={loading}>{loading ? "جاري..." : "نشر"}</button>
      </form>
    </div>
  );
}