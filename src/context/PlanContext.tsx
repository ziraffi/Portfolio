import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

const PRICING_UNLOCK_KEY = 'portfolio_pricing_unlocked';

function readPricingUnlocked(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(PRICING_UNLOCK_KEY) === 'true';
  } catch {
    return false;
  }
}

export type MaintenanceCycle = 'monthly' | 'quarterly' | 'halfyearly' | 'yearly';

export interface SelectedPlan {
  tech: string;
  tier: string;
  cycle?: MaintenanceCycle;
}

type PlanContextType = {
  selectedPlan: SelectedPlan | null;
  setPlan: (tech: string, tier: string, cycle?: MaintenanceCycle) => void;
  clearPlan: () => void;
  pricingUnlocked: boolean;
  unlockPricing: () => void;
};

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlan | null>(null);

  const setPlan = (tech: string, tier: string, cycle: MaintenanceCycle = 'monthly') => {
    setSelectedPlan({ tech, tier, cycle });
    // Auto scroll to contact form
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const clearPlan = () => setSelectedPlan(null);

  // Pricing is gated until the visitor successfully sends an inquiry.
  // Persisted so returning visitors who already submitted stay unlocked.
  const [pricingUnlocked, setPricingUnlocked] = useState<boolean>(readPricingUnlocked);

  const unlockPricing = useCallback(() => {
    setPricingUnlocked(true);
    try {
      window.localStorage.setItem(PRICING_UNLOCK_KEY, 'true');
    } catch {
      // Storage unavailable (private mode etc.): unlock for this session only.
    }
  }, []);

  return (
    <PlanContext.Provider value={{ selectedPlan, setPlan, clearPlan, pricingUnlocked, unlockPricing }}>
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (context === undefined) {
    throw new Error('usePlan must be used within a PlanProvider');
  }
  return context;
}

