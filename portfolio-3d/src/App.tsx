/**
 * The page wrapper. Sections land here in later tickets; for now it establishes
 * the ground colour and the horizontal-overflow clip.
 *
 * Clipped rather than hidden: hiding overflow would make this an ancestor scroll
 * container and break the sticky project cards further down the page.
 */
export default function App() {
  return <main className="min-h-screen w-full overflow-x-clip bg-ground" />
}
