import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Github, Linkedin, Mail, Sparkles } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { portfolioData } from '@/src/data/portfolio';
import { ParticlesBackground } from '@/src/components/ui/ParticlesBackground';

export function Hero() {
  const { name, role, summary, socials, image } = portfolioData.personal;

  return (
    <section id="hero" className="relative pt-12 pb-24 lg:pt-24 lg:pb-32 overflow-hidden bg-bg">
      {/* Background Layer 1: Base colors and blurred blobs - Deepest layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-50 dark:opacity-80">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[140px] transition-all duration-1000" />
      </div>

      {/* Background Layer 2: Grid and Noise - Mid layer */}
      <div className="absolute inset-0 z-1 pointer-events-none">
        <div className="absolute inset-0 bg-grid-premium opacity-100" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.2] dark:opacity-[0.3] brightness-100 contrast-150 mix-blend-soft-light" />
      </div>

      {/* Background Layer 3: Particles - On top of patterns */}
      <div className="absolute inset-0 z-2 opacity-50 dark:opacity-80 pointer-events-none">
        <ParticlesBackground />
      </div>

      {/* Section Transition Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-bg to-transparent z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content Column */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6 animate-bounce-subtle">
                <Sparkles className="w-4 h-4" />
                <span>Available for new opportunities</span>
              </div> */}
              
              <h1 className="text-5xl sm:text-6xl lg:text-6xl font-extrabold tracking-tight text-fg mb-6 leading-[1.1]">
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
              className="text-md sm:text-lg text-muted-fg mb-10 max-w-2xl leading-relaxed"
            >
              Hi, I'm <span className="font-semibold text-fg">{name}</span>. {summary}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-5"
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

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-12 flex items-center gap-6"
            >
              <a href={socials.github} target="_blank" rel="noreferrer" className="group text-muted-fg hover:text-primary transition-all duration-300 transform hover:scale-110">
                <Github className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href={socials.linkedin} target="_blank" rel="noreferrer" className="group text-muted-fg hover:text-primary transition-all duration-300 transform hover:scale-110">
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href={`mailto:${portfolioData.personal.email}`} className="group text-muted-fg hover:text-primary transition-all duration-300 transform hover:scale-110">
                <Mail className="h-6 w-6" />
                <span className="sr-only">Email</span>
              </a>
              <div className="h-px w-12 bg-border ml-2" />
              <span className="text-xs font-bold uppercase tracking-widest text-muted-fg/60">Follow Me</span>
            </motion.div>
          </div>

          {/* Image Column */}
          <motion.div 
            className="order-1 lg:order-2 relative"
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative z-10 w-full max-w-[450px] mx-auto group">
              {/* Decorative rings */}
              <div className="absolute inset-0 bg-primary/20 rounded-[2.5rem] rotate-6 scale-105 blur-sm opacity-50 group-hover:rotate-3 transition-transform duration-700" />
              <div className="absolute inset-0 border-2 border-primary/30 rounded-[2.5rem] -rotate-3 scale-100 group-hover:rotate-0 transition-transform duration-700" />
              
              {/* Main Image Container */}
              <div className="relative aspect-4/5 overflow-hidden rounded-[2.5rem] bg-muted/30 border border-white/10 shadow-2xl backdrop-blur-xl dark:brightness-[0.85] dark:contrast-[1.1] transition-all duration-500">
                {image ? (
                  <img 
                    src={image} 
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <Sparkles className="w-12 h-12 text-primary/40 animate-pulse" />
                  </div>
                )}
                
                {/* Floating UI Elements - Theme Aware */}
                <div className="absolute top-6 left-6 p-4 rounded-2xl glass-texture opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg">
                      <Sparkles className="w-5 h-5 text-primary-fg" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Expertise</p>
                      <p className="text-sm font-bold text-white">Web Development</p>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-6 right-6 p-4 rounded-2xl glass-texture opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-200">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full border-2 border-primary bg-primary/20" />
                      <div className="w-8 h-8 rounded-full border-2 border-blue-500 bg-blue-500/20" />
                      <div className="w-8 h-8 rounded-full border-2 border-indigo-500 bg-indigo-500/20" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Clients</p>
                      <p className="text-sm font-bold text-white">Worldwide</p>
                    </div>
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

