import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ForgotPassword = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="primary" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Remembering passwords can be difficult</ModalHeader>
        <ModalBody>
          <center><img className="banner" src="data:image/jpeg;base64,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" alt="Doctor Logo" /><br/>
          <b>Relax and try to remember your password</b></center>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={toggle}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ForgotPassword;