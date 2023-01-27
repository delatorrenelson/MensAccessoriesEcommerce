import { useState, useEffect, useCallback } from "react";
import { useHistory, Link } from "react-router-dom";
import {
  Button,
  Table,
  Container,
  InputGroup,
  Col,
  FormControl,
  Row,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Loader from "../components/Loader";
import { formatNumber } from "../utils/NumberUtils";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FaSearch } from "react-icons/fa";

import "./ProductTable.scss";

export default function ProductTable({ props }) {
  const [products, setProducts] = useState([]);
  const [isMounted, setIsMounted] = useState(true);

  const history = useHistory();

  const searchProduct = useCallback((e) => {
    if (e !== "") {
      fetch(`${process.env.REACT_APP_API_URL}/products/q/${e}`)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setProducts(data);
          }
        });
    }else{
      fetch(`${process.env.REACT_APP_API_URL}/products`)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setProducts(data);
          }
        });      
    }
  });

  useEffect(() => {
    if (isMounted) {
      fetch(`${process.env.REACT_APP_API_URL}/products`)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setProducts(data);
          }
        });
    }

    return () => {
      setIsMounted(false);
    };
  }, [isMounted, products]);

  const handleRowClick = (product) => {
    history.push({ pathname: `/products/${product._id}`, state: product });
  };

  const addProduct = () => {
    history.push({ pathname: `/addProduct` });
  };

  return (
    <Container md={6} className="card p-4">
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
            <tr className="align-middle">
              <td className="fw-bold text-muted text-capitalize text-start align-middle">
                #
              </td>
              <td className="fw-bold text-muted text-capitalize text-start align-middle">
                Product Name
              </td>
              <td className="fw-bold text-muted text-capitalize align-middle">
                Description
              </td>
              <td className="fw-bold text-muted text-capitalize align-middle">
                Color
              </td>
              <td className="fw-bold text-muted text-capitalize align-middle">
                Category
              </td>
              <td className="fw-bold text-muted text-capitalize align-middle text-center">
                Price
              </td>
              <td className="fw-bold text-muted text-capitalize align-middle text-center">
                Stocks
              </td>
              <td className="fw-bold text-muted text-capitalize align-middle text-center">
                Image
              </td>
            </tr>
          </thead>
          <tbody>
            {products.map((product, i) => {
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
            })}
          </tbody>
        </Table>
      ) : (
        <Loader />
      )}
    </Container>
  );
}
