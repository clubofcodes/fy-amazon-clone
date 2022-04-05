import React, { useState } from "react";
import { Container, Modal } from "react-bootstrap";

import UserForm from "../../Components/UserForm";
import { useDispatch, useSelector } from "react-redux";

const AddUser = ({ Btn, edit = false, user = null }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <span onClick={handleShow}>{Btn}</span>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>{edit ? "Edit User" : "Add User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <UserForm
              name={edit ? "Edit User" : "Add User"}
              edit={edit}
              user={user}
              shouldNavigate={false}
              closeModal={handleClose}
            />
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddUser;
