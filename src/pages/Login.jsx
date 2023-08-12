import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "../UserContext";

export default function Login() {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.accessToken !== "undefined") {
          localStorage.setItem("token", data.accessToken);
          localStorage.setItem("cart", JSON.stringify([]));
          fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
            headers: {
              Authorization: `Bearer ${data.accessToken}`,
            },
          })
            .then((res) => res.json())
            .then((data) => {
              setUser({
                id: data._id,
                isAdmin: data.isAdmin,
              });

              user.cart = JSON.parse(localStorage.getItem("cart"));

              history.push("/products");
              // Swal.fire({
              //   title: "Login successful",
              //   icon: "success",
              //   text: "Welcome to Ecommerce",
              // })
            });
        } else {
          Swal.fire({
            title: "Authentication failed",
            icon: "error",
            text: "Check your login details and try again",
          });
        }
      });
  };

  return (
    <Container className={"my-3"}>
      <Row>
        <Col md={{ span: 6, offset: 3 }} lg={{span: 4, offset: 4}}>
          <Form onSubmit={(e) => loginUser(e)} className="card p-4">
            <h1 className={"text-center"}>Login</h1>
            <Form.Group controlId="email" className="my-4">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}                
                autoComplete="current-password"
                required
              />
            </Form.Group>

            <Form.Group className="my-4 d-flex flex-column align-items-center justify-content-center">
              <Button
                variant="primary"
                type="submit"
                size="sm"
                style={{ width: "10rem" }}
              >
                Login
              </Button>            
              <Link
                to={{ pathname: `./forgot-password` }}
                className="flex-fill text-center form-text text-sm-center"
              >
                Forgot Password
              </Link>
              <Link
                to={{ pathname: `./register` }}
                className="flex-fill text-center form-text text-xs-center"
              >
                Sign Up
              </Link>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
