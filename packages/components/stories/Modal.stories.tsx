import * as React from 'react';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Button,
  Icon,
  Typography,
} from '../src/components';

const Template = (args) => {
  const parent = document.querySelector('div.docs-story') || document.body;
  return (
    <Modal {...args} parentNode={parent}>
      <ModalTitle>Modal Title</ModalTitle>
      <ModalHeader>{header}</ModalHeader>
      <ModalBody>{body}</ModalBody>
      <ModalFooter>{footer}</ModalFooter>
    </Modal>
  );
};

export const Main = Template.bind({});
Main.args = { show: true };

const header = (
  <>
    <hr />
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Icon iconName={'lock'} />
      <Icon iconName={'call'} />
      <Icon iconName={'app'} />
      <Icon iconName={'bot'} />
    </div>
    <hr />
  </>
);

const body = (
  <Typography type={'body'}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
    non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </Typography>
);

const footer = (
  <>
    <Button variant={'tertiary'}>Cancel</Button>
    <Button variant={'primary'}>Confirm</Button>
  </>
);

export const SmallModal: React.FC = () => {
  return (
    <Modal size="small" closeButton show>
      <ModalTitle>Small modal with header</ModalTitle>
      <ModalHeader>{header}</ModalHeader>
      <ModalBody>{body}</ModalBody>
      <ModalFooter>{footer}</ModalFooter>
    </Modal>
  );
};

export const MediumModal: React.FC = () => {
  return (
    <Modal size="medium" closeButton show>
      <ModalTitle>Medium modal without header</ModalTitle>
      <ModalBody>{body}</ModalBody>
      <ModalFooter>{footer}</ModalFooter>
    </Modal>
  );
};

export const LargeModal: React.FC = () => {
  return (
    <Modal size={'large'} closeButton show>
      <ModalTitle>Large modal without header</ModalTitle>
      <ModalBody>{body}</ModalBody>
      <ModalFooter>{footer}</ModalFooter>
    </Modal>
  );
};

export const FullPageModal: React.FC = () => {
  return (
    <Modal size={'full-width'} closeButton show>
      <ModalTitle>Full width modal without header</ModalTitle>
      <ModalBody>{body}</ModalBody>
      <ModalFooter>{footer}</ModalFooter>
    </Modal>
  );
};

export const CustomCssClassModal: React.FC = () => {
  return (
    <Modal size={'medium'} className={'myModalClass'} closeButton show>
      <ModalTitle className={'myModalTitleClass'}>Modal with additional custom CSS classes</ModalTitle>
      <ModalHeader className={'myModalHeaderClass'}>{body}</ModalHeader>
      <ModalBody className={'myModalBodyClass'}>{body}</ModalBody>
      <ModalFooter className={'myModalFooterClass'}>{footer}</ModalFooter>
    </Modal>
  );
};

export const ModalWithCloseHandler: React.FC = () => {
  const [show, setShow] = React.useState(true);
  const handleClose = () => { setShow(false) }
  return (
    <div>
      <Button onClick={() => setShow(true)}>Open the Modal</Button>
      <Modal size="medium" closeButton show={show} onClose={handleClose}>
        <ModalTitle>Medium modal with onClose prop</ModalTitle>
        <ModalBody>{body}</ModalBody>
        <ModalFooter>
          <Button variant={'tertiary'} onClick={handleClose}>Cancel</Button>
          <Button variant={'primary'} onClick={handleClose}>Confirm</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default {
  title: 'Components/Modal',
  component: Modal,
  decorators: [
    (Story) => (
      <div style={{ minHeight: '600px' }}>
        <Story />
      </div>
    ),
  ],
};
