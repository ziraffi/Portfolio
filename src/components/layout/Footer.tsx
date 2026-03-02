import React from 'react';
import { Github, Linkedin, Mail, Globe } from 'lucide-react';
import { portfolioData } from '@/src/data/portfolio';

export function Footer() {
  const { socials, email } = portfolioData.personal;

  return (
    <footer className="border-t border-border bg-bg py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="flex space-x-6 mb-8">
          <a href={socials.github} target="_blank" rel="noreferrer" className="text-muted-fg hover:text-fg transition-colors">
            <span className="sr-only">GitHub</span>
            <Github className="h-6 w-6" />
          </a>
          <a href={socials.linkedin} target="_blank" rel="noreferrer" className="text-muted-fg hover:text-fg transition-colors">
            <span className="sr-only">LinkedIn</span>
            <Linkedin className="h-6 w-6" />
          </a>
          <a href={socials.portfolio} target="_blank" rel="noreferrer" className="text-muted-fg hover:text-fg transition-colors">
            <span className="sr-only">Portfolio</span>
            <Globe className="h-6 w-6" />
          </a>
          <a href={`mailto:${email}`} className="text-muted-fg hover:text-fg transition-colors">
            <span className="sr-only">Email</span>
            <Mail className="h-6 w-6" />
          </a>
        </div>
        <p className="text-sm text-muted-fg text-center">
          &copy; {new Date().getFullYear()} {portfolioData.personal.name}. Built with React & Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
