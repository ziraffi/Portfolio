import React, { createContext, useContext, useState, ReactNode } from 'react';

type PlanContextType = {
  selectedPlan: {
    tech: string;
    tier: string;
  } | null;
  setPlan: (tech: string, tier: string) => void;
  clearPlan: () => void;
};

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [selectedPlan, setSelectedPlan] = useState<PlanContextType['selectedPlan']>(null);

  const setPlan = (tech: string, tier: string) => {
    setSelectedPlan({ tech, tier });
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
