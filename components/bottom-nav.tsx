"use client"

import { usePathname, useRouter } from "next/navigation"
import { Eye, Zap, Rocket, Wallet, User } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { icon: Eye, label: "Vision", path: "/home", color: "text-accent" },
  { icon: Zap, label: "3.14", path: "/shorts", color: "text-secondary" },
  { icon: Rocket, label: "Incubator", path: "/incubator", color: "text-primary", isCenter: true },
  { icon: Wallet, label: "Wallet", path: "/wallet", color: "text-accent" },
  { icon: User, label: "Profile", path: "/profile", color: "text-secondary" },
]

export default function BottomNav() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="glass-effect border-t border-border/50 px-4 py-3">
        <div className="flex items-center justify-around max-w-2xl mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.path

            return (
              <button
                key={item.path}
                onClick={() => router.push(item.path)}
                className={cn(
                  "relative flex flex-col items-center gap-1 transition-all duration-300",
                  item.isCenter && "transform -translate-y-4",
                )}
              >
                {/* Center button special styling */}
                {item.isCenter ? (
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl animate-pulse-glow" />
                    <div
                      className={cn(
                        "relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300",
                        "bg-gradient-to-br from-primary via-secondary to-accent",
                        isActive ? "scale-110 shadow-lg shadow-primary/50" : "scale-100",
                      )}
                    >
                      <Icon className="w-7 h-7 text-primary-foreground" strokeWidth={2} />
                    </div>
                  </div>
                ) : (
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300",
                      isActive ? `${item.color} scale-110` : "text-muted-foreground scale-100",
                    )}
                  >
                    <Icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
                  </div>
                )}

                {/* Label */}
                {!item.isCenter && (
                  <span
                    className={cn(
                      "text-xs transition-all duration-300",
                      isActive ? item.color : "text-muted-foreground",
                    )}
                  >
                    {item.label}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
