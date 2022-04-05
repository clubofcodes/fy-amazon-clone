import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Container, Row, Col, Button } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import Loading from "../../../Components/Loading";
import Message from "../../../Components/Message";
import Pagination from "../Components/Pagination";
import Adduser from "./AddUser";

const UserList = () => {
  // const userList = useSelector((state) => state.userList);
  // const { users, loading, error } = userList;
  const [filterData, setFilterData] = useState([]);

  const dispatch = useDispatch();
  const outlet = useOutletContext()

  useEffect(() => {
    outlet.selectCurTab('/admin/users');
    // if (users.length === 0) dispatch(getUsers());
    // eslint-disable-next-line
  }, []);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure? This is an IRREVERSIBLE action!")) {
      // dispatch(deleteUser(id));
    }
  };

  const onChangePage = (pageOfItems) => {
    setFilterData(pageOfItems);
  };
  return (
    <Container>
      <Row className="m-2">
        <Col>
          <h3>Users Data</h3>
        </Col>
      </Row>
      <Row>
        <>
          <Table bordered hover responsive className="disp-product bg-white">
            <thead>
              <tr className="text-center">
                <th>Sr No.</th>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th className="text-center">Admin</th>
                <th className="text-center" style={{ minWidth: "100px" }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {/* {filterData.map((user, index) => (
                <tr key={user.id} className="align-middle">
                  <td width='4%'>{index + 1}</td>
                  <td width="4%">{user.id}</td>
                  <td width="20%">{user.username}</td>
                  <td width="30%">
                    {user.email.slice(0, 36)}
                    <br />
                    {user.email.slice(36)}
                  </td>
                  <td className="text-center" width="4%">
                    {user.email.includes("admin") ||
                      user.username.includes("admin") ? (
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
                  <td width="10%">
                    <div className="d-flex justify-content-evenly align-items-center actions">
                      <Adduser
                        Btn={<i className="bi bi-pencil-square fs-5"></i>}
                        edit={true}
                        user={user}
                      />
                      <i
                        className="bi bi-trash text-danger fs-5"
                        onClick={() => deleteHandler(user.id)}
                      ></i>
                    </div>
                  </td>
                </tr>
              ))} */}
            </tbody>
          </Table>
          <div className="text-center d-flex justify-content-center">
            <Pagination
              pageSize={10}
              items={'users'}
              onChangePage={onChangePage}
            />
          </div>
        </>
      </Row>
    </Container>
  );
};

export default UserList;
