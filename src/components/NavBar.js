import { useContext, useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Button, Badge } from "react-bootstrap";
import UserContext from "../UserContext";
import { Link, useHistory } from "react-router-dom";

import { FaUserCircle } from "react-icons/fa";

export default function NavBar() {
  const { user, unsetUser, setUser } = useContext(UserContext);
  const [userCart, setUserCart] = useState(
    JSON.parse(localStorage.getItem("cart"))
  );

  const history = useHistory();

  const logout = () => {
    unsetUser();
    history.push("/login");
  };

  const userCartCount = userCart !== null ? userCart.length : 0;

  useEffect(() => {
    setUserCart(JSON.parse(localStorage.getItem("cart")));
  }, [user]);

  return (
    <Navbar bg="light" expand="sm" sticky="top" className={"mb-4"}>
      <Container fluid>
        <Nav>
          <Nav.Item>
            <Link className="navbar-brand" to={{ pathname: `/` }}>
              Ecommerce
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link className="nav-link" to={{ pathname: `/products` }}>
              Products
            </Link>
          </Nav.Item>
        </Nav>

        <Nav className="justify-content-end" activeKey="/home">
          {!user.id ? (
            <>
              <Link className="nav-link" to="/login">
                Log In
              </Link>
            </>
          ) : (
            <>
              {!user.isAdmin ? (
                <>
                  {" "}
                  <Nav.Item>
                    <Link
                      className="nav-link nav-link-sm  position-relative"
                      to="/cart"
                    >
                      Cart
                      {userCartCount > 0 ? (
                        <Badge
                          bg="danger"
                          className="position-absolute translate-middle badge rounded-pill bg-danger"
                        >
                          {userCartCount}
                        </Badge>
                      ) : null}
                    </Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Link className="nav-link" to="/orders">
                      My Orders
                    </Link>
                  </Nav.Item>
                </>
              ) : (
                <Nav.Item>
                <Link className="nav-link" to="/orders">
                  Orders
                </Link>                  
                </Nav.Item>
              )}
              <Nav.Item>
              <Link className="nav-link" to="/home" onClick={logout}>
                Log Out
              </Link>                
              </Nav.Item>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
