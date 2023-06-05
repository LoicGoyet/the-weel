import {getPresets} from './getPresets';

export const removePreset = (name: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {[name]: toRemove, ...presets} = getPresets();
  window.localStorage.setItem('presets', JSON.stringify(presets));
  return presets;
};
