import React, { createContext, useContext, useState, ReactNode } from 'react';

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

  return (
    <PlanContext.Provider value={{ selectedPlan, setPlan, clearPlan }}>
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

