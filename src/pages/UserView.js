import { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FaSearch } from "react-icons/fa";
import { Container, Row, Col, InputGroup, FormControl } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

import "./UserView.scss";

export default function UserView(props) {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyWord] = useState("");
  const [isMounted, setIsMounted] = useState(true);

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          let activeProduct = data.filter(
            (product) => product.isActive === true
          );
          setProducts(activeProduct);
        }
      });
  };

  const searchProduct = (e) => {
    console.log(e);
    if (e !== "") {
      fetch(`${process.env.REACT_APP_API_URL}/products/q/${e}`)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setProducts(data);
          }
        });
    } else {
      fetchData();
    }
  };

  useEffect(() => {
    if (isMounted) {
      fetchData();
    }

    return () => {
      setIsMounted(false);
    };
  }, [products]);

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
              onChange={(e) => searchProduct(e)}
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
