import Card, {Props} from '.';
import {Meta, Story} from '@storybook/react';

export default {
  title: 'components/Card',
  component: Card,
  args: {
    children: 'Hello world !',
  },
} as Meta;

const Template: Story<Props> = args => {
  return <Card {...args} />;
};

export const Default = Template.bind({});

export const CardWithinCards = Template.bind({});
CardWithinCards.args = {
  children: (
    <>
      <div style={{marginBottom: 'var(--spacing)'}}>level 1</div>
      <Card>
        <div style={{marginBottom: 'var(--spacing)'}}>level 2</div>
        <Card>level 3</Card>
      </Card>
    </>
  ),
};
