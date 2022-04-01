import { useState, useEffect, useMemo } from "react";
import { Redirect, useHistory } from "react-router-dom";
import {
  Button,
  Table,
  Container,
  InputGroup,
  Col,
  FormControl,
  Row,
  Modal,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Loader from "../components/Loader";
import { formatNumber } from "../utils/NumberUtils";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FaSearch } from "react-icons/fa";

import "./ProductTable.scss";

import EditProduct from "../pages/EditProduct";
import { Link } from "react-router-dom";

export default function ProductTable({ props }) {
  const [tableRows, setTableRows] = useState([]);
  const [products, setProducts] = useState([]);
  const [keyword, setKeyWord] = useState("");
  const [currentProduct, setCurrentProduct] = useState();

  const [productId, setProductId] = useState("");
  const [price, setPrice] = useState(0);
  const [productName, setProductName] = useState("");
  const [stock, setStock] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const [modalShow, setModalShow] = useState(false);
  const [isMounted, setIsMounted] = useState(true);
  const token = localStorage.getItem("token");

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setProducts(data);
        }
      });
  };

  const searchProduct = (e) => {
    console.log(e)
    if(e !== ""){
      fetch(`${process.env.REACT_APP_API_URL}/products/q/${e}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          console.log(data)
          setProducts(data);        
        }
      });
    }else{
      fetchData()
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

  const history = useHistory();

  const [isEdit, setIsEdit] = useState(true);

  const handleRowClick = (product) => {
    history.push({ pathname: `/products/${product._id}`, state: product });
  };

  const addProduct = () => {
    history.push({ pathname: `/addProduct` });
  };

  const rows = products.map((product, i) => {
    return (
      <tr
        key={product._id}
        className={product.isActive ? "" : "table-danger"}
        onClick={() => handleRowClick(product)}
      >
        <td>
          {i + 1}
          {". "}
        </td>
        <td>{product.productName}</td>
        <td className="">{product.description}</td>
        <td className="">{product.color}</td>
        <td className="">{product.category}</td>
        <td className="text-center">{formatNumber(product.price)}</td>
        <td className="text-center">{product.stock}</td>

        <td className="text-end">
          <img
            className="img-thumbnail product-thumbnail"
            src={product.imageURL}
            alt={product.productName}
          />
        </td>
      </tr>
    );
  });

  return (
    <Container>
      <h1 className="text-center">Products</h1>
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
        <Col>
          <div className={"clearfix"}>
            <Button
              size="sm"
              className={"float-end"}
              onClick={() => {
                addProduct();
              }}
            >
              Add Product <FontAwesomeIcon icon={faPlus} />
            </Button>
          </div>
        </Col>
      </Row>

      {products.length > 0 ? (
        <Table size="sm" className="mt-4" hover>
          <thead>
            <tr>
              <td className="fw-bold text-muted text-capitalize text-start">
                #
              </td>
              <td className="fw-bold text-muted text-capitalize text-start">
                Product Name
              </td>
              <td className="fw-bold text-muted text-capitalize">
                Description
              </td>
              <td className="fw-bold text-muted text-capitalize">Color</td>
              <td className="fw-bold text-muted text-capitalize">Category</td>
              <td className="fw-bold text-muted text-capitalize text-center">
                Price
              </td>
              <td className="fw-bold text-muted text-capitalize text-center">
                Stocks
              </td>
              <td className="fw-bold text-muted text-capitalize text-center">
                Image
              </td>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      ) : (
        <Loader />
      )}
    </Container>
  );
}
