import * as React from 'react';

import Form, {Props} from '.';
import {Meta, Story} from '@storybook/react';
import {Items} from '../../data/wheel';

export default {
  title: 'components/Form',
  component: Form,
  args: {
    items: {
      byId: {
        'item-1': {
          id: 'item-1',
          label: 'Item 1',
          color: 'red',
        },
      },
      allIds: ['item-1'],
      draftedIds: [],
      undraftedIds: ['item-1'],
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

  return <Form {...args} onChange={handleChange} items={items} />;
};

export const Default = Template.bind({});
