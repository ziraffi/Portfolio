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
} from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { usePlan } from "@/src/context/PlanContext";

const techPricing = {
  wordpress: {
    name: "WordPress / CMS",
    description:
      "Managed content solutions. Best for blogs, news, and scalable e-commerce.",
    plans: [
      {
        id: "wp-basic",
        name: "Basic",
        price: "7,999",
        features: [
          "5 Premium Pages",
          "Managed WP Installation",
          "Custom Theme Setup",
          "Domain / Hosting / SSL",
          "1 Free Email",
          "Inquiry Form Builder",
          "1 Year Support",
          "Monthly Maintainance: ₹6,000",
        ],
        icon: <Globe className="w-5 h-5" />,
        color: "blue",
      },
      {
        id: "wp-blog",
        name: "Portfolio",
        price: "14,999",
        features: [
          "10 Premium Pages",
          "Domain / Hosting / SSL",
          "Everything in Basic",
          "Essential SEO Plugins",
          "Jetpack Security Suite",
          "2 Free Emails",
          "Advanced SEO Setup",
          "Custom Widgets",
          "Monthly Maintainance: ₹10,000",
        ],
        icon: <Layout className="w-5 h-5" />,
        popular: true,
        color: "emerald",
      },
      {
        id: "wp-ecom",
        name: "E-commerce",
        price: "21,999",
        features: [
          "20 Premium Pages",
          "Domain / Hosting / SSL",
          "WooCommerce Integration",
          "Payment Gateway Config",
          "Product CSV Upload",
          "Auto Invoice Generation",
          "Wallet System Ready",
          "Multi-vendor Support",
          "Monthly Maintainance: ₹15,000",
        ],
        icon: <ShoppingCart className="w-5 h-5" />,
        color: "purple",
      },
    ],
  },
  nextjs: {
    name: "Next.js / Pro",
    description:
      "Enterprise-grade full-stack solutions. Ideal for dynamic apps and superior SEO.",
    plans: [
      {
        id: "next-business",
        name: "Business",
        price: "15,999",
        features: [
          "15 Dynamic Pages",
          "Domain, Hosting & SSL",
          "Google Search Console Setup",
          "2GB Media Storage",
          "2 Professional Emails",
          "Auth Integration Ready",
          "Performance Optimization",
          "1yr Free Technical Support",
          "Monthly Maintainance: ₹8,000",
        ],
        icon: <Smartphone className="w-5 h-5" />,
        color: "blue",
      },
      {
        id: "next-enterprise",
        name: "Enterprise",
        price: "24,999",
        features: [
          "25+ Custom Pages",
          "Full-Stack App Logic",
          "Admin Dashboard Panel",
          "Database Integration",
          "OAuth/OTP Implementation",
          "API Architecture",
          "Lifetime Hosting Support",
          "Monthly Maintainance: ₹12,000+",
        ],
        icon: <Cpu className="w-5 h-5" />,
        popular: true,
        color: "purple",
      },
    ],
  },
  vite: {
    name: "Vite / Static",
    description:
      "Ultra-lightweight and lightning fast. Perfect for high-performance marketing sites.",
    plans: [
      {
        id: "vite-basic",
        name: "Basic",
        price: "9,999",
        features: [
          "5 Premium Pages",
          "1 Year Free Domain (.com/.in)",
          "1 Year Free Cloud Hosting",
          "Free SSL Certificate",
          "1 Professional Emails",
          "SEO Friendly Setup",
          "WhatsApp & Call Integration",
          "Inquiry Form",
          "Monthly Maintainance: ₹4,000",
        ],
        icon: <Zap className="w-5 h-5" />,
        color: "blue",
      },
      {
        id: "vite-pro",
        name: "Advanced",
        price: "14,999",
        features: [
          "10 Premium Pages",
          "All Basic Features",
          "High-Performance Animations",
          "Custom Iconography",
          "2 Professional Emails",
          "Performance Monitoring",
          "Priority Email Support",
          "Monthly Maintainance: ₹5,000",
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
    wordpress: "WordPress",
    nextjs: "Next.js",
    vite: "Vite + React",
  },
  {
    feature: "Page Load Speed",
    wordpress: "Average",
    nextjs: "Fast",
    vite: "Ultra Fast",
  },
  {
    feature: "SEO Capabilities",
    wordpress: "Excellent",
    nextjs: "Excellent",
    vite: "Good",
  },
  {
    feature: "Dynamic Content",
    wordpress: "High",
    nextjs: "Advanced Logic",
    vite: "Limited",
  },
  {
    feature: "Scalability",
    wordpress: "Average",
    nextjs: "High",
    vite: "Average",
  },
  { feature: "Security", wordpress: "Average", nextjs: "High", vite: "High" },
  {
    feature: "Maintenance",
    wordpress: "High",
    nextjs: "Moderate",
    vite: "Low",
  },
];

export function Pricing() {
  const { setPlan } = usePlan();
  const [activeTech, setActiveTech] =
    useState<keyof typeof techPricing>("wordpress");

  const currentTech = techPricing[activeTech];

  return (
    <section id="pricing" className="py-24 relative overflow-hidden bg-bg/30">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Scalable Web Solutions"
          subtitle="Transparent, realistic pricing for 2026. Choose the technology that fits your business goals and budget."
        />

        {/* Tech Selector Tabs */}
        <div className="flex flex-center justify-center mb-16 mt-8">
          <div className="flex p-1.5 bg-muted/40 backdrop-blur-xl rounded-2xl border border-border/50 shadow-inner">
            {(Object.keys(techPricing) as Array<keyof typeof techPricing>).map(
              (tech) => (
                <button
                  key={tech}
                  onClick={() => setActiveTech(tech)}
                  className={`relative px-8 py-3 rounded-xl text-sm font-bold transition-all duration-500 ${
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
                        : tech}
                  </span>
                </button>
              ),
            )}
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            key={activeTech}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h2 className="text-3xl font-black text-fg">{currentTech.name}</h2>
            <p className="text-lg text-muted-fg leading-relaxed px-4">
              {currentTech.description}
            </p>
          </motion.div>
        </div>

        <div
          className={`grid grid-cols-1 ${currentTech.plans.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"} gap-8 items-stretch mb-24 max-w-5xl mx-auto`}
        >
          <AnimatePresence mode="wait">
            {currentTech.plans.map((plan, idx) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative h-full"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary px-4 py-1.5 rounded-full text-[10px] font-black text-white uppercase tracking-[0.2em] shadow-lg z-20">
                    Most Popular
                  </div>
                )}

                <div
                  className={`h-full p-8 lg:p-10 rounded-[2.5rem] bg-card/60 border-2 ${plan.popular ? "border-primary" : "border-border/60"} shadow-2xl backdrop-blur-2xl flex flex-col group hover:border-primary/40 transition-colors duration-500`}
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div
                      className={`w-12 h-12 rounded-xl bg-${plan.color === "primary" ? "primary" : plan.color + "-500"}/10 flex items-center justify-center text-${plan.color === "primary" ? "primary" : plan.color + "-500"}`}
                    >
                      {plan.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-fg tracking-tight">
                        {plan.name}
                      </h3>
                      <p className="text-[10px] font-bold text-primary uppercase tracking-widest leading-none mt-1">
                        Reliable 2026 Tier
                      </p>
                    </div>
                  </div>

                  <div className="mb-8 pb-8 border-b border-border/50">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-fg tracking-tighter">
                        ₹{plan.price}
                      </span>
                      <span className="text-muted-fg text-xs font-semibold uppercase tracking-wider">
                        / project
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-10 grow">
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
                    onClick={() => setPlan(activeTech, plan.name)}
                  >
                    Choose plan
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Global Comparison Table at Bottom */}
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
                Technical Roadmap
              </h3>
              <p className="text-muted-fg">
                Detailed logic comparison between the leading modern
                technologies.
              </p>
            </div>
            <div className="flex gap-2">
              <div className="px-4 py-2 bg-muted/30 rounded-xl border border-border/50 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                <Shield className="w-3 h-3 text-green-500" /> Secure
              </div>
              <div className="px-4 py-2 bg-muted/30 rounded-xl border border-border/50 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                <Settings className="w-3 h-3 text-primary" /> Scalable
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
                  <th className="py-5 font-black text-xs uppercase tracking-widest text-muted-fg min-w-[140px]">
                    Vite Stack
                  </th>
                  <th className="py-5 font-black text-xs uppercase tracking-widest text-muted-fg min-w-[140px]">
                    Next.js Framework
                  </th>
                  <th className="py-5 font-black text-xs uppercase tracking-widest text-muted-fg min-w-[140px]">
                    WordPress CMS
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
                    <td
                      className={`py-5 text-sm ${row.vite === "Ultra Fast" ? "text-green-500 font-black" : "text-muted-fg group-hover:text-fg font-medium"}`}
                    >
                      {row.vite}
                    </td>
                    <td
                      className={`py-5 text-sm ${row.nextjs === "Excellent" || row.nextjs === "High" ? "text-primary font-black" : "text-muted-fg group-hover:text-fg font-medium"}`}
                    >
                      {row.nextjs}
                    </td>
                    <td className="py-5 text-sm text-muted-fg group-hover:text-fg font-medium">
                      {row.wordpress}
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
