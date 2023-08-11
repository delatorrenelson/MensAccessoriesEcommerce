import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Accordion,
} from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

import "./UserView.scss";

export default function UserView(props) {
  const [products, setProducts] = useState([]);
  const [isMounted, setIsMounted] = useState(true);

  const searchProduct = (e) => {
    if (e !== "") {
      fetch(`${process.env.REACT_APP_API_URL}/products/q/${e}`)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setProducts(data.filter((product) => product.isActive));
          }
        });
    } else {
      fetch(`${process.env.REACT_APP_API_URL}/products`)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setProducts(data.filter((product) => product.isActive));
          }
        });
    }
  };

  useEffect(() => {
    if (isMounted) {
      fetch(`${process.env.REACT_APP_API_URL}/products`)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setProducts(data.filter((product) => product.isActive));
          }
        });
    }

    return () => {
      setIsMounted(false);
    };
  }, [isMounted, products]);

  const productList = products.map((product) => (
    <ProductCard key={product._id} product={product} />
  ));

  return (
    <Container className={"my-3"}>
      <Row className="xs-mb-4 mb-4">
        <Col>
          <Accordion defaultActiveKey="0" flush className="p-0">
            <Accordion.Item>
              <Accordion.Header>
                <InputGroup>
                  <InputGroup.Text>
                    <FaSearch />
                  </InputGroup.Text>
                  <FormControl
                    onChange={(e) => searchProduct(e.target.value)}
                    type="text"
                    placeholder="Search..."
                    aria-label="Search..."
                    className="me-2"
                  />
                </InputGroup>
              </Accordion.Header>
              <Accordion.Body>                
                <p>
                  Place Filter here
                </p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>

      <Row className="products g-4 lg-g-2">
        {productList.length === 0 ? <Loader /> : productList}
      </Row>
    </Container>
  );
}
