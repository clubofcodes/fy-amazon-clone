import React, { useState } from "react";
import { Container, Modal } from "react-bootstrap";

import UserForm from "../../Components/UserForm";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateUser = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // const handleClose = () => '';
  // const handleShow = () => '';
  return (
    <>
      {/* <h2 className="text-center m-3">{location?.state?.edit ? "Edit User" : "Add User"}</h2> */}
      <Container>
        <UserForm
          name={location?.state?.edit ? "Edit User" : "Add User"}
          edit={false}
          user={location?.state?.data}
        />
      </Container>
    </>
  );
};

export default UpdateUser;
