import React from 'react';
import Form from '../components/containers/Form';
import Layout from '../components/Layout';
import Wheel from '../components/containers/Wheel';
import {ItemsProvider} from '../global/ItemsContext';
import dynamic from 'next/dynamic';
import PresetsPanel from '../components/containers/PresetsPanel';

const WheelPage = () => {
  return (
    <ItemsProvider>
      <Layout
        main={<Wheel />}
        panels={{
          items: <Form />,
          presets: <PresetsPanel />,
        }}
      />
    </ItemsProvider>
  );
};

export default dynamic(() => Promise.resolve(WheelPage), {ssr: false});
