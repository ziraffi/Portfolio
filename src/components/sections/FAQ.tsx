import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, Package, ShieldCheck, Clock, MessageSquare } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}

const FAQItem = ({ question, answer, isOpen, onClick, icon }: FAQItemProps) => {
  return (
    <div className="border-b border-border/50 last:border-0">
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left group transition-all duration-300"
      >
        <div className="flex items-center gap-4">
          <div className={`p-2 rounded-lg transition-colors duration-300 ${isOpen ? 'bg-primary text-primary-fg' : 'bg-muted/50 text-muted-fg group-hover:text-primary'}`}>
            {icon}
          </div>
          <span className={`text-lg font-bold transition-colors duration-300 ${isOpen ? 'text-fg' : 'text-fg/70 group-hover:text-fg'}`}>
            {question}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className={`text-muted-fg/40 group-hover:text-primary transition-colors ${isOpen ? 'text-primary' : ''}`}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-6 pl-14 pr-4">
              <p className="text-muted-fg leading-relaxed">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What deliverables are required from my side?",
      answer: "To ensure a smooth workflow, I'll need your brand assets (logos, color codes), final website copy (text), high-resolution images/videos, and access to any existing hosting or domain registrars if you already have them. If you don't have these, I can assist in setting them up.",
      icon: <Package className="w-5 h-5" />
    },
    {
      question: "What does Monthly Maintenance include?",
      answer: "Monthly maintenance covers regular security updates, plugin/dependency patches, 24/7 uptime monitoring, high-performance cloud hosting renewals, and small content requests. It ensures your 2026-ready site stays fast and secure without any technical overhead for you.",
      icon: <ShieldCheck className="w-5 h-5" />
    },
    {
      question: "How long does a typical project take?",
      answer: "Timeline varies by complexity: Vite/Static sites take 1-2 weeks, WordPress implementations 2-3 weeks, and Next.js Enterprise solutions typically 4-6 weeks starting from finalized requirements.",
      icon: <Clock className="w-5 h-5" />
    },
    {
      question: "Will my website be SEO-friendly?",
      answer: "Absolutely. Regardless of the tier, I implement semantic HTML, properly nested headings, meta-data optimization, and performance tuning (Core Web Vitals) as a baseline. Next.js tiers offer advanced Server-Side Rendering (SSR) for enterprise-tier SEO.",
      icon: <HelpCircle className="w-5 h-5" />
    },
    {
      question: "Can I upgrade my plan later?",
      answer: "Yes. All my solutions are built with scalability in mind. You can start with a basic tier and move to a more advanced stack as your business grows. I handle the migration and data preservation during upgrades.",
      icon: <MessageSquare className="w-5 h-5" />
    }
  ];

  return (
    <section id="faq" className="py-24 relative overflow-hidden bg-bg/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading 
          title="Common Questions" 
          subtitle="Everything you need to know about our service, process, and deliverables to get your project started in 2026."
        />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 bg-card/40 border border-border/50 rounded-[2.5rem] p-4 sm:p-8 backdrop-blur-xl shadow-2xl"
        >
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              icon={faq.icon}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
