import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "./../components/ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        //. then has a "self-contained scope"
        // Any code inside of this .then only exists inside of this .then,
        // to solve this problem, we use a state. By settng the new value seen
        setProducts(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const productList = products.map(product => <ProductCard key = {product._id} product={product} />)

  return (
    <Container className={"my-4"}>
        {productList}
      {/* <Row xs={2} className="g-2 d-flex my-4">
        <Col md={4} className="px-3">
          <ProductCard />
        </Col>
        <Col md={4} className="px-3">
          <ProductCard />
        </Col>
        <Col md={4} className="px-3">
          <ProductCard />
        </Col>
      </Row>
      <Row xs={2} className="g-2 d-flex my-4">
        <Col md={4} className="px-3">
          <ProductCard />
        </Col>
        <Col md={4} className="px-3">
          <ProductCard />
        </Col>
        <Col md={4} className="px-3">
          <ProductCard />
        </Col>
      </Row> */}
    </Container>
  );
}
