"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

type User = {
  id: string;
  username: string;
  avatar_url ? : string;
  wallet_address ? : string;
};

type AppContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  videos: any[];
  fetchVideos: () => Promise < void > ;
};

const AppContext = createContext < AppContextType | undefined > (undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState < User | null > (null);
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState < any[] > ([]);
  
  // تحميل الفيديوهات
  const fetchVideos = async () => {
    const { data, error } = await supabase
      .from("videos")
      .select("*, users(username, avatar_url)")
      .order("created_at", { ascending: false });
    if (!error && data) setVideos(data);
  };
  
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        const { data: profile } = await supabase
          .from("users")
          .select("*")
          .eq("id", data.user.id)
          .single();
        setUser(profile);
      }
      setLoading(false);
    };
    getUser();
    fetchVideos();
  }, []);
  
  return (
    <AppContext.Provider value={{ user, setUser, loading, videos, fetchVideos }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};