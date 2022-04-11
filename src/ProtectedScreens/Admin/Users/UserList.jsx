import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate, useOutletContext } from "react-router-dom";
import Loading from "../../../Components/Loading";
import Message from "../../../Components/Message";
import Pagination from "../Components/Pagination";
import Adduser from "./UpdateUser";
import { deleteUser, getUsers, updateUser } from "../../../Redux/Users/UserAction";

const UserList = () => {
  const userData = useSelector((state) => state.userData);
  const { users } = userData;
  const [filterData, setFilterData] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const outlet = useOutletContext()

  useEffect(() => {
    outlet.selectCurTab('/admin/users');
    dispatch(getUsers())
  }, []);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure? This is an IRREVERSIBLE action!")) {
      const data = {activeUser:false}
      dispatch(updateUser(id,'', navigate));
    }
  };

  const onChangePage = (pageOfItems) => {
    setFilterData(pageOfItems);
  };
  return (
    <Container>
      {console.log("users", users)}
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
                <th>ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th className="text-center">Admin</th>
                <th className="text-center" style={{ minWidth: "100px" }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users.length>=0 && users.map((user, index) => (
                <tr key={index} className="align-middle">
                  <td width='4%'>{index + 1}</td>
                  <td width="20%">{user.fullname}</td>
                  <td width="30%">
                    {user.email.slice(0, 36)}
                    <br />
                    {user.email.slice(36)}
                  </td>
                  <td className="text-center" width="4%">
                    {user.userRole.includes("admin") ? (
                      <i class="bi bi-person-check-fill"></i>
                      ) : (
                      <i class="bi bi-person-check"></i>
                    )}
                  </td>
                  <td width="10%">
                    <div className="d-flex justify-content-evenly align-items-center actions">
                    <i className="bi bi-pencil-square fs-5" onClick={()=>navigate('/admin/edituser',{state:{edit:true, data:user}})}></i>
                      <i
                        className="bi bi-trash text-danger fs-5"
                        onClick={() => deleteHandler(user._id)}
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
