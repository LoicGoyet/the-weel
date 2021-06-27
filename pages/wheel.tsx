import React, {useState} from 'react';
import Card from '../components/Card';
import Form from '../components/Form';
import Layout from '../components/Layout';
import Wheel from '../components/Wheel';
import {Items} from '../data/wheel';

const initialItems = {
  byId: {
    'item-1': {
      id: 'item-1',
      isChecked: false,
      label: 'Item 1',
      color: 'red',
    },
    'item-2': {
      id: 'item-2',
      isChecked: false,
      label: 'Item 2',
      color: 'blue',
    },
  },
  allIds: ['item-1', 'item-2'],
  draftedIds: [],
  undraftedIds: ['item-1', 'item-2'],
};

const WheelPage = () => {
  const [items, setItems] = useState<Items>(initialItems);

  const handleChange = (items: Items) => {
    setItems(items);
  };

  return (
    <Layout
      main={<Wheel items={items} onChange={handleChange} />}
      footer={<Card>footer</Card>}
      aside={<Form items={items} onChange={handleChange} />}
    />
  );
};

export default WheelPage;
