import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Check,
  Zap,
  Globe,
  Rocket,
  Shield,
  Cpu,
  Layout,
  Smartphone,
  Code,
  ShoppingCart,
  Settings,
  Sparkles,
  Calendar,
} from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { usePlan, MaintenanceCycle } from "@/src/context/PlanContext";

interface PlanItem {
  id: string;
  name: string;
  price: string;
  maintenance: {
    monthly: { amount: string; periodLabel: string; monthlyEquivalent: string };
    quarterly: { amount: string; periodLabel: string; monthlyEquivalent: string; discount: string };
    halfyearly: { amount: string; periodLabel: string; monthlyEquivalent: string; discount: string };
    yearly: { amount: string; periodLabel: string; monthlyEquivalent: string; discount: string };
  };
  features: string[];
  icon: React.ReactNode;
  popular?: boolean;
  color: string;
}

interface TechGroup {
  name: string;
  description: string;
  plans: PlanItem[];
}

const techPricing: Record<string, TechGroup> = {
  wordpress: {
    name: "WordPress / Custom CMS",
    description:
      "Token-based custom themes, custom plugins, zero-page-builder architectures, and high-performance managed CMS platforms starting at ₹50,000.",
    plans: [
      {
        id: "wp-basic",
        name: "Basic",
        price: "50,000",
        maintenance: {
          monthly: { amount: "5,000", periodLabel: "/ month", monthlyEquivalent: "₹5,000/mo" },
          quarterly: { amount: "14,000", periodLabel: "/ quarter", monthlyEquivalent: "₹4,666/mo", discount: "Save 7%" },
          halfyearly: { amount: "26,000", periodLabel: "/ 6 months", monthlyEquivalent: "₹4,333/mo", discount: "Save 13%" },
          yearly: { amount: "48,000", periodLabel: "/ year", monthlyEquivalent: "₹4,000/mo", discount: "Save 20%" },
        },
        features: [
          "5–8 Custom Responsive Pages",
          "Custom Theme from Design Tokens (No Page Builders)",
          "Domain, Cloud Hosting & SSL Setup",
          "Turnstile / Bot Protection & Inquiry Form",
          "Essential SEO & Schema.org Integration",
          "1 Year Priority Technical Support",
        ],
        icon: <Globe className="w-5 h-5" />,
        color: "blue",
      },
      {
        id: "wp-portfolio",
        name: "Corporate & Pro",
        price: "75,000",
        maintenance: {
          monthly: { amount: "8,000", periodLabel: "/ month", monthlyEquivalent: "₹8,000/mo" },
          quarterly: { amount: "22,500", periodLabel: "/ quarter", monthlyEquivalent: "₹7,500/mo", discount: "Save 6%" },
          halfyearly: { amount: "42,000", periodLabel: "/ 6 months", monthlyEquivalent: "₹7,000/mo", discount: "Save 12.5%" },
          yearly: { amount: "76,800", periodLabel: "/ year", monthlyEquivalent: "₹6,400/mo", discount: "Save 20%" },
        },
        features: [
          "10–15 Custom Bespoke Pages",
          "Token-Based Theme (Dark/Light Modes)",
          "Google Lighthouse Performance 95–100",
          "Custom In-House SEO Plugin & JobPosting/FAQ Schema",
          "Custom Post Types & Booking Integrations",
          "Advanced Caching & CDN Optimization",
          "Zero-Downtime Migration Safety",
        ],
        icon: <Layout className="w-5 h-5" />,
        popular: true,
        color: "emerald",
      },
      {
        id: "wp-ecom",
        name: "E-Commerce & Scale",
        price: "1,20,000",
        maintenance: {
          monthly: { amount: "12,000", periodLabel: "/ month", monthlyEquivalent: "₹12,000/mo" },
          quarterly: { amount: "33,000", periodLabel: "/ quarter", monthlyEquivalent: "₹11,000/mo", discount: "Save 8%" },
          halfyearly: { amount: "61,200", periodLabel: "/ 6 months", monthlyEquivalent: "₹10,200/mo", discount: "Save 15%" },
          yearly: { amount: "1,15,200", periodLabel: "/ year", monthlyEquivalent: "₹9,600/mo", discount: "Save 20%" },
        },
        features: [
          "20+ High-Conversion Pages & Catalog",
          "WooCommerce / Addonify Custom Architecture",
          "Payment Gateway & Invoice Automation",
          "REST API & CRM / Video-Call Integrations",
          "Encrypted Signed-URL Document & Lead Storage",
          "Automated Database Backups & Staging Sync",
          "24/7 Priority SLA & Performance Auditing",
        ],
        icon: <ShoppingCart className="w-5 h-5" />,
        color: "purple",
      },
    ],
  },
  nextjs: {
    name: "Next.js / Full-Stack Pro",
    description:
      "Enterprise-grade React 19 & Next.js full-stack solutions. Ideal for dynamic applications, portal dashboards, and superior SEO.",
    plans: [
      {
        id: "next-business",
        name: "Business",
        price: "85,000",
        maintenance: {
          monthly: { amount: "9,000", periodLabel: "/ month", monthlyEquivalent: "₹9,000/mo" },
          quarterly: { amount: "25,000", periodLabel: "/ quarter", monthlyEquivalent: "₹8,333/mo", discount: "Save 7%" },
          halfyearly: { amount: "46,800", periodLabel: "/ 6 months", monthlyEquivalent: "₹7,800/mo", discount: "Save 13%" },
          yearly: { amount: "86,400", periodLabel: "/ year", monthlyEquivalent: "₹7,200/mo", discount: "Save 20%" },
        },
        features: [
          "15 Dynamic Server-Rendered Pages",
          "React 19 / Next.js Server Components",
          "Sub-Second LCP & Edge SSR Performance",
          "Google Search Console & Rich Schema Setup",
          "OAuth Authentication & Database Models",
          "API Architecture & Webhooks",
          "1 Year Priority Technical Support",
        ],
        icon: <Smartphone className="w-5 h-5" />,
        color: "blue",
      },
      {
        id: "next-enterprise",
        name: "Enterprise",
        price: "1,50,000",
        maintenance: {
          monthly: { amount: "15,000", periodLabel: "/ month", monthlyEquivalent: "₹15,000/mo" },
          quarterly: { amount: "42,000", periodLabel: "/ quarter", monthlyEquivalent: "₹14,000/mo", discount: "Save 7%" },
          halfyearly: { amount: "78,000", periodLabel: "/ 6 months", monthlyEquivalent: "₹13,000/mo", discount: "Save 13%" },
          yearly: { amount: "1,44,000", periodLabel: "/ year", monthlyEquivalent: "₹12,000/mo", discount: "Save 20%" },
        },
        features: [
          "25+ Custom Full-Stack App Views",
          "Admin Dashboard Panel & Custom CMS",
          "High-Concurrency Database Integration",
          "Role-Based Access Control & OTP / OAuth",
          "Microservices / REST / GraphQL APIs",
          "Zero-Downtime CI/CD Pipeline on Azure / Vercel",
          "Dedicated 24/7 Support & SLA",
        ],
        icon: <Cpu className="w-5 h-5" />,
        popular: true,
        color: "purple",
      },
    ],
  },
  vite: {
    name: "Vite + React / High-Performance Static",
    description:
      "Ultra-lightweight, dependency-free, and lightning fast. Ideal for high-performance marketing sites and interactive portfolios.",
    plans: [
      {
        id: "vite-basic",
        name: "Basic",
        price: "50,000",
        maintenance: {
          monthly: { amount: "4,000", periodLabel: "/ month", monthlyEquivalent: "₹4,000/mo" },
          quarterly: { amount: "11,000", periodLabel: "/ quarter", monthlyEquivalent: "₹3,666/mo", discount: "Save 8%" },
          halfyearly: { amount: "21,000", periodLabel: "/ 6 months", monthlyEquivalent: "₹3,500/mo", discount: "Save 12.5%" },
          yearly: { amount: "38,400", periodLabel: "/ year", monthlyEquivalent: "₹3,200/mo", discount: "Save 20%" },
        },
        features: [
          "5–8 Ultra-Fast Static Pages",
          "1 Year Free Cloud Hosting & SSL",
          "Modern Tailwind CSS Design System",
          "Sub-second Page Load & 100 Lighthouse",
          "SEO Meta Optimization & Sitemaps",
          "Inquiry Form & Social/WhatsApp Integration",
        ],
        icon: <Zap className="w-5 h-5" />,
        color: "blue",
      },
      {
        id: "vite-pro",
        name: "Advanced",
        price: "75,000",
        maintenance: {
          monthly: { amount: "7,000", periodLabel: "/ month", monthlyEquivalent: "₹7,000/mo" },
          quarterly: { amount: "19,500", periodLabel: "/ quarter", monthlyEquivalent: "₹6,500/mo", discount: "Save 7%" },
          halfyearly: { amount: "36,000", periodLabel: "/ 6 months", monthlyEquivalent: "₹6,000/mo", discount: "Save 14%" },
          yearly: { amount: "67,200", periodLabel: "/ year", monthlyEquivalent: "₹5,600/mo", discount: "Save 20%" },
        },
        features: [
          "10+ Interactive Bespoke Pages",
          "All Basic Features Included",
          "GSAP / Motion Scroll-Driven Animations",
          "Interactive 3D Elements & Visuals",
          "Global State & Custom API Integrations",
          "Edge CDN Asset Optimization",
          "Priority Email & Direct Support",
        ],
        icon: <Rocket className="w-5 h-5" />,
        popular: true,
        color: "primary",
      },
    ],
  },
};

