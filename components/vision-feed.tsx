"use client"

import { cn } from "@/lib/utils"

import { useState } from "react"
import { Heart, MessageCircle, MoreVertical, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const mockVideos = [
  {
    id: 1,
    channelName: "قناة المستقبل",
    verified: true,
    description: "مشروع جديد في عالم التقنية",
    videoUrl: "/futuristic-tech-video.jpg",
    likes: 1234,
    comments: 89,
    avatar: "/tech-avatar.png",
  },
  {
    id: 2,
    channelName: "رؤية الابتكار",
    verified: true,
    description: "كيف نبني المستقبل معاً",
    videoUrl: "/innovation-future.jpg",
    likes: 2341,
    comments: 156,
    avatar: "/innovation-avatar.jpg",
  },
]

export default function VisionFeed() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [liked, setLiked] = useState(false)

  const currentVideo = mockVideos[currentIndex]

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video container */}
      <div className="absolute inset-0">
        <img src={currentVideo.videoUrl || "/placeholder.svg"} alt="Video" className="w-full h-full object-cover" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
      </div>

      {/* Content overlay */}
      <div className="relative h-full flex flex-col justify-between p-4">
        {/* Top section - Channel info */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12 border-2 border-primary/50">
              <AvatarImage src={currentVideo.avatar || "/placeholder.svg"} />
              <AvatarFallback>CH</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">{currentVideo.channelName}</span>
                {currentVideo.verified && <CheckCircle className="w-4 h-4 text-primary fill-primary" />}
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-foreground">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>

        {/* Bottom section - Description and actions */}
        <div className="flex items-end justify-between gap-4">
          {/* Description */}
          <div className="flex-1 space-y-2">
            <p className="text-foreground text-lg font-medium text-balance">{currentVideo.description}</p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col items-center gap-6">
            {/* Like */}
            <button onClick={() => setLiked(!liked)} className="flex flex-col items-center gap-1 group">
              <div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300",
                  liked ? "bg-red-500/20 scale-110" : "bg-muted/20",
                )}
              >
                <Heart
                  className={cn(
                    "w-6 h-6 transition-all duration-300",
                    liked ? "fill-red-500 text-red-500" : "text-foreground",
                  )}
                />
              </div>
              <span className="text-xs text-foreground">{currentVideo.likes}</span>
            </button>

            {/* Comment */}
            <button className="flex flex-col items-center gap-1 group">
              <div className="w-12 h-12 rounded-full bg-muted/20 flex items-center justify-center group-hover:bg-accent/20 transition-all">
                <MessageCircle className="w-6 h-6 text-foreground" />
              </div>
              <span className="text-xs text-foreground">{currentVideo.comments}</span>
            </button>

            {/* Support with Pi */}
            <button className="flex flex-col items-center gap-1 group">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-lg shadow-primary/50 group-hover:scale-110 transition-all animate-pulse-glow">
                <span className="text-xl">π</span>
              </div>
              <span className="text-xs text-foreground">دعم</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
