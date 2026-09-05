import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, ShieldCheck, CheckCircle2, AlertCircle, Settings, Layout } from 'lucide-react';
import { SectionHeading } from '@/src/components/ui/SectionHeading';
import { Button } from '@/src/components/ui/Button';
import { portfolioData } from '@/src/data/portfolio';
import DOMPurify from 'dompurify';
import { Turnstile } from '@marsidev/react-turnstile';
import { useGoogleLogin } from '@react-oauth/google';
import { usePlan } from '@/src/context/PlanContext';
import emailjs from '@emailjs/browser';

export function Contact() {
  const { email: personalEmail, phone, location } = portfolioData.personal;
  const { selectedPlan, clearPlan } = usePlan();
  
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    message: '',
    tech: 'wordpress',
    tier: 'Basic',
    cycle: 'monthly'
  });
  
  const [isVerified, setIsVerified] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileError, setTurnstileError] = useState(false);

  // Sync with selected plan from Pricing section
  React.useEffect(() => {
    if (selectedPlan) {
      setFormData(prev => ({
        ...prev,
        tech: selectedPlan.tech,
        tier: selectedPlan.tier,
        cycle: selectedPlan.cycle || prev.cycle
      }));
    }
  }, [selectedPlan]);

  const handleSanitizedChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    const cleanValue = DOMPurify.sanitize(value);
    setFormData(prev => ({ ...prev, [id]: cleanValue }));
  };

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setStatus('submitting');
      try {
        const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const profile = await res.json();
        
        setFormData(prev => ({ 
          ...prev, 
          name: profile.name || 'Verified User', 
          email: profile.email 
        }));
        setIsVerified(true);
        setStatus('idle');
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        setStatus('error');
      }
    },
    onError: () => setStatus('error'),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isVerified) {
      alert("Please authenticate with Google to verify your email!");
      return;
    }
    if (!turnstileToken && !turnstileError) {
      alert("Please complete the verification check.");
      return;
    }
    
    setStatus('submitting');

    // REAL EMAIL INTEGRATION (EmailJS)
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      to_email: personalEmail,
      tech: formData.tech.toUpperCase(),
      tier: formData.tier,
      maintenance_cycle: formData.cycle.toUpperCase(),
      message: formData.message,
      verified: isVerified ? "Yes (Google OAuth)" : "No",
      turnstile_status: turnstileToken ? "Verified (Turnstile Passed)" : (turnstileError ? "Fallback (OAuth Verified - Turnstile Bypass)" : "Pending"),
      timestamp: new Date().toLocaleString()
    };

    try {
      // 1. Send Notification to Owner
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      // 2. Send Auto-Reply to Client (if configured)
      if (import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID) {
        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID,
          templateParams,
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );
      }

      setStatus('success');
      setFormData({ 
        name: '', 
        email: '', 
        message: '', 
        tech: 'wordpress', 
        tier: 'Basic',
        cycle: 'monthly'
      });
      setIsVerified(false);
      setTurnstileToken(null);
      clearPlan();
    } catch (error) {
      console.error('Email delivery failed:', error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-primary/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading 
          title="Get In Touch" 
          subtitle="I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mt-12">
          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-10 py-4"
          >
            <div className="flex items-start gap-6 group">
              <div className="shrink-0 w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 transform group-hover:rotate-6 shadow-sm">
                <Mail className="w-6 h-6" />
              </div>
              <div className="pt-1">
                <h3 className="text-xl font-bold text-fg tracking-tight">Email</h3>
                <p className="mt-2 text-muted-fg leading-relaxed">
                  <a href={`mailto:${personalEmail}`} className="hover:text-primary transition-colors text-lg">
                    {personalEmail}
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="shrink-0 w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 transform group-hover:-rotate-6 shadow-sm">
                <Phone className="w-6 h-6" />
              </div>
              <div className="pt-1">
                <h3 className="text-xl font-bold text-fg tracking-tight">Phone</h3>
                <p className="mt-2 text-muted-fg leading-relaxed">
                  <a href={`tel:${phone}`} className="hover:text-primary transition-colors text-lg">
                    {phone}
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="shrink-0 w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 transform group-hover:rotate-6 shadow-sm">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="pt-1">
                <h3 className="text-xl font-bold text-fg tracking-tight">Location</h3>
                <p className="mt-2 text-muted-fg text-lg leading-relaxed">{location}</p>
              </div>
            </div>
            
            <div className="pt-8 p-6 rounded-3xl bg-muted/30 border border-border/50 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4 text-primary">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Security Verified</span>
              </div>
              <p className="text-sm font-medium text-muted-fg italic">
                "Driven by a passion for creating seamless digital experiences that solve real-world problems. Let's build something amazing together."
              </p>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 sm:p-10 rounded-[2.5rem] bg-card/40 border border-border/60 shadow-2xl backdrop-blur-xl relative group"
          >
            <AnimatePresence>
              {status === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-card/95 backdrop-blur-md rounded-[2.5rem] p-10 text-center"
                >
                  <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mb-6 font-bold">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-black text-fg mb-2">Message Sent!</h3>
                  <p className="text-muted-fg">Thanks for reaching out. I'll get back to you soon.</p>
                  <Button variant="secondary" className="mt-8" onClick={() => setStatus('idle')}>Send Another</Button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form Background Accent */}
            <div className="absolute inset-0 bg-primary/5 rounded-[2.5rem] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              {!isVerified ? (
                <div className="p-8 rounded-3xl border-2 border-dashed border-primary/20 bg-primary/5 text-center space-y-4">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-fg underline decoration-primary/30 underline-offset-4">Authenticate to Connect</h4>
                  <p className="text-sm text-muted-fg">To prevent spam, please verify your email before sending a message.</p>
                  <Button 
                    type="button" 
                    className="w-full bg-white text-black hover:bg-neutral-100 border border-neutral-200 shadow-sm flex items-center justify-center gap-3 font-bold"
                    onClick={() => login()}
                    disabled={status === 'submitting'}
                  >
                    <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
                    {status === 'submitting' ? 'Verifying...' : 'Verify with Google'}
                  </Button>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center gap-3 text-green-600 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  Email Verified: <span>{formData.email}</span>
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="name" className="text-[10px] font-black text-fg/40 ml-1 uppercase tracking-[0.2em]">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleSanitizedChange}
                  readOnly={isVerified}
                  className={`w-full px-6 py-4 rounded-2xl border border-border/60 bg-bg/50 text-fg focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all duration-300 placeholder:text-muted-fg/40 ${isVerified ? 'opacity-70 cursor-not-allowed bg-muted/20' : ''}`}
                  placeholder="Full Name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-[10px] font-black text-fg/40 ml-1 uppercase tracking-[0.2em]">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleSanitizedChange}
                  readOnly={isVerified}
                  className={`w-full px-6 py-4 rounded-2xl border border-border/60 bg-bg/50 text-fg focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all duration-300 placeholder:text-muted-fg/40 ${isVerified ? 'opacity-70 cursor-not-allowed bg-muted/20' : ''}`}
                  placeholder="email@example.com"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label htmlFor="tech" className="text-[10px] font-black text-fg/40 ml-1 uppercase tracking-[0.2em]">
                    Tech Stack
                  </label>
                  <div className="relative">
                    <select
                      id="tech"
                      value={formData.tech}
                      onChange={handleSanitizedChange}
                      className="w-full px-4 py-3.5 rounded-2xl border border-border/60 bg-bg/50 text-fg focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all duration-300 appearance-none font-bold cursor-pointer text-sm"
                    >
                      <option value="wordpress">WordPress / CMS</option>
                      <option value="nextjs">Next.js / Pro</option>
                      <option value="vite">Vite + React</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-fg/40">
                      <Settings className="w-4 h-4" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="tier" className="text-[10px] font-black text-fg/40 ml-1 uppercase tracking-[0.2em]">
                    Plan Tier
                  </label>
                  <div className="relative">
                    <select
                      id="tier"
                      value={formData.tier}
                      onChange={handleSanitizedChange}
                      className="w-full px-4 py-3.5 rounded-2xl border border-border/60 bg-bg/50 text-fg focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all duration-300 appearance-none font-bold cursor-pointer text-sm"
                    >
                      {formData.tech === 'vite' && (
                        <>
                          <option value="Basic">Basic (₹50k)</option>
                          <option value="Advanced">Advanced (₹75k)</option>
                        </>
                      )}
                      {formData.tech === 'nextjs' && (
                        <>
                          <option value="Business">Business (₹85k)</option>
                          <option value="Enterprise">Enterprise (₹1.5L)</option>
                        </>
                      )}
                      {formData.tech === 'wordpress' && (
                        <>
                          <option value="Basic">Basic (₹50k)</option>
                          <option value="Corporate & Pro">Corporate & Pro (₹75k)</option>
                          <option value="E-Commerce & Scale">E-Commerce & Scale (₹1.2L)</option>
                        </>
                      )}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-fg/40">
                      <Layout className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="cycle" className="text-[10px] font-black text-fg/40 ml-1 uppercase tracking-[0.2em]">
                    Maintenance
                  </label>
                  <div className="relative">
                    <select
                      id="cycle"
                      value={formData.cycle}
                      onChange={handleSanitizedChange}
                      className="w-full px-4 py-3.5 rounded-2xl border border-border/60 bg-bg/50 text-fg focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all duration-300 appearance-none font-bold cursor-pointer text-sm"
                    >
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly (Save ~7%)</option>
                      <option value="halfyearly">Half-Yearly (Save ~13%)</option>
                      <option value="yearly">Yearly (Save 20%)</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-fg/40">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-[10px] font-black text-fg/40 ml-1 uppercase tracking-[0.2em]">
                  Your Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleSanitizedChange}
                  rows={4}
                  className="w-full px-6 py-4 rounded-2xl border border-border/60 bg-bg/50 text-fg focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all duration-300 placeholder:text-muted-fg/40 resize-none"
                  placeholder="How can I help you?"
                  required
                />
              </div>

              {/* Turnstile Human Verification with Graceful Fallback */}
              <div className="flex flex-col items-center justify-center py-2 min-h-16">
                {!turnstileError ? (
                  <Turnstile 
                    siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"} 
                    onSuccess={(token) => {
                      setTurnstileToken(token);
                      setTurnstileError(false);
                    }}
                    onError={(err) => {
                      console.warn('[Cloudflare Turnstile] Challenge blocked/failed (Error 300030 or CSP):', err);
                      setTurnstileError(true);
                    }}
                    onExpire={() => setTurnstileToken(null)}
                    options={{ theme: 'auto', retry: 'auto', retryInterval: 3000 }}
                  />
                ) : (
                  <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>Security Verified: Authenticated via Google OAuth</span>
                  </div>
                )}
              </div>
              
              <Button 
                type="submit" 
                className="w-full py-7 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all duration-500 active:scale-[0.98]" 
                size="lg"
                disabled={status === 'submitting' || !isVerified || (!turnstileToken && !turnstileError)}
              >
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
