import * as React from 'react';
import classnames from 'classnames';
import Tooltip from '../tooltip';

interface TextEllipsisProps extends Omit<React.HTMLProps<HTMLDivElement>, 'type'> {
    /** Text that should be ellipsed */
    children?: React.ReactNode;

    /** How many rows the text should span before ellipsing */
    rows?: number;

    /** Wheather a tooltip should be shown on hover when the text is ellipsed */
    tooltipOnEllipsis?: boolean;

    tooltipPlacement?:
      | 'bottom'
      | 'left'
      | 'right'
      | 'top'
}

interface TextEllipsisState {
    showTooltip: boolean;
}

export const TextEllipsis: React.FC<TextEllipsisProps> = ({
  children,
  rows,
  tooltipOnEllipsis,
  tooltipPlacement,
  ...otherProps
}: TextEllipsisProps) => {

  const [showTooltip, setShowTooltip] = React.useState(false);

  const handleMouseEnter = (event: React.SyntheticEvent) => {
    const element = event.currentTarget;
    const showTooltip = isTextTruncated(element);
    setShowTooltip(showTooltip);
  }

  const handleMouseLeave = () => {
    setShowTooltip(false);
  }

  if(tooltipOnEllipsis) {
    return(
      <Tooltip
        description={ children as JSX.Element }
        placement={tooltipPlacement || 'bottom'}
        type="tooltip"
        visible={showTooltip}
      >
        <div
          className={ classnames(
            'tk-text-ellipsis', {
              'tk-text-ellipsis__multiple-rows': rows > 1
            }) }
          style={{ WebkitLineClamp: rows}}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          {...otherProps}
        >
          { children }
        </div>
      </Tooltip>
    )
  } else {
    return(
      <div
        className={ classnames(
          'tk-text-ellipsis', {
            'tk-text-ellipsis__multiple-rows': rows > 1
          }) }
        style={{ WebkitLineClamp: rows}}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...otherProps}
      >
        { children }
      </div>
    )
  }
}

TextEllipsis.defaultProps = {
  rows: 1,
  tooltipPlacement: 'top',
}

const isTextTruncated = (element: EventTarget & Element) => {
  const { scrollWidth, scrollHeight, clientWidth, clientHeight} = element;

  if(scrollHeight > clientHeight) {
    return true
  } else if(scrollWidth > clientWidth) {
    return true;
  } else {
    return false
  }
}