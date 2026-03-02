import React from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from '@/src/components/ui/SectionHeading';
import { Badge } from '@/src/components/ui/Badge';
import { portfolioData } from '@/src/data/portfolio';

export function Skills() {
  const skillCategories = [
    { title: 'Frontend', skills: portfolioData.skills.frontend },
    { title: 'Backend', skills: portfolioData.skills.backend },
    { title: 'Databases', skills: portfolioData.skills.databases },
    { title: 'Tools', skills: portfolioData.skills.tools },
    { title: 'Platforms', skills: portfolioData.skills.platforms },
    { title: 'WordPress', skills: portfolioData.skills.wordpress },
  ];

  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Technical Skills" 
          subtitle="A comprehensive overview of my technical expertise and the tools I use."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-4 text-fg">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map(skill => (
                  <Badge key={skill} variant="secondary" className="px-3 py-1 text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
