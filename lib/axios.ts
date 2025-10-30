import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "", // يمكن تركه فارغاً إن كنت تستخدم API routes في Next
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;