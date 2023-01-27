import { useContext, useState, useEffect, useCallback } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Badge } from "react-bootstrap";
import UserContext from "../UserContext";
import { Link, useHistory } from "react-router-dom";

export default function NavBar() {  
  const { user, unsetUser, setUser } = useContext(UserContext);  
  const [userCart, setUserCart] = useState(user.cart);  
  const history = useHistory();

  const logout = () => {  // function for user logout
    unsetUser();
    history.push("/login");
  };

  useEffect(() => {    
    setUserCart(user.cart)
  }, [user.cart]);

  return (
    <Navbar bg="primary" expand="sm" sticky="top" className={"mb-4"}>
      <Container fluid>
        <Nav>
          <Nav.Item>
            <Link className="navbar-brand text-light" to={{ pathname: `/` }}>
              Ecommerce
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link
              className="nav-link text-light"
              to={{ pathname: `/products` }}
            >
              Products
            </Link>
          </Nav.Item>
        </Nav>

        <Nav className="justify-content-end" activeKey="/home">
          {!user.id ? (
            <>
              <Link className="nav-link text-light" to="/login">
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
                      className="nav-link nav-link-sm text-light  position-relative"
                      to="/cart"
                    >
                      Cart
                      {(userCart.length !== 0 ? userCart.length : 0) > 0 ? (
                        <Badge
                          bg="danger"
                          className="position-absolute translate-middle badge rounded-pill bg-danger"
                        >
                          {userCart !== null ? userCart.length : 0}
                        </Badge>
                      ) : null}
                    </Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Link className="nav-link text-light" to="/orders">
                      My Orders
                    </Link>
                  </Nav.Item>
                </>
              ) : (
                <Nav.Item>
                  <Link className="nav-link text-light" to="/orders">
                    Orders
                  </Link>
                </Nav.Item>
              )}

              <Nav.Item>
                <Link
                  className="nav-link text-light"
                  to="/home"
                  onClick={logout}
                >
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
