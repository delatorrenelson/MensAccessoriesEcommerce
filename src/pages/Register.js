import { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Swal from "sweetalert2";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isActive, setIsActive] = useState(false);

  const history = useHistory();

  const registerUser = (e) => {
    e.preventDefault();

    if(mobileNo.length !== 11){
      Swal.fire({
        title: "Check Mobile Number",
        icon: "error",
      });      
    }    

    if(password !== confirmPassword){
      Swal.fire({
        title: "Password Mismatch",
        icon: "error",
      });           
    }

    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      mobileNo !== "" &&
      mobileNo.length === 11 &&
      password !== "" &&
      confirmPassword !== "" &&
      password === confirmPassword
    ) {
      fetch(`${process.env.REACT_APP_API_URL}/users/isEmailRegistered`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          if (data) {
            Swal.fire({
              title: "Email already registered",
              icon: "error",
            });
          } else {
            fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                mobileNo: mobileNo,
                password: password,
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data) {
                  Swal.fire({
                    title: "Registration successful",
                    icon: "success",
                    text: "Welcom to Zuitt!",
                  });
                  history.push("/login"); // redirect to login page
                } else {
                  Swal.fire({
                    title: "Registration unsuccessful",
                    icon: "error",
                    text: "Please try again!",
                  });
                }
              });
          }
        });      
      setIsActive(true);
    } else {
      setIsActive(false);
    }    


  };

  useEffect(() => {
    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      mobileNo !== "" &&
      mobileNo.length === 11 &&
      password !== "" &&
      confirmPassword !== "" &&
      password === confirmPassword
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [
    firstName,
    lastName,
    email,
    mobileNo,
    password,
    confirmPassword,
    isActive,
  ]);

  return (
    <Container className={"my-3"}>
      <Row className="d-flex d-flex-row justify-content-center">
        <Col md={6} lg={6} sm={12} className="card p-4">
          <Form onSubmit={(e) => registerUser(e)}>
            <h1 className={"text-center"}>Sign Up</h1>
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                type="text"
                placeholder="First Name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                type="text"
                placeholder="Last Name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="mobileNo">
              <Form.Label>Mobile No.</Form.Label>
              <Form.Control
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
                required
                type="text"
                placeholder="Mobile Number"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control 
                value={email}
                onChange={(e) => setEmail(e.target.value)}              
              required type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                value={password}
                onChange={(e) => setPassword(e.target.value)}              
              required type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                required
                type="password"
                placeholder="Confirm Password"
              />
            </Form.Group>
            <Button variant="primary" type="submit" size="sm">
              Sign Up
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
