import * as React from 'react';
import Wheel, {Props} from '.';
import {Meta, Story} from '@storybook/react';
import {Items} from '../../data/wheel';

export default {
  title: 'components/Wheel',
  component: Wheel,
  args: {
    items: {
      byId: {
        'item-1': {
          id: 'item-1',
          label: 'Item 1',
          color: 'red',
        },
        'item-2': {
          id: 'item-2',
          label: 'Item 2',
          color: 'blue',
        },
        'item-3': {
          id: 'item-3',
          label: 'Item 3',
          color: 'green',
        },
        'item-4': {
          id: 'item-4',
          label: 'Item 4',
          color: 'pink',
        },
        'item-5': {
          id: 'item-5',
          label: 'Item 5',
          color: 'orange',
        },
        'item-6': {
          id: 'item-6',
          label: 'Item 6',
          color: 'violet',
        },
        'item-7': {
          id: 'item-7',
          label: 'Item 7',
          color: 'turquoise',
        },
      },
      allIds: ['item-1', 'item-2', 'item-3', 'item-4', 'item-5', 'item-6', 'item-7'],
      draftedIds: [],
      undraftedIds: [
        'item-1',
        'item-2',
        'item-3',
        'item-4',
        'item-5',
        'item-6',
        'item-7',
      ],
    },
  },
  argTypes: {onChange: {action: 'onChange'}},
} as Meta;

const Template: Story<Props> = args => {
  const [items, setItems] = React.useState(args.items);

  const handleChange = (items: Items) => {
    args.onChange(items);
    return setItems(items);
  };

  return <Wheel {...args} items={items} onChange={handleChange} />;
};

export const Default = Template.bind({});
