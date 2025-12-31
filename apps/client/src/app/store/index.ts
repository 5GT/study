import React, { createContext, useContext, useState } from 'react';
import type { LiarGamePhase } from 'shared';

interface AppState {
  phase: LiarGamePhase;
}

interface StoreValue extends AppState {
  setPhase: (phase: LiarGamePhase) => void;
}

const StoreContext = createContext<StoreValue | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode; initialPhase: LiarGamePhase }> = ({
  children,
  initialPhase
}) => {
  const [phase, setPhase] = useState<LiarGamePhase>(initialPhase);

  return <StoreContext.Provider value={{ phase, setPhase }}>{children}</StoreContext.Provider>;
};

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return ctx;
}
