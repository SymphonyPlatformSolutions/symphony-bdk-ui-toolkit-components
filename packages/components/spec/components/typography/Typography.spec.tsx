import { shallow } from 'enzyme';
import * as React from 'react';
import Typography from '../../../src/components/typography';

describe('Typography Component', () => {
  describe('Typography component test suite => ', () => {
    it('should render the component with default props', () => {
      const wrapper = shallow(<Typography>Body text</Typography>);
      expect(wrapper.hasClass('tk-typography tk-typography--body')).toBe(true);
    });
    it('should render extra props to the typography component', () => {
      const wrapper = shallow(<Typography type="h1" variant="bold">Close me</Typography>);
      expect(wrapper.hasClass('tk-typography tk-typography--h1 tk-typography--bold')).toBe(true);
    });
    it('should render several variantes to the typography component', () => {
      const wrapper = shallow(<Typography type="h1" variant={['bold', 'italic']}>Close me</Typography>);
      expect(wrapper.hasClass('tk-typography tk-typography--h1 tk-typography--bold tk-typography--italic')).toBe(true);
    });
  });
}); 
