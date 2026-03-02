import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { SectionHeading } from '@/src/components/ui/SectionHeading';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { portfolioData } from '@/src/data/portfolio';
import { Briefcase } from 'lucide-react';

export function Experience() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="experience" className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Decorative gradient background */}
      <div className="absolute top-0 left-0 w-full h-24 bg-linear-to-b from-bg to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading 
          title="Professional Journey" 
          subtitle="A roadmap of my career growth, key achievements, and the impactful solutions I've delivered."
        />

        <div ref={containerRef} className="relative mt-16 max-w-5xl mx-auto">
          {/* Animated Timeline Line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-px md:-translate-x-1/2" />
          <motion.div 
            className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-0.5 bg-primary -translate-x-px md:-translate-x-1/2 origin-top" 
            style={{ scaleY }}
          />

          <div className="space-y-12">
            {portfolioData.experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group`}
              >
                {/* Timeline Node with Logo */}
                <div className="flex items-center justify-center w-12 h-12 rounded-xl border-2 border-primary/20 bg-bg shadow-xl text-primary shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-20 overflow-hidden transform group-hover:scale-110 group-hover:border-primary/50 transition-all duration-300">
                  {exp.logo ? (
                    <img src={exp.logo} alt={exp.company} className="w-full h-full object-cover" />
                  ) : (
                    <Briefcase className="w-5 h-5" />
                  )}
                </div>
                
                {/* Content Card */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)]">
                  <Card className="hover:shadow-xl transition-all duration-500 border-border/50 hover:border-primary/30 group/card bg-bg/80 backdrop-blur-sm">
                    <CardHeader className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3">
                           <div className="w-1.5 h-8 bg-primary/40 rounded-full" />
                           <div>
                             <CardTitle className="text-xl font-bold group-hover/card:text-primary transition-colors">{exp.role}</CardTitle>
                             <p className="text-sm font-semibold text-primary/80">{exp.company}</p>
                           </div>
                        </div>
                        <Badge variant="outline" className="bg-primary/5 text-primary border-primary/10 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                          {exp.period}
                        </Badge>
                      </div>
                      <CardDescription className="text-sm font-medium text-muted-fg flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-muted-fg/40" />
                        {exp.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="px-6 pb-6">
                      <ul className="space-y-3 text-muted-fg text-sm md:text-[0.95rem] mb-6">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="flex gap-3 leading-relaxed group/item">
                            <span className="text-primary font-bold mt-0.5 group-hover/item:scale-125 transition-transform">▹</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
                        {exp.technologies.map(tech => (
                          <Badge key={tech} variant="secondary" className="bg-primary/5 text-primary border-none font-medium hover:bg-primary/10 transition-colors">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

