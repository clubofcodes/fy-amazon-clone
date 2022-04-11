import React, { useEffect, useState } from "react";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useOutletContext } from "react-router-dom";
import { getUsers } from "../../../Redux/Users/UserAction";
import '../Components/Admin.css'
import UserDetails from "../Users/UserDetails";

const AdminDashboard = () => {
  const [isActive, setActive] = useState(true);
  const userData = useSelector((state) => state.userData);
  const { users } = userData;

  const productList = useSelector((state) => state.getproductsdata);
  const { products } = productList;

  const categoryList = useSelector((state) => state.categoryData);
  const { categories } = categoryList;

  const dispatch = useDispatch();
  const outlet = useOutletContext()

  useEffect(() => {
    outlet.selectCurTab('/admin/dashboard');
    dispatch(getUsers())
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <h1>Dashboard</h1>
      <Row className="my-3">
        <Col md={2}>
          <div className="p-2 bg-dark text-white">
              <>
                <div className="inner">
                  <h3>{products.length}</h3>
                  <p>Total Products</p>
                </div>
                <Link to="/admin/products" className="g-color">
                  More info <i class="bi bi-arrow-right-circle-fill text-warning"></i>
                </Link>
              </>
          </div>
        </Col>
        <Col md={2}>
          <div className="p-2 bg-dark text-white">
              <>
                <div className="inner">
                  <h3>{categories.length}</h3>
                  <p>Total Categories</p>
                </div>
                <Link to="/admin/category" className="g-color">
                  More info <i class="bi bi-arrow-right-circle-fill text-warning"></i>
                </Link>
              </>
          </div>
        </Col>

        <Col md={2}>
          <div className="p-2 bg-dark text-white">
              <>
                <div className="inner">
                  <h3>{users.length}</h3>
                  <p>Total Users</p>
                </div>
                <Link to="/admin/users" className="g-color">
                  More info <i class="bi bi-arrow-right-circle-fill text-warning"></i>
                </Link>
              </>
          </div>
        </Col>
      </Row>
      <hr />
      <Row>
        <h3 className="m-0">Latest Customers:</h3>
        {users.slice(users.length-5,users.length)
          .map((user) => (
            <Container>
              <Accordion className='accordian-custom'>
                <Accordion.Header className="d-flex bg-dark justify-content-between text-light fw-bold mt-4">
                  <h5>{user.fullname}</h5>
                  <h5 className="ms-auto me-2">
                    {"  "}{user.email}
                  </h5>
                  {/* <h5 className="text-end">
                      Email: {users.find((user) => user.id === order.userId)?.email}
                    </h5> */}
                </Accordion.Header>
                <Accordion.Body className='accordian-custom-body'>
                  <UserDetails user={user} />
                </Accordion.Body>
              </Accordion>
            </Container>
          ))
        }
      </Row >
    </Container >
  );
};

export default AdminDashboard;
