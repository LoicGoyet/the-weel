import * as React from 'react';
import SidePanel from '../../designSystem/SidePanel';
import {useSidePanel} from '../../Layout/SidePanelContext';

const PresetsPanel = () => {
  const {setActivePanel} = useSidePanel();

  return (
    <SidePanel>
      <button onClick={() => setActivePanel('items')}>Items</button>
      PresetsPanel
    </SidePanel>
  );
};

export default PresetsPanel;
