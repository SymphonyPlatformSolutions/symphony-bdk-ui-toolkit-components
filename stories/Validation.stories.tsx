import React, { useState } from 'react';

import {
  DatePicker,
  Dropdown,
  Icon,
  InputDecorator,
  TextArea,
  TextField,
  TimePicker,
  Validation,
} from '../src/components';
import { ValidatorFn, Validators } from '../src/core/validators/validators';

export const Validations = () => {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [dropdown, setDropdown] = useState(null);
  const [multiDropdown, setMultiDropdown] = useState(null);
  const logChange = (value, errorsMap) => {
    if (!value) {
      console.log('Component is valid:', value);
    }
    if (errorsMap) {
      console.log('Errors Map:', errorsMap);
    }
  };
  const now = new Date();
  const disabledDays = [
    new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7),
    {
      before: new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()),
    },
    {
      after: new Date(now.getFullYear(), now.getMonth() + 1, now.getDate()),
    },
    {
      after: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 15),
      before: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 20),
    },
    {
      from: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 22),
      to: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 24),
    },
  ];
  const disabledTimes = [
    { time: '09:00:00' },
    {
      from: '10::00:00',
      to: '12:30:00',
    },
    {
      from: '16:30:00',
      to: '17:00:00',
    },
  ];

  const tooDark: ValidatorFn = (color) => {
    const c = color.substring(1); // strip #
    const rgb = parseInt(c, 16); // convert rrggbb to decimal
    const r = (rgb >> 16) & 0xff; // extract red
    const g = (rgb >> 8) & 0xff; // extract green
    const b = (rgb >> 0) & 0xff; // extract blue

    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

    if (luma < 40) {
      // Pick a different colour
      return Promise.resolve({ toDark: true });
    }
    return Promise.resolve(null);
  };

  return (
    <div style={{ width: '50%' }}>
      <h1>Validation</h1>
      <h2>Single validator</h2>
      <h3>Text Field</h3>
      <p>
        with <strong>Required validator</strong>
      </p>
      <Validation
        onValidationChanged={logChange}
        validator={Validators.Required}
        errorMessage={'This field is mandatory'}
      >
        <TextField
          helperText="Helper text"
          placeholder="Firstname"
          onChange={() => {
            console.log('Existing onChange method called');
          }}
        />
      </Validation>
      <br/>
      <Validation
        onValidationChanged={logChange}
        validator={Validators.Required}
        errorMessage={'This field is mandatory'}
      >
        <TextField
          size="small"
          placeholder="Firstname"
          onChange={() => {
            console.log('Existing onChange method called');
          }}
        />
      </Validation>
      <p>
        with <strong>MinLength validator</strong>
      </p>
      <Validation
        onValidationChanged={logChange}
        validator={Validators.MinLength(3)}
        errorMessage={'You need to enter 3 characters minimum'}
      >
        <TextField placeholder="How are you?" />
      </Validation>
      <br/>
      <Validation
        onValidationChanged={logChange}
        validator={Validators.MinLength(3)}
        errorMessage={'You need to enter 3 characters minimum'}
      >
        <TextField placeholder="How are you?" size="small"/>
      </Validation>
      <p>
        with <strong>MaxLength validator</strong>
      </p>
      <Validation
        onValidationChanged={logChange}
        validator={
          Validators.MaxLength(6)
        }
        errorMessage={ 'Booking code: max 6 characters'}
      >
        <TextField label="Booking code" placeholder="Booking code" />
      </Validation>
      <p>
        with <strong>Email validator</strong>
      </p>
      <Validation
        onValidationChanged={logChange}
        validator={Validators.Email}
        errorMessage={'Please enter a valid email address'}
      >
        <TextField placeholder="Email Address" />
      </Validation>
      <p>
        with <strong>URL validator</strong>
      </p>
      <Validation
        onValidationChanged={logChange}
        validator={Validators.Url}
        errorMessage={'Please enter a valid URL'}
      >
        <TextField placeholder="Website" />
      </Validation>
      <p>
        Using <strong>pattern validator</strong>
      </p>
      <Validation
        onValidationChanged={logChange}
        validator={Validators.Pattern(/lorem.*/)}
        errorMessage={'Should start with lorem'}
      >
        <TextField placeholder="Magic word" />
      </Validation>
      <h3>Date Picker</h3>
      <p>
        with <strong>Required validator</strong>
      </p>
      <Validation
        onValidationChanged={logChange}
        validator={[Validators.Required]}
        errorMessage={{ required: 'This field is required' }}
      >
        <DatePicker
          helperText="Helper text"
          todayButton="today"
          tooltip="Departure date"
          label="Expense"
          disabledDays={disabledDays}
          date={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
      </Validation>
      <h3>Time Picker</h3>
      <p>
        with <strong>Required validator</strong>
      </p>
      <Validation
        onValidationChanged={logChange}
        validator={Validators.Required}
        errorMessage={'This field is mandatory'}
      >
        <TimePicker
          helperText="Helper text"
          label={'TimePicker'}
          min={'08:00:00'}
          max={'20:00:00'}
          disabledTimes={disabledTimes}
          value={time}
          onChange={(e) => {
            const value = e.target.value;
            setTime(value);
          }}
        />
      </Validation>
      <h3>Dropdown</h3>
      <p>
        with <strong>Required validator</strong>
      </p>
      <div  className="tk-my-2">
        <Validation
          onValidationChanged={logChange}
          validator={[Validators.Required]}
          errorMessage={{ required: 'This field is required' }}
        >
          <Dropdown
            value={dropdown}
            options={[
              { value: '1', label: 'option 1' },
              { value: '2', label: 'option 2' },
              { value: '3', label: 'option 3' },
            ]}
            onChange={(e) => {
              setDropdown(e.target.value);
            }}
            isInputClearable
            helperText="Helper text"
          />
        </Validation>
      </div>
      <Validation
        onValidationChanged={logChange}
        validator={[Validators.Required]}
        errorMessage={{ required: 'This field is required' }}
      >
        <Dropdown
          helperText="Helper text"
          value={multiDropdown}
          placeHolder="Multi select..."
          options={[
            { value: '1', label: 'option 1' },
            { value: '2', label: 'option 2' },
            { value: '3', label: 'option 3' },
          ]}
          onChange={(e) => {
            setMultiDropdown(e.target.value);
          }}
          isMultiSelect
        />
      </Validation>
      <h3>Text area</h3>
      <p>
        with <strong>Required validator</strong>
      </p>
      <Validation
        onValidationChanged={logChange}
        validator={[
          Validators.Required,
        ]}
        errorMessage={{
          required: 'This field is mandatory',
        }}
      >
        <TextArea placeholder="Type something" helperText="Helper text"/>
      </Validation>
      <p>
        with <strong>maxLength validator</strong>
      </p>
      <Validation
        onValidationChanged={logChange}
        validator={[
          Validators.MaxLength(6),
        ]}
        errorMessage={ 'Select max 6 options'}
      >
        <Dropdown
          isMultiSelect
          label={'Dropdown label'}
          placeHolder="Multi select..."
          options={[
            { value: '1', label: 'option 1' },
            { value: '2', label: 'option 2' },
            { value: '3', label: 'option 3' },
            { value: '4', label: 'option 4' },
            { value: '5', label: 'option 5' },
            { value: '6', label: 'option 6' },
            { value: '7', label: 'option 7' },
          ]}    
        />
      </Validation>
      <h3>InputDecorator</h3>
      <p>
        with <strong>Required validator</strong>
      </p>
      <Validation
        onValidationChanged={logChange}
        validator={Validators.Required}
        errorMessage={'This field is mandatory'}
      >
        <InputDecorator
          label="A label"
          tooltip="A tooltip"
          rightDecorators={
            <span
              key="span-search"
              style={{ alignSelf: 'center', margin: '0.2rem 0.5rem' }}
              onClick={() => alert('Icon clicked')}
            >
              <Icon iconName="search"></Icon>
            </span>
          }
        >
          <input
            type="url"
            onBlur={() => {
              console.log('Existing onBlur method called on the input');
            }}
            onChange={() => {
              console.log('Existing onChange method called on the input');
            }}
          />
        </InputDecorator>
      </Validation>
      <p>
        with <strong>MinValue validator</strong>
      </p>
      <Validation
        onValidationChanged={logChange}
        validator={Validators.MinValue(50)}
        errorMessage={'Value to small'}
      >
        <InputDecorator
          label="A label"
          tooltip="A tooltip"
          rightDecorators={
            <span
              key="span-search"
              style={{ alignSelf: 'center', margin: '0.2rem 0.5rem' }}
              onClick={() => alert('Icon clicked')}
            >
              <Icon iconName="search" />
            </span>
          }
        >
          <input
            type="range"
            min="0"
            max="100"
            onChange={(event) => {
              console.log('Existing onChange method called', event);
            }}
            onClick={(...args) => console.log('Click', ...args)}
          />
        </InputDecorator>
      </Validation>
      <p>
        with a <strong>custom validator</strong>
      </p>
      <Validation
        onValidationChanged={logChange}
        validator={tooDark}
        errorMessage={'Color too dark'}
      >
        <InputDecorator
          label="A label"
          tooltip="A tooltip"
          rightDecorators={
            <span
              key="span-search"
              style={{ alignSelf: 'center', margin: '0.2rem 0.5rem' }}
              onClick={() => alert('Icon clicked')}
            >
              <Icon iconName="search" />
            </span>
          }
        >
          <input
            type="color"
            onChange={(event) => {
              console.log('Existing onChange method called', event);
            }}
            onClick={(...args) => console.log('Click', ...args)}
          />
        </InputDecorator>
      </Validation>
      <h2>Multiple validators</h2>
      <p>
        Text Field with <strong>multiple validators</strong>: Mandatory number,
        with a minimum length of 3 characters, max length of 4
      </p>
      <Validation
        onValidationChanged={logChange}
        validator={[
          Validators.Required,
          Validators.Number,
          Validators.MinLength(3),
          Validators.MaxLength(4),
        ]}
        errorMessage={{
          required: 'This field is mandatory',
          number: 'Should be a number',
          minlength: 'Please type at least 3 numbers',
          maxLength: 'Max 4 characters',
        }}
      >
        <TextField label="Number" placeholder="Age" />
      </Validation>

      <h2>Validation at initialization</h2>
      <p>
        Using <strong>validateOnInit</strong> parameter, you can give to the
        Validation component the value to validate at initialization.
      </p>
      <Validation
        onValidationChanged={logChange}
        validator={Validators.Pattern(/lorem.*/)}
        errorMessage={'Should start with lorem'}
        validateOnInit={'A value to validate'}
      >
        <TextField value={'A value to validate'} placeholder="Magic word" />
      </Validation>
      <h2>Controlled validation</h2>
      <p>
        Give to the Validation component the{' '}
        <strong>list of error messages</strong> with <strong>errors</strong>{' '}
        prop:
      </p>
      <Validation
        onValidationChanged={logChange}
        errors={['This user name already exists', 'This field is required']}
      >
        <TextField placeholder="Name" />
      </Validation>
      <h2>Customise children validation message</h2>
      <p>
        A component owning internal validation should expose it&apos;s
        validation with <strong>onValidationChanged</strong> props. In our
        example, the Date Picker provide the following type of errors:{' '}
        <strong>format, disabledDate, maxDate, minDate</strong>.<br />
        Any component owning internal validation should follow the contract{' '}
        <strong>
          onValidationChanged: (errors: ErrorMessages) {'=>'} any;
        </strong>
        .
      </p>
      <Validation
        onValidationChanged={logChange}
        errorMessage={{
          format: 'Le format est incorrect',
          disabledDate: "La date n'est pas disponible",
          maxDate: 'La date est ...',
          minDate: 'La date est trop ancienne',
        }}
      >
        <DatePicker
          todayButton="today"
          tooltip="Departure date"
          label="Expense"
          disabledDays={disabledDays}
          date={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
      </Validation>
      <p>Another example with the TimePicker :</p>
      <Validation
        onValidationChanged={logChange}
        errorMessage={{
          format: 'Le format est incorrect',
          disabledTime: "L'heure n'est pas disponible",
          maxTime: "L'heure est trop tard",
          minTime: "L'heure est trop trop",
        }}
      >
        <TimePicker
          label={'TimePicker'}
          min={'08:00:00'}
          max={'20:00:00'}
          disabledTimes={disabledTimes}
          value={time}
          onChange={(e) => {
            const value = e.target.value;
            setTime(value);
          }}
        />
      </Validation>
   
      <h2>Can be attached to anything</h2>
      <p>The Validation component wraps the component to be validated.</p>
      <p>
        To be able to validate the component, the child component must take in
        parameters three methods: <strong>onInit</strong>,{' '}
        <strong>onChange</strong> and <strong>onBlur</strong> methods.
      </p>
      <p>
        When the component is initialized, call the onInit method with the
        initial value of the component. Call onInit method when the component is
        initialized by passing the value of the component as a parameter. Call
        onChange method when the child&apos;s value changes and call onBlur
        method when it loses the focus.
      </p>
      <p>Here another example with a validation on a Text Area</p>
      <Validation
        onValidationChanged={logChange}
        validator={[
          Validators.Required,
          Validators.Number,
          Validators.MinLength(3),
        ]}
        errorMessage={{
          required: 'This field is mandatory',
          number: 'Should be a number',
          minlength: 'Please type at least 5 characters',
        }}
      >
        <TextArea placeholder="Type something" />
      </Validation>
    </div>
  );
};

export default {
  title: 'Components/Input/Validations',
  component: Validation,
  subcomponents: { TextField, TextArea, DatePicker },
};
