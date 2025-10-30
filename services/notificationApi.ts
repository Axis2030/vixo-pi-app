// vixo-pi-app/services/notificationApi.ts
import axiosClient from "@/lib/axiosClient";

export async function getNotifications({ skip = 0, limit = 20, status = "all" }:
  { skip?: number; limit?: number; status?: string }) {
  const res = await axiosClient.get(`/api/notifications?skip=${skip}&limit=${limit}&status=${status}`);
  return res.data;
}