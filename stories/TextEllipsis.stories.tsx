import * as React from 'react';
import {
  TextEllipsis
} from '../src/components';

export default {
  title: 'Components/Text Ellipsis',
  component: TextEllipsis,
  argTypes: {
    tooltipPlacement: {
      control: {
        type: 'inline-radio',
        options: ['top', 'right', 'bottom', 'left'],
      },
    },
    rows: {
      control: {
        type: 'number'
      }
    },
  },
};

const Template = (args) => {
  return (
    <div>
      <h4>
        1 row ellipse - tooltip on hover
      </h4>
      <div style={{ background: 'grey', margin: '16px 0px', padding: '16px', width: '350px'}}>
        <TextEllipsis
          rows={ 1 }
          {...args}
        >
          { 'Really, really, really, really, really, really, long text that gets cut!' }
        </TextEllipsis>
      </div>
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {
  children: 'Really, really, really, really, really, really, long text that gets cut!',
  rows: 1,
};

export const EllipseAfterTwoRows = (args) => {
  return (
    <div style={{ background: 'grey', margin: '16px 0px', padding: '16px', width: '350px'}}>
      <TextEllipsis
        rows={ 2 }
        {...args}
      >
        { 'Really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, long text that gets cut!' }
      </TextEllipsis>
    </div>
  )
}

export const TextNotConstrainedByContainer = (args) => {
  return (
    <div style={{ background: 'grey', margin: '16px 0px', padding: '16px', width: '350px'}}>
      <TextEllipsis
        rows={ 1 }
        {...args}
      >
        { 'Really, really, really long text that gets cut!' }
      </TextEllipsis>
    </div>
  )
}

