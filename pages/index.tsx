import React from 'react';
import ItemsPanel from '../components/containers/ItemsPanel';
import Layout from '../components/Layout';
import Wheel from '../components/containers/Wheel';
import {ItemsProvider} from '../global/ItemsContext';
import dynamic from 'next/dynamic';
import PresetsPanel from '../components/containers/PresetsPanel';
import {PresetsProvider} from '../global/PresetsContext';
import SavePanel from '../components/containers/SavePanel';

const WheelPage = () => {
  return (
    <ItemsProvider>
      <PresetsProvider>
        <Layout
          main={<Wheel />}
          panels={{
            items: <ItemsPanel />,
            presets: <PresetsPanel />,
            save: <SavePanel />,
          }}
        />
      </PresetsProvider>
    </ItemsProvider>
  );
};

export default dynamic(() => Promise.resolve(WheelPage), {ssr: false});
