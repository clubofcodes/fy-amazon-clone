import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../../Validations/yupSchema";
import Message from "../../Components/Message";
import { useSelector } from "react-redux";

const UserForm = ({
  name = "Submit",
  edit = false,
  userData = null,
  shouldNavigate = true,
  closeModal = null,
}) => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // const userList = useSelector((state) => state.userList);
  // const { loading } = userList;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      firstname: edit ? userData.name.firstname : "",
      lastname: edit ? userData.name.lastname : "",
      email: edit ? userData.email : "",
      phone: edit ? userData.phone : "",
      username: edit ? userData.username : "",
      password: edit ? userData.password : "",
      number: edit ? userData.address.number : "",
      street: edit ? userData.address.street : "",
      city: edit ? userData.address.city : "",
      zipcode: edit ? userData.address.zipcode : "",
    },
  });

  const onSubmit = (data) => {
    // reset();
    if (closeModal) closeModal();
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="mt-2 gx-3">
          {/* Firstname field */}
          <Col md={6}>
            <FloatingLabel label="First Name">
              <Form.Control
                {...register("firstname")}
                type="text"
                placeholder="First Name"
              />
            </FloatingLabel>
            {errors.firstname && (
              <small className="text-danger">{errors.firstname.message}</small>
            )}
          </Col>

          {/* Lastname field */}
          <Col md={6}>
            <FloatingLabel label="Last Name">
              <Form.Control
                {...register("lastname")}
                type="text"
                placeholder="Last Name"
              />
            </FloatingLabel>
            {errors.firstname && (
              <small className="text-danger">{errors.firstname.message}</small>
            )}
          </Col>
        </Row>

        <Row className="mt-2 gx-3">
          {/* Email field */}
          <Col md={6}>
            <FloatingLabel label="Email">
              <Form.Control
                {...register("email")}
                type="text"
                placeholder="Email"
              />
            </FloatingLabel>
            {errors.email && (
              <small className="text-danger">{errors.email.message}</small>
            )}
          </Col>

          {/* Phone field */}
          <Col md={6}>
            <FloatingLabel label="Phone Number">
              <Form.Control
                {...register("phone")}
                type="text"
                placeholder="Phone Number"
              />
            </FloatingLabel>
            {errors.phone && (
              <small className="text-danger">{errors.phone.message}</small>
            )}
          </Col>
        </Row>

        <Row className="mt-2 gx-3">
          {/* Username field */}
          <Col md={6}>
            <FloatingLabel label="Username">
              <Form.Control
                {...register("username")}
                type="text"
                placeholder="Username"
                readOnly={edit}
              />
            </FloatingLabel>
            {errors.username && (
              <small className="text-danger">{errors.username.message}</small>
            )}
          </Col>

          {/* Password field */}
          <Col md={6}>
            <FloatingLabel label="Password">
              <Form.Control
                {...register("password")}
                type="password"
                placeholder="Password"
              />
            </FloatingLabel>
            {errors.password && (
              <small className="text-danger">{errors.password.message}</small>
            )}
          </Col>
        </Row>
        <Button variant="dark" type="submit" className="text-center mt-4 w-100">
          {name}
        </Button>
      </Form>
    </Container>
  );
};

export default UserForm;
