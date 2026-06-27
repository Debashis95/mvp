import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Menu, X, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navLinks = [
  { label: "Features", href: "#why-us" },
  { label: "Pricing", href: "#booking" },
  { label: "Blog", href: "#" },
  { label: "Team", href: "#team" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollTo = (href: string) => {
    setOpen(false)
    if (href === "#") return
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-lg shadow-black/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 group"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center glow-sm transition-transform group-hover:scale-110">
              <Rocket className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground text-sm tracking-tight">
              MVP Engineering Studio
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => scrollTo("#booking")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2"
            >
              Log In
            </button>
            <Button
              size="sm"
              onClick={() => scrollTo("#booking")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 glow-sm font-semibold px-5"
            >
              Book a Call
            </Button>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground">
                  {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 bg-background/95 backdrop-blur-xl border-border">
                <div className="flex flex-col gap-2 mt-8">
                  {navLinks.map((link) => (
                    <button
                      key={link.label}
                      onClick={() => scrollTo(link.href)}
                      className="text-left px-4 py-3 text-base text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
                    >
                      {link.label}
                    </button>
                  ))}
                  <div className="border-t border-border mt-4 pt-4 flex flex-col gap-2">
                    <button
                      onClick={() => scrollTo("#booking")}
                      className="text-left px-4 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Log In
                    </button>
                    <Button
                      onClick={() => scrollTo("#booking")}
                      className="bg-primary text-primary-foreground w-full mt-1"
                    >
                      Book a Call
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
