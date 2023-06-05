import * as React from 'react';

const CardLevelContext = React.createContext(1);

type CardLevelProviderType = {
  children: React.ReactNode;
  level: number;
};

export const CardLevelProvider = ({children, level}: CardLevelProviderType) => {
  return (
    <CardLevelContext.Provider value={level}>{children}</CardLevelContext.Provider>
  );
};

export const useCardLevel = () => {
  const context = React.useContext(CardLevelContext);
  return context ?? 1;
};
