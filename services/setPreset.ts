import {Items, resetItemsPicks} from '../data/wheel';
import {getPresets} from './getPresets';

export const setPreset = (name: string, items: Items) => {
  const presets = getPresets();
  const newPresets = {
    ...presets,
    [name]: resetItemsPicks(items),
  };

  window.localStorage.setItem('presets', JSON.stringify(newPresets));
  return newPresets;
};