const techComparison = [
  {
    feature: "Technical Arsenal",
    wordpress: "WordPress (Custom Token Theme)",
    nextjs: "Next.js 15 / React 19",
    vite: "Vite + React 19",
  },
  {
    feature: "Page Load Speed",
    wordpress: "95–100 (Core Web Vitals)",
    nextjs: "Ultra Fast (Edge SSR)",
    vite: "Instant (Static Edge)",
  },
  {
    feature: "SEO & Schema",
    wordpress: "Deep Custom Schema & Meta",
    nextjs: "Server-Rendered SSR",
    vite: "Static Pre-Rendered",
  },
  {
    feature: "Dynamic Functionality",
    wordpress: "Plugins, Forms & E-com",
    nextjs: "Full App Logic & DB",
    vite: "Client APIs & Microservices",
  },
  {
    feature: "Scalability",
    wordpress: "High (Kinsta / Cloud)",
    nextjs: "Enterprise Level",
    vite: "Global Edge CDN",
  },
  {
    feature: "Security & Protection",
    wordpress: "Multi-bot & Token Hardened",
    nextjs: "NextAuth / OAuth & Shielded",
    vite: "Attack Surface Near-Zero",
  },
  {
    feature: "Maintenance Effort",
    wordpress: "Managed Updates & Backups",
    nextjs: "CI/CD & Cloud Monitoring",
    vite: "Minimal Overhead",
  },
];

