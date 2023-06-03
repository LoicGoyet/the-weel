import * as React from 'react';
import SidePanel from '../../designSystem/SidePanel';
import {useSidePanel} from '../../Layout/SidePanelContext';
import {setPreset} from '../../../services/setPreset';
import {useItems} from '../../../global/ItemsContext';
import {Items} from '../../../data/wheel';
import NewPresetForm from '../../NewPresetForm';
import LoadPresetForm from '../../LoadPresetForm';

const PresetsPanel = () => {
  const {setActivePanel} = useSidePanel();
  const {items, setItems} = useItems();

  const handlePresetSubmit = (name: string) => {
    setPreset(name, items);
  };

  const handleLoadPresetSubmit = (items: Items) => {
    setItems(items);
  };

  return (
    <SidePanel>
      <button onClick={() => setActivePanel('items')}>Items</button>
      <NewPresetForm onSubmit={handlePresetSubmit} />
      <LoadPresetForm onSubmit={handleLoadPresetSubmit} />
    </SidePanel>
  );
};

export default PresetsPanel;
