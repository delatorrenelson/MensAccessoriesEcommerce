import { Container, Nav } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

export default function Footer() {
  return (
    <Container className={"sticky-bottom"}>
      <footer className={"py-3 my-4"}>
        <Nav className={"nav  border-bottom pb-3 mb-3 justify-content-center"}>
          <Nav.Item>
            <Link className="nav-link px-2 text-muted" to={{ pathname: `/` }}>
              Home
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link className="nav-link text-muted" to="/products">
              Products
            </Link>
          </Nav.Item>
        </Nav>
        <p className={"text-center text-muted"}>
          © 2022{" "}
          <Link to="/" className={"text-center text-muted"}>
            Ecommerce
          </Link>
          , Inc
        </p>
      </footer>
    </Container>
  );
}
