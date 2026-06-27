import { motion } from "framer-motion"
import { Mail, MessageCircle, Rocket } from "lucide-react"

// Social icon placeholders using SVG for missing lucide icons
function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  )
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  )
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}

const socialLinks = [
  {
    label: "LinkedIn",
    icon: LinkedinIcon,
    href: "https://linkedin.com",
    color: "text-blue-400",
    bg: "bg-blue-400/10 hover:bg-blue-400/20 border-blue-400/20 hover:border-blue-400/40",
  },
  {
    label: "GitHub",
    icon: GithubIcon,
    href: "https://github.com",
    color: "text-foreground",
    bg: "bg-muted hover:bg-accent border-border hover:border-primary/30",
  },
  {
    label: "X",
    icon: XIcon,
    href: "https://x.com",
    color: "text-foreground",
    bg: "bg-muted hover:bg-accent border-border hover:border-primary/30",
  },
  {
    label: "Email",
    icon: Mail,
    href: "mailto:hello@mvpengineering.studio",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10 hover:bg-emerald-400/20 border-emerald-400/20 hover:border-emerald-400/40",
  },
  {
    label: "WhatsApp",
    icon: MessageCircle,
    href: "https://wa.me",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10 hover:bg-emerald-400/20 border-emerald-400/20 hover:border-emerald-400/40",
  },
]

const footerLinks = {
  INTER: [
    { label: "MVP Engineering Studio", href: "#", bold: true },
  ],
  Features: [
    { label: "About", href: "#why-us" },
    { label: "Features", href: "#why-us" },
    { label: "Pricing", href: "#booking" },
    { label: "Blog", href: "#" },
  ],
  Pricing: [
    { label: "Ceotact", href: "#booking" },
  ],
  Team: [
    { label: "Log In", href: "#" },
  ],
}

export function SocialLinks() {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            Social
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4">
          {socialLinks.map((social, i) => {
            const Icon = social.icon
            return (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ scale: 1.08, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className={`flex flex-col items-center gap-3 p-6 w-28 rounded-2xl border ${social.bg} transition-all duration-200 cursor-pointer`}
              >
                <Icon className={`w-7 h-7 ${social.color}`} />
                <span className="text-xs font-semibold text-foreground">{social.label}</span>
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center glow-sm">
                <Rocket className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-foreground text-sm">MVP Engineering Studio</span>
            </a>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
              We build high-quality, scalable MVPs for ambitious founders and businesses.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).filter(([key]) => key !== "INTER").map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-4">
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} MVP Engineering Studio. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with React, FastAPI & love
          </p>
        </div>
      </div>
    </footer>
  )
}
