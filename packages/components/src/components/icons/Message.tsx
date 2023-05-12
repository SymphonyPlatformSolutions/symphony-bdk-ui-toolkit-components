import * as React from 'react';
import { SVGProps } from 'react';
const SvgMessage = (props: SVGProps<SVGSVGElement>) => (
  <svg
    data-testid="ICON_MESSAGE"
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    {...props}
  >
    <path d="M.903 1.174a.582.582 0 0 1 .274-.267C1.707.659 3.537 0 8 0c4.463 0 6.292.659 6.823.907.12.056.214.15.274.267C15.348 1.67 16 3.27 16 6.5c0 3.23-.652 4.83-.903 5.326a.582.582 0 0 1-.274.267c-.33.155-1.164.468-2.823.683V15.5a.5.5 0 0 1-.828.377L7.8 13h.004c-4.321-.02-6.104-.662-6.627-.907a.582.582 0 0 1-.274-.267C.652 11.33 0 9.73 0 6.5c0-3.23.652-4.83.903-5.326ZM8 11c3.113 0 4.762-.335 5.5-.55.207-.626.5-1.877.5-3.95 0-2.073-.293-3.324-.5-3.95C12.762 2.335 11.113 2 8 2s-4.762.335-5.5.55C2.293 3.176 2 4.427 2 6.5c0 2.073.293 3.324.5 3.95.738.215 2.387.55 5.5.55Z" />
  </svg>
);
export default SvgMessage;
