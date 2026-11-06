import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Github, Linkedin, Mail, Sparkles, Gauge, Activity, Briefcase, Globe } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { portfolioData } from '@/src/data/portfolio';
import { ParticlesBackground } from '@/src/components/ui/ParticlesBackground';

// Proof points taken directly from the summary copy (no invented stats)
const proofPoints = [
  { icon: Briefcase, value: '4+ Years', label: 'Production experience' },
  { icon: Gauge, value: '31 → 100', label: 'Lighthouse performance' },
  { icon: Activity, value: 'Passed', label: 'Core Web Vitals' },
];

export function Hero() {
  const { name, role, summary, socials, image } = portfolioData.personal;

  return (
    <section id="hero" className="relative pt-16 pb-24 lg:pt-28 lg:pb-36 overflow-hidden bg-bg">
      {/* Background Layer 1: Single soft glow behind the copy (kept subtle so the portrait leads) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40 dark:opacity-60">
        <div className="absolute -top-32 -left-32 w-[520px] h-[520px] bg-primary/10 rounded-full blur-[140px]" />
      </div>

      {/* Background Layer 2: Grid and Noise - faded toward the edges */}
      <div className="absolute inset-0 z-1 pointer-events-none">
        <div className="absolute inset-0 bg-grid-premium opacity-60 dark:opacity-80 mask-[radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.15] dark:opacity-[0.25] brightness-100 contrast-150 mix-blend-soft-light" />
      </div>

      {/* Background Layer 3: Particles - toned down */}
      <div className="absolute inset-0 z-2 opacity-30 dark:opacity-50 pointer-events-none">
        <ParticlesBackground />
      </div>

      {/* Section Transition Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-bg to-transparent z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Content Column */}
          <div className="order-2 lg:order-1 lg:col-span-7 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2.5 mb-6 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-primary">
                <span className="h-px w-8 bg-primary/60" />
                <span>{role}</span>
                <span className="text-muted-fg/60">·</span>
                <span className="text-muted-fg">Hyderabad, India</span>
              </div>

              <h1 className="text-[2.75rem] sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-fg mb-6 leading-[1.05]">
                Creating Digital <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-blue-600 to-indigo-600 animate-gradient-x">Experiences</span>
                <br />
                that Matter.
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-muted-fg mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Hi, I'm <span className="font-semibold text-fg">{name}</span>. {summary}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap justify-center lg:justify-start gap-4"
            >
              <Button
                size="lg"
                className="relative overflow-hidden group bg-primary text-primary-fg hover:text-white rounded-full px-10 py-4 shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.5)] transition-all duration-300 transform active:scale-95"
                asChild
              >
                <a href="#projects">
                  <span className="relative z-10 flex items-center gap-2 font-bold tracking-tight">
                    Explore Work
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-10 py-4 border-2 border-primary/20 hover:border-primary/40 bg-bg/50 backdrop-blur-sm transition-all duration-300 font-bold tracking-tight hover:bg-primary/5 active:scale-95 focus:ring-0"
                asChild
              >
                <a href="#contact">
                  Let's Connect
                </a>
              </Button>
            </motion.div>

            {/* Proof points */}
            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto lg:mx-0"
            >
              {proofPoints.map(({ icon: Icon, value, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-card/60 border border-border/60 backdrop-blur-md shadow-sm text-left"
                >
                  <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-black text-fg tracking-tight leading-tight">{value}</p>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-fg leading-tight mt-0.5">{label}</p>
                  </div>
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10 flex items-center justify-center lg:justify-start gap-6"
            >
              <a href={socials.github} target="_blank" rel="noreferrer" className="group text-muted-fg hover:text-primary transition-all duration-300 transform hover:scale-110">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href={socials.linkedin} target="_blank" rel="noreferrer" className="group text-muted-fg hover:text-primary transition-all duration-300 transform hover:scale-110">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href={`mailto:${portfolioData.personal.email}`} className="group text-muted-fg hover:text-primary transition-all duration-300 transform hover:scale-110">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
              <div className="h-px w-12 bg-border ml-2" />
              <span className="text-xs font-bold uppercase tracking-widest text-muted-fg/60">Follow Me</span>
            </motion.div>
          </div>

          {/* Image Column */}
          <motion.div
            className="order-1 lg:order-2 lg:col-span-5 relative"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative w-full max-w-[260px] sm:max-w-[340px] lg:max-w-[420px] mx-auto group">
              {/* Soft glow behind frame */}
              <div className="absolute -inset-6 bg-primary/15 rounded-[3rem] blur-3xl opacity-60 -z-10" />

              {/* Gradient border frame */}
              <div className="relative p-[1.5px] rounded-[2rem] bg-linear-to-br from-primary/60 via-border to-indigo-500/50 shadow-2xl shadow-primary/10">
                <div className="relative aspect-4/5 overflow-hidden rounded-[calc(2rem-1.5px)] bg-white">
                  {image ? (
                    <img
                      src={image}
                      alt={name}
                      className="w-full h-full object-cover object-[50%_40%] transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted">
                      <Sparkles className="w-12 h-12 text-primary/40 animate-pulse" />
                    </div>
                  )}
                </div>
              </div>

              {/* Always-visible captions (no hover required, so they work on mobile) */}
              <div className="absolute -left-4 sm:-left-8 top-8 px-3 py-2 sm:px-4 sm:py-3 rounded-2xl bg-card/90 dark:bg-black/70 backdrop-blur-md border border-border/80 shadow-xl">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg shrink-0">
                    <Sparkles className="w-4 h-4 text-primary-fg" />
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] font-black text-muted-fg uppercase tracking-widest">Expertise</p>
                    <p className="text-xs sm:text-sm font-bold text-fg">Web Development</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 sm:-right-8 bottom-8 px-3 py-2 sm:px-4 sm:py-3 rounded-2xl bg-card/90 dark:bg-black/70 backdrop-blur-md border border-border/80 shadow-xl">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/15 text-indigo-500 flex items-center justify-center shrink-0">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] font-black text-muted-fg uppercase tracking-widest">Clients</p>
                    <p className="text-xs sm:text-sm font-bold text-fg">Worldwide</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
