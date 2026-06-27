import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { ArrowRight, Sparkles, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

function CursorGlow() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 100, damping: 30 })
  const springY = useSpring(y, { stiffness: 100, damping: 30 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [x, y])

  return (
    <motion.div
      className="cursor-glow hidden lg:block"
      style={{ left: springX, top: springY }}
    />
  )
}

function HeroTimeline() {
  const steps = [
    { label: "Idea" },
    { label: "Planning" },
    { label: "Development" },
    { label: "Launch" },
    { label: "Scale" },
  ]

  return (
    <div className="relative w-full max-w-lg mx-auto mt-8 hidden md:block">
      <div className="relative">
        <div className="flex items-center justify-between relative">
          <div className="absolute inset-x-0 top-1/2 h-0.5 bg-border -translate-y-1/2" />
          <motion.div
            className="absolute left-0 top-1/2 h-0.5 bg-gradient-to-r from-primary to-violet-500 -translate-y-1/2"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, delay: 1.2, ease: "easeInOut" }}
          />
          {steps.map((step, i) => (
            <motion.div
              key={step.label}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.8 + i * 0.15 }}
              className="relative flex flex-col items-center gap-2 z-10"
            >
              <div className={`w-3 h-3 rounded-full border-2 ${
                i === 0 ? "bg-muted-foreground border-muted-foreground" :
                i === 1 ? "bg-blue-400 border-blue-400" :
                i === 2 ? "bg-primary border-primary glow-sm" :
                i === 3 ? "bg-emerald-400 border-emerald-400" :
                "bg-violet-400 border-violet-400"
              }`} />
              <span className="text-xs text-muted-foreground font-medium whitespace-nowrap">{step.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const scrollToBooking = () => {
    document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      <CursorGlow />

      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.5_0.05_265/5%)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.5_0.05_265/5%)_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,oklch(0.62_0.24_265/15%),transparent)]" />

      <motion.div
        style={{ y, opacity }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8 md:gap-12 items-center w-full pt-16 md:pt-16"
      >
        {/* Left content */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Badge
              variant="secondary"
              className="mb-6 gap-1.5 text-xs font-medium bg-brand-muted text-primary border-primary/20 px-3 py-1.5"
            >
              <Sparkles className="w-3 h-3" />
              Startup MVP Development Specialists
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-balance leading-[1.1] mb-6"
          >
            Turn Your Startup{" "}
            <span className="gradient-text">Idea Into</span>
            <br />a Working MVP{" "}
            <span className="gradient-text">in Weeks</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base text-muted-foreground leading-relaxed mb-4 max-w-xl"
          >
            MVP Engineering Studio is a fast collective, with constrained, glassminded approach to building MVPs in weeks.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-xl"
          >
            We specialize in building high-quality, scalable MVPs for ambitious founders and businesses.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Button
              size="lg"
              onClick={scrollToBooking}
              className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary font-semibold px-8 gap-2 group"
            >
              Book Free Discovery Call
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          <HeroTimeline />
        </div>

        {/* Right content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="relative hidden md:block"
        >
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-violet-500/10 rounded-full blur-3xl" />

          <div className="relative glass-card rounded-2xl p-6 sm:p-8 max-w-full ml-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-foreground">MVP Roadmap</h3>
                <p className="text-xs text-muted-foreground mt-0.5">From idea to launch</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
            </div>

            {[
              { phase: "Discovery & Planning", weeks: "1-2 weeks", done: true },
              { phase: "Design System", weeks: "1-3 weeks", done: true },
              { phase: "Core Development", weeks: "2-6 weeks", active: true },
              { phase: "Testing & QA", weeks: "1-2 weeks", done: false },
              { phase: "Launch & Scale", weeks: "Ongoing", done: false },
            ].map((item, i) => (
              <motion.div
                key={item.phase}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className={`flex items-center gap-3 py-3 ${i < 4 ? "border-b border-border" : ""}`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                  item.done ? "bg-emerald-500/20" :
                  item.active ? "bg-primary/20 ring-2 ring-primary/50" :
                  "bg-muted"
                }`}>
                  {item.done ? (
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  ) : item.active ? (
                    <motion.div
                      className="w-2 h-2 rounded-full bg-primary"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                  )}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${item.active ? "text-primary" : "text-foreground"}`}>
                    {item.phase}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">{item.weeks}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-5 h-8 border-2 border-border rounded-full flex items-start justify-center p-1"
        >
          <div className="w-1 h-1.5 rounded-full bg-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  )
}
