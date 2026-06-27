import { motion } from "framer-motion"
import { Zap, Brain, Users } from "lucide-react"

const cards = [
  {
    icon: Zap,
    title: "Rapid Development",
    description: "Commute, and quickly moves produces/contains/end rapid development.",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "hover:border-amber-400/30",
  },
  {
    icon: Brain,
    title: "Product Thinking",
    description: "We aim to anterinor product, and'centhin overies and product thinking.",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "hover:border-primary/30",
  },
  {
    icon: Users,
    title: "Long-Term Partner",
    description: "Long-term partner yet are selling anenmmines and product and partner.",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "hover:border-emerald-400/30",
  },
]

export function WhyFounders() {
  return (
    <section id="why-us" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,oklch(0.62_0.24_265/8%),transparent)]" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-balance mb-4">
            Why Founders{" "}
            <span className="gradient-text">Choose Us</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our seamless experience, certs and soft shader setiontnos
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className={`relative p-6 sm:p-8 rounded-2xl border border-border bg-card transition-all duration-300 ${card.border} hover:shadow-xl hover:shadow-black/10 group cursor-default`}
              >
                <div className={`w-14 h-14 rounded-xl ${card.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-7 h-7 ${card.color}`} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{card.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{card.description}</p>

                {/* Decorative corner glow */}
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-2xl ${card.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-2xl`} />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
