import React from 'react';
import Form from '../components/containers/Form';
import Layout from '../components/Layout';
import Wheel from '../components/containers/Wheel';
import {ItemsProvider} from '../global/ItemsContext';
import dynamic from 'next/dynamic';

const WheelPage = () => {
  return (
    <ItemsProvider>
      <Layout main={<Wheel />} aside={<Form />} />
    </ItemsProvider>
  );
};

export default dynamic(() => Promise.resolve(WheelPage), {ssr: false});
