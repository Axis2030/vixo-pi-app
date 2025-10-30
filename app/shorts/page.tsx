"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreVertical,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Shield,
  Eye,
  ChevronUp,
  ChevronDown,
  Send,
} from "lucide-react"
import Link from "next/link"

// Mock shorts data
const shortsData = [
  {
    id: 1,
    videoUrl: "/quick-tech-tip.jpg",
    title: "نصيحة تقنية سريعة",
    description: "اختصار لوحة المفاتيح الذي سيغير حياتك",
    author: {
      name: "تقني سريع",
      avatar: "/tech-expert-avatar.jpg",
      trustScore: 4.7,
      verified: true,
    },
    stats: {
      likes: 12400,
      comments: 234,
      shares: 89,
      bookmarks: 456,
    },
    hashtags: ["#تقنية", "#نصائح", "#إنتاجية"],
  },
  {
    id: 2,
    videoUrl: "/creative-animation.jpg",
    title: "رسوم متحركة إبداعية",
    description: "تحويل الأفكار إلى حركة في 3.14 ثانية",
    author: {
      name: "مبدع الرسوم",
      avatar: "/animator-avatar.jpg",
      trustScore: 4.9,
      verified: true,
    },
    stats: {
      likes: 23500,
      comments: 567,
      shares: 234,
      bookmarks: 890,
    },
    hashtags: ["#رسوم_متحركة", "#إبداع", "#فن"],
  },
  {
    id: 3,
    videoUrl: "/cooking-hack.jpg",
    title: "حيلة طبخ سريعة",
    description: "طريقة جديدة لتقطيع البصل بدون دموع",
    author: {
      name: "شيف المنزل",
      avatar: "/chef-avatar.jpg",
      trustScore: 4.6,
      verified: false,
    },
    stats: {
      likes: 18900,
      comments: 345,
      shares: 156,
      bookmarks: 678,
    },
    hashtags: ["#طبخ", "#حيل", "#مطبخ"],
  },
  {
    id: 4,
    videoUrl: "/fitness-exercise.jpg",
    title: "تمرين سريع",
    description: "تمرين فعال يمكنك القيام به في أي مكان",
    author: {
      name: "مدرب اللياقة",
      avatar: "/fitness-trainer-avatar.jpg",
      trustScore: 4.8,
      verified: true,
    },
    stats: {
      likes: 31200,
      comments: 678,
      shares: 345,
      bookmarks: 1234,
    },
    hashtags: ["#لياقة", "#صحة", "#تمارين"],
  },
]

