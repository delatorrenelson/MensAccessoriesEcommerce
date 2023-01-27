import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Container, Row, Col, InputGroup, FormControl } from "react-bootstrap";
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
          console.log(data)
          if (data) {
            setProducts(data.filter(
              (product) => product.isActive
            ));
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
          setProducts(data.filter(
            (product) => product.isActive
          ));
        }
      });
    }

    return () => {
      setIsMounted(false);
    };
  }, [isMounted,products]);

  const productList = products.map((product) => (
    <ProductCard key={product._id} product={product} />
  ));

  return (
    <Container className={"my-3"}>
      <Row>
        <Col>
          <InputGroup>
            <InputGroup.Text id="btnGroupAddon2">
              <FaSearch />
            </InputGroup.Text>
            <FormControl
              onChange={(e) => searchProduct(e.target.value)}
              type="text"
              placeholder="Search..."
              aria-label="Search..."
            />
          </InputGroup>
        </Col>
      </Row>

      <Row className="">
        {productList.length === 0 ? <Loader /> : productList}
      </Row>
    </Container>
  );
}
