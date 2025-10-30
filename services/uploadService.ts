// vixo-pi-app/services/uploadService.ts
import axiosClient from "@/lib/axiosClient";
export const uploadFile = async (form: FormData) => {
  const res = await axiosClient.post('/api/uploads', form, { headers: { 'Content-Type': 'multipart/form-data' } });
  return res.data;
}