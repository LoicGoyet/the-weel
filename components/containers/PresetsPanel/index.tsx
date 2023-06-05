import * as React from 'react';
import SidePanel from '../../designSystem/SidePanel';
import {useSidePanel} from '../../Layout/SidePanelContext';
import {useItems} from '../../../global/ItemsContext';
import {Items} from '../../../data/wheel';
import NewPresetForm from '../../NewPresetForm';
import LoadPresetForm from '../../LoadPresetForm';
import {usePresets} from '../../../global/PresetsContext';

const PresetsPanel = () => {
  const {setActivePanel} = useSidePanel();
  const {addNewPreset} = usePresets();
  const {items, setItems} = useItems();

  const handlePresetSubmit = (name: string) => {
    addNewPreset(name, items);
  };

  const handleLoadPresetSubmit = (items: Items) => {
    setItems(items);
    setActivePanel('items');
  };

  return (
    <SidePanel>
      <SidePanel.Header>
        <button onClick={() => setActivePanel('items')}>Items</button>
      </SidePanel.Header>

      <SidePanel.Body>
        <NewPresetForm onSubmit={handlePresetSubmit} />
        <LoadPresetForm onSubmit={handleLoadPresetSubmit} />
      </SidePanel.Body>
    </SidePanel>
  );
};

export default PresetsPanel;
