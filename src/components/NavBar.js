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

  const logout = () => {
    // function for user logout
    unsetUser();
    history.push("/login");
  };

  useEffect(() => {
    setUserCart(user.cart);
  }, [user.cart]);

  return (
    <Navbar bg="dark" expand="sm" sticky="top" className={"mb-4"}>
      <Container fluid>
        <Nav>
          <Nav.Item>
            <Link className="navbar-brand text-light" to={{ pathname: `/` }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="5.8918mm"
                height="12.7mm"
                version="1.1"
                viewBox="0 0 6.42 13.84"
              >
                <defs>
                  <style type="text/css"></style>
                </defs>
                <g id="Layer_x0020_1">
                  <metadata id="CorelCorpID_0Corel-Layer" />
                  <path
                    fill="white"
                    d="M2.45 2.78l0.44 -2.75c-0.15,0.01 -0.29,0.06 -0.33,0.16 -0.02,0.06 -0.06,0.33 -0.07,0.41l-0.49 2.48c0.18,0.07 0.46,0.05 0.67,0.08 0.21,0.03 0.41,0.07 0.61,0.12 0.43,0.1 0.74,0.23 1.09,0.38 -0.73,-0.16 -0.82,-0.31 -1.85,-0.36 -0.45,-0.02 -1.76,-0 -1.9,0.35 0.09,0.31 0.81,0.28 1.09,0.45 0.03,0.1 -0.04,0.27 -0.06,0.4 -0.03,0.17 0.02,0.34 -0.07,0.47 -0.52,0.82 -0.3,0.76 -0.08,0.84 0.06,0.02 -0.02,-0.01 0.04,0.02 0.15,0.08 -0.02,0.18 0.01,0.42 -0.43,0.15 -0.55,0.31 -0.77,0.67 -0.06,0.1 -0.13,0.22 -0.24,0.28 -0.1,-0.28 -0.32,-0.23 -0.53,-0.07 -0.05,0.28 0.04,0.57 0.26,0.63 0.4,0.11 0.59,-0.48 0.81,-0.92 0.1,-0.2 0.21,-0.43 0.45,-0.48 0.07,0.22 0.15,0.11 0.13,0.34 -0.02,0.17 -0.07,0.35 0.09,0.41 0.25,0.1 0.67,-0.07 0.9,-0.11 0.06,0.16 -0.07,0.68 0.87,0.51 0.43,-0.08 0.97,-0.28 1.27,-0.56 0.09,-0.08 0.1,-0.08 0.08,-0.24 -0.12,-0.99 0.03,-0.65 0.27,-1.13 0.08,-0.16 0.14,-0.38 0.16,-0.57 0.37,0.07 0.73,0.23 1.12,0.16 0.04,-0.27 -0.26,-0.45 -0.39,-0.56 -0.13,-0.11 -0.42,-0.34 -0.59,-0.4 0.01,-0.26 0.54,-1.95 0.68,-2.38 0.06,-0.19 0.28,-0.64 0.18,-0.81 -0.26,-0.45 -2.31,-1.08 -3.11,-0.99l-0.74 2.77zm0.69 5.07c-0.15,-0.1 -0.24,-0.22 -0.35,-0.21 -0.09,0.15 -0.12,0.55 -0.06,0.73 0.14,0.03 0.23,-0.14 0.36,-0.2 0.11,-0.05 0.09,0.02 0.2,0.04 0.13,0.03 0.12,-0.03 0.25,-0.06 0.14,0.08 0.48,0.32 0.62,0.32 0.15,-0.17 0.15,-0.74 0.02,-0.92 -0.14,-0.02 -0.37,0.16 -0.51,0.23 -0.16,0.08 -0.12,0.08 -0.25,0.02 -0.12,-0.05 -0.18,0.01 -0.27,0.04zm-0.34 4.34c-0.23,-1.4 -0.34,-2.96 -0.21,-4.4 -0.08,0.02 -0.45,0.17 -0.53,0.22 -0.13,0.09 -0.18,0.33 -0.23,0.5 -0.06,0.2 -0.29,1.03 -0.23,1.21l0.52 0.02c-0.07,0.13 -0.43,0.31 -0.46,0.38 -0.1,0.27 0.84,3.48 1.11,3.72l0.63 -1.02c0.32,-0.51 1.19,-1.77 1.59,-2.15l0.42 -0.42c0.07,-0.06 0.17,-0.12 0.24,-0.18 -0.09,-0.12 -0.57,-0.34 -0.74,-0.47l0.98 0.14c0.03,-0.24 0.16,-1.62 0.13,-1.73 -0.01,-0.02 -0.61,-0.38 -0.72,-0.39 -0.42,0.44 -1.14,1.61 -1.42,2.1 -0.21,0.37 -0.4,0.78 -0.59,1.19l-0.42 1.13c-0.03,0.11 -0.01,0.09 -0.08,0.15z"
                  />
                </g>
              </svg>
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
