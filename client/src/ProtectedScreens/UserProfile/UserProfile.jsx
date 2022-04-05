import React from "react";
import { Card, Container } from "react-bootstrap";

import { useSelector } from "react-redux";
import Loading from "../../Components/Loading";

import UserForm from "../Components/UserForm";

function Profile() {
  // const userList = useSelector((state) => state.userList);
  // const { loading, authUser: user } = userList;

  return (
    <>
      <Container className="d-flex justify-content-center mb-5 mt-5">
        <Card className="p-4">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <img
              src="https://img.icons8.com/bubbles/100/000000/user.png"
              alt="user"
            />
            <h6 className="fw-bold text-capitalize">
              UserName
              {/* {user.name.firstname} {user.name.lastname} */}
            </h6>{" "}
            <span>@ username{/* {user.username} */}</span>
          </div>
          <hr />
          <UserForm name="Update Profile" user={'user'} />
        </Card>
      </Container>
    </>
  );
}

export default Profile;
