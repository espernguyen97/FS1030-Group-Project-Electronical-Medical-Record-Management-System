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
          <center><img className="banner" src="https://media1.giphy.com/media/k8GoZ9AxmxR6isQt9V/giphy.gif" alt="Doctor Logo" /><br/>
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