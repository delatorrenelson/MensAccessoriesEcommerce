import { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FaSearch } from "react-icons/fa";
import {
  Button,
  Col,
  Container,
  FormControl,
  InputGroup,
  Row,
  Modal,
  Form,
  Table,
} from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import ProductTable from "../components/ProductTable";

import Loader from "../components/Loader"

export default function AdminView(props) {
  
  const [products, setProducts] = useState([]);
  const [productFormShow, setProductFormShow] = useState(false);
  const [keyword, setKeyWord] = useState("");

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setProducts(data);
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

  const productList = products.map((product) => (
    <ProductCard key={product._id} product={product} />
  ));
  
  
    

  useEffect(() => {
    
    fetchData();
  }, [products]);  




  return (
    <Container className={"my-3"}>

      <>
        {products.length > 0 ? 
        <ProductTable products = {products}/>
        :
        <Loader/>
      }
      </>

      <ProductForm
        show={productFormShow}
        onHide={() => setProductFormShow(false)}
      />
    </Container>
  );
}

function ProductForm(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
      centered
    >
      <Form>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">            
            <Form.Control type="text" placeholder="Product Name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">            
            <Form.Control type="text" placeholder="Description" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">            
            <Form.Control type="text" placeholder="Category" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">            
            <Form.Control type="number" placeholder="Price" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button size="sm" variant="danger" onClick={props.onHide}>
            Cancel
          </Button>
          <Button
            size="sm"
            variant="primary"
            type="submit"
            onClick={props.onHide}
          >
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
