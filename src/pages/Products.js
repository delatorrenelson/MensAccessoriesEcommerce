import { useState, useEffect, useContext } from "react";
import UserContext from "../UserContext";
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
} from "react-bootstrap";

import ProductCard from "../components/ProductCard";

import AdminView from "../pages/AdminView"
import UserView from "../pages/UserView"

export default function Products() {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);  
  const [keyword, setKeyWord] = useState("");  

  const [productFormShow, setProductFormShow] = useState(false);
  const token = localStorage.getItem("token");

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/products`,{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
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
  }, [user]);

  const productList = products.map((product) => (
    <ProductCard key={product._id} product={product} />
  ));

  return (
    <Container>
      {
        user.isAdmin ? 
        <AdminView/>
        :
        <UserView/>
      }
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
            {/* <Form.Label>Product Name</Form.Label> */}
            <Form.Control type="text" placeholder="Product Name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            {/* <Form.Label>Password</Form.Label> */}
            <Form.Control type="text" placeholder="Description" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            {/* <Form.Label>Password</Form.Label> */}
            <Form.Control type="text" placeholder="Category" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            {/* <Form.Label>Password</Form.Label> */}
            <Form.Control type="number" placeholder="Price" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button size="sm" variant="danger" onClick={props.onHide}>
            Cancel
          </Button>
          <Button size="sm" variant="primary" type="submit" onClick={props.onHide}>
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
