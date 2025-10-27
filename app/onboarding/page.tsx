"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Eye, Zap, Rocket, Shield, ArrowRight, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

const onboardingSteps = [
  {
    icon: Eye,
    title: "رؤيتك، قصتك",
    description: "شارك رؤيتك مع العالم من خلال مقاطع فيديو قصيرة وطويلة. كل محتوى يعكس إبداعك وأفكارك الفريدة.",
    color: "from-primary to-secondary",
  },
  {
    icon: Zap,
    title: "3.14 ثانية من الإلهام",
    description: "اكتشف محتوى سريع ومؤثر في 3.14 ثانية فقط. تجربة فريدة تجمع بين السرعة والإبداع.",
    color: "from-secondary to-accent",
  },
  {
    icon: Rocket,
    title: "حاضنة المشاريع",
    description: "حوّل أفكارك إلى مشاريع حقيقية. تواصل مع مستثمرين ومبدعين آخرين لبناء المستقبل معاً.",
    color: "from-accent to-primary",
  },
  {
    icon: Shield,
    title: "الأمانة هي العملة",
    description: "نظام تقييم شفاف يعتمد على Pi Network. كل تفاعل يُقاس بالأمانة والمصداقية.",
    color: "from-primary via-secondary to-accent",
  },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const router = useRouter()

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Complete onboarding and go to main app
      router.push("/feed")
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    router.push("/feed")
  }

  const step = onboardingSteps[currentStep]
  const Icon = step.icon

  return (
    <div className="relative min-h-screen bg-background overflow-hidden flex flex-col">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-flow-lines"
            style={{
              top: `${30 + i * 20}%`,
              width: "200%",
              animationDelay: `${i * 0.7}s`,
            }}
          />
        ))}
      </div>

      {/* Skip button */}
      <div className="relative z-10 flex justify-end p-6">
        <button onClick={handleSkip} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          تخطي
        </button>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pb-20">
        {/* Icon with animated gradient background */}
        <div className="relative mb-12">
          <div
            className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-20 blur-3xl rounded-full scale-150`}
          />
          <div className="relative glass-effect rounded-full p-8">
            <Icon className="w-20 h-20 text-primary" strokeWidth={1.5} />
          </div>
        </div>

        {/* Content */}
        <div className="text-center max-w-md space-y-6">
          <h2 className="text-3xl font-bold text-balance">{step.title}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed text-pretty">{step.description}</p>
        </div>

        {/* Progress indicators */}
        <div className="flex gap-2 mt-12">
          {onboardingSteps.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentStep ? "w-8 bg-primary" : index < currentStep ? "w-6 bg-primary/50" : "w-6 bg-muted"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="relative z-10 flex items-center justify-between gap-4 p-6 pb-8">
        <Button onClick={handleBack} variant="ghost" size="lg" disabled={currentStep === 0} className="gap-2">
          <ArrowLeft className="w-5 h-5" />
          السابق
        </Button>

        <Button
          onClick={handleNext}
          size="lg"
          className={`gap-2 bg-gradient-to-l ${step.color} bg-[length:200%_100%] hover:bg-[position:100%_0] transition-all duration-500 shadow-lg shadow-primary/50`}
        >
          {currentStep === onboardingSteps.length - 1 ? "ابدأ الآن" : "التالي"}
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Bottom glow */}
      <div
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-t ${step.color} opacity-10 rounded-full blur-3xl transition-all duration-700`}
      />
    </div>
  )
}
