"use client";

import React, { useEffect, useState, useContext } from "react";
import axiosClient from "@/lib/axiosClient";
import { AppContext } from "@/context/AppContext";

type Notification = { id: string; title: string; body: string; isRead: boolean; createdAt: string };

export default function NotificationsPage() {
  const { currentUser, setNotificationsCount } = useContext(AppContext);
  const [items, setItems] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!currentUser) return;
    const load = async () => {
      setLoading(true);
      try {
        const res = await axiosClient.get("/api/notifications");
        setItems(res.data);
        const unread = res.data.filter((n: Notification) => !n.isRead).length;
        setNotificationsCount(unread);
      } catch (err) {
      } finally { setLoading(false); }
    };
    load();
  }, [currentUser, setNotificationsCount]);

  const markRead = async (id: string) => {
    await axiosClient.post(`/api/notifications/${id}/read`);
    setItems((s) => s.map((i) => (i.id === id ? { ...i, isRead: true } : i)));
    setNotificationsCount(items.filter((i) => !i.isRead && i.id !== id).length);
  };

  if (!currentUser) return <p>سجل الدخول لعرض الإشعارات</p>;

  return (
    <div className="p-4">
      <h2>الإشعارات</h2>
      {loading ? <p>جاري التحميل...</p> : items.map(n => (
        <div key={n.id} className={`p-2 border ${n.isRead ? "" : "bg-yellow-50"}`}>
          <h4>{n.title}</h4>
          <p>{n.body}</p>
          {!n.isRead && <button onClick={() => markRead(n.id)}>تمييز كمقروء</button>}
        </div>
      ))}
    </div>
  );
}