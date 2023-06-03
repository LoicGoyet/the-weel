import React from 'react';
import {Items, Presets} from '../../data/wheel';
import {getPresets} from '../../services/getPreset';

type Props = {
  onSubmit: (items: Items) => void;
};

const NewPresetForm = ({onSubmit}: Props) => {
  const [presets, setPresets] = React.useState<Presets>(getPresets());

  const updatePresets = () => {
    setPresets(getPresets());
  };

  React.useEffect(() => {
    window.addEventListener('presetsUpdated', updatePresets);

    return () => {
      window.removeEventListener('presetsUpdated', updatePresets);
    };
  });

  const handlePresetClick =
    (name: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const items = presets[name];
      onSubmit(items);
    };

  return (
    <ul>
      {Object.keys(presets).map(name => (
        <li key={name}>
          <button onClick={handlePresetClick(name)}>{name}</button>
        </li>
      ))}
    </ul>
  );
};

export default NewPresetForm;
