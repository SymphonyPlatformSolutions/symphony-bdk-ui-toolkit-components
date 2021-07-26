import * as React from 'react';
import { useState, useMemo } from 'react';
import * as PropTypes from 'prop-types';
import { usePopper } from 'react-popper';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import classnames from 'classnames';

import { PopperContainer, popperProps } from '../common/popperUtils';

import useOnclickOutside from 'react-cool-onclickoutside';
import { showTooltipOnClick, showTooltipOnHover } from './helpers';

const SpanStyled = styled.span`
  display: inline-block;
  max-width: 100%;
`;

const TooltipContainer = styled.div`
  &.TooltipContainer {
    ${PopperContainer}
  }

  .tooltip__arrowContainer {
    position: absolute;
    z-index: -1;
  }

  .tooltip__arrow {
    border-radius: 2px;
    transform: rotate(45deg);
  }

  &[data-popper-placement^='top'] > .tooltip__arrowContainer {
    bottom: -7px;
  }
  &[data-popper-placement^='bottom'] > .tooltip__arrowContainer {
    top: -7px;
  }
  &[data-popper-placement^='left'] > .tooltip__arrowContainer {
    right: -7px;
  }
  &[data-popper-placement^='right'] > .tooltip__arrowContainer {
    left: -7px;
  }
`;

const TooltipClose = styled.span`
  cursor: pointer;
`;

export interface TooltipProps
  extends Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'ref'> {
  closeLabel?: string;
  /** Text or Element to display in the tooltip */
  description: string | JSX.Element;
  displayTrigger?: 'click' | 'hover';
  /** CSS ID */
  id?: string;
  /** Function to call on close action */
  onHintClose?: () => void;
  placement: 'top' | 'bottom' | 'left' | 'right';
  type?: 'hint' | 'tooltip';
  /** if true, the tooltip should be displayed */
  visible?: boolean;
  /**
   * Timeout before the tooltip disappear on hover (in ms)
   * @default 100
   */
  hoverTimeout?: number;
  /**
   * Timeout before the tooltip appear on hover (in ms)
   * @default 0
   */
  hoverDelay?: number;
}

const debouncer = (
  callback: React.Dispatch<React.SetStateAction<boolean>>,
  debounceTimeEntering = 0,
  debounceTimeExit = 100,
) => {
  let timeout: number | undefined;

  return (isEntering: boolean) => {
    clearTimeout(timeout);
    if (!isEntering) {
      timeout = window.setTimeout(() => callback(false), debounceTimeExit);
    } else if(debounceTimeEntering) {
      timeout = window.setTimeout(() => callback(true), debounceTimeEntering);
    } else {
      callback(true);
    }
  };
};

const Tooltip: React.FC<TooltipProps> = ({
  closeLabel,
  description,
  displayTrigger,
  id,
  onHintClose,
  placement,
  type,
  visible,
  hoverTimeout,
  className,
  hoverDelay = 0,
  ...otherProps
}) => {
  const [popperElement, setPopperElement] = useState(null);
  const [referenceElement, setReferenceElement] = useState(null);
  const [showHover, setShowHover] = useState(false);
  const [showClick, setShowClick] = useState(false);

  const handleMouseMove = useMemo(() => debouncer(setShowHover, hoverDelay, hoverTimeout), [hoverDelay, hoverTimeout]);

  const ref = useOnclickOutside(
    () => {
      setShowClick(false);
    },
    {
      disabled: !showClick,
    }
  );

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: placement || 'top',
    modifiers: [
      {
        name: 'flip',
        options: {
          fallbackPlacements: ['bottom', 'right', 'left'],
        },
      },
      {
        name: 'offset',
        options: {
          offset: [0, type === 'hint' ? 15 : 9],
        },
      },
    ],
  });

  const children = <span>{otherProps.children}</span>;

  const isVisible =
    typeof visible !== 'undefined'
      ? visible
      : displayTrigger === 'hover'
        ? showHover
        : showClick;

  return (
    <div ref={ref} className={className ? className + '_wrapper' : null}>
      <SpanStyled ref={setReferenceElement}>
        {displayTrigger === 'hover' &&
          showTooltipOnHover(children, handleMouseMove)}
        {displayTrigger === 'click' &&
          showTooltipOnClick(children, showClick, setShowClick)}
        {displayTrigger === undefined && children}
        <CSSTransition
          {...popperProps}
          in={isVisible}
          classNames="TooltipContainer"
        >
          <TooltipContainer
            id={id}
            role="tooltip"
            ref={setPopperElement}
            className={classnames(
              type === 'tooltip' ? 'tk-tooltip' : 'tk-hint',
              { className }
            )}
            style={styles.popper}
            {...attributes.popper}
            {...otherProps}
            onMouseEnter={() => handleMouseMove(true)}
            onMouseLeave={() => handleMouseMove(false)}
          >
            <span className="tk-hint__description">{description}</span>
            {type === 'hint' && (
              <>
                <div
                  className="tooltip__arrowContainer"
                  style={styles.arrow}
                  data-popper-arrow
                >
                  <div className="tooltip__arrow tk-hint__arrow" />
                </div>
                <div className="tk-hint__footer">
                  {closeLabel ? (
                    <TooltipClose
                      className="tk-hint__close"
                      onClick={onHintClose}
                    >
                      {closeLabel}
                    </TooltipClose>
                  ) : null}
                </div>
              </>
            )}
          </TooltipContainer>
        </CSSTransition>
      </SpanStyled>
    </div>
  );
};

Tooltip.defaultProps = {
  type: 'hint',
};

Tooltip.propTypes = {
  closeLabel: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  displayTrigger: PropTypes.oneOf(['click', 'hover']),
  id: PropTypes.string,
  onHintClose: PropTypes.func,
  placement: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  type: PropTypes.oneOf(['hint', 'tooltip']),
  visible: PropTypes.bool,
  hoverTimeout: PropTypes.number,
  className: PropTypes.string,
  hoverDelay: PropTypes.number,
};

export default Tooltip;
