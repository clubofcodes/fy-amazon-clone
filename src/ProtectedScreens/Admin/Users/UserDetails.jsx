import React from 'react'
import { Card, Col, Container, ListGroup, Row } from 'react-bootstrap'

function UserDetails({ user }) {

    return (
        <Container>
            <Row>
                <Card className='rounded-0 rounded-bottom '>
                    <Card.Body>
                        <Container>
                            <h5 className="fw-bold">User Role: {user.userRole}</h5>
                            <ListGroup>
                                <ListGroup.Item key={user._id}>
                                    <Row className="p-3">
                                        <Col md={6} className="fs-6">
                                            <p style={{ fontSize: "15px" }}>{user.fullname}</p>
                                            <p
                                                style={{
                                                    fontSize: "15px",
                                                    color: "gray",
                                                    textTransform: "capitalize",
                                                }}
                                            >
                                                {user.email}
                                            </p>
                                            <p
                                                style={{
                                                    fontSize: "15px",
                                                    color: "gray",
                                                    textTransform: "capitalize",
                                                }}
                                            >
                                                {user.mNumber}
                                            </p>
                                        </Col>

                                    </Row>
                                </ListGroup.Item>
                            </ListGroup>
                        </Container>
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    )
}

export default UserDetails