import { ThemeProvider } from './context/ThemeContext';
import { PlanProvider } from './context/PlanContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { Experience } from './components/sections/Experience';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';
import { Pricing } from './components/sections/Pricing';
import { FAQ } from './components/sections/FAQ';
import { Contact } from './components/sections/Contact';

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
      <PlanProvider>
        <div className="min-h-screen bg-bg text-fg font-sans selection:bg-primary/30 selection:text-primary-fg transition-colors duration-300 relative">
          <Navbar />
          <main className="relative">
            <Hero />
            
            <div className="relative overflow-hidden">
              {/* Background Connection Layer */}
              <div className="absolute inset-x-0 -top-24 h-48 bg-linear-to-b from-transparent via-muted/5 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-grid-premium opacity-[0.25] pointer-events-none" />
              <Experience />
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-grid-premium opacity-[0.4] pointer-events-none" />
              <Projects />
            </div>

            <div className="relative bg-muted/20">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
              <Skills />
            </div>

            <Pricing />
            <FAQ />
            <Contact />
          </main>
          <Footer />
        </div>
      </PlanProvider>
    </ThemeProvider>
  );
}
