import * as React from 'react';
import * as PropTypes from 'prop-types';
import { useMemo } from 'react';
import classnames from 'classnames';
import shortid from 'shortid';
import LabelTooltipDecorator from '../label-tooltip-decorator/LabelTooltipDecorator';
import {
  LabelTooltipDecoratorProps,
  LabelTooltipDecoratorPropTypes,
} from '../label-tooltip-decorator/interfaces';
import { HasValidationProps } from '../validation/interfaces';
import { callParentAndChildMethod } from '../../utils';

const RightDecoratorsPropTypes = {
  rightDecorators: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

const InputDecoratorPropTypes = {
  ...LabelTooltipDecoratorPropTypes,
  ...RightDecoratorsPropTypes,
};

type InputDecoratorProps = {
  rightDecorators?: JSX.Element | JSX.Element[];
  className?: string,
  children: React.ReactElement;
} & LabelTooltipDecoratorProps &
  HasValidationProps<string>;

const InputDecorator: React.FC<InputDecoratorProps> = ({
  rightDecorators,
  label,
  tooltip,
  tooltipCloseLabel,
  showRequired,
  className,
  children,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onInit,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onValidationChanged,
  ...rest
}) => {
  let child;

  if (React.Children.count(children) === 0) {
    throw new Error('The Input decorator requires one child component.');
  } else if (React.Children.count(children) > 1) {
    throw new Error(
      `The Input decorator can wrap only one component. Found: ${React.Children.count(
        children
      )}`
    );
  } else {
    child = React.Children.only(children);
    if (child?.type !== 'input') {
      throw new Error(
        `The Input decorator accepts only an "input" tag. Found: ${child.type}`
      );
    }
  }

  // Generate unique ID if not provided
  const inputId = useMemo(() => {
    return child?.props?.id || `tk-input-${shortid.generate()}`;
  }, [child]);

  const tooltipId = useMemo(() => `tk-hint-${shortid.generate()}`, []);

  const disabled = useMemo(() => {
    return child?.props?.disabled;
  }, [child]);

  const childWithId = useMemo(
    () =>
      child
        ? React.cloneElement(child, {
          onBlur: callParentAndChildMethod(rest, child.props, 'onBlur'),
          onChange: callParentAndChildMethod(rest, child.props, 'onChange'),
          id: inputId, // Add ID to the input
          className: classnames('tk-input', child.props.className), // Add 'tk-input' CSS class
        })
        : null,
    [child]
  );

  return (
    <div
      className={classnames('tk-input-group', className, {
        'tk-input-group--disabled': disabled,
      })}
    >
      <LabelTooltipDecorator
        id={tooltipId}
        htmlFor={inputId}
        label={label}
        placement={'top'}
        tooltip={tooltip}
        tooltipCloseLabel={tooltipCloseLabel}
        showRequired={showRequired}
      />
      <div
        className={classnames('tk-input__container', {
          'tk-input__container--disabled': disabled,
        })}
      >
        {childWithId}

        {rightDecorators
          ? Array.isArray(rightDecorators)
            ? rightDecorators.map((decorator) => decorator)
            : rightDecorators
          : null}
      </div>
    </div>
  );
};

InputDecorator.propTypes = InputDecoratorPropTypes;
InputDecorator.displayName = 'InputDecorator';

export default InputDecorator;
