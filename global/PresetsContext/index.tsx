import React from 'react';
import {Items, Presets} from '../../data/wheel';
import {getPresets} from '../../services/getPresets';
import {setPreset} from '../../services/setPreset';
import {useItems} from '../ItemsContext';

type PresetsContext = {
  presets: Presets;
  addNewPreset: (name: string, items: Items) => void;
  isItemsInPreset: boolean;
};

const PresetsContext = React.createContext<PresetsContext>({
  presets: {},
  addNewPreset: () => undefined,
  isItemsInPreset: false,
});

type PresetsProviderProps = {
  children: React.ReactNode;
};

export const PresetsProvider = ({children}: PresetsProviderProps) => {
  const [presets, setPresetsState] = React.useState(getPresets());
  const {items} = useItems();

  const addNewPreset = React.useCallback((name: string, items: Items) => {
    const presets = setPreset(name, items);
    setPresetsState(presets);
  }, []);

  const isItemsInPreset = React.useMemo(() => {
    return Object.entries(presets).some(([, presetItems]) => {
      if (presetItems.allIds.length !== items.allIds.length) return false;
      return presetItems.allIds.every(presetItemId => {
        const presetItemLabel = presetItems.byId[presetItemId].label;
        return items.allIds.some(
          itemId => items.byId[itemId].label === presetItemLabel,
        );
      });
    });
  }, [presets, items]);

  return (
    <PresetsContext.Provider value={{presets, addNewPreset, isItemsInPreset}}>
      {children}
    </PresetsContext.Provider>
  );
};

export const usePresets = () => {
  const context = React.useContext(PresetsContext);
  if (context === undefined) {
    throw new Error('usePresets must be used within a PresetsContext');
  }
  return context;
};
