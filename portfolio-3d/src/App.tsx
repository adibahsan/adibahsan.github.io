import { AboutSection } from './sections/AboutSection'
import { CapabilitiesSection } from './sections/CapabilitiesSection'
import { ContactSection } from './sections/ContactSection'
import { HeroSection } from './sections/HeroSection'
import { MarqueeSection } from './sections/MarqueeSection'
import { ProjectsSection } from './sections/ProjectsSection'

/**
 * The page wrapper, holding the six sections in the order Reskin gives.
 *
 * Contact is the one the supplied design did not have: the page used to stop on
 * the last project card, which left every visitor who wanted to reply with
 * nowhere to do it.
 *
 * Clipped rather than hidden: hiding overflow would make this an ancestor
 * scroll container and break the sticky project cards further down the page.
 */
export default function App() {
  return (
    <main className="min-h-screen w-full overflow-x-clip bg-ground">
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <CapabilitiesSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  )
}
