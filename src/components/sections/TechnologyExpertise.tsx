import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

const techGroups = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "Angular", "TypeScript", "JavaScript", "Tailwind CSS"],
    color: "text-blue-400",
    badgeClass: "bg-blue-400/10 text-blue-400 border-blue-400/20 hover:bg-blue-400/20",
  },
  {
    category: "Backend",
    items: ["Node.js", "Express.js", "FastAPI", "NestJS", "REST API", "GraphQL"],
    color: "text-emerald-400",
    badgeClass: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20 hover:bg-emerald-400/20",
  },
  {
    category: "Databases",
    items: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase", "Supabase"],
    color: "text-amber-400",
    badgeClass: "bg-amber-400/10 text-amber-400 border-amber-400/20 hover:bg-amber-400/20",
  },
  {
    category: "AI Engineering",
    items: ["OpenAI", "Claude API", "RAG", "MCP", "LangChain", "Vector Database", "AI Agents"],
    color: "text-violet-400",
    badgeClass: "bg-violet-400/10 text-violet-400 border-violet-400/20 hover:bg-violet-400/20",
  },
  {
    category: "Cloud & DevOps",
    items: ["AWS", "Docker", "GitHub Actions", "CI/CD", "Vercel", "NGINX", "DigitalOcean"],
    color: "text-rose-400",
    badgeClass: "bg-rose-400/10 text-rose-400 border-rose-400/20 hover:bg-rose-400/20",
  },
]

export function TechnologyExpertise() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-background relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,oklch(0.62_0.24_265/5%),transparent)]" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-balance mb-4">
            Technology{" "}
            <span className="gradient-text">Expertise</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Modern stack built for performance, scalability, and developer experience
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: gi * 0.08 }}
              className="p-6 rounded-2xl border border-border bg-card hover:border-primary/20 hover:shadow-xl hover:shadow-black/10 transition-all duration-300 group"
            >
              <h3 className={`text-sm font-bold uppercase tracking-wider mb-4 ${group.color}`}>
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((tech, ti) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: gi * 0.05 + ti * 0.03 }}
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Badge
                      variant="outline"
                      className={`${group.badgeClass} cursor-default transition-all duration-200 text-xs font-medium px-3 py-1 border`}
                    >
                      {tech}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
