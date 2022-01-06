import * as React from 'react';
import { render } from '@testing-library/react';
import { StylesInjection } from '../../../src/core/hoc/StylesInjection'

describe('StylesInjection', () => {
  
  it('should render', () => {
    render(<StylesInjection id="test-id" injectionPoint={document.head}>
      <p>Hello!</p>
    </StylesInjection>)
  })

})