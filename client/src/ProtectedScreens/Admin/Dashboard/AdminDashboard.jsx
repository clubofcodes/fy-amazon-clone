import React, { useEffect, useState } from "react";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../../../Components/Loading";
import Message from "../../../Components/Message";
import { useOutletContext } from "react-router-dom";
import '../Components/Admin.css'

const AdminDashboard = () => {
  const outlet = useOutletContext()
  useEffect(() => {
    outlet.selectCurTab('/admin/dashboard');
  }, []);
  return (
    <Container>
      <h1>Dashboard</h1>
      <Row className="my-3">
        <Col md={3}>
          <div className="p-2 bg-white text-dark">
            <>
              <div className="inner">
                <h3>{}</h3>
                <p>Total Products</p>
              </div>
              <Link to="/admin/products" className="g-color">
                More info <i className="fas fa-arrow-circle-right"></i>
              </Link>
            </>
          </div>
        </Col>

        <Col md={3}>
          <div className="p-2 bg-white text-dark">
            <>
              <div className="inner">
                <h3>{}</h3>
                <p>Total Users</p>
              </div>
              <Link to="/admin/categories" className="g-color">
                More info <i className="fas fa-arrow-circle-right"></i>
              </Link>
            </>
          </div>
        </Col>
      </Row>
    </Container >
  );
};

export default AdminDashboard;
