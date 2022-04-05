import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Container, Row, Col, ListGroup, Badge } from "react-bootstrap";
import { Link, useOutletContext } from "react-router-dom";
import Loading from "../../../Components/Loading";
import Message from "../../../Components/Message";
import { deleteOrder, getAllOrders } from "../../../Redux/Orders/OrderActions";
import Pagination from "../Components/Pagination";
import "../Components/Admin.css";

const OrderList = () => {
  const orderList = useSelector((state) => state.orderList);
  const products = useSelector((state) => state.productList.products);
  const { orders, loading, error } = orderList;
  const [filterData, setFilterData] = useState([]);

  const dispatch = useDispatch();
  const outlet = useOutletContext()

  useEffect(() => {
    outlet.selectCurTab('/admin/orders');
    if (orders.length === 0) dispatch(getAllOrders({}));
  }, []);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure? This is an IRREVERSIBLE action!")) {
      dispatch(deleteOrder(id));
    }
  };
  const onChangePage = (pageOfItems) => {
    setFilterData(pageOfItems);
  };
  return (
    <Container className="admin-orders">
      <Row className="m-2">
        <Col>
          <h3>Orders Data</h3>
        </Col>
      </Row>
      <Row>
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="danger">
            {"  "}
            {error}
          </Message>
        ) : orders.length === 0 ? (
          <Message>Sorry, No Data Found!</Message>
        ) : (
          <>
            <Table hover bordered responsive className="disp-product bg-white">
              <thead>
                <tr>
                  <th>Sr No.</th>
                  <th>ID</th>
                  <th>User ID</th>
                  <th>Date</th>
                  <th style={{ width: "40%" }}>Products</th>
                  <th>Paid</th>
                  <th>Delivered</th>
                  <th style={{ width: "100px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filterData.map((order, index) => (
                  <tr className="align-middle" key={index}>
                    <td width='4%'>{index + 1}</td>
                    <td width='4%'>{order.id}</td>
                    <td width='4%'>{order.userId}</td>
                    <td width='15%'>{order.date.slice(0, 10)}</td>
                    <td width='20%'>
                      <ListGroup>
                        {order.products.map((product, index) => (
                          <Link
                            to={`/product/${product.productId}`}
                            key={index}
                          >
                            <ListGroup.Item className="d-flex justify-content-between align-items-start text-start">
                              <u className="me-2">
                                {
                                  products.find(
                                    (item) => item.id === product.productId
                                  )?.title.length > 30 ? products.find(
                                    (item) => item.id === product.productId
                                  )?.title.substring(0, 30) + "..." : products.find(
                                    (item) => item.id === product.productId
                                  )?.title
                                }
                              </u>
                              <Badge bg="warning" pill>
                                x{product.quantity}
                              </Badge>
                            </ListGroup.Item>
                          </Link>
                        ))}
                      </ListGroup>
                    </td>
                    <td className="text-center" width="4%">
                      {order.isPaid ? (
                        <i
                          className="fa fa-check text-success fs-5"
                          aria-hidden="true"
                        />
                      ) : (
                        <i
                          className="fa fa-close text-danger fs-5"
                          aria-hidden="true"
                        />
                      )}
                    </td>
                    <td className="text-center" width="4%">
                      {order.isDelivered ? (
                        <i
                          className="fa fa-check text-success fs-5"
                          aria-hidden="true"
                        />
                      ) : (
                        <i
                          className="fa fa-close text-danger fs-5"
                          aria-hidden="true"
                        />
                      )}
                    </td>
                    <td width='4%'>
                      <div className="d-flex justify-content-evenly align-items-center actions">
                        {/* <i className="bi bi-pencil-square fs-5"></i> */}
                        <i
                          className="bi bi-trash text-danger fs-5"
                          onClick={() => deleteHandler(order.id)}
                        ></i>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="text-center d-flex justify-content-center">
              <Pagination
                pageSize={10}
                items={orders}
                onChangePage={onChangePage}
              />
            </div>
          </>
        )}
      </Row>
    </Container>
  );
};

export default OrderList;
