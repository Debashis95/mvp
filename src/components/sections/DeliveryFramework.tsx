import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Search, Palette, Code2, TestTube, TrendingUp } from "lucide-react"

const phases = [
  {
    icon: Search,
    label: "Discovery",
    duration: "1-2 Weeks",
    color: "text-blue-400",
    bg: "bg-blue-400",
    description: "Requirements gathering and technical planning",
  },
  {
    icon: Palette,
    label: "Design",
    duration: "1-3 Weeks",
    color: "text-violet-400",
    bg: "bg-violet-400",
    description: "UI/UX design and prototyping",
  },
  {
    icon: Code2,
    label: "Development",
    duration: "2-6 Weeks",
    color: "text-primary",
    bg: "bg-primary",
    description: "Full-stack development and integrations",
  },
  {
    icon: TestTube,
    label: "Testing",
    duration: "1-2 Weeks",
    color: "text-amber-400",
    bg: "bg-amber-400",
    description: "QA, testing, and bug fixes",
  },
  {
    icon: TrendingUp,
    label: "Scale",
    duration: "",
    color: "text-emerald-400",
    bg: "bg-emerald-400",
    description: "Launch, monitor, and grow",
  },
]

export function DeliveryFramework() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-balance mb-4">
            Our MVP{" "}
            <span className="gradient-text">Delivery Framework</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Animated timeline framework and laser — estimated timeline
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={ref} className="relative">
          {/* Progress bar */}
          <div className="hidden md:block relative mb-12">
            <div className="flex items-center gap-0">
              {phases.map((phase, i) => (
                <div key={phase.label} className="flex-1 relative">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.15 + 0.3 }}
                    style={{ originX: 0 }}
                    className={`h-1.5 ${phase.bg} ${i === 4 ? "rounded-r-full" : ""} ${i === 0 ? "rounded-l-full" : ""}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Phase cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {phases.map((phase, i) => {
              const Icon = phase.icon
              return (
                <motion.div
                  key={phase.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 + 0.2 }}
                  whileHover={{ y: -4 }}
                  className="flex flex-col items-center text-center p-4 sm:p-6 rounded-2xl border border-border bg-card hover:border-primary/20 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-background flex items-center justify-center mb-3 sm:mb-4 border border-border group-hover:border-primary/30 transition-colors`}>
                    <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${phase.color}`} />
                  </div>
                  <h3 className="text-sm font-bold text-foreground mb-1">{phase.label}</h3>
                  {phase.duration && (
                    <p className="text-xs text-muted-foreground">{phase.duration}</p>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
