import { Toaster } from "sonner"
import { Navbar } from "@/components/Navbar"
import { HeroSection } from "@/components/sections/HeroSection"
import { TrustMetrics } from "@/components/sections/TrustMetrics"
import { WhyFounders } from "@/components/sections/WhyFounders"
import { DeliveryFramework } from "@/components/sections/DeliveryFramework"
import { TechnologyExpertise } from "@/components/sections/TechnologyExpertise"
import { SelectedProjects } from "@/components/sections/SelectedProjects"
import { MeetTeam } from "@/components/sections/MeetTeam"
import { BookingSection } from "@/components/sections/BookingSection"
import { SocialLinks, Footer } from "@/components/sections/FooterSection"

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster
        position="top-right"
        theme="dark"
        richColors
        toastOptions={{
          style: {
            background: "var(--card)",
            border: "1px solid var(--border)",
            color: "var(--foreground)",
          },
        }}
      />

      <Navbar />

      <main>
        <HeroSection />
        <TrustMetrics />
        <WhyFounders />
        <DeliveryFramework />
        <TechnologyExpertise />
        <SelectedProjects />
        <MeetTeam />
        <BookingSection />
        <SocialLinks />
      </main>

      <Footer />
    </div>
  )
}

export default App
