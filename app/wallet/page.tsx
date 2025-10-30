"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  TrendingUp,
  Shield,
  Eye,
  Copy,
  QrCode,
  Send,
  Download,
  History,
  CheckCircle2,
  XCircle,
} from "lucide-react"
import Link from "next/link"

// Mock wallet data
const walletData = {
  balance: 3141.59,
  address: "π7xK9mN2pQ4rS6tU8vW0yZ3aB5cD7eF9",
  verified: true,
  trustScore: 4.8,
}

// Mock transactions
const transactions = [
  {
    id: 1,
    type: "received",
    amount: 100,
    from: "أحمد محمد",
    fromAddress: "π1aB2cD3eF4gH5iJ6kL7mN8oP9qR0sT",
    description: "دعم مشروع الذكاء الاصطناعي",
    timestamp: "منذ ساعتين",
    status: "completed",
  },
  {
    id: 2,
    type: "sent",
    amount: 50,
    to: "سارة علي",
    toAddress: "π9sT0rQ8pO7nM6lK5jI4hG3fE2dC1bA",
    description: "استثمار في مشروع التعليم",
    timestamp: "منذ 5 ساعات",
    status: "completed",
  },
  {
    id: 3,
    type: "received",
    amount: 25.5,
    from: "محمد أحمد",
    fromAddress: "π2bC3dE4fG5hI6jK7lM8nO9pQ0rS1tU",
    description: "مكافأة محتوى",
    timestamp: "منذ يوم",
    status: "completed",
  },
  {
    id: 4,
    type: "sent",
    amount: 75,
    to: "فاطمة حسن",
    toAddress: "π8oP9qR0sT1uV2wX3yZ4aB5cD6eF7gH",
    description: "دعم مشروع الصحة",
    timestamp: "منذ يومين",
    status: "pending",
  },
]

const quickActions = [
  { icon: Send, label: "إرسال", color: "from-primary to-secondary" },
  { icon: Download, label: "استقبال", color: "from-secondary to-accent" },
  { icon: History, label: "السجل", color: "from-accent to-primary" },
  { icon: QrCode, label: "رمز QR", color: "from-primary via-secondary to-accent" },
]