const cycles: { id: MaintenanceCycle; label: string; badge?: string }[] = [
  { id: "monthly", label: "Monthly" },
  { id: "quarterly", label: "Quarterly", badge: "Save ~7%" },
  { id: "halfyearly", label: "Half-Yearly", badge: "Save ~13%" },
  { id: "yearly", label: "Yearly", badge: "Save 20% (Best Value)" },
];

export function Pricing() {
  const { setPlan } = usePlan();
  const [activeTech, setActiveTech] =
    useState<keyof typeof techPricing>("wordpress");
  const [activeCycle, setActiveCycle] = useState<MaintenanceCycle>("monthly");

  const currentTech = techPricing[activeTech];

  return (
    <section id="pricing" className="py-24 relative overflow-hidden bg-bg/30">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Scalable Web Solutions & Pricing"
          subtitle="Transparent, value-driven pricing starting from ₹50,000. Select your technology and flexible maintenance cycle tailored for long-term growth."
          className="text-center flex flex-col items-center mx-auto"
        />

        {/* Tech Selector Tabs */}
        <div className="flex flex-col items-center justify-center gap-6 mb-12 mt-8">
          <div className="flex p-1.5 bg-muted/40 backdrop-blur-xl rounded-2xl border border-border/50 shadow-inner max-w-full overflow-x-auto">
            {(Object.keys(techPricing) as Array<keyof typeof techPricing>).map(
              (tech) => (
                <button
                  key={tech}
                  onClick={() => setActiveTech(tech)}
                  className={`relative px-6 sm:px-8 py-3 rounded-xl text-sm font-bold transition-all duration-500 whitespace-nowrap ${
                    activeTech === tech
                      ? "text-primary-fg"
                      : "text-muted-fg hover:text-fg"
                  }`}
                >
                  {activeTech === tech && (
                    <motion.div
                      layoutId="active-tech-tab"
                      className="absolute inset-0 bg-primary rounded-xl shadow-lg shadow-primary/25"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                  <span className="relative z-10 capitalize">
                    {tech === "nextjs"
                      ? "Next.js"
                      : tech === "vite"
                        ? "Vite + React"
                        : "WordPress"}
                  </span>
                </button>
              ),
            )}
          </div>

          {/* Maintenance Cycle Selector Bar */}
          <div className="flex flex-col sm:flex-row items-center gap-3 bg-card/60 p-2 sm:p-2.5 rounded-2xl border border-border/60 backdrop-blur-md shadow-md">
            <div className="flex items-center gap-2 px-3 text-xs font-bold text-muted-fg uppercase tracking-wider">
              <Calendar className="w-4 h-4 text-primary" />
              <span>Maintenance Cycle:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {cycles.map((cycle) => (
                <button
                  key={cycle.id}
                  onClick={() => setActiveCycle(cycle.id)}
                  className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-1.5 ${
                    activeCycle === cycle.id
                      ? "bg-primary text-primary-fg shadow-sm"
                      : "bg-muted/30 text-muted-fg hover:text-fg hover:bg-muted/60"
                  }`}
                >
                  <span>{cycle.label}</span>
                  {cycle.badge && (
                    <span
                      className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded-full ${
                        activeCycle === cycle.id
                          ? "bg-white/20 text-white"
                          : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                      }`}
                    >
                      {cycle.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            key={activeTech}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3 flex flex-col items-center text-center"
          >
            <h2 className="text-3xl font-black text-fg text-center">{currentTech.name}</h2>
            <p className="text-lg text-muted-fg leading-relaxed px-4 max-w-2xl mx-auto text-center">
              {currentTech.description}
            </p>
          </motion.div>
        </div>

        <div
          className={`grid grid-cols-1 ${currentTech.plans.length === 3 ? "lg:grid-cols-3" : "md:grid-cols-2"} gap-8 items-stretch mb-24 max-w-6xl mx-auto`}
        >
          <AnimatePresence mode="wait">
            {currentTech.plans.map((plan, idx) => {
              const maint = plan.maintenance[activeCycle];

              return (
                <motion.div
                  key={`${plan.id}-${activeCycle}`}
                  initial={{ opacity: 0, scale: 0.96, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 20 }}
                  transition={{
                    duration: 0.4,
                    delay: idx * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative h-full"
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary px-4 py-1.5 rounded-full text-[10px] font-black text-white uppercase tracking-[0.2em] shadow-lg z-20 flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-amber-300" />
                      Most Popular
                    </div>
                  )}

                  <div
                    className={`h-full p-8 lg:p-9 rounded-[2.5rem] bg-card/60 border-2 ${
                      plan.popular ? "border-primary" : "border-border/60"
                    } shadow-2xl backdrop-blur-2xl flex flex-col group hover:border-primary/40 transition-colors duration-500`}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className={`w-12 h-12 rounded-xl bg-${
                          plan.color === "primary" ? "primary" : plan.color + "-500"
                        }/10 flex items-center justify-center text-${
                          plan.color === "primary" ? "primary" : plan.color + "-500"
                        }`}
                      >
                        {plan.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-fg tracking-tight">
                          {plan.name}
                        </h3>
                        <p className="text-[10px] font-bold text-primary uppercase tracking-widest leading-none mt-1">
                          Production Ready
                        </p>
                      </div>
                    </div>

                    {/* Project Base Price */}
                    <div className="mb-6 pb-6 border-b border-border/50">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-muted-fg mb-1">
                        One-Time Build Cost
                      </div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-4xl font-black text-fg tracking-tighter">
                          ₹{plan.price}
                        </span>
                        <span className="text-muted-fg text-xs font-semibold uppercase tracking-wider">
                          / project
                        </span>
                      </div>

                      {/* Maintenance Breakdown Card */}
                      <div className="mt-4 p-3.5 rounded-2xl bg-muted/40 border border-border/60 flex items-center justify-between">
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-wider text-muted-fg flex items-center gap-1">
                            <Shield className="w-3 h-3 text-primary" />
                            Maintenance ({activeCycle})
                          </div>
                          <div className="text-base font-black text-fg tracking-tight mt-0.5">
                            ₹{maint.amount}{" "}
                            <span className="text-xs font-medium text-muted-fg">
                              {maint.periodLabel}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-primary/10 text-primary">
                            {maint.monthlyEquivalent}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Features List */}
                    <ul className="space-y-3.5 mb-8 grow">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-fg/90">
                          <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 shrink-0 mt-0.5">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-sm font-medium tracking-tight leading-snug">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className="w-full py-6 rounded-2xl font-bold text-base shadow-xl"
                      size="lg"
                      onClick={() => setPlan(activeTech, plan.name, activeCycle)}
                    >
                      Choose {plan.name} Plan
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Technical Roadmap Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card/40 border border-border/50 rounded-[2.5rem] p-8 lg:p-12 backdrop-blur-xl shadow-2xl"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h3 className="text-2xl font-black tracking-tight flex items-center gap-3 mb-2">
                <Code className="text-primary" />
                Technical Roadmap & Architecture
              </h3>
              <p className="text-muted-fg">
                Comparing full-stack logic, performance benchmarks, and maintenance characteristics.
              </p>
            </div>
            <div className="flex gap-2">
              <div className="px-4 py-2 bg-muted/30 rounded-xl border border-border/50 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                <Shield className="w-3 h-3 text-green-500" /> 100% Secure
              </div>
              <div className="px-4 py-2 bg-muted/30 rounded-xl border border-border/50 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                <Settings className="w-3 h-3 text-primary" /> Zero-Downtime
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="py-5 font-black text-xs uppercase tracking-widest text-muted-fg pr-8 sticky left-0 bg-card z-20 pl-6">
                    Key Feature
                  </th>
                  <th className="py-5 font-black text-xs uppercase tracking-widest text-muted-fg min-w-[150px]">
                    WordPress CMS
                  </th>
                  <th className="py-5 font-black text-xs uppercase tracking-widest text-muted-fg min-w-[150px]">
                    Next.js Pro
                  </th>
                  <th className="py-5 font-black text-xs uppercase tracking-widest text-muted-fg min-w-[150px]">
                    Vite Stack
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {techComparison.map((row, i) => (
                  <tr
                    key={i}
                    className="hover:bg-primary/5 transition-colors group"
                  >
                    <td className="py-5 text-fg font-bold pr-8 sticky left-0 bg-card z-10 group-hover:bg-primary/5 pl-6">
                      {row.feature}
                    </td>
                    <td className="py-5 text-sm font-semibold text-fg">
                      {row.wordpress}
                    </td>
                    <td
                      className={`py-5 text-sm ${
                        row.nextjs.includes("Ultra") || row.nextjs.includes("Enterprise")
                          ? "text-primary font-black"
                          : "text-muted-fg group-hover:text-fg font-medium"
                      }`}
                    >
                      {row.nextjs}
                    </td>
                    <td
                      className={`py-5 text-sm ${
                        row.vite.includes("Instant")
                          ? "text-green-500 font-black"
                          : "text-muted-fg group-hover:text-fg font-medium"
                      }`}
                    >
                      {row.vite}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

