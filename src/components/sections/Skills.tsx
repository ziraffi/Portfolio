import React from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from '@/src/components/ui/SectionHeading';
import { Badge } from '@/src/components/ui/Badge';
import { portfolioData } from '@/src/data/portfolio';
import { 
  Layout, Server, Database, Wrench, Cloud, 
  Globe, Code2, Cpu, Terminal, Layers
} from 'lucide-react';

const categoryIcons: Record<string, React.ReactNode> = {
  'Frontend': <Layout className="w-6 h-6" />,
  'Backend': <Server className="w-6 h-6" />,
  'Databases': <Database className="w-6 h-6" />,
  'Tools': <Wrench className="w-6 h-6" />,
  'Platforms': <Cloud className="w-6 h-6" />,
  'WordPress': <Globe className="w-6 h-6" />,
};

export function Skills() {
  const skillCategories = [
    { title: 'Frontend', skills: portfolioData.skills.frontend, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { title: 'Backend', skills: portfolioData.skills.backend, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { title: 'Databases', skills: portfolioData.skills.databases, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { title: 'Tools', skills: portfolioData.skills.tools, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { title: 'Platforms', skills: portfolioData.skills.platforms, color: 'text-sky-500', bg: 'bg-sky-500/10' },
    { title: 'WordPress', skills: portfolioData.skills.wordpress, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
  ];

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Technical Arsenal" 
          subtitle="A comprehensive overview of the languages, frameworks, and tools I use to build scalable digital solutions."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-16">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-card border border-border/50 rounded-2xl p-8 hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/30 transition-all duration-500"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className={`p-3 rounded-xl ${category.bg} ${category.color} group-hover:scale-110 transition-transform duration-500`}>
                  {categoryIcons[category.title] || <Code2 />}
                </div>
                <h3 className="text-2xl font-bold text-fg tracking-tight">{category.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, sIndex) => (
                  <motion.div
                    key={skill}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="relative"
                  >
                    <Badge 
                      variant="secondary" 
                      className="px-4 py-2 text-sm bg-muted/50 border-border/50 text-muted-fg hover:text-primary hover:bg-primary/5 hover:border-primary/20 transition-all duration-300 font-medium rounded-lg"
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>

              {/* Decorative corner element */}
              <div className={`absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${category.color}`}>
                <Cpu className="w-8 h-8 rotate-12" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

