import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Page404() {
  return (
    <Container className="text-center">
      <h1>404</h1>
      <h2>Page not Found</h2>
      <p>
          back to <Link to="/">Ecommerce</Link> page
      </p>
    </Container>
  );
}
