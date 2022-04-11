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
      fullname: edit ? userData.name.lastname : "",
      email: edit ? userData.email : "",
      phone: edit ? userData.phone : "",
      password: edit ? userData.password : "",
    },
  });

  const onSubmit = (data) => {
    // reset();
    console.log("user ", data);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="mt-2 gx-3">
          {/* Firstname field */}
          <Col md={{ span: 8, offset: 2 }}>
            <FloatingLabel label="First Name">
              <Form.Control
                {...register("fullname")}
                type="text"
                placeholder="Full Name"
              />
            </FloatingLabel>
            {errors.fullname && (
              <small className="text-danger">{errors.fullname.message}</small>
            )}
          </Col>
        </Row>

        <Row className="mt-2 gx-3">
          {/* Email field */}
          <Col md={{ span: 8, offset: 2 }}>
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
        </Row>
        <Row className="mt-2 gx-3">
          {/* Password field */}
          <Col md={{ span: 8, offset: 2 }}>
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
        <Row className="mt-2 gx-3">
          {/* Phone field */}
          <Col md={{ span: 8, offset: 2 }}>
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
          <Col md={{ span: 8, offset: 2 }}>
            <Button variant="dark" type="submit" className="text-center mt-4 w-100">
              {name}
            </Button></Col>
        </Row>


      </Form>
    </Container>
  );
};

export default UserForm;
