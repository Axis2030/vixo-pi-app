"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Settings,
  User,
  Shield,
  Bell,
  Lock,
  Globe,
  Palette,
  HelpCircle,
  LogOut,
  ChevronLeft,
  Moon,
  Sun,
} from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(true)
  const [notifications, setNotifications] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(false)
  const [publicProfile, setPublicProfile] = useState(true)

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/profile">
              <Button variant="ghost" size="icon">
                <ChevronLeft className="w-6 h-6" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Settings className="w-6 h-6 text-primary" strokeWidth={1.5} />
              <h1 className="text-2xl font-bold">الإعدادات</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Account settings */}
        <Card className="p-6 border-border bg-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-bold text-lg">الحساب</h2>
              <p className="text-sm text-muted-foreground">إدارة معلومات حسابك</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">الاسم</Label>
              <Input id="name" defaultValue="أحمد محمد" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">اسم المستخدم</Label>
              <Input id="username" defaultValue="@ahmed_tech" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">النبذة التعريفية</Label>
              <textarea
                id="bio"
                rows={3}
                defaultValue="مطور ومبدع محتوى تقني | شغوف بالذكاء الاصطناعي والتكنولوجيا"
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm resize-none focus:outline-hidden focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input id="email" type="email" defaultValue="ahmed@example.com" />
            </div>
            <Button className="bg-primary">حفظ التغييرات</Button>
          </div>
        </Card>

        {/* Privacy settings */}
        <Card className="p-6 border-border bg-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <h2 className="font-bold text-lg">الخصوصية والأمان</h2>
              <p className="text-sm text-muted-foreground">التحكم في خصوصيتك وأمانك</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>الملف الشخصي العام</Label>
                <p className="text-sm text-muted-foreground">السماح للآخرين برؤية ملفك الشخصي</p>
              </div>
              <Switch checked={publicProfile} onCheckedChange={setPublicProfile} />
            </div>

            <div className="h-px bg-border" />

            <div className="space-y-3">
              <Label>من يمكنه رؤية محتواك</Label>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <span className="text-sm">الجميع</span>
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="h-px bg-border" />

            <div className="space-y-3">
              <Label>كلمة المرور</Label>
              <Button variant="outline" className="w-full justify-between bg-transparent">
                <span>تغيير كلمة المرور</span>
                <Lock className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Notifications */}
        <Card className="p-6 border-border bg-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <Bell className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h2 className="font-bold text-lg">الإشعارات</h2>
              <p className="text-sm text-muted-foreground">إدارة تفضيلات الإشعارات</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>إشعارات التطبيق</Label>
                <p className="text-sm text-muted-foreground">تلقي إشعارات داخل التطبيق</p>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>

            <div className="h-px bg-border" />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>إشعارات البريد الإلكتروني</Label>
                <p className="text-sm text-muted-foreground">تلقي تحديثات عبر البريد الإلكتروني</p>
              </div>
              <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
            </div>

            <div className="h-px bg-border" />

            <div className="space-y-2">
              <Label>أنواع الإشعارات</Label>
              <div className="space-y-3">
                {["الإعجابات والتعليقات", "المتابعون الجدد", "تحديثات المشاريع", "رسائل جديدة"].map((item) => (
                  <div key={item} className="flex items-center justify-between">
                    <span className="text-sm">{item}</span>
                    <Switch defaultChecked />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Appearance */}
        <Card className="p-6 border-border bg-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Palette className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-bold text-lg">المظهر</h2>
              <p className="text-sm text-muted-foreground">تخصيص مظهر التطبيق</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>الوضع الداكن</Label>
                <p className="text-sm text-muted-foreground">استخدام المظهر الداكن</p>
              </div>
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4 text-muted-foreground" />
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                <Moon className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>

            <div className="h-px bg-border" />

            <div className="space-y-2">
              <Label>اللغة</Label>
              <button className="w-full flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span className="text-sm">العربية</span>
                </div>
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        </Card>

        {/* Support */}
        <Card className="p-6 border-border bg-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <h2 className="font-bold text-lg">الدعم والمساعدة</h2>
              <p className="text-sm text-muted-foreground">احصل على المساعدة والدعم</p>
            </div>
          </div>

          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
              <span className="text-sm">مركز المساعدة</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-full flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
              <span className="text-sm">الشروط والأحكام</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-full flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
              <span className="text-sm">سياسة الخصوصية</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-full flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
              <span className="text-sm">حول Vixo π</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </Card>

        {/* Logout */}
        <Card className="p-6 border-border bg-card">
          <Button variant="destructive" className="w-full gap-2">
            <LogOut className="w-5 h-5" />
            تسجيل الخروج
          </Button>
        </Card>

        {/* Version */}
        <div className="text-center text-sm text-muted-foreground py-4">
          <p>Vixo π v1.0.0</p>
          <p className="mt-1">حيث تصنع رؤيتك وتُقاس بالأمانة</p>
        </div>
      </main>
    </div>
  )
}
