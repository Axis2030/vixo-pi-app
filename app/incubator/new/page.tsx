"use client";

import React, { useState, useContext } from "react";
import axiosClient from "@/lib/axiosClient";
import { AppContext } from "@/context/AppContext";

export default function CreateProject() {
  const { currentUser, showAlert } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [goal, setGoal] = useState("");

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return showAlert("سجل الدخول أولاً");
    try {
      const res = await axiosClient.post("/api/projects", {
        title, description: desc, ownerId: currentUser.id, fundingGoal: Number(goal)
      });
      showAlert("تم إنشاء المشروع");
    } catch (err) {
      showAlert("فشل إنشاء المشروع");
    }
  };

  return (
    <div className="p-4">
      <h2>إنشاء مشروع جديد</h2>
      <form onSubmit={create}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="عنوان المشروع" />
        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="وصف" />
        <input value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="هدف التمويل (USD)" />
        <button type="submit">إنشاء</button>
      </form>
    </div>
  );
}