import React from "react";
import { Card, Container } from "react-bootstrap";

import { useSelector } from "react-redux";
import Loading from "../../Components/Loading";

import UserForm from "../Components/UserForm";

function Profile() {
  const userData = useSelector((state) => state.userData);
  // const { loading, authUser: user } = userData;
  // console.log("authuser ",authUser);

  return (
    <>
      <Container className="justify-content-center mb-5 mt-5">
        <div className=" d-flex justify-content-center align-items-center">
          <img
            src="https://img.icons8.com/bubbles/100/000000/user.png"
            alt="user"
          />
          <h6 className="fw-bold text-capitalize">
            UserName
            {/* {user.name.firstname} {user.name.lastname} */}
          </h6>{" "}
          <span>@ username{/* {user.username} */}</span>
          {/* <hr />/ */}
          <UserForm name="Update Profile" user={'user'} admin={true}/>
        </div>

      </Container>
    </>
  );
}

export default Profile;
