"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Rocket,
  Search,
  Filter,
  TrendingUp,
  Clock,
  Users,
  Target,
  Shield,
  Heart,
  Share2,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react"
import Link from "next/link"

// Mock projects data
const projects = [
  {
    id: 1,
    title: "منصة تعليم الذكاء الاصطناعي",
    description: "منصة تفاعلية لتعليم أساسيات الذكاء الاصطناعي باللغة العربية مع مشاريع عملية",
    thumbnail: "/ai-education-platform.png",
    category: "تعليم",
    stage: "مرحلة النمو",
    founder: {
      name: "د. أحمد الذكي",
      avatar: "/founder-tech-man.png",
      trustScore: 4.9,
      verified: true,
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
    },
    tags: ["ذكاء اصطناعي", "تعليم", "تقنية"],
    featured: true,
  },
  {
    id: 2,
    title: "تطبيق توصيل صحي",
    description: "خدمة توصيل وجبات صحية مخصصة حسب احتياجاتك الغذائية والصحية",
    thumbnail: "/healthy-food-delivery.jpg",
    category: "صحة",
    stage: "مرحلة البذرة",
    founder: {
      name: "سارة الصحية",
      avatar: "/founder-health-woman.png",
      trustScore: 4.7,
      verified: true,
    },
    funding: {
      goal: 50000,
      raised: 23400,
      backers: 156,
      daysLeft: 22,
    },
    stats: {
      likes: 890,
      shares: 67,
      views: 8900,
    },
    tags: ["صحة", "طعام", "توصيل"],
    featured: false,
  },
  {
    id: 3,
    title: "منصة التجارة الإلكترونية المستدامة",
    description: "سوق إلكتروني يربط المنتجين المحليين بالمستهلكين مع التركيز على الاستدامة",
    thumbnail: "/sustainable-ecommerce.png",
    category: "تجارة",
    stage: "مرحلة التأسيس",
    founder: {
      name: "محمد البيئي",
      avatar: "/founder-eco-man.png",
      trustScore: 4.6,
      verified: false,
    },
    funding: {
      goal: 75000,
      raised: 12300,
      backers: 89,
      daysLeft: 30,
    },
    stats: {
      likes: 567,
      shares: 45,
      views: 6700,
    },
    tags: ["تجارة", "استدامة", "بيئة"],
    featured: false,
  },
  {
    id: 4,
    title: "تطبيق إدارة المشاريع الذكي",
    description: "أداة ذكية لإدارة المشاريع تستخدم الذكاء الاصطناعي لتحسين الإنتاجية",
    thumbnail: "/smart-project-management.jpg",
    category: "إنتاجية",
    stage: "مرحلة النمو",
    founder: {
      name: "ليلى المنظمة",
      avatar: "/founder-productivity-woman.png",
      trustScore: 4.8,
      verified: true,
    },
    funding: {
      goal: 120000,
      raised: 98400,
      backers: 345,
      daysLeft: 8,
    },
    stats: {
      likes: 1567,
      shares: 123,
      views: 15600,
    },
    tags: ["إنتاجية", "ذكاء اصطناعي", "أعمال"],
    featured: true,
  },
]

const categories = ["الكل", "تعليم", "صحة", "تجارة", "إنتاجية", "تقنية", "فن"]
const stages = ["الكل", "مرحلة التأسيس", "مرحلة البذرة", "مرحلة النمو"]

export default function IncubatorPage() {
  const [selectedCategory, setSelectedCategory] = useState("الكل")
  const [selectedStage, setSelectedStage] = useState("الكل")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<"trending" | "recent" | "funded">("trending")

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = selectedCategory === "الكل" || project.category === selectedCategory
    const matchesStage = selectedStage === "الكل" || project.stage === selectedStage
    const matchesSearch =
      searchQuery === "" ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesStage && matchesSearch
  })

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link href="/feed" className="flex items-center gap-2">
              <Rocket className="w-8 h-8 text-primary" strokeWidth={1.5} />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-l from-primary via-secondary to-accent bg-clip-text text-transparent">
                  الحاضنة
                </h1>
                <p className="text-xs text-muted-foreground">اكتشف واستثمر في المشاريع الواعدة</p>
              </div>
            </Link>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Filter className="w-5 h-5" />
              </Button>
              <Button size="sm" className="gap-2 bg-primary">
                <Sparkles className="w-4 h-4" />
                أضف مشروعك
              </Button>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="ابحث عن المشاريع..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 bg-muted/50"
            />
          </div>
        </div>
      </header>

      {/* Categories */}
      <div className="sticky top-[136px] z-40 glass-effect border-b border-border">
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

      {/* Filters and sort */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">المرحلة:</span>
            {stages.map((stage) => (
              <button
                key={stage}
                onClick={() => setSelectedStage(stage)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  selectedStage === stage
                    ? "bg-secondary/20 text-secondary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {stage}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSortBy("trending")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                sortBy === "trending" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <TrendingUp className="w-3 h-3" />
              الأكثر رواجاً
            </button>
            <button
              onClick={() => setSortBy("recent")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                sortBy === "recent" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Clock className="w-3 h-3" />
              الأحدث
            </button>
            <button
              onClick={() => setSortBy("funded")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                sortBy === "funded" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Target className="w-3 h-3" />
              الأكثر تمويلاً
            </button>
          </div>
        </div>
      </div>

      {/* Projects grid */}
      <main className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="group overflow-hidden border-border bg-card hover:border-primary/50 transition-all duration-300 cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-muted overflow-hidden">
                <img
                  src={project.thumbnail || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Featured badge */}
                {project.featured && (
                  <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-medium flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    مميز
                  </div>
                )}
                {/* Stage badge */}
                <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full glass-effect text-white text-xs font-medium">
                  {project.stage}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-4">
                {/* Title and category */}
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-balance line-clamp-2">{project.title}</h3>
                    <Badge variant="secondary" className="text-xs whitespace-nowrap">
                      {project.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 text-pretty">{project.description}</p>
                </div>

                {/* Founder info */}
                <div className="flex items-center gap-2">
                  <img
                    src={project.founder.avatar || "/placeholder.svg"}
                    alt={project.founder.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-medium truncate">{project.founder.name}</span>
                      {project.founder.verified && <CheckCircle2 className="w-3 h-3 text-primary flex-shrink-0" />}
                    </div>
                    <div className="flex items-center gap-1">
                      <Shield className="w-3 h-3 text-primary" />
                      <span className="text-xs text-muted-foreground">{project.founder.trustScore}</span>
                    </div>
                  </div>
                </div>

                {/* Funding progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-primary">π {project.funding.raised.toLocaleString()}</span>
                    <span className="text-muted-foreground">من π {project.funding.goal.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-l from-primary to-secondary rounded-full transition-all"
                      style={{ width: `${(project.funding.raised / project.funding.goal) * 100}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {project.funding.backers} داعم
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {project.funding.daysLeft} يوم متبقي
                    </span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex items-center gap-2 flex-wrap">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 rounded bg-muted text-xs text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                      <Heart className="w-4 h-4" />
                      <span>{project.stats.likes}</span>
                    </button>
                    <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                      <Share2 className="w-4 h-4" />
                      <span>{project.stats.shares}</span>
                    </button>
                  </div>
                  <Button size="sm" className="gap-1 h-8 bg-primary">
                    استثمر الآن
                    <ArrowUpRight className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
