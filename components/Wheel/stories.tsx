import Wheel, {Props} from '.';
import {Meta, Story} from '@storybook/react';

export default {
  title: 'components/Wheel',
  component: Wheel,
  args: {
    items: {
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
      allIds: ['item-1', 'item-2', 'item-3', 'item-4'],
    },
  },
} as Meta;

const Template: Story<Props> = args => {
  return <Wheel {...args} />;
};

export const Default = Template.bind({});
