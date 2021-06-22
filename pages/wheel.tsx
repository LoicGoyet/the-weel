import Card from '../components/Card';
import Layout from '../components/Layout';
import Wheel from '../components/Wheel';

const items = {
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
    'item-3': {
      id: 'item-3',
      isChecked: false,
      label: 'Item 3',
      color: 'green',
    },
    'item-4': {
      id: 'item-4',
      isChecked: false,
      label: 'Item 4',
      color: 'pink',
    },
  },
  allIds: [
    'item-1',
    'item-2',
    'item-3',
    'item-4',
    'item-1',
    'item-2',
    'item-3',
    'item-4',
    'item-1',
    'item-2',
    'item-3',
    'item-4',
  ],
};

const WheelPage = () => {
  return (
    <Layout main={<Wheel items={items} />} footer={<Card>footer</Card>} aside='aside' />
  );
};

export default WheelPage;
