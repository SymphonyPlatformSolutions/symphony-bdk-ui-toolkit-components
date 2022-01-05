import React, { useState, useRef } from 'react';
import { Button, TextField, Icon, Validation } from '../src/components';

import { Validators } from '../src/core/validators/validators';

const Template = (args) => <TextField {...args} />;

export const Default = Template.bind({});

Default.args = {
  label: 'I have many props',
  tooltip: 'This is a tooltip \n with newline',
  tooltipCloseLabel: 'Got it',
  iconElement: <Icon iconName="message" />,
};

export const TextFields: React.FC = () => {
  const [hideText, setHideText] = useState(false);

  const logChange = (value) => {
    console.info(value);
  };

  const [value, setValue] = useState('Lorem Ipsum');

  return (
    <div style={{ width: '50%' }}>
      <div>
        <p>
          Text Field with a <strong>placeholder</strong>
        </p>
        <TextField placeholder="Firstname"></TextField>
      </div>
      <hr />
      <div>
        <p>
          Text Field with a <strong>change handler</strong> logging in the
          browser console
        </p>
        <TextField placeholder="Firstname" onChange={logChange}></TextField>
      </div>
      <hr />
      <div>
        <p>
          Text Field with a <strong>label</strong>
        </p>
        <p>
          {' '}
          If the attribute id is defined, it will be attached to the label as a
          &apos;for&apos; attribute.
        </p>
        <TextField
          id="input-1234567890"
          label="Ipsum"
          placeholder="Firstname"
        ></TextField>
      </div>
      <hr />
      <div>
        <p>
          Simple Text Field with a <strong>label required</strong>
        </p>
        <p>
          {' '}
          If the attribute showRequired is defined, the according style will be
          applied
        </p>
        <TextField
          id="input-1234567899"
          label="Ipsum"
          placeholder="Lastname"
          showRequired
        ></TextField>
      </div>
      <div>
        <p>
          Text Field with a <strong>helperText</strong>
        </p>
     
        <TextField
          id="input-1234567899"
          helperText="Helper text"
          placeholder="Lastname"
        ></TextField>
      </div>
      <hr />
      <div>
        <p>
          Text Field with an <strong>icon</strong>
        </p>
        <TextField iconElement={<Icon iconName={'calendar'} />}></TextField>
      </div>
      <hr />
      <div>
        <p>
          Text Field with an <strong>icon</strong>, method{' '}
          <strong>handlers</strong> and <strong>tabIndex</strong>
        </p>
        <TextField
          iconElement={
            <Icon
              iconName={'calendar'}
              tabIndex={0}
              onClick={() => logChange('clicked')}
              onKeyDown={logChange}
            />
          }
        ></TextField>
      </div>
      <hr />
      <div>
        <p>
          Text Field with a <strong>tooltip</strong>
        </p>
        <TextField
          tooltip="More information"
          tooltipCloseLabel="Got it"
          placeholder="Type something"
        ></TextField>
      </div>
      <hr />
      <div>
        <p>
          Text Field with a <strong>label</strong> and a{' '}
          <strong>tooltip</strong>
        </p>
        <TextField
          label="Ipsum"
          tooltip="More information"
          tooltipCloseLabel="Got it"
          placeholder="Type something"
        ></TextField>
      </div>
      <hr />
      <div>
        <p>
          Text Field with a <strong>value</strong>
        </p>
        <TextField
          placeholder="Type something"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></TextField>
      </div>
      <hr />
      <div>
        <p>
          Text Field with a <strong>right decorator</strong> and{' '}
          <strong>masked data</strong>
        </p>
        <TextField
          isMasked={hideText}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rightDecorators={
            value?.length
              ? [
                <button
                  key="button"
                  role="button"
                  className="tk-input__hide"
                  tabIndex={value && value.length === 0 ? -1 : 0}
                  onClick={() => setHideText(!hideText)}
                  onKeyDown={(event) => (event.key === 'Enter') && setHideText(!hideText)} // not sure why we need to specify
                >
                  {hideText ? 'SHOW' : 'HIDE'}
                </button>,
              ]
              : null
          }
        />
      </div>
      <div>
        <p>
          Text Field with other <strong>right decorators</strong>
        </p>
        <p style={{fontSize: '12px'}}>Adding the class <br/>  <b>.tk-input__right-decorators__clickable</b> will provide a clickable style to the decorator</p>
        <TextField
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rightDecorators={<Icon iconName="copy" tabIndex={0} className="tk-input__right-decorators__clickable"></Icon>}
        ></TextField>
        <TextField
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rightDecorators={
            value?.length
              ? [
                <Icon iconName="copy" tabIndex={0} className="tk-input__right-decorators__clickable" key="copy"></Icon>,
                <Icon iconName="search" tabIndex={0} className="tk-input__right-decorators__clickable" key="search"></Icon>,
              ]
              : null
          }
        ></TextField>
      </div>
    </div>
  );
};

export const ReadOnly: React.FC = () => {
  return (
    <div>
      <p>
        Text Field <strong>read only</strong>. A read-only input field cannot be modified (however, a user can tab to it, highlight it, and copy the text from it).
      </p>
      <TextField
        label="Ipsum"
        tooltip="More information"
        tooltipCloseLabel="Got it"
        readOnly
        value="Lorem Ipsum"
      ></TextField>
      <div className="tk-mt-1"/>
      <TextField
        label="Ipsum"
        tooltip="More information"
        tooltipCloseLabel="Got it"
        readOnly
        size="small"
        value="Lorem Ipsum"
      ></TextField>
    </div>
  );
};

export const Disabled: React.FC = () => {
  return (
    <div>
      <p>
      Text Field <strong>disabled</strong>. A disabled input element is unusable and un-clickable.
      </p>
      <TextField
        disabled
        label="Ipsum"
        placeholder="Type something"
        tooltip="More information"
        tooltipCloseLabel="Got it"
      ></TextField>
    </div>
  );
};

export const ChangeProgrammatically = () => {
  const child1 = useRef(null);
  const child2 = useRef(null);

  const [value, setValue] = useState('');

  const reset = () => {
    child1.current.reset();
    child2.current.reset();
  }
  const refresh = () => {
    child1.current.refreshValidation().then((isValid) => console.log(isValid));
    child2.current.refreshValidation().then((isValid) => console.log(isValid));
  }

  return (
    <div style={{ width: '50%' }}>
      <Validation
        ref={child1}
        validator={Validators.Required}
        errorMessage={{ required: 'This field is mandatory' }}
      >
        <TextField
          placeholder="Firstname"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></TextField>
      </Validation>
      <br/>
      <Validation
        ref={child2}
        validator={Validators.Required}
        errorMessage={{ required: 'This field is mandatory' }}
      >
        <TextField
          placeholder="Firstname"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          size="small"
        ></TextField>
      </Validation>
      <div style={{ display: 'flex', marginTop: '1rem' }}>
        <Button onClick={reset}>Reset</Button>
        <Button onClick={refresh}>Refresh validation</Button>
      </div>
    </div>
  );
};

export default {
  title: 'Components/Input/TextField',
  component: TextField,
  subcomponents: { Icon },
};
