import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"

interface MetricProps {
  value: number
  suffix: string
  label: string
  delay: number
}

function AnimatedCounter({ value, suffix, label, delay }: MetricProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-50px" })

  useEffect(() => {
    if (!inView) return
    const start = Date.now()
    const duration = 1800

    const timer = setInterval(() => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * value))
      if (progress >= 1) clearInterval(timer)
    }, 16)

    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center text-center p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group"
    >
      <div className="text-3xl sm:text-4xl font-extrabold tracking-tight gradient-text group-hover:scale-105 transition-transform">
        {count}{suffix}
      </div>
      <div className="text-sm text-muted-foreground mt-2 font-medium">{label}</div>
    </motion.div>
  )
}

export function TrustMetrics() {
  const metrics = [
    { value: 50, suffix: "+", label: "Projects Delivered", delay: 0 },
    { value: 98, suffix: "%", label: "Success Rate", delay: 0.1 },
    { value: 24, suffix: "/7", label: "Support", delay: 0.2 },
    { value: 4.9, suffix: "/5", label: "Client Rating", delay: 0.3 },
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((m) => (
            <AnimatedCounter key={m.label} {...m} />
          ))}
        </div>
      </div>
    </section>
  )
}
