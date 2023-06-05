import * as React from 'react';
import SidePanel from '../../designSystem/SidePanel';
import {useSidePanel} from '../../Layout/SidePanelContext';
import {useItems} from '../../../global/ItemsContext';
import {usePresets} from '../../../global/PresetsContext';
import styled from 'styled-components';
import Button from '../../designSystem/Button';
import TrashIcon from '../../icons/TrashIcon';

const PresetsPanel = () => {
  const {setActivePanel} = useSidePanel();
  const {setItems} = useItems();
  const {presets, hasPresets, deletePreset} = usePresets();

  const handlePresetClick =
    (name: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const items = presets[name];
      setItems(items);
      setActivePanel('items');
    };

  const handleDeletePreset = (name: string) => {
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      if (Object.values(presets).length === 1) {
        setActivePanel('items');
      }

      deletePreset(name);
    };
  };

  return (
    <SidePanel>
      <SidePanel.Header>
        <SidePanel.Heading>Presets</SidePanel.Heading>
      </SidePanel.Header>

      <SidePanel.Body>
        {hasPresets ? (
          <List>
            {Object.keys(presets).map(name => (
              <ListItem key={name}>
                <PresetButton brand='transparent' onClick={handlePresetClick(name)}>
                  {name}
                </PresetButton>
                <Button brand='danger' isSquare onClick={handleDeletePreset(name)}>
                  <TrashIcon width='0.9rem' height='0.9rem' />
                </Button>
              </ListItem>
            ))}
          </List>
        ) : (
          'No presets yet.'
        )}
        <Button onClick={() => setActivePanel('items')}>Cancel</Button>
      </SidePanel.Body>
    </SidePanel>
  );
};

export default PresetsPanel;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const PresetButton = styled(Button)`
  margin-left: calc(-1 * var(--padding-x));
  justify-content: flex-start;
  flex: 1;
`;
