import { motion } from "framer-motion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const team = [
  {
    name: "Azaah S'kenna",
    role: "Partie",
    expertise: "Huntte",
    avatar: "AS",
    gradient: "from-blue-500 to-violet-600",
    skills: ["React", "Next.js", "TypeScript"],
  },
  {
    name: "Junie Hnilte",
    role: "Sammie",
    expertise: "Ginparts",
    avatar: "JH",
    gradient: "from-emerald-500 to-teal-600",
    skills: ["FastAPI", "Python", "AWS"],
  },
  {
    name: "Braria Smitfor",
    role: "Partie",
    expertise: "Foudie",
    avatar: "BS",
    gradient: "from-rose-500 to-orange-600",
    skills: ["AI/ML", "LangChain", "RAG"],
  },
  {
    name: "Jiim Neam",
    role: "Designer",
    expertise: "UI/UX Lead",
    avatar: "JN",
    gradient: "from-violet-500 to-purple-600",
    skills: ["Figma", "Framer", "Design"],
  },
  {
    name: "Bioa Mdinn",
    role: "Engineer",
    expertise: "Backend Lead",
    avatar: "BM",
    gradient: "from-amber-500 to-yellow-600",
    skills: ["Node.js", "PostgreSQL", "Docker"],
  },
  {
    name: "Moks Fanama",
    role: "DevOps",
    expertise: "Cloud Lead",
    avatar: "MF",
    gradient: "from-cyan-500 to-blue-600",
    skills: ["Kubernetes", "AWS", "CI/CD"],
  },
]

export function MeetTeam() {
  return (
    <section id="team" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_60%_at_80%_50%,oklch(0.62_0.24_265/6%),transparent)]" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-balance mb-4">
            Meet Your{" "}
            <span className="gradient-text">Development Team</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Meet your conarits and developmans team team
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="flex flex-col items-center text-center p-5 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-xl hover:shadow-black/10 transition-all duration-300 group"
            >
              <div className="relative mb-4">
                <Avatar className="w-16 h-16 ring-2 ring-border group-hover:ring-primary/30 transition-all">
                  <div className={`w-full h-full rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center`}>
                    <AvatarFallback className={`bg-gradient-to-br ${member.gradient} text-white font-bold text-sm`}>
                      {member.avatar}
                    </AvatarFallback>
                  </div>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-card" />
              </div>

              <h3 className="text-sm font-bold text-foreground mb-0.5 leading-tight">{member.name}</h3>
              <p className="text-xs text-primary font-medium mb-0.5">{member.role}</p>
              <p className="text-xs text-muted-foreground">{member.expertise}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