export default function ShortsPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [commentText, setCommentText] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)

  const currentShort = shortsData[currentIndex]

  const handleNext = () => {
    if (currentIndex < shortsData.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setIsLiked(false)
      setIsBookmarked(false)
      setShowComments(false)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setIsLiked(false)
      setIsBookmarked(false)
      setShowComments(false)
    }
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") handlePrevious()
      if (e.key === "ArrowDown") handleNext()
      if (e.key === " ") {
        e.preventDefault()
        setIsPlaying(!isPlaying)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentIndex, isPlaying])

  return (
    <div className="fixed inset-0 bg-background overflow-hidden">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 glass-effect">
        <div className="flex items-center justify-between p-4">
          <Link href="/feed" className="flex items-center gap-2">
            <Eye className="w-6 h-6 text-primary" strokeWidth={1.5} />
            <h1 className="text-xl font-bold bg-gradient-to-l from-primary via-secondary to-accent bg-clip-text text-transparent">
              3.14 Shorts
            </h1>
          </Link>
          <Button variant="ghost" size="icon">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Main content - Swipeable shorts */}
      <div ref={containerRef} className="relative h-full w-full">
        {/* Video container */}
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="relative w-full h-full max-w-md mx-auto">
            {/* Video/Image */}
            <img
              src={currentShort.videoUrl || "/placeholder.svg"}
              alt={currentShort.title}
              className="w-full h-full object-cover"
            />

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

            {/* Play/Pause overlay */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Play className="w-10 h-10 text-white" fill="currentColor" />
                </div>
              </div>
            )}

            {/* Top info */}
            <div className="absolute top-20 left-0 right-0 px-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={currentShort.author.avatar || "/placeholder.svg"}
                    alt={currentShort.author.name}
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-white font-semibold text-sm">{currentShort.author.name}</span>
                      {currentShort.author.verified && <Shield className="w-3 h-3 text-primary" fill="currentColor" />}
                    </div>
                    <div className="flex items-center gap-1">
                      <Shield className="w-3 h-3 text-white/80" />
                      <span className="text-white/80 text-xs">{currentShort.author.trustScore}</span>
                    </div>
                  </div>
                  <Button size="sm" className="ml-2 h-8 bg-primary hover:bg-primary/90">
                    متابعة
                  </Button>
                </div>
              </div>
            </div>

            {/* Bottom info */}
            <div className="absolute bottom-20 left-0 right-0 px-4 space-y-3">
              <div className="space-y-2">
                <h3 className="text-white font-bold text-lg text-balance">{currentShort.title}</h3>
                <p className="text-white/90 text-sm text-pretty">{currentShort.description}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  {currentShort.hashtags.map((tag) => (
                    <span key={tag} className="text-primary text-sm font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Progress bar for 3.14 seconds */}
              <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-[3140ms] ease-linear"
                  style={{ width: isPlaying ? "100%" : "33%" }}
                />
              </div>
            </div>

            {/* Right side actions */}
            <div className="absolute right-4 bottom-32 flex flex-col items-center gap-6">
              {/* Like */}
              <button onClick={handleLike} className="flex flex-col items-center gap-1 group">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    isLiked ? "bg-primary" : "bg-white/20 backdrop-blur-sm"
                  }`}
                >
                  <Heart className={`w-6 h-6 transition-all ${isLiked ? "text-white fill-white" : "text-white"}`} />
                </div>
                <span className="text-white text-xs font-medium">
                  {(currentShort.stats.likes + (isLiked ? 1 : 0)).toLocaleString()}
                </span>
              </button>

              {/* Comments */}
              <button onClick={() => setShowComments(!showComments)} className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <span className="text-white text-xs font-medium">{currentShort.stats.comments}</span>
              </button>

              {/* Bookmark */}
              <button onClick={handleBookmark} className="flex flex-col items-center gap-1">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    isBookmarked ? "bg-secondary" : "bg-white/20 backdrop-blur-sm"
                  }`}
                >
                  <Bookmark
                    className={`w-6 h-6 transition-all ${isBookmarked ? "text-white fill-white" : "text-white"}`}
                  />
                </div>
                <span className="text-white text-xs font-medium">
                  {(currentShort.stats.bookmarks + (isBookmarked ? 1 : 0)).toLocaleString()}
                </span>
              </button>

              {/* Share */}
              <button className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Share2 className="w-6 h-6 text-white" />
                </div>
                <span className="text-white text-xs font-medium">{currentShort.stats.shares}</span>
              </button>

              {/* More */}
              <button className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <MoreVertical className="w-6 h-6 text-white" />
                </div>
              </button>
            </div>

            {/* Center play/pause button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute left-4 bottom-32 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-white" />
              ) : (
                <Play className="w-6 h-6 text-white" fill="currentColor" />
              )}
            </button>

            {/* Mute button */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="absolute left-4 bottom-48 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
            >
              {isMuted ? <VolumeX className="w-6 h-6 text-white" /> : <Volume2 className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>

        {/* Navigation arrows */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col gap-96 pointer-events-none">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`pointer-events-auto w-12 h-12 rounded-full glass-effect flex items-center justify-center transition-opacity ${
              currentIndex === 0 ? "opacity-30 cursor-not-allowed" : "opacity-70 hover:opacity-100"
            }`}
          >
            <ChevronUp className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === shortsData.length - 1}
            className={`pointer-events-auto w-12 h-12 rounded-full glass-effect flex items-center justify-center transition-opacity ${
              currentIndex === shortsData.length - 1 ? "opacity-30 cursor-not-allowed" : "opacity-70 hover:opacity-100"
            }`}
          >
            <ChevronDown className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Progress indicator */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-2">
          {shortsData.map((_, index) => (
            <div
              key={index}
              className={`w-1 h-8 rounded-full transition-all ${
                index === currentIndex ? "bg-primary" : index < currentIndex ? "bg-white/50" : "bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Comments drawer */}
      {showComments && (
        <div className="absolute inset-0 z-50 flex items-end">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowComments(false)} />
          <div className="relative w-full max-w-md mx-auto bg-card rounded-t-3xl p-6 max-h-[70vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">{currentShort.stats.comments} تعليق</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowComments(false)}>
                إغلاق
              </Button>
            </div>

            {/* Add comment */}
            <div className="flex gap-2 mb-6">
              <img src="/diverse-user-avatars.png" alt="Your avatar" className="w-8 h-8 rounded-full" />
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  placeholder="أضف تعليقاً..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-full bg-muted text-sm focus:outline-hidden focus:ring-2 focus:ring-primary"
                />
                <Button size="icon" disabled={!commentText.trim()} className="rounded-full">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Sample comments */}
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-3">
                  <img src="/diverse-user-avatars.png" alt="User" className="w-8 h-8 rounded-full" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">مستخدم {i}</span>
                      <span className="text-xs text-muted-foreground">منذ {i} ساعة</span>
                    </div>
                    <p className="text-sm mt-1">تعليق رائع ومفيد جداً!</p>
                    <div className="flex items-center gap-4 mt-2">
                      <button className="text-xs text-muted-foreground hover:text-primary">
                        <Heart className="w-3 h-3 inline ml-1" />
                        {12 * i}
                      </button>
                      <button className="text-xs text-muted-foreground hover:text-primary">رد</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
