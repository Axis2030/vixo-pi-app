"use client"

import type { ReactNode } from "react"
import BottomNav from "@/components/bottom-nav"

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="relative min-h-screen bg-background">
      {/* Main content */}
      <main className="pb-20">{children}</main>

      {/* Bottom navigation */}
      <BottomNav />
    </div>
  )
}
