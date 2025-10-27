"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

export default function OnboardingForm() {
  const [channelName, setChannelName] = useState("")
  const [description, setDescription] = useState("")
  const [avatarUrl, setAvatarUrl] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Store user data (in real app, this would be API call)
    localStorage.setItem(
      "vixo_user",
      JSON.stringify({
        channelName,
        description,
        avatarUrl: avatarUrl || "/diverse-user-avatars.png",
      }),
    )
    router.push("/home")
  }

  return (
    <div className="relative min-h-screen bg-background overflow-hidden flex items-center justify-center p-4">
      {/* Animated heartbeat lines background */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
            style={{
              top: `${10 + i * 12}%`,
              animation: `flow-lines ${2 + i * 0.3}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/* Form container */}
      <div className="relative z-10 w-full max-w-md">
        <div className="glass-effect rounded-2xl p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <Sparkles className="w-8 h-8 text-primary mx-auto animate-pulse-glow" />
            <h2 className="text-3xl font-bold">إنشاء قناتك</h2>
            <p className="text-muted-foreground">ارسم مستقبلك في عالم باي</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Avatar upload */}
            <div className="flex justify-center">
              <div className="relative group cursor-pointer">
                <Avatar className="w-32 h-32 border-4 border-primary/50 group-hover:border-primary transition-all duration-300 ring-4 ring-primary/20">
                  <AvatarImage src={avatarUrl || "/placeholder.svg?height=200&width=200&query=user+avatar"} />
                  <AvatarFallback className="bg-muted">
                    <Camera className="w-8 h-8 text-muted-foreground" />
                  </AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>

            {/* Channel name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">اسم القناة</label>
              <Input
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
                placeholder="اختر اسماً مميزاً لقناتك"
                className="bg-input/50 border-border/50 focus:border-primary transition-all text-right"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">وصف الرؤية</label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="صف رؤيتك في سطر قصير..."
                className="bg-input/50 border-border/50 focus:border-primary transition-all resize-none text-right"
                rows={3}
                required
              />
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-l from-primary via-secondary to-primary bg-[length:200%_100%] hover:bg-[position:100%_0] transition-all duration-500 shadow-lg shadow-primary/50 hover:shadow-primary/70 hover:scale-105"
            >
              <span className="flex items-center gap-2">
                دخول البعد البصري
                <Sparkles className="w-5 h-5" />
              </span>
            </Button>
          </form>
        </div>
      </div>

      {/* Glow effects */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
    </div>
  )
}
