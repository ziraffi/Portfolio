import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionHeading } from '@/src/components/ui/SectionHeading';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { portfolioData } from '@/src/data/portfolio';

export function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);
  
  const projects = portfolioData.projects;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setCardsToShow(1);
      else if (window.innerWidth < 1024) setCardsToShow(2);
      else setCardsToShow(3);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const getVisibleProjects = () => {
    const visible = [];
    for (let i = 0; i < cardsToShow; i++) {
      visible.push(projects[(currentIndex + i) % projects.length]);
    }
    return visible;
  };

  return (
    <section id="projects" className="py-24 overflow-hidden bg-bg/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Featured Projects" 
          subtitle="A selection of my recent work, showcasing my skills in development and SEO optimization."
        />

        <div className="relative group/carousel perspective-1000">
          <div className="flex gap-10 py-12 px-4 overflow-visible">
            <AnimatePresence mode="popLayout" initial={false} custom={direction}>
              {getVisibleProjects().map((project, index) => (
                <motion.div
                  key={`${project.id}-${currentIndex}`}
                  custom={direction}
                  initial={{ opacity: 0, x: direction > 0 ? 150 : -150, rotateY: direction > 0 ? 45 : -45, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
                  exit={{ opacity: 0, x: direction > 0 ? -150 : 150, rotateY: direction > 0 ? -45 : 45, scale: 0.8 }}
                  transition={{ 
                    duration: 0.6, 
                    ease: [0.16, 1, 0.3, 1],
                    opacity: { duration: 0.4 }
                  }}
                  whileHover={{ 
                    z: 50,
                    scale: 1.05,
                    rotateX: 2,
                    rotateY: -2,
                    transition: { duration: 0.3 }
                  }}
                  className={`relative w-full ${
                    cardsToShow === 3 ? 'lg:w-[calc(33.333%-1.66rem)]' : 
                    cardsToShow === 2 ? 'md:w-[calc(50%-1.25rem)]' : 
                    'w-full'
                  } shrink-0 preserve-3d group/card`}
                >
                  {/* Card Shadow/Glow on hover */}
                  <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 -z-10" />
                  
                  <Card className="h-full flex flex-col border-border/40 hover:border-primary/40 transition-all duration-500 overflow-hidden bg-white/5 dark:bg-card/40 backdrop-blur-md shadow-lg group-hover/card:shadow-2xl group-hover/card:-translate-y-2">
                    {project.image && (
                      <div className="relative h-56 overflow-hidden bg-muted">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-40 group-hover/card:opacity-90 transition-opacity duration-500 flex items-center justify-center">
                           <a 
                             href={project.url} 
                             target="_blank" 
                             rel="noreferrer" 
                             className="bg-white text-black p-4 rounded-full transform translate-y-10 group-hover/card:translate-y-0 transition-all duration-500 hover:scale-110 hover:bg-primary hover:text-white"
                           >
                             <ExternalLink className="w-6 h-6" />
                           </a>
                        </div>
                      </div>
                    )}
                    
                    <CardHeader className="p-7 pb-2">
                      <div className="flex justify-between items-start mb-3">
                         <CardTitle className="text-2xl font-bold group-hover/card:text-primary transition-colors tracking-tight">{project.title}</CardTitle>
                         {project.url && (
                           <a href={project.url} target="_blank" rel="noreferrer" className="text-muted-fg hover:text-primary transition-all duration-300 hover:rotate-12">
                             <ExternalLink className="w-5 h-5" />
                           </a>
                         )}
                      </div>
                      <CardDescription className="text-[15px] leading-relaxed text-muted-fg/90 line-clamp-2 min-h-12">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="px-7 grow mt-2">
                      <ul className="space-y-3 text-sm text-muted-fg/80">
                        {project.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-start gap-3 group/item">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-1.5 shrink-0 group-hover/item:bg-primary transition-colors" />
                            <span className="line-clamp-2 leading-relaxed">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    
                    <CardFooter className="p-7 pt-4 mt-auto">
                      <div className="flex flex-wrap gap-2.5">
                        {project.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="bg-primary/5 text-primary border border-primary/10 hover:bg-primary/10 transition-colors px-3 py-1 text-xs font-semibold">{tag}</Badge>
                        ))}
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Premium Navigation Controls */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 lg:-translate-x-12 p-4 rounded-full bg-white/10 dark:bg-card/80 border border-white/20 dark:border-border/50 shadow-2xl text-fg hover:text-primary hover:border-primary/50 transition-all opacity-0 group-hover/carousel:opacity-100 z-10 backdrop-blur-md active:scale-90"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 lg:translate-x-12 p-4 rounded-full bg-white/10 dark:bg-card/80 border border-white/20 dark:border-border/50 shadow-2xl text-fg hover:text-primary hover:border-primary/50 transition-all opacity-0 group-hover/carousel:opacity-100 z-10 backdrop-blur-md active:scale-90"
            aria-label="Next slide"
          >
            <ChevronRight className="w-7 h-7" />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-3 mt-16">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
                index === currentIndex ? 'w-12 bg-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]' : 'w-3 bg-muted-fg/20 hover:bg-muted-fg/40'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

