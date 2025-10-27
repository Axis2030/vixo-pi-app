"use client"

import { useState, useEffect } from "react"
import { Camera, Music, Type } from "lucide-react"
import { Button } from "@/components/ui/button"

const mockShorts = [
  {
    id: 1,
    videoUrl: "/short-video-neon.jpg",
    channelName: "قناة الإبداع",
  },
  {
    id: 2,
    videoUrl: "/creative-short-purple.jpg",
    channelName: "رؤية سريعة",
  },
]

export default function ShortsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(3.14)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0.01) {
          setCurrentIndex((i) => (i + 1) % mockShorts.length)
          return 3.14
        }
        return prev - 0.01
      })
    }, 10)

    return () => clearInterval(timer)
  }, [])

  const progress = (timeLeft / 3.14) * 100

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-secondary/20 via-background to-primary/20">
      {/* Video container */}
      <div className="absolute inset-0">
        <img
          src={mockShorts[currentIndex].videoUrl || "/placeholder.svg"}
          alt="Short video"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Top section - Timer and logo */}
      <div className="relative z-10 p-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-l from-secondary via-primary to-accent bg-clip-text text-transparent">
            3.14 challenge
          </div>

          {/* Circular timer */}
          <div className="relative w-16 h-16">
            <svg className="transform -rotate-90 w-16 h-16">
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                className="text-muted/30"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 28}`}
                strokeDashoffset={`${2 * Math.PI * 28 * (1 - progress / 100)}`}
                className="text-primary transition-all duration-100"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-foreground">{timeLeft.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating record button */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10">
        <Button
          size="lg"
          className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 via-pink-500 to-purple-500 shadow-lg shadow-red-500/50 hover:scale-110 transition-all animate-pulse-glow"
        >
          <Camera className="w-8 h-8" />
        </Button>
      </div>

      {/* Bottom editing tools */}
      <div className="absolute bottom-32 left-0 right-0 z-10 px-4">
        <div className="flex items-center justify-center gap-4">
          <Button variant="ghost" size="icon" className="w-12 h-12 rounded-full glass-effect text-foreground">
            <Music className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="w-12 h-12 rounded-full glass-effect text-foreground">
            <Type className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
