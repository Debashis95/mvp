import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const projects = [
  {
    name: "Project Rocket",
    description: "A scalable SaaS platform for startup teams with real-time collaboration and AI-powered insights.",
    category: "SaaS",
    tags: ["React", "FastAPI", "OpenAI"],
    status: "Production",
    statusColor: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
    gradient: "from-blue-500/20 to-violet-500/20",
    icon: "🚀",
  },
  {
    name: "Project Skills",
    description: "An AI-powered skills assessment platform connecting companies with top engineering talent.",
    category: "EdTech",
    tags: ["Next.js", "Node.js", "GPT-4"],
    status: "Beta",
    statusColor: "bg-amber-400/10 text-amber-400 border-amber-400/20",
    gradient: "from-emerald-500/20 to-teal-500/20",
    icon: "⚡",
  },
  {
    name: "Cloud/DevOps Suite",
    description: "Infrastructure automation platform with one-click deployments, monitoring, and scaling.",
    category: "DevOps",
    tags: ["AWS", "Docker", "Kubernetes"],
    status: "Launch",
    statusColor: "bg-blue-400/10 text-blue-400 border-blue-400/20",
    gradient: "from-rose-500/20 to-orange-500/20",
    icon: "☁️",
  },
]

export function SelectedProjects() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-muted/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-balance mb-4">
            Selected{" "}
            <span className="gradient-text">Work</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We love to create smos and most on-to-actions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/30 hover:shadow-2xl hover:shadow-black/20 transition-all duration-400 cursor-pointer"
            >
              {/* Card header with gradient */}
              <div className={`h-36 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}>
                <motion.div
                  className="text-5xl"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 3, delay: i * 0.5 }}
                >
                  {project.icon}
                </motion.div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,oklch(1_0_0/5%),transparent)]" />

                <Badge
                  variant="outline"
                  className={`absolute top-3 right-3 text-xs font-semibold ${project.statusColor} border`}
                >
                  {project.status}
                </Badge>
              </div>

              {/* Card body */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-1">
                      {project.category}
                    </p>
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {project.name}
                    </h3>
                  </div>
                  <motion.div
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    whileHover={{ rotate: 45 }}
                  >
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </motion.div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs px-2 py-0.5 bg-muted text-muted-foreground"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            className="border-primary/30 text-primary hover:bg-primary/10 gap-2"
            onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })}
          >
            Start Your Project
            <ExternalLink className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