export default function WalletPage() {
  const [showSendModal, setShowSendModal] = useState(false)
  const [sendAmount, setSendAmount] = useState("")
  const [sendAddress, setSendAddress] = useState("")
  const [sendNote, setSendNote] = useState("")

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletData.address)
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/feed" className="flex items-center gap-2">
              <Wallet className="w-8 h-8 text-primary" strokeWidth={1.5} />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-l from-primary via-secondary to-accent bg-clip-text text-transparent">
                  المحفظة
                </h1>
                <p className="text-xs text-muted-foreground">محفظة Pi Network</p>
              </div>
            </Link>
            <Button variant="ghost" size="icon">
              <Eye className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Balance card */}
        <Card className="relative overflow-hidden border-border bg-gradient-to-br from-card via-card to-primary/5">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/10 rounded-full blur-3xl" />

          <div className="relative p-6 space-y-6">
            {/* Balance */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">الرصيد الإجمالي</span>
                {walletData.verified && (
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/20 text-primary text-xs">
                    <CheckCircle2 className="w-3 h-3" />
                    محفظة موثقة
                  </div>
                )}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold">π {walletData.balance.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Shield className="w-4 h-4 text-primary" />
                  درجة الأمانة: <span className="font-semibold text-primary">{walletData.trustScore}</span>
                </span>
                <span className="flex items-center gap-1 text-green-500">
                  <TrendingUp className="w-4 h-4" />
                  +12.5% هذا الشهر
                </span>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <span className="text-xs text-muted-foreground">عنوان المحفظة</span>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                <code className="flex-1 text-sm font-mono truncate">{walletData.address}</code>
                <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0" onClick={handleCopyAddress}>
                  <Copy className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                  <QrCode className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Quick actions */}
            <div className="grid grid-cols-4 gap-3">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  onClick={() => action.label === "إرسال" && setShowSendModal(true)}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${action.color} flex items-center justify-center`}
                  >
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-medium">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="transactions" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="transactions" className="flex-1">
              المعاملات
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex-1">
              الإحصائيات
            </TabsTrigger>
          </TabsList>

          <TabsContent value="transactions" className="space-y-4 mt-6">
            {/* Filters */}
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="bg-transparent">
                الكل
              </Button>
              <Button variant="ghost" size="sm">
                المستلمة
              </Button>
              <Button variant="ghost" size="sm">
                المرسلة
              </Button>
              <Button variant="ghost" size="sm">
                قيد الانتظار
              </Button>
            </div>

            {/* Transactions list */}
            <div className="space-y-3">
              {transactions.map((tx) => (
                <Card key={tx.id} className="p-4 border-border bg-card hover:border-primary/30 transition-colors">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                        tx.type === "received" ? "bg-green-500/20 text-green-500" : "bg-primary/20 text-primary"
                      }`}
                    >
                      {tx.type === "received" ? (
                        <ArrowDownLeft className="w-6 h-6" />
                      ) : (
                        <ArrowUpRight className="w-6 h-6" />
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm truncate">
                            {tx.type === "received" ? `من ${tx.from}` : `إلى ${tx.to}`}
                          </h4>
                          <p className="text-xs text-muted-foreground truncate">
                            {tx.type === "received" ? tx.fromAddress : tx.toAddress}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className={`font-bold ${tx.type === "received" ? "text-green-500" : "text-foreground"}`}>
                            {tx.type === "received" ? "+" : "-"}π {tx.amount}
                          </p>
                          <div className="flex items-center justify-end gap-1 mt-1">
                            {tx.status === "completed" ? (
                              <CheckCircle2 className="w-3 h-3 text-green-500" />
                            ) : (
                              <Clock className="w-3 h-3 text-yellow-500" />
                            )}
                            <span className="text-xs text-muted-foreground">
                              {tx.status === "completed" ? "مكتمل" : "قيد الانتظار"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{tx.description}</p>
                      <span className="text-xs text-muted-foreground">{tx.timestamp}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Load more */}
            <Button variant="outline" className="w-full bg-transparent">
              تحميل المزيد
            </Button>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6 mt-6">
            {/* Stats cards */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 border-border bg-card">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <ArrowDownLeft className="w-5 h-5 text-green-500" />
                  </div>
                  <span className="text-sm text-muted-foreground">إجمالي المستلم</span>
                </div>
                <p className="text-2xl font-bold">π 2,456.78</p>
                <p className="text-xs text-green-500 mt-1">+18.2% من الشهر الماضي</p>
              </Card>

              <Card className="p-4 border-border bg-card">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <ArrowUpRight className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">إجمالي المرسل</span>
                </div>
                <p className="text-2xl font-bold">π 1,234.56</p>
                <p className="text-xs text-muted-foreground mt-1">+8.5% من الشهر الماضي</p>
              </Card>
            </div>

            {/* Chart placeholder */}
            <Card className="p-6 border-border bg-card">
              <h3 className="font-semibold mb-4">نشاط المحفظة</h3>
              <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
                <div className="text-center space-y-2">
                  <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto" />
                  <p className="text-sm text-muted-foreground">رسم بياني لنشاط المحفظة</p>
                </div>
              </div>
            </Card>

            {/* Activity summary */}
            <Card className="p-6 border-border bg-card">
              <h3 className="font-semibold mb-4">ملخص النشاط</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">عدد المعاملات</span>
                  <span className="font-semibold">127</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">متوسط قيمة المعاملة</span>
                  <span className="font-semibold">π 45.67</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">أكبر معاملة</span>
                  <span className="font-semibold">π 250.00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">المعاملات الناجحة</span>
                  <span className="font-semibold text-green-500">98.4%</span>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Send modal */}
      {showSendModal && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowSendModal(false)} />
          <Card className="relative w-full max-w-md mx-4 md:mx-auto p-6 border-border bg-card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">إرسال Pi</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowSendModal(false)}>
                <XCircle className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-4">
              {/* Amount */}
              <div className="space-y-2">
                <label className="text-sm font-medium">المبلغ</label>
                <div className="relative">
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">π</span>
                  <Input
                    type="number"
                    value={sendAmount}
                    onChange={(e) => setSendAmount(e.target.value)}
                    placeholder="0.00"
                    className="pr-8 text-lg font-semibold h-12"
                  />
                </div>
                <p className="text-xs text-muted-foreground">الرصيد المتاح: π {walletData.balance.toLocaleString()}</p>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <label className="text-sm font-medium">عنوان المستلم</label>
                <Input
                  type="text"
                  value={sendAddress}
                  onChange={(e) => setSendAddress(e.target.value)}
                  placeholder="π..."
                  className="font-mono"
                />
              </div>

              {/* Note */}
              <div className="space-y-2">
                <label className="text-sm font-medium">ملاحظة (اختياري)</label>
                <Input
                  type="text"
                  value={sendNote}
                  onChange={(e) => setSendNote(e.target.value)}
                  placeholder="أضف ملاحظة..."
                />
              </div>

              {/* Summary */}
              <Card className="p-4 bg-muted/50 border-border">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">المبلغ</span>
                    <span className="font-semibold">π {sendAmount || "0.00"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">رسوم الشبكة</span>
                    <span className="font-semibold">π 0.01</span>
                  </div>
                  <div className="h-px bg-border my-2" />
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">الإجمالي</span>
                    <span className="font-bold text-lg">
                      π {sendAmount ? (Number.parseFloat(sendAmount) + 0.01).toFixed(2) : "0.01"}
                    </span>
                  </div>
                </div>
              </Card>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setShowSendModal(false)}>
                  إلغاء
                </Button>
                <Button
                  className="flex-1 gap-2 bg-gradient-to-l from-primary to-secondary"
                  disabled={!sendAmount || !sendAddress}
                >
                  <Send className="w-4 h-4" />
                  إرسال
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
