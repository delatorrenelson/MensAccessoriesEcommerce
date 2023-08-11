import { Button, Col, Container, Form, Row } from "react-bootstrap";
import React, { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState();

  const forgotPassword = (e) => {
    e.preventDefault();    
  };
  return (
    <Container className={"my-3"}>
      <Row>
        <Col md={{ span: 6, offset: 3 }} lg={{ span: 4, offset: 4 }}>
          <Form onSubmit={(e) => forgotPassword(e)} className="card p-4">
            <h3 className={""}>Request Password Reset</h3>
            <Form.Group controlId="email" className="my-">
              <Form.Control
                type="email"
                placeholder="Enter Email"
                // value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-2"
                required
              />
              {/* <Form.Label className="text-center">Email</Form.Label> */}
              <Button
                variant="primary"
                type="submit"
                size="sm"
                className="float-end"
              >
                Send Request
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
