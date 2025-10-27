"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Settings,
  Shield,
  Video,
  Zap,
  Rocket,
  Heart,
  Eye,
  Share2,
  CheckCircle2,
  Users,
  MessageCircle,
} from "lucide-react"
import Link from "next/link"

// Mock user data
const userData = {
  name: "أحمد محمد",
  username: "@ahmed_tech",
  avatar: "/user-profile-avatar.png",
  cover: "/profile-cover-cosmic.jpg",
  bio: "مطور ومبدع محتوى تقني | شغوف بالذكاء الاصطناعي والتكنولوجيا | أشارك رؤيتي مع العالم",
  trustScore: 4.8,
  verified: true,
  stats: {
    followers: 12400,
    following: 567,
    posts: 234,
    likes: 45600,
  },
  joined: "يناير 2024",
}

// Mock content
const userVideos = [
  {
    id: 1,
    thumbnail: "/user-video-1.jpg",
    title: "مستقبل الذكاء الاصطناعي",
    views: 12400,
    likes: 890,
    duration: "5:34",
  },
  {
    id: 2,
    thumbnail: "/user-video-2.png",
    title: "نصائح البرمجة للمبتدئين",
    views: 8900,
    likes: 567,
    duration: "8:12",
  },
  {
    id: 3,
    thumbnail: "/user-video-3.jpg",
    title: "تطوير تطبيقات الموبايل",
    views: 15600,
    likes: 1234,
    duration: "12:45",
  },
]

const userShorts = [
  { id: 1, thumbnail: "/user-short-1.png", views: 23400, likes: 1890 },
  { id: 2, thumbnail: "/user-short-2.jpg", views: 34500, likes: 2340 },
  { id: 3, thumbnail: "/user-short-3.png", views: 18900, likes: 1456 },
  { id: 4, thumbnail: "/user-short-4.jpg", views: 28700, likes: 2100 },
]

const userProjects = [
  {
    id: 1,
    title: "منصة تعليم البرمجة",
    thumbnail: "/user-project-1.png",
    funded: 67,
    backers: 123,
  },
  {
    id: 2,
    title: "تطبيق إدارة المهام الذكي",
    thumbnail: "/user-project-2.jpg",
    funded: 45,
    backers: 89,
  },
]

export default function ProfilePage() {
  const [isFollowing, setIsFollowing] = useState(false)

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/feed" className="flex items-center gap-2">
              <Eye className="w-8 h-8 text-primary" strokeWidth={1.5} />
              <h1 className="text-xl font-bold bg-gradient-to-l from-primary via-secondary to-accent bg-clip-text text-transparent">
                Vixo π
              </h1>
            </Link>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Share2 className="w-5 h-5" />
              </Button>
              <Link href="/settings">
                <Button variant="ghost" size="icon">
                  <Settings className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto">
        {/* Cover & Profile */}
        <div className="relative">
          {/* Cover image */}
          <div className="relative h-48 md:h-64 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 overflow-hidden">
            <img
              src={userData.cover || "/placeholder.svg"}
              alt="Cover"
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>

          {/* Profile info */}
          <div className="px-4 pb-6">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 -mt-16 md:-mt-20">
              {/* Avatar */}
              <div className="relative">
                <img
                  src={userData.avatar || "/placeholder.svg"}
                  alt={userData.name}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-background object-cover"
                />
                {userData.verified && (
                  <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center border-2 border-background">
                    <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 pt-16 md:pt-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h1 className="text-2xl md:text-3xl font-bold">{userData.name}</h1>
                      {userData.verified && <CheckCircle2 className="w-6 h-6 text-primary" />}
                    </div>
                    <p className="text-muted-foreground mb-2">{userData.username}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm">
                        <Shield className="w-4 h-4" />
                        <span className="font-semibold">{userData.trustScore}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        انضم {userData.joined}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant={isFollowing ? "outline" : "default"}
                      onClick={() => setIsFollowing(!isFollowing)}
                      className={!isFollowing ? "bg-primary" : "bg-transparent"}
                    >
                      {isFollowing ? "متابَع" : "متابعة"}
                    </Button>
                    <Button variant="outline" size="icon" className="bg-transparent">
                      <MessageCircle className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4 text-pretty">{userData.bio}</p>

                {/* Stats */}
                <div className="flex items-center gap-6 text-sm">
                  <button className="hover:text-primary transition-colors">
                    <span className="font-bold">{userData.stats.followers.toLocaleString()}</span>
                    <span className="text-muted-foreground mr-1">متابع</span>
                  </button>
                  <button className="hover:text-primary transition-colors">
                    <span className="font-bold">{userData.stats.following.toLocaleString()}</span>
                    <span className="text-muted-foreground mr-1">يتابع</span>
                  </button>
                  <div>
                    <span className="font-bold">{userData.stats.posts}</span>
                    <span className="text-muted-foreground mr-1">منشور</span>
                  </div>
                  <div>
                    <span className="font-bold">{userData.stats.likes.toLocaleString()}</span>
                    <span className="text-muted-foreground mr-1">إعجاب</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content tabs */}
        <div className="px-4">
          <Tabs defaultValue="videos" className="w-full">
            <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent h-auto p-0">
              <TabsTrigger
                value="videos"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                <Video className="w-4 h-4 ml-2" />
                الفيديوهات
              </TabsTrigger>
              <TabsTrigger
                value="shorts"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                <Zap className="w-4 h-4 ml-2" />
                3.14 Shorts
              </TabsTrigger>
              <TabsTrigger
                value="projects"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                <Rocket className="w-4 h-4 ml-2" />
                المشاريع
              </TabsTrigger>
              <TabsTrigger
                value="liked"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                <Heart className="w-4 h-4 ml-2" />
                الإعجابات
              </TabsTrigger>
            </TabsList>

            <TabsContent value="videos" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userVideos.map((video) => (
                  <Card
                    key={video.id}
                    className="group overflow-hidden border-border bg-card hover:border-primary/50 transition-all cursor-pointer"
                  >
                    <div className="relative aspect-video bg-muted">
                      <img
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/80 text-white text-xs">
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-sm mb-2 line-clamp-2 text-balance">{video.title}</h3>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {video.views.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          {video.likes}
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="shorts" className="mt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {userShorts.map((short) => (
                  <Card
                    key={short.id}
                    className="group overflow-hidden border-border bg-card hover:border-primary/50 transition-all cursor-pointer"
                  >
                    <div className="relative aspect-[9/16] bg-muted">
                      <img
                        src={short.thumbnail || "/placeholder.svg"}
                        alt="Short"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2 space-y-1">
                        <div className="flex items-center gap-2 text-white text-xs">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {short.views.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {short.likes.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="projects" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userProjects.map((project) => (
                  <Card
                    key={project.id}
                    className="group overflow-hidden border-border bg-card hover:border-primary/50 transition-all cursor-pointer"
                  >
                    <div className="relative aspect-video bg-muted">
                      <img
                        src={project.thumbnail || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-3 text-balance">{project.title}</h3>
                      <div className="space-y-2">
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-l from-primary to-secondary rounded-full"
                            style={{ width: `${project.funded}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{project.funded}% ممول</span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {project.backers} داعم
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="liked" className="mt-6">
              <div className="text-center py-12">
                <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">لا توجد إعجابات بعد</h3>
                <p className="text-sm text-muted-foreground">المحتوى الذي تعجب به سيظهر هنا</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
