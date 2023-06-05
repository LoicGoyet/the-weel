import {Presets} from '../data/wheel';

export const getPresets = () => {
  const rawPresets = window.localStorage.getItem('presets') || '{}';
  try {
    const presets = Presets.parse(JSON.parse(rawPresets));
    return presets;
  } catch {
    return {};
  }
};
