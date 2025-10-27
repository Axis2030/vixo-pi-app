"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Eye,
  ArrowRight,
  Heart,
  Share2,
  Bookmark,
  Users,
  Clock,
  Shield,
  CheckCircle2,
  TrendingUp,
  MessageCircle,
  Sparkles,
  ArrowUpRight,
} from "lucide-react"
import Link from "next/link"

// Mock project data
const projectData = {
  id: 1,
  title: "منصة تعليم الذكاء الاصطناعي",
  description: "منصة تفاعلية لتعليم أساسيات الذكاء الاصطناعي باللغة العربية مع مشاريع عملية",
  fullDescription:
    "نهدف إلى بناء أول منصة عربية شاملة لتعليم الذكاء الاصطناعي بطريقة تفاعلية وعملية. المنصة ستوفر دورات متدرجة من المستوى المبتدئ إلى المتقدم، مع مشاريع عملية وشهادات معتمدة. نستخدم أحدث تقنيات التعلم التفاعلي والذكاء الاصطناعي لتخصيص تجربة التعلم لكل طالب.",
  thumbnail: "/ai-education-platform.png",
  images: ["/ai-platform-dashboard.png", "/ai-platform-courses.jpg", "/ai-platform-projects.png"],
  category: "تعليم",
  stage: "مرحلة النمو",
  founder: {
    name: "د. أحمد الذكي",
    avatar: "/founder-tech-man.png",
    trustScore: 4.9,
    verified: true,
    bio: "دكتور في علوم الحاسب مع خبرة 10 سنوات في مجال الذكاء الاصطناعي والتعليم التقني",
  },
  funding: {
    goal: 100000,
    raised: 67500,
    backers: 234,
    daysLeft: 15,
  },
  stats: {
    likes: 1234,
    shares: 89,
    views: 12400,
    comments: 156,
  },
  tags: ["ذكاء اصطناعي", "تعليم", "تقنية"],
  milestones: [
    { title: "إطلاق النسخة التجريبية", status: "completed", date: "يناير 2025" },
    { title: "إضافة 50 دورة تدريبية", status: "completed", date: "فبراير 2025" },
    { title: "الوصول إلى 1000 طالب", status: "in-progress", date: "مارس 2025" },
    { title: "إطلاق تطبيق الموبايل", status: "upcoming", date: "أبريل 2025" },
  ],
  team: [
    { name: "د. أحمد الذكي", role: "المؤسس والرئيس التنفيذي", avatar: "/founder-tech-man.png" },
    { name: "سارة المطورة", role: "مديرة التطوير", avatar: "/team-developer-woman.png" },
    { name: "محمد المصمم", role: "مدير التصميم", avatar: "/team-designer-man.png" },
  ],
}

const updates = [
  {
    id: 1,
    title: "وصلنا إلى 500 طالب!",
    content: "نحن سعداء بالإعلان عن وصولنا إلى 500 طالب نشط على المنصة",
    date: "منذ 3 أيام",
    likes: 89,
  },
  {
    id: 2,
    title: "إضافة دورة جديدة في التعلم العميق",
    content: "أطلقنا دورة شاملة في التعلم العميق مع 20 مشروع عملي",
    date: "منذ أسبوع",
    likes: 156,
  },
]

