import React from 'react';
import {Items, Presets} from '../../data/wheel';
import {getPresets} from '../../services/getPreset';
import styled from 'styled-components';
import Button from '../designSystem/Button';

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
    <List>
      {Object.keys(presets).map(name => (
        <li key={name}>
          <PresetButton brand='transparent' onClick={handlePresetClick(name)}>
            {name}
          </PresetButton>
        </li>
      ))}
    </List>
  );
};

export default NewPresetForm;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  color: white;
`;

const PresetButton = styled(Button)`
  margin-left: calc(-1 * var(--padding-x));
  margin-right: calc(-1 * var(--padding-x));
  width: calc(100% + var(--padding-x) * 2);
  justify-content: flex-start;
`;
