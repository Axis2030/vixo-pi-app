"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {
  Eye,
  ArrowRight,
  MessageCircle,
  Share2,
  Bookmark,
  MoreVertical,
  ThumbsUp,
  ThumbsDown,
  Shield,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
} from "lucide-react"
import Link from "next/link"

// Mock video data
const videoData = {
  id: 1,
  title: "مستقبل الذكاء الاصطناعي في العالم العربي",
  description:
    "نظرة شاملة على كيفية تأثير الذكاء الاصطناعي على مستقبل التكنولوجيا في المنطقة العربية. نناقش في هذا الفيديو أحدث التطورات والتحديات والفرص المتاحة.",
  videoUrl: "/ai-presentation.png",
  duration: "12:34",
  views: 45600,
  uploadedAt: "منذ يومين",
  category: "تكنولوجيا",
  author: {
    name: "د. أحمد التقني",
    avatar: "/professional-man-avatar.png",
    trustScore: 4.9,
    verified: true,
    subscribers: 125000,
  },
  stats: {
    likes: 3420,
    dislikes: 45,
    comments: 234,
    shares: 156,
    bookmarks: 890,
  },
}

const comments = [
  {
    id: 1,
    author: {
      name: "محمد علي",
      avatar: "/diverse-user-avatars.png",
      trustScore: 4.5,
    },
    content: "محتوى رائع ومفيد جداً! شكراً على المجهود الكبير",
    likes: 45,
    replies: 3,
    timestamp: "منذ ساعة",
  },
  {
    id: 2,
    author: {
      name: "فاطمة أحمد",
      avatar: "/diverse-woman-avatar.png",
      trustScore: 4.7,
    },
    content: "هل يمكن أن تشارك المصادر التي استخدمتها في البحث؟",
    likes: 23,
    replies: 1,
    timestamp: "منذ ساعتين",
  },
]

const relatedVideos = [
  {
    id: 2,
    title: "تطبيقات الذكاء الاصطناعي في الطب",
    thumbnail: "/medical-ai.png",
    duration: "8:45",
    views: 23400,
    author: "د. سارة الطبية",
  },
  {
    id: 3,
    title: "كيف تبدأ في تعلم الذكاء الاصطناعي",
    thumbnail: "/ai-learning-education.jpg",
    duration: "15:20",
    views: 56700,
    author: "أحمد المعلم",
  },
]

export default function VideoPlayerPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [commentText, setCommentText] = useState("")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/vision" className="flex items-center gap-2">
              <ArrowRight className="w-6 h-6" />
              <Eye className="w-8 h-8 text-primary" strokeWidth={1.5} />
              <h1 className="text-xl font-bold bg-gradient-to-l from-primary via-secondary to-accent bg-clip-text text-transparent">
                Vixo π
              </h1>
            </Link>
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video player */}
            <Card className="overflow-hidden border-border bg-card">
              <div className="relative aspect-video bg-black group">
                <img
                  src={videoData.videoUrl || "/placeholder.svg"}
                  alt={videoData.title}
                  className="w-full h-full object-cover"
                />
                {/* Video controls overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3">
                    {/* Progress bar */}
                    <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
                      <div className="h-full w-1/3 bg-primary rounded-full" />
                    </div>
                    {/* Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="text-white hover:bg-white/20"
                        >
                          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" fill="currentColor" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setIsMuted(!isMuted)}
                          className="text-white hover:bg-white/20"
                        >
                          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </Button>
                        <span className="text-white text-sm">4:23 / 12:34</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                          <Settings className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                          <Maximize className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Video info */}
            <div className="space-y-4">
              <div>
                <h1 className="text-2xl font-bold text-balance mb-2">{videoData.title}</h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{videoData.views.toLocaleString()} مشاهدة</span>
                  <span>•</span>
                  <span>{videoData.uploadedAt}</span>
                  <span>•</span>
                  <span className="px-2 py-1 rounded bg-primary/20 text-primary">{videoData.category}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Button
                    variant={isLiked ? "default" : "outline"}
                    size="sm"
                    onClick={() => setIsLiked(!isLiked)}
                    className="gap-2"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>{videoData.stats.likes.toLocaleString()}</span>
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <ThumbsDown className="w-4 h-4" />
                    <span>{videoData.stats.dislikes}</span>
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <MessageCircle className="w-4 h-4" />
                    <span>{videoData.stats.comments}</span>
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <Share2 className="w-4 h-4" />
                    <span>{videoData.stats.shares}</span>
                  </Button>
                  <Button
                    variant={isBookmarked ? "default" : "outline"}
                    size="sm"
                    onClick={() => setIsBookmarked(!isBookmarked)}
                  >
                    <Bookmark className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Author info */}
              <Card className="p-4 border-border bg-card">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <img
                      src={videoData.author.avatar || "/placeholder.svg"}
                      alt={videoData.author.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{videoData.author.name}</h3>
                        {videoData.author.verified && <Shield className="w-4 h-4 text-primary" fill="currentColor" />}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {videoData.author.subscribers.toLocaleString()} متابع
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <Shield className="w-3 h-3 text-primary" />
                        <span className="text-xs text-muted-foreground">درجة الأمانة:</span>
                        <span className="text-xs font-semibold text-primary">{videoData.author.trustScore}</span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" className="bg-primary">
                    متابعة
                  </Button>
                </div>
                <p className="mt-4 text-sm text-muted-foreground text-pretty">{videoData.description}</p>
              </Card>

              {/* Comments section */}
              <Card className="p-4 border-border bg-card">
                <h3 className="font-semibold mb-4">{videoData.stats.comments} تعليق</h3>

                {/* Add comment */}
                <div className="flex gap-3 mb-6">
                  <img src="/diverse-user-avatars.png" alt="Your avatar" className="w-10 h-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Textarea
                      placeholder="أضف تعليقاً..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="min-h-[80px] resize-none"
                    />
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => setCommentText("")}>
                        إلغاء
                      </Button>
                      <Button size="sm" disabled={!commentText.trim()}>
                        تعليق
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Comments list */}
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <img
                        src={comment.author.avatar || "/placeholder.svg"}
                        alt={comment.author.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1 space-y-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm">{comment.author.name}</span>
                            <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                            <div className="flex items-center gap-1">
                              <Shield className="w-3 h-3 text-primary" />
                              <span className="text-xs text-primary">{comment.author.trustScore}</span>
                            </div>
                          </div>
                          <p className="text-sm mt-1 text-pretty">{comment.content}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                            <ThumbsUp className="w-3 h-3" />
                            <span>{comment.likes}</span>
                          </button>
                          <button className="text-xs text-muted-foreground hover:text-primary transition-colors">
                            رد ({comment.replies})
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          {/* Sidebar - Related videos */}
          <div className="space-y-4">
            <h3 className="font-semibold">فيديوهات ذات صلة</h3>
            <div className="space-y-4">
              {relatedVideos.map((video) => (
                <Card
                  key={video.id}
                  className="overflow-hidden border-border bg-card hover:border-primary/50 transition-colors cursor-pointer"
                >
                  <div className="flex gap-3 p-3">
                    <div className="relative w-40 aspect-video bg-muted rounded overflow-hidden flex-shrink-0">
                      <img
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-white text-xs">
                        {video.duration}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm line-clamp-2 text-balance mb-1">{video.title}</h4>
                      <p className="text-xs text-muted-foreground">{video.author}</p>
                      <p className="text-xs text-muted-foreground mt-1">{video.views.toLocaleString()} مشاهدة</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
