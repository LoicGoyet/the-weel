import React from 'react';
import {Items, Presets} from '../../data/wheel';
import {getPresets} from '../../services/getPresets';
import {setPreset} from '../../services/setPreset';
import {useItems} from '../ItemsContext';
import {removePreset} from '../../services/removePreset';

type PresetsContext = {
  presets: Presets;
  addNewPreset: (name: string, items: Items) => void;
  deletePreset: (name: string) => void;
  isItemsInPreset: boolean;
  hasPresets: boolean;
};

const PresetsContext = React.createContext<PresetsContext>({
  presets: {},
  addNewPreset: () => undefined,
  deletePreset: () => undefined,
  isItemsInPreset: false,
  hasPresets: false,
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

  const deletePreset = React.useCallback((name: string) => {
    const presets = removePreset(name);
    setPresetsState(presets);
  }, []);

  const hasPresets = Object.values(presets).length > 0;

  return (
    <PresetsContext.Provider
      value={{presets, addNewPreset, isItemsInPreset, hasPresets, deletePreset}}
    >
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