export default function ProjectDetailPage() {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [investAmount, setInvestAmount] = useState("")

  const fundingPercentage = (projectData.funding.raised / projectData.funding.goal) * 100

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/incubator" className="flex items-center gap-2">
              <ArrowRight className="w-6 h-6" />
              <Eye className="w-8 h-8 text-primary" strokeWidth={1.5} />
              <h1 className="text-xl font-bold bg-gradient-to-l from-primary via-secondary to-accent bg-clip-text text-transparent">
                الحاضنة
              </h1>
            </Link>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsLiked(!isLiked)}
                className={isLiked ? "text-primary" : ""}
              >
                <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
              </Button>
              <Button variant="ghost" size="icon">
                <Share2 className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={isBookmarked ? "text-secondary" : ""}
              >
                <Bookmark className={`w-5 h-5 ${isBookmarked ? "fill-current" : ""}`} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero image */}
            <Card className="overflow-hidden border-border bg-card">
              <div className="relative aspect-video bg-muted">
                <img
                  src={projectData.thumbnail || "/placeholder.svg"}
                  alt={projectData.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-primary/90 backdrop-blur-sm text-primary-foreground text-sm font-medium flex items-center gap-1">
                  <Sparkles className="w-4 h-4" />
                  مميز
                </div>
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full glass-effect text-white text-sm font-medium">
                  {projectData.stage}
                </div>
              </div>
            </Card>

            {/* Project info */}
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-balance mb-2">{projectData.title}</h1>
                  <p className="text-muted-foreground text-pretty">{projectData.description}</p>
                </div>
                <Badge variant="secondary" className="whitespace-nowrap">
                  {projectData.category}
                </Badge>
              </div>

              {/* Tags */}
              <div className="flex items-center gap-2 flex-wrap">
                {projectData.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1.5 rounded-full bg-muted text-sm text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  {projectData.stats.likes.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  {projectData.stats.comments}
                </span>
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  {projectData.stats.views.toLocaleString()} مشاهدة
                </span>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="about">نبذة</TabsTrigger>
                <TabsTrigger value="updates">التحديثات</TabsTrigger>
                <TabsTrigger value="milestones">المراحل</TabsTrigger>
                <TabsTrigger value="team">الفريق</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-6 mt-6">
                <Card className="p-6 border-border bg-card">
                  <h3 className="font-bold text-lg mb-4">عن المشروع</h3>
                  <p className="text-muted-foreground leading-relaxed text-pretty">{projectData.fullDescription}</p>
                </Card>

                {/* Gallery */}
                <Card className="p-6 border-border bg-card">
                  <h3 className="font-bold text-lg mb-4">معرض الصور</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {projectData.images.map((image, index) => (
                      <div key={index} className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`صورة ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="updates" className="space-y-4 mt-6">
                {updates.map((update) => (
                  <Card key={update.id} className="p-6 border-border bg-card">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-bold text-balance">{update.title}</h3>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">{update.date}</span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4 text-pretty">{update.content}</p>
                    <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                      <Heart className="w-4 h-4" />
                      <span>{update.likes}</span>
                    </button>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="milestones" className="space-y-4 mt-6">
                <Card className="p-6 border-border bg-card">
                  <h3 className="font-bold text-lg mb-6">خارطة الطريق</h3>
                  <div className="space-y-6">
                    {projectData.milestones.map((milestone, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              milestone.status === "completed"
                                ? "bg-primary text-primary-foreground"
                                : milestone.status === "in-progress"
                                  ? "bg-secondary text-secondary-foreground"
                                  : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {milestone.status === "completed" ? (
                              <CheckCircle2 className="w-5 h-5" />
                            ) : (
                              <span className="text-sm font-bold">{index + 1}</span>
                            )}
                          </div>
                          {index < projectData.milestones.length - 1 && <div className="w-0.5 h-12 bg-border mt-2" />}
                        </div>
                        <div className="flex-1 pb-6">
                          <h4 className="font-semibold mb-1">{milestone.title}</h4>
                          <p className="text-sm text-muted-foreground">{milestone.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="team" className="space-y-4 mt-6">
                <Card className="p-6 border-border bg-card">
                  <h3 className="font-bold text-lg mb-6">فريق العمل</h3>
                  <div className="space-y-4">
                    {projectData.team.map((member, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <img
                          src={member.avatar || "/placeholder.svg"}
                          alt={member.name}
                          className="w-16 h-16 rounded-full"
                        />
                        <div>
                          <h4 className="font-semibold">{member.name}</h4>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar - Funding card */}
          <div className="space-y-6">
            <Card className="p-6 border-border bg-card sticky top-24">
              <div className="space-y-6">
                {/* Funding progress */}
                <div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold text-primary">
                      π {projectData.funding.raised.toLocaleString()}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      من π {projectData.funding.goal.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full h-3 bg-muted rounded-full overflow-hidden mb-4">
                    <div
                      className="h-full bg-gradient-to-l from-primary to-secondary rounded-full transition-all"
                      style={{ width: `${fundingPercentage}%` }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground mb-1">نسبة التمويل</p>
                      <p className="font-bold">{fundingPercentage.toFixed(0)}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">عدد الداعمين</p>
                      <p className="font-bold flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {projectData.funding.backers}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-muted-foreground mb-1">الوقت المتبقي</p>
                      <p className="font-bold flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {projectData.funding.daysLeft} يوم
                      </p>
                    </div>
                  </div>
                </div>

                {/* Investment input */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">مبلغ الاستثمار (π)</label>
                  <div className="relative">
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">π</span>
                    <input
                      type="number"
                      value={investAmount}
                      onChange={(e) => setInvestAmount(e.target.value)}
                      placeholder="100"
                      className="w-full h-12 pr-8 pl-4 rounded-lg border border-input bg-background text-lg font-semibold focus:outline-hidden focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <Button size="lg" className="w-full gap-2 bg-gradient-to-l from-primary to-secondary">
                    استثمر الآن
                    <ArrowUpRight className="w-5 h-5" />
                  </Button>
                </div>

                {/* Founder info */}
                <div className="pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-3">المؤسس</p>
                  <div className="flex items-start gap-3">
                    <img
                      src={projectData.founder.avatar || "/placeholder.svg"}
                      alt={projectData.founder.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-1 mb-1">
                        <h4 className="font-semibold text-sm">{projectData.founder.name}</h4>
                        {projectData.founder.verified && <CheckCircle2 className="w-4 h-4 text-primary" />}
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        <Shield className="w-3 h-3 text-primary" />
                        <span className="text-xs text-muted-foreground">درجة الأمانة:</span>
                        <span className="text-xs font-semibold text-primary">{projectData.founder.trustScore}</span>
                      </div>
                      <p className="text-xs text-muted-foreground text-pretty">{projectData.founder.bio}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
