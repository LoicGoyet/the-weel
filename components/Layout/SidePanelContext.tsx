import React from 'react';

type SidePanelContext = {
  activePanel: string | null;
  setActivePanel: (panelKey: string | null) => void;
  hasActivePanel: boolean;
};

const SidePanelContext = React.createContext<SidePanelContext>({
  activePanel: null,
  setActivePanel: () => undefined,
  hasActivePanel: false,
});

type SidePanelProviderProps = {
  children: ({activePanel, setActivePanel}: SidePanelContext) => React.ReactNode;
};

export const SidePanelProvider = ({children}: SidePanelProviderProps) => {
  const [activePanel, setActivePanel] = React.useState<string | null>('items');

  const hasActivePanel = activePanel !== null;

  return (
    <SidePanelContext.Provider value={{activePanel, setActivePanel, hasActivePanel}}>
      {children({activePanel, setActivePanel, hasActivePanel})}
    </SidePanelContext.Provider>
  );
};

export const useSidePanel = () => {
  const context = React.useContext(SidePanelContext);
  if (context === undefined) {
    throw new Error('useSidePanel must be used within a SidePanelContext');
  }
  return context;
};
