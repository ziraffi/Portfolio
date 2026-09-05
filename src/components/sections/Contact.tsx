import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, ShieldCheck, CheckCircle2, AlertCircle, Settings, Layout, Info } from 'lucide-react';
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
          subtitle="Ready to build something exceptional? Choose your preferred stack or send a direct inquiry below."
          className="text-center flex flex-col items-center mx-auto mb-6"
        />

        {/* Protected Contact Notice */}
        <div className="max-w-2xl mx-auto mb-10 p-3.5 sm:p-4 rounded-2xl bg-card/60 border border-border/60 backdrop-blur-md text-center flex items-center justify-center gap-2.5 text-xs sm:text-sm text-muted-fg shadow-sm">
          <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
          <span>
            <strong className="text-fg font-semibold">Protected Communication:</strong> Direct contact coordinates (phone, email, and location) are disclosed immediately below to verified users upon sending a message.
          </span>
        </div>

        {/* Centralized Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto p-6 sm:p-10 lg:p-12 rounded-[2.5rem] bg-card/40 border border-border/60 shadow-2xl backdrop-blur-xl relative group"
        >
          {/* Success Overlay with Revealed Direct Contact Details */}
          <AnimatePresence>
            {status === 'success' && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-card/98 backdrop-blur-2xl rounded-[2.5rem] p-6 sm:p-10 text-center overflow-y-auto"
              >
                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 mb-4 font-bold">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-fg mb-2">Message Sent Successfully!</h3>
                <p className="text-muted-fg max-w-lg mb-8 text-sm leading-relaxed">
                  Thank you for authenticating and reaching out! As a verified genuine contact, here are my direct coordinates:
                </p>

                {/* Revealed Contact Details Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl mb-8">
                  <div className="p-4 rounded-2xl bg-muted/40 border border-border/60 flex flex-col items-center text-center group/card hover:border-primary/50 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-2">
                      <Mail className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-muted-fg mb-1">Direct Email</span>
                    <a href={`mailto:${personalEmail}`} className="text-xs sm:text-sm font-bold text-fg hover:text-primary transition-colors break-all">
                      {personalEmail}
                    </a>
                  </div>

                  <div className="p-4 rounded-2xl bg-muted/40 border border-border/60 flex flex-col items-center text-center group/card hover:border-primary/50 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-2">
                      <Phone className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-muted-fg mb-1">Direct Phone</span>
                    <a href={`tel:${phone}`} className="text-xs sm:text-sm font-bold text-fg hover:text-primary transition-colors">
                      {phone}
                    </a>
                  </div>

                  <div className="p-4 rounded-2xl bg-muted/40 border border-border/60 flex flex-col items-center text-center group/card hover:border-primary/50 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-2">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-muted-fg mb-1">Location</span>
                    <span className="text-xs sm:text-sm font-bold text-fg">
                      {location}
                    </span>
                  </div>
                </div>

                <Button variant="secondary" className="px-8 py-3 rounded-xl font-bold" onClick={() => setStatus('idle')}>
                  Send Another Message
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form Background Accent */}
          <div className="absolute inset-0 bg-primary/5 rounded-[2.5rem] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          {/* Form: Left and Right Row Split (Column on Tab/Mobile/Small screens) */}
          <form className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch" onSubmit={handleSubmit}>
            
            {/* Left Column: Authenticate + Name + Email + Turnstile (Equal Height) */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
              <div className="space-y-5">
                
                {/* Authenticate to Connect with Tooltip */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <label className="text-[11px] font-black text-fg/70 uppercase tracking-[0.15em]">
                        Authenticate to Connect
                      </label>
                      <div className="relative group/tooltip inline-flex items-center">
                        <button 
                          type="button"
                          aria-label="Authentication Info"
                          className="text-muted-fg/60 hover:text-primary transition-colors cursor-help p-0.5"
                        >
                          <Info className="w-3.5 h-3.5" />
                        </button>
                        <div className="absolute left-0 bottom-full mb-2 w-64 p-3 rounded-2xl bg-card border border-border shadow-2xl text-xs text-muted-fg font-normal leading-relaxed opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-300 pointer-events-none z-50 backdrop-blur-xl">
                          <p className="font-bold text-fg mb-1 flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                            <span>Spam Protection</span>
                          </p>
                          To prevent automated bot scraping and protect direct phone/email channels, quick Google authentication is required before sending.
                          <div className="absolute left-3 top-full -mt-1 border-4 border-transparent border-t-card" />
                        </div>
                      </div>
                    </div>
                    {!isVerified && (
                      <span className="text-[9px] font-black text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Required
                      </span>
                    )}
                  </div>

                  {!isVerified ? (
                    <Button 
                      type="button" 
                      className="w-full py-4 rounded-2xl bg-card dark:bg-neutral-900 text-fg hover:bg-muted/50 dark:hover:bg-neutral-800 border border-border/80 dark:border-neutral-700 shadow-[2px_3px_0px_rgba(0,0,0,0.06),0_2px_4px_rgba(0,0,0,0.04)] dark:shadow-[2px_3px_0px_rgba(0,0,0,0.5),0_2px_8px_rgba(0,0,0,0.3)] hover:border-primary/40 flex items-center justify-center gap-3 font-bold text-sm transition-all active:translate-x-[1px] active:translate-y-[1px]"
                      onClick={() => login()}
                      disabled={status === 'submitting'}
                    >
                      <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
                      {status === 'submitting' ? 'Verifying...' : 'Verify with Google'}
                    </Button>
                  ) : (
                    <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 shadow-[2px_3px_0px_rgba(16,185,129,0.15)] flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span className="truncate">Verified: {formData.email}</span>
                    </div>
                  )}
                </div>

                {/* Name Field */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-[11px] font-black text-fg/70 ml-1 uppercase tracking-[0.15em]">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleSanitizedChange}
                    readOnly={isVerified}
                    className={`w-full px-4 py-3.5 rounded-2xl border border-border/80 dark:border-neutral-700 bg-card dark:bg-neutral-900 text-fg placeholder:text-muted-fg/40 text-sm shadow-[2px_3px_0px_rgba(0,0,0,0.06),0_2px_4px_rgba(0,0,0,0.04)] dark:shadow-[2px_3px_0px_rgba(0,0,0,0.5),0_2px_8px_rgba(0,0,0,0.3)] hover:border-primary/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 focus:shadow-[1px_2px_0px_rgba(0,0,0,0.1)] transition-all duration-200 ${isVerified ? 'opacity-85 bg-muted/30 cursor-not-allowed' : ''}`}
                    placeholder="Full Name"
                    required
                  />
                </div>
                
                {/* Email Field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-[11px] font-black text-fg/70 ml-1 uppercase tracking-[0.15em]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleSanitizedChange}
                    readOnly={isVerified}
                    className={`w-full px-4 py-3.5 rounded-2xl border border-border/80 dark:border-neutral-700 bg-card dark:bg-neutral-900 text-fg placeholder:text-muted-fg/40 text-sm shadow-[2px_3px_0px_rgba(0,0,0,0.06),0_2px_4px_rgba(0,0,0,0.04)] dark:shadow-[2px_3px_0px_rgba(0,0,0,0.5),0_2px_8px_rgba(0,0,0,0.3)] hover:border-primary/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 focus:shadow-[1px_2px_0px_rgba(0,0,0,0.1)] transition-all duration-200 ${isVerified ? 'opacity-85 bg-muted/30 cursor-not-allowed' : ''}`}
                    placeholder="email@example.com"
                    required
                  />
                </div>
              </div>

              {/* Turnstile Human Verification in Left Column Bottom */}
              <div className="mt-auto pt-4">
                <div className="flex flex-col items-center justify-center min-h-[66px] p-2 rounded-2xl border border-border/80 dark:border-neutral-700/80 bg-card/60 dark:bg-neutral-900/60 shadow-[2px_3px_0px_rgba(0,0,0,0.05),0_2px_4px_rgba(0,0,0,0.03)] dark:shadow-[2px_3px_0px_rgba(0,0,0,0.4)]">
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
                    <div className="p-2.5 w-full rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 text-center">
                      <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-500" />
                      <span>Security Verified via Google OAuth</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Selectors + Message + Submit Button (Equal Height) */}
            <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-6">
              
              <div className="space-y-5 flex-1 flex flex-col">
                {/* Selectors Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-2">
                    <label htmlFor="tech" className="text-[11px] font-black text-fg/70 ml-1 uppercase tracking-[0.15em]">
                      Tech Stack
                    </label>
                    <div className="relative">
                      <select
                        id="tech"
                        value={formData.tech}
                        onChange={handleSanitizedChange}
                        className="w-full px-3.5 py-3 rounded-2xl border border-border/80 dark:border-neutral-700 bg-card dark:bg-neutral-900 text-fg appearance-none font-bold cursor-pointer text-xs shadow-[2px_3px_0px_rgba(0,0,0,0.06),0_2px_4px_rgba(0,0,0,0.04)] dark:shadow-[2px_3px_0px_rgba(0,0,0,0.5),0_2px_8px_rgba(0,0,0,0.3)] hover:border-primary/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                      >
                        <option value="wordpress">WordPress / CMS</option>
                        <option value="nextjs">Next.js / Pro</option>
                        <option value="vite">Vite + React</option>
                      </select>
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-muted-fg">
                        <Settings className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="tier" className="text-[11px] font-black text-fg/70 ml-1 uppercase tracking-[0.15em]">
                      Plan Tier
                    </label>
                    <div className="relative">
                      <select
                        id="tier"
                        value={formData.tier}
                        onChange={handleSanitizedChange}
                        className="w-full px-3.5 py-3 rounded-2xl border border-border/80 dark:border-neutral-700 bg-card dark:bg-neutral-900 text-fg appearance-none font-bold cursor-pointer text-xs shadow-[2px_3px_0px_rgba(0,0,0,0.06),0_2px_4px_rgba(0,0,0,0.04)] dark:shadow-[2px_3px_0px_rgba(0,0,0,0.5),0_2px_8px_rgba(0,0,0,0.3)] hover:border-primary/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
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
                            <option value="E-Commerce & Scale">E-Commerce (₹1.2L)</option>
                          </>
                        )}
                      </select>
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-muted-fg">
                        <Layout className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="cycle" className="text-[11px] font-black text-fg/70 ml-1 uppercase tracking-[0.15em]">
                      Maintenance
                    </label>
                    <div className="relative">
                      <select
                        id="cycle"
                        value={formData.cycle}
                        onChange={handleSanitizedChange}
                        className="w-full px-3.5 py-3 rounded-2xl border border-border/80 dark:border-neutral-700 bg-card dark:bg-neutral-900 text-fg appearance-none font-bold cursor-pointer text-xs shadow-[2px_3px_0px_rgba(0,0,0,0.06),0_2px_4px_rgba(0,0,0,0.04)] dark:shadow-[2px_3px_0px_rgba(0,0,0,0.5),0_2px_8px_rgba(0,0,0,0.3)] hover:border-primary/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                      >
                        <option value="monthly">Monthly</option>
                        <option value="quarterly">Quarterly (~7% off)</option>
                        <option value="halfyearly">Half-Yearly (~13% off)</option>
                        <option value="yearly">Yearly (20% off)</option>
                      </select>
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-muted-fg">
                        <ShieldCheck className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Message Field */}
                <div className="space-y-2 flex-1 flex flex-col">
                  <label htmlFor="message" className="text-[11px] font-black text-fg/70 ml-1 uppercase tracking-[0.15em]">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={handleSanitizedChange}
                    rows={5}
                    className="w-full flex-1 min-h-[140px] px-4 py-3.5 rounded-2xl border border-border/80 dark:border-neutral-700 bg-card dark:bg-neutral-900 text-fg placeholder:text-muted-fg/40 resize-none text-sm shadow-[2px_3px_0px_rgba(0,0,0,0.06),0_2px_4px_rgba(0,0,0,0.04)] dark:shadow-[2px_3px_0px_rgba(0,0,0,0.5),0_2px_8px_rgba(0,0,0,0.3)] hover:border-primary/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    placeholder="Tell me about your project requirements, scope, and timeline..."
                    required
                  />
                </div>
              </div>
              
              {/* Submit CTA Button in Right Column Bottom */}
              <div className="mt-auto pt-4">
                <Button 
                  type="submit" 
                  className="w-full h-[66px] rounded-2xl font-black text-base shadow-[2px_4px_0px_rgba(0,0,0,0.15)] dark:shadow-[2px_4px_0px_rgba(0,0,0,0.7)] hover:shadow-[3px_5px_0px_rgba(0,0,0,0.2)] active:shadow-none active:translate-x-[1px] active:translate-y-[1px] transition-all duration-200 cursor-pointer" 
                  size="lg"
                  disabled={status === 'submitting' || !isVerified || (!turnstileToken && !turnstileError)}
                >
                  {status === 'submitting' ? 'Sending...' : 'Send Message'}
                </Button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
