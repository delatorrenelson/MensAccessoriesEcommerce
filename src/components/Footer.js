import { Nav} from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
      <footer className={"py-3 my-4 sticky-bottom"}>
        <Nav className={"nav  border-top sticky-bottom justify-content-center"}>
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
          © {year+" "}
          <Link to="/" className={"text-center text-muted"}>
            Ecommerce
          </Link>
          , Inc
        </p>
      </footer>
  );
}
