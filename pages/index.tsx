import React, {useState} from 'react';
import Card from '../components/Card';
import Form from '../components/Form';
import Layout from '../components/Layout';
import Wheel from '../components/Wheel';
import {initialItems, Items} from '../data/wheel';

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
