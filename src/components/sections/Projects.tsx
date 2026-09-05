import React, { useState, useEffect, useRef } from 'react';
import { motion, PanInfo } from 'motion/react';
import { ExternalLink, ChevronLeft, ChevronRight, Hand } from 'lucide-react';
import { SectionHeading } from '@/src/components/ui/SectionHeading';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { portfolioData } from '@/src/data/portfolio';

export function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const projects = portfolioData.projects;
  const maxIndex = Math.max(0, projects.length - cardsToShow);

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

  // Ensure currentIndex stays in valid range when cardsToShow changes
  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, Math.max(0, projects.length - cardsToShow)));
  }, [cardsToShow, projects.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    const swipeThreshold = 40;
    const velocityThreshold = 300;

    if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
      nextSlide();
    } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
      prevSlide();
    }
  };

  return (
    <section id="projects" className="py-24 overflow-hidden bg-bg/50 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <SectionHeading 
            title="Featured Projects" 
            subtitle="A selection of my recent production work, showcasing custom theme architectures, speed optimization, and full-stack solutions."
            className="mb-0"
          />

          {/* Desktop Controls & Counter */}
          <div className="flex items-center gap-4 self-start md:self-end shrink-0">
            <span className="text-xs font-mono font-bold text-muted-fg bg-card/60 px-3 py-1.5 rounded-full border border-border/50">
              {String(currentIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </span>
            <div className="flex items-center gap-2">
              <button 
                onClick={prevSlide}
                className="p-3 rounded-full bg-card/80 border border-border hover:border-primary/50 text-fg hover:text-primary shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer backdrop-blur-md"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={nextSlide}
                className="p-3 rounded-full bg-card/80 border border-border hover:border-primary/50 text-fg hover:text-primary shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer backdrop-blur-md"
                aria-label="Next project"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          ref={carouselRef}
          className="relative py-6 group/carousel"
        >
          {/* Draggable Sliding Track */}
          <div className="overflow-hidden rounded-3xl -mx-2 px-2 py-4">
            <motion.div 
              className="flex cursor-grab active:cursor-grabbing"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={handleDragEnd}
              animate={{ 
                x: `-${currentIndex * (100 / cardsToShow)}%` 
              }}
              transition={{ 
                type: "spring", 
                stiffness: 240, 
                damping: 28,
                mass: 0.8
              }}
            >
              {projects.map((project) => (
                <div
                  key={project.id}
                  style={{
                    width: `${100 / cardsToShow}%`,
                    flexShrink: 0,
                  }}
                  className="px-3 md:px-4"
                >
                  <div className="h-full relative group/card">
                    {/* Glow backdrop on hover */}
                    <div className="absolute inset-0 bg-primary/15 rounded-3xl blur-xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 -z-10" />
                    
                    <Card className="h-full flex flex-col border-border/50 hover:border-primary/40 transition-all duration-500 overflow-hidden bg-card/70 dark:bg-card/40 backdrop-blur-xl shadow-lg hover:shadow-2xl rounded-3xl group-hover/card:-translate-y-1.5">
                      {project.image && (
                        <div className="relative h-56 sm:h-60 overflow-hidden bg-muted/30">
                          <img 
                            src={project.image} 
                            alt={project.title}
                            draggable={false}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105 pointer-events-none"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent opacity-50 group-hover/card:opacity-90 transition-opacity duration-500 flex items-center justify-center">
                            {project.url && (
                              <a 
                                href={project.url} 
                                target="_blank" 
                                rel="noreferrer" 
                                onClick={(e) => isDragging && e.preventDefault()}
                                className="bg-white text-black p-3.5 rounded-full transform translate-y-6 group-hover/card:translate-y-0 transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-primary-fg shadow-xl"
                                aria-label={`Visit ${project.title}`}
                              >
                                <ExternalLink className="w-5 h-5" />
                              </a>
                            )}
                          </div>
                        </div>
                      )}
                      
                      <CardHeader className="p-6 sm:p-7 pb-2">
                        <div className="flex justify-between items-start gap-3 mb-2">
                          <CardTitle className="text-xl sm:text-2xl font-black group-hover/card:text-primary transition-colors tracking-tight line-clamp-1">
                            {project.title}
                          </CardTitle>
                          {project.url && (
                            <a 
                              href={project.url} 
                              target="_blank" 
                              rel="noreferrer" 
                              onClick={(e) => isDragging && e.preventDefault()}
                              className="text-muted-fg hover:text-primary transition-all duration-300 shrink-0"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                        <CardDescription className="text-sm leading-relaxed text-muted-fg line-clamp-2 min-h-10">
                          {project.description}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="px-6 sm:px-7 grow mt-2">
                        <ul className="space-y-2.5 text-xs sm:text-sm text-muted-fg/90">
                          {project.highlights.map((highlight, i) => (
                            <li key={i} className="flex items-start gap-2.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                              <span className="line-clamp-2 leading-relaxed">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      
                      <CardFooter className="p-6 sm:px-7 pt-4 mt-auto border-t border-border/40">
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map(tag => (
                            <Badge 
                              key={tag} 
                              variant="secondary" 
                              className="bg-primary/5 text-primary border border-primary/10 hover:bg-primary/10 transition-colors px-2.5 py-0.5 text-[11px] font-bold rounded-lg"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Touch Swipe Hint on mobile */}
          <div className="flex sm:hidden items-center justify-center gap-1.5 text-xs text-muted-fg/60 mt-3 font-medium">
            <Hand className="w-3.5 h-3.5" />
            <span>Swipe cards to explore</span>
          </div>
        </div>

        {/* Progress Bar & Jump Indicators */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-border/40">
          <div className="flex items-center gap-2 overflow-x-auto max-w-full py-2">
            {projects.map((proj, index) => {
              const isActive = index === currentIndex;
              return (
                <button
                  key={proj.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? 'w-10 bg-primary shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]' 
                      : 'w-2.5 bg-muted-fg/20 hover:bg-muted-fg/50'
                  }`}
                  aria-label={`Go to project ${index + 1}: ${proj.title}`}
                />
              );
            })}
          </div>

          <div className="text-xs font-bold text-muted-fg uppercase tracking-widest">
            Showing {currentIndex + 1} to {Math.min(currentIndex + cardsToShow, projects.length)} of {projects.length} Projects
          </div>
        </div>
      </div>
    </section>
  );
}

