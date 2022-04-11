import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import UserProfile from "../UserProfile/UserProfile";

function Profile() {
  const outlet = useOutletContext()
  useEffect(() => {
    outlet.selectCurTab('/admin/profile');
  }, []);
  return (
    <Container>
      <Row className="m-2">
        <Col>
          <h3>Admin Profile</h3>
        </Col>
      </Row>
      <Row>
        <UserProfile />
      </Row>
    </Container>
  );
}

export default Profile;
