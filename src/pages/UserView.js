import { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FaSearch } from "react-icons/fa";
import {Container, Row, Col, InputGroup, FormControl} from "react-bootstrap"
import ProductCard from "../components/ProductCard";

export default function UserView(props){
    const [products, setProducts] = useState([]);      
    const [keyword, setKeyWord] = useState("");  
    const fetchData = () => {
        fetch(`${process.env.REACT_APP_API_URL}/products`)
          .then((res) => res.json())
          .then((data) => {
            if (data) {
              setProducts(data.filter((product) => product.isActive === true));
            }
          });
      };
    
      const getProducts = (e) => {
        setKeyWord(e.target.value);
        let path =
          keyword === ""
            ? `${process.env.REACT_APP_API_URL}/products`
            : `${process.env.REACT_APP_API_URL}/products/q/${keyword}`;
    
        if (e.key === "Enter") {
          fetch(path)
            .then((res) => res.json())
            .then((data) => (data ? setProducts(data) : null));
        }
      };
    
      useEffect(() => {
        fetchData();
      }, []);
    
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
                onChange={(e) => getProducts(e)}
                onKeyUp={(e) => getProducts(e)}
                type="text"
                placeholder="Search..."
                aria-label="Search..."
              />
            </InputGroup>
          </Col>
          {/* <Col>
            {user.isAdmin ? (
              <div className={"clearfix"}>
                <Button
                  size="sm"
                  className={"float-end"}
                  onClick={() => setProductFormShow(true)}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
              </div>
            ) : null}
          </Col> */}
        </Row>
  
        <Row className="d-flex">
          {productList.length === 0 ? (
            <h1 className="text-center">No Result for for '{keyword}'</h1>
          ) : (
            productList
          )}
        </Row>
        {/* <ProductForm
          show={productFormShow}
          onHide={() => setProductFormShow(false)}
        /> */}
      </Container>
    )
}