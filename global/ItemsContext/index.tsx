import React from 'react';
import {Items, initialItems} from '../../data/wheel';

type ItemsContext = {
  items: Items;
  setItems: (items: Items) => void;
};

const ItemsContext = React.createContext<ItemsContext>({
  items: initialItems,
  setItems: () => undefined,
});

type ItemsProviderProps = {
  children: React.ReactNode;
};

export const ItemsProvider = ({children}: ItemsProviderProps) => {
  const [items, setItems] = React.useState<Items>(initialItems);

  return (
    <ItemsContext.Provider value={{items, setItems}}>{children}</ItemsContext.Provider>
  );
};

export const useItems = () => {
  const context = React.useContext(ItemsContext);
  if (context === undefined) {
    throw new Error('useItems must be used within a ItemsContext');
  }
  return context;
};
