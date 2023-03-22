import * as React from 'react';
import { SVGProps } from 'react';
const SvgLeftArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    data-testid="ICON_LEFT-ARROW"
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    {...props}
  >
    <path d="M.293 8.707a1 1 0 0 1 0-1.414l6-6a1 1 0 0 1 1.414 1.414L3.414 7H15a1 1 0 1 1 0 2H3.414l4.293 4.293a1 1 0 1 1-1.414 1.414l-6-6Z" />
  </svg>
);
export default SvgLeftArrow;
