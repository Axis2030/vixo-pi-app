"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useApp } from "@/context/AppContext";

interface CommentsSectionProps {
  targetType: "video" | "project";
  targetId: string;
}

export default function CommentsSection({ targetType, targetId }: CommentsSectionProps) {
  const { currentUser, addComment, toggleLike } = useApp();
  const [comments, setComments] = useState < any[] > ([]);
  const [newComment, setNewComment] = useState("");
  
  const fetchComments = async () => {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("target_type", targetType)
      .eq("target_id", targetId)
      .order("created_at", { ascending: true });
    if (!error) setComments(data || []);
  };
  
  useEffect(() => {
    fetchComments();
  }, []);
  
  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    await addComment(targetType, targetId, newComment);
    setNewComment("");
    fetchComments();
  };
  
  return (
    <div className="space-y-2">
      <h3 className="font-bold">التعليقات</h3>

      {comments.map((c) => (
        <div key={c.id} className="p-2 border rounded">
          <p>{c.content}</p>
          <small>من: {c.user_id}</small>
        </div>
      ))}

      {currentUser && (
        <div className="flex space-x-2 mt-2">
          <input
            type="text"
            placeholder="أضف تعليقك..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="border rounded p-1 flex-1"
          />
          <button onClick={handleAddComment} className="bg-blue-500 text-white px-2 rounded">
            إضافة
          </button>
        </div>
      )}
    </div>
  );
}