"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/lib/supabaseClient";
import axiosClient, { setAuthToken } from "@/lib/axiosClient";
import logger from "@/lib/logger.config"; // أو أي ملف Logger لديك
import { IUser, MembershipClassType } from "@/constants/types";
import { AuthResult } from "@/constants/pi";
import { onIncompletePaymentFound } from "@/config/payment";

interface INotification {
  id: string;
  title: string;
  body: string;
  isRead: boolean;
  created_at: string;
}

interface IAppContextProps {
  currentUser: IUser | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  isSigningInUser: boolean;
  registerUser: () => void;
  autoLoginUser: () => void;

  userMembership: MembershipClassType;
  setUserMembership: React.Dispatch<React.SetStateAction<MembershipClassType>>;

  notifications: INotification[];
  setNotificationsCount: React.Dispatch<React.SetStateAction<number>>;
  fetchNotifications: () => Promise<void>;

  addComment: (targetType: string, targetId: string, content: string) => void;
  toggleLike: (targetType: string, targetId: string) => void;
}

const initialState: IAppContextProps = {
  currentUser: null,
  setCurrentUser: () => {},
  isSigningInUser: false,
  registerUser: async () => {},
  autoLoginUser: async () => {},
  userMembership: MembershipClassType.CASUAL,
  setUserMembership: () => {},
  notifications: [],
  setNotificationsCount: () => {},
  fetchNotifications: async () => {},
  addComment: () => {},
  toggleLike: () => {},
};

export const AppContext = createContext<IAppContextProps>(initialState);

interface AppContextProviderProps {
  children: ReactNode;
}

const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [isSigningInUser, setIsSigningInUser] = useState(false);
  const [userMembership, setUserMembership] = useState<MembershipClassType>(MembershipClassType.CASUAL);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [notificationsCount, setNotificationsCount] = useState(0);

  // ----------------------------------------
  // Pi SDK load & user authentication
  // ----------------------------------------
  const loadPiSdk = (): Promise<typeof window.Pi> => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://sdk.minepi.com/pi-sdk.js";
      script.async = true;
      script.onload = () => resolve(window.Pi);
      script.onerror = () => reject(new Error("Failed to load Pi SDK"));
      document.head.appendChild(script);
    });
  };

  const registerUser = async () => {
    if (typeof window === "undefined" || !window.Pi?.initialized) {
      logger.error("Pi SDK not initialized");
      return;
    }
    try {
      setIsSigningInUser(true);
      const pioneerAuth: AuthResult = await window.Pi.authenticate(
        ["username", "payments", "wallet_address"],
        onIncompletePaymentFound
      );

      const res = await axiosClient.post(
        "/users/authenticate",
        {},
        { headers: { Authorization: `Bearer ${pioneerAuth.accessToken}` } }
      );

      if (res.status === 200) {
        setAuthToken(res.data?.token);
        setCurrentUser(res.data.user);
        setUserMembership(res.data.membership_class);
        logger.info("User authenticated successfully");
      } else {
        setCurrentUser(null);
        logger.error("User authentication failed");
      }
    } catch (err) {
      logger.error("Error during user registration:", err);
    } finally {
      setTimeout(() => setIsSigningInUser(false), 2500);
    }
  };

  const autoLoginUser = async () => {
    try {
      setIsSigningInUser(true);
      const res = await axiosClient.get("/users/me");
      if (res.status === 200) {
        setCurrentUser(res.data.user);
        setUserMembership(res.data.membership_class);
        logger.info("Auto-login success");
      } else {
        setCurrentUser(null);
        await registerUser();
      }
    } catch (err) {
      logger.error("Auto-login failed, fallback to Pi SDK:", err);
      await registerUser();
    } finally {
      setTimeout(() => setIsSigningInUser(false), 2500);
    }
  };

  useEffect(() => {
    autoLoginUser();
    loadPiSdk().catch((err) => logger.error("Pi SDK load error:", err));
  }, []);

  // ----------------------------------------
  // Notifications
  // ----------------------------------------
  const fetchNotifications = async () => {
    if (!currentUser) return;

    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", currentUser.id)
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) logger.error("Fetch notifications error:", error);
    else {
      setNotifications(data || []);
      const unread = (data || []).filter((n) => !n.isRead).length;
      setNotificationsCount(unread);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [currentUser]);

  // ----------------------------------------
  // Comments & Likes
  // ----------------------------------------
  const addComment = async (targetType: string, targetId: string, content: string) => {
    if (!currentUser) return;

    const { error } = await supabase.from("comments").insert({
      user_id: currentUser.id,
      target_type: targetType,
      target_id: targetId,
      content,
    });

    if (error) logger.error("Add comment error:", error);
    else fetchNotifications(); // تحديث الإشعارات
  };

  const toggleLike = async (targetType: string, targetId: string) => {
    if (!currentUser) return;

    const { data: existingLikes } = await supabase
      .from("likes")
      .select("*")
      .eq("user_id", currentUser.id)
      .eq("target_type", targetType)
      .eq("target_id", targetId);

    if (existingLikes && existingLikes.length > 0) {
      await supabase.from("likes").delete().eq("id", existingLikes[0].id);
    } else {
      await supabase.from("likes").insert({
        user_id: currentUser.id,
        target_type: targetType,
        target_id: targetId,
      });
    }

    fetchNotifications();
  };

  // ----------------------------------------
  // Return context
  // ----------------------------------------
  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isSigningInUser,
        registerUser,
        autoLoginUser,
        userMembership,
        setUserMembership,
        notifications,
        setNotificationsCount,
        fetchNotifications,
        addComment,
        toggleLike,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;