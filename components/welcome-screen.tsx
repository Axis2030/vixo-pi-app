"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import { useRouter } from "next/navigation"

export default function WelcomeScreen() {
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleContinue = () => {
    router.push("/onboarding")
  }

  return (
    <div className="relative min-h-screen bg-background overflow-hidden flex items-center justify-center">
      {/* Animated background lines */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-flow-lines"
            style={{
              top: `${20 + i * 15}%`,
              width: "200%",
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Cosmic rotating circle */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <div className="w-96 h-96 rounded-full border-2 border-primary/30 animate-cosmic-rotate" />
      </div>

      {/* Main content */}
      <div
        className={`relative z-10 flex flex-col items-center gap-8 transition-all duration-1000 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {/* Logo with pulse animation */}
        <div className="flex items-center gap-3 animate-pulse-glow">
          <Eye className="w-16 h-16 text-primary" strokeWidth={1.5} />
          <div className="text-right">
            <h1 className="text-5xl font-bold bg-gradient-to-l from-primary via-secondary to-accent bg-clip-text text-transparent">
              Vixo π
            </h1>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-xl text-muted-foreground text-center max-w-md px-4 font-light">
          حيث تصنع رؤيتك وتُقاس بالأمانة
        </p>

        {/* Continue button */}
        <div className="flex flex-col items-center gap-4 mt-8">
          <Button
            onClick={handleContinue}
            size="lg"
            className="relative px-12 py-6 text-lg bg-gradient-to-l from-primary via-secondary to-primary bg-[length:200%_100%] hover:bg-[position:100%_0] transition-all duration-500 shadow-lg shadow-primary/50 hover:shadow-primary/70"
          >
            <span className="flex items-center gap-2">
              استمرار عبر Pi Network
              <span className="text-2xl">π</span>
            </span>
          </Button>

          <button className="text-sm text-muted-foreground/60 hover:text-muted-foreground transition-colors">
            تسجيل الدخول بطرق أخرى لاحقاً
          </button>
        </div>
      </div>

      {/* Bottom glow effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
    </div>
  )
}
