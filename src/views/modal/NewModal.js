import React from "react";

import { Button, Modal } from "reactstrap";

const NewModal = ({ showModal, onContinue, onCancel, message }) => {
  return (
    <Modal isOpen={showModal}>
      <div>{message}</div>
      <div>
        <span>
          <Button onClick={onContinue}>Continue</Button>
        </span>
        <span>
          <Button onClick={onCancel}>Cancel</Button>
        </span>
      </div>
    </Modal>
  );
};

export default NewModal;
