import { AboutSection } from './sections/AboutSection'
import { HeroSection } from './sections/HeroSection'
import { MarqueeSection } from './sections/MarqueeSection'
import { ProjectsSection } from './sections/ProjectsSection'
import { ServicesSection } from './sections/ServicesSection'

/**
 * The page wrapper, holding the five sections in the order the design gives.
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
      <ServicesSection />
      <ProjectsSection />
    </main>
  )
}
