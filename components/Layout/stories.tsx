import Layout, {Props} from '.';
import {Meta, Story} from '@storybook/react';

export default {
  title: 'components/Layout',
  component: Layout,
  args: {
    aside: <div>hello aside</div>,
    main: <div>hello main</div>,
    footer: <div>hello footer</div>,
  },
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

const Template: Story<Props> = args => {
  return <Layout {...args} />;
};

export const Default = Template.bind({});
