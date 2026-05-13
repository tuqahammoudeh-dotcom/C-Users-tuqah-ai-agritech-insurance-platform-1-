import React, { createContext, useContext, useState, ReactNode } from 'react';
import { LandCase } from '../api/landData';

interface AppContextType {
  selectedCase: LandCase | null;
  setSelectedCase: (landCase: LandCase | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedCase, setSelectedCase] = useState<LandCase | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <AppContext.Provider value={{ selectedCase, setSelectedCase, isLoading, setIsLoading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
