"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Eye,
  Video,
  Zap,
  Rocket,
  User,
  Home,
  Search,
  Plus,
  Heart,
  MessageCircle,
  Share2,
  MoreVertical,
  Shield,
} from "lucide-react"
import Link from "next/link"

// Mock data for feed
const feedItems = [
  {
    id: 1,
    author: {
      name: "أحمد محمد",
      avatar: "/diverse-user-avatars.png",
      trustScore: 4.8,
    },
    content: {
      type: "video",
      thumbnail: "/tech-innovation-video.jpg",
      duration: "2:34",
      title: "مستقبل التكنولوجيا في العالم العربي",
    },
    stats: {
      likes: 1234,
      comments: 89,
      shares: 45,
    },
    timestamp: "منذ ساعتين",
  },
  {
    id: 2,
    author: {
      name: "فاطمة علي",
      avatar: "/diverse-woman-avatar.png",
      trustScore: 4.9,
    },
    content: {
      type: "video",
      thumbnail: "/startup-pitch.png",
      duration: "5:12",
      title: "كيف بدأت مشروعي الناشئ من الصفر",
    },
    stats: {
      likes: 2341,
      comments: 156,
      shares: 78,
    },
    timestamp: "منذ 4 ساعات",
  },
]

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState("home")

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect border-b border-border">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Eye className="w-8 h-8 text-primary" strokeWidth={1.5} />
            <h1 className="text-2xl font-bold bg-gradient-to-l from-primary via-secondary to-accent bg-clip-text text-transparent">
              Vixo π
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="flex items-center justify-around px-4 pb-2">
          <button
            onClick={() => setActiveTab("home")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === "home" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Home className="w-4 h-4" />
            <span className="text-sm font-medium">الرئيسية</span>
          </button>
          <button
            onClick={() => setActiveTab("vision")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === "vision" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Video className="w-4 h-4" />
            <span className="text-sm font-medium">الرؤية</span>
          </button>
          <button
            onClick={() => setActiveTab("shorts")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === "shorts" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">3.14</span>
          </button>
        </div>
      </header>

      {/* Feed content */}
      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {feedItems.map((item) => (
          <Card key={item.id} className="overflow-hidden border-border bg-card">
            {/* Author info */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <img
                  src={item.author.avatar || "/placeholder.svg"}
                  alt={item.author.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-sm">{item.author.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <span>{item.timestamp}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Shield className="w-3 h-3 text-primary" />
                      {item.author.trustScore}
                    </span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>

            {/* Video thumbnail */}
            <div className="relative aspect-video bg-muted">
              <img
                src={item.content.thumbnail || "/placeholder.svg"}
                alt={item.content.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center backdrop-blur-sm">
                  <Video className="w-8 h-8 text-primary-foreground" fill="currentColor" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/70 text-white text-xs">
                {item.content.duration}
              </div>
            </div>

            {/* Content title */}
            <div className="p-4">
              <h4 className="font-semibold text-balance">{item.content.title}</h4>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-around px-4 pb-4 border-t border-border pt-3">
              <Button variant="ghost" size="sm" className="gap-2">
                <Heart className="w-5 h-5" />
                <span className="text-sm">{item.stats.likes}</span>
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm">{item.stats.comments}</span>
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <Share2 className="w-5 h-5" />
                <span className="text-sm">{item.stats.shares}</span>
              </Button>
            </div>
          </Card>
        ))}
      </main>

      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 glass-effect border-t border-border">
        <div className="flex items-center justify-around p-4 max-w-2xl mx-auto">
          <Link href="/feed">
            <Button variant="ghost" size="icon" className="text-primary">
              <Home className="w-6 h-6" />
            </Button>
          </Link>
          <Link href="/shorts">
            <Button variant="ghost" size="icon">
              <Zap className="w-6 h-6" />
            </Button>
          </Link>
          <Button
            size="icon"
            className="w-14 h-14 rounded-full bg-gradient-to-l from-primary via-secondary to-primary shadow-lg shadow-primary/50"
          >
            <Plus className="w-7 h-7" />
          </Button>
          <Link href="/incubator">
            <Button variant="ghost" size="icon">
              <Rocket className="w-6 h-6" />
            </Button>
          </Link>
          <Link href="/profile">
            <Button variant="ghost" size="icon">
              <User className="w-6 h-6" />
            </Button>
          </Link>
        </div>
      </nav>
    </div>
  )
}
