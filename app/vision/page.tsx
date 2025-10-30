"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Eye,
  Video,
  Search,
  Filter,
  TrendingUp,
  Clock,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreVertical,
  Play,
  Shield,
  ChevronDown,
} from "lucide-react"
import Link from "next/link"

// Mock video data
const videos = [
  {
    id: 1,
    title: "مستقبل الذكاء الاصطناعي في العالم العربي",
    description: "نظرة شاملة على كيفية تأثير الذكاء الاصطناعي على مستقبل التكنولوجيا في المنطقة العربية",
    thumbnail: "/ai-futuristic-city.png",
    duration: "12:34",
    views: 45600,
    author: {
      name: "د. أحمد التقني",
      avatar: "/professional-man-avatar.png",
      trustScore: 4.9,
      verified: true,
    },
    stats: {
      likes: 3420,
      comments: 234,
      shares: 156,
      bookmarks: 890,
    },
    category: "تكنولوجيا",
    uploadedAt: "منذ يومين",
    trending: true,
  },
  {
    id: 2,
    title: "رحلتي في بناء شركة ناشئة من الصفر",
    description: "قصة نجاح ملهمة عن كيفية تحويل فكرة بسيطة إلى شركة ناشئة ناجحة",
    thumbnail: "/startup-entrepreneur-office.jpg",
    duration: "18:45",
    views: 67800,
    author: {
      name: "سارة المبتكرة",
      avatar: "/professional-woman-avatar.png",
      trustScore: 4.8,
      verified: true,
    },
    stats: {
      likes: 5670,
      comments: 445,
      shares: 289,
      bookmarks: 1234,
    },
    category: "ريادة أعمال",
    uploadedAt: "منذ 3 أيام",
    trending: true,
  },
  {
    id: 3,
    title: "تصميم تطبيقات الموبايل: دليل شامل للمبتدئين",
    description: "تعلم أساسيات تصميم واجهات المستخدم وتجربة المستخدم للتطبيقات",
    thumbnail: "/mobile-app-design-ui-ux.jpg",
    duration: "25:12",
    views: 34200,
    author: {
      name: "محمد المصمم",
      avatar: "/creative-designer-avatar.png",
      trustScore: 4.7,
      verified: false,
    },
    stats: {
      likes: 2890,
      comments: 178,
      shares: 123,
      bookmarks: 567,
    },
    category: "تصميم",
    uploadedAt: "منذ أسبوع",
    trending: false,
  },
  {
    id: 4,
    title: "استراتيجيات التسويق الرقمي الفعالة في 2025",
    description: "أحدث الاتجاهات والأدوات في عالم التسويق الرقمي",
    thumbnail: "/digital-marketing-strategy.png",
    duration: "15:30",
    views: 28900,
    author: {
      name: "ليلى التسويقية",
      avatar: "/marketing-professional-woman.png",
      trustScore: 4.6,
      verified: true,
    },
    stats: {
      likes: 2340,
      comments: 156,
      shares: 98,
      bookmarks: 445,
    },
    category: "تسويق",
    uploadedAt: "منذ 5 أيام",
    trending: false,
  },
]

const categories = ["الكل", "تكنولوجيا", "ريادة أعمال", "تصميم", "تسويق", "تعليم", "صحة"]

export default function VisionPage() {
  const [selectedCategory, setSelectedCategory] = useState("الكل")
  const [sortBy, setSortBy] = useState<"trending" | "recent" | "popular">("trending")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredVideos = videos.filter((video) => {
    const matchesCategory = selectedCategory === "الكل" || video.category === selectedCategory
    const matchesSearch =
      searchQuery === "" ||
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link href="/feed" className="flex items-center gap-2">
              <Eye className="w-8 h-8 text-primary" strokeWidth={1.5} />
              <h1 className="text-2xl font-bold bg-gradient-to-l from-primary via-secondary to-accent bg-clip-text text-transparent">
                Vixo π
              </h1>
            </Link>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Filter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="ابحث عن الفيديوهات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 bg-muted/50"
            />
          </div>
        </div>
      </header>

      {/* Categories */}
      <div className="sticky top-[120px] z-40 glass-effect border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sort options */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSortBy("trending")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              sortBy === "trending" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            الأكثر رواجاً
          </button>
          <button
            onClick={() => setSortBy("recent")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              sortBy === "recent" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Clock className="w-4 h-4" />
            الأحدث
          </button>
          <button
            onClick={() => setSortBy("popular")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              sortBy === "popular" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Video className="w-4 h-4" />
            الأكثر مشاهدة
          </button>
        </div>
      </div>

      {/* Video grid */}
      <main className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <Card
              key={video.id}
              className="group overflow-hidden border-border bg-card hover:border-primary/50 transition-all duration-300 cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-muted overflow-hidden">
                <img
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Play overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center backdrop-blur-sm">
                    <Play className="w-8 h-8 text-primary-foreground" fill="currentColor" />
                  </div>
                </div>
                {/* Duration */}
                <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/80 text-white text-xs font-medium">
                  {video.duration}
                </div>
                {/* Trending badge */}
                {video.trending && (
                  <div className="absolute top-2 left-2 px-2 py-1 rounded bg-primary/90 text-primary-foreground text-xs font-medium flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    رائج
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                {/* Author info */}
                <div className="flex items-start gap-3">
                  <img
                    src={video.author.avatar || "/placeholder.svg"}
                    alt={video.author.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm line-clamp-2 text-balance">{video.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">{video.author.name}</span>
                      {video.author.verified && <Shield className="w-3 h-3 text-primary" fill="currentColor" />}
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{video.views.toLocaleString()} مشاهدة</span>
                  <span>•</span>
                  <span>{video.uploadedAt}</span>
                </div>

                {/* Description */}
                <p className="text-xs text-muted-foreground line-clamp-2 text-pretty">{video.description}</p>

                {/* Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                      <Heart className="w-4 h-4" />
                      <span>{video.stats.likes.toLocaleString()}</span>
                    </button>
                    <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span>{video.stats.comments}</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Bookmark className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Trust score */}
                <div className="flex items-center gap-2 pt-2">
                  <div className="flex items-center gap-1 text-xs">
                    <Shield className="w-3 h-3 text-primary" />
                    <span className="text-muted-foreground">درجة الأمانة:</span>
                    <span className="font-semibold text-primary">{video.author.trustScore}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Load more */}
        <div className="flex justify-center mt-8">
          <Button variant="outline" size="lg" className="gap-2 bg-transparent">
            تحميل المزيد
            <ChevronDown className="w-4 h-4" />
          </Button>
        </div>
      </main>
    </div>
  )
}
