import axiosClient from "@/config/client";

export interface VideoData {
  id: string;
  title: string;
  description ? : string;
  url: string;
  thumbnail ? : string;
  creatorId: string;
  createdAt: string;
  likesCount ? : number;
  commentsCount ? : number;
}

export const getVideos = async (): Promise < VideoData[] > => {
  const res = await axiosClient.get("/videos");
  return res.data;
};

export const getVideoById = async (id: string): Promise < VideoData > => {
  const res = await axiosClient.get(`/videos/${id}`);
  return res.data;
};

export const uploadVideo = async (formData: FormData): Promise < VideoData > => {
  const res = await axiosClient.post("/videos", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const likeVideo = async (id: string): Promise < { success: boolean } > => {
  const res = await axiosClient.post(`/videos/${id}/like`);
  return res.data;
};

export const commentOnVideo = async (id: string, text: string) => {
  const res = await axiosClient.post(`/videos/${id}/comments`, { text });
  return res.data;
};