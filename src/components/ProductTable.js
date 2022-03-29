import { useState, useEffect } from "react";

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
  const [tableRows, setTableRows] = useState([]);
  const [products, setProducts] = useState([]);
  const [keyword, setKeyWord] = useState("");

  const [productId, setProductId] = useState("");
  const [price, setPrice] = useState(0);
  const [productName, setProductName] = useState("");
  const [stock, setStock] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const [onEditMode, setOnEditMode] = useState({ obj: null, editMode: false });

  const token = localStorage.getItem("token");

  const cellInput = (prdct) => {
    setOnEditMode({ obj: prdct, editMode: true });
    console.log(prdct._id);
  };

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setProducts(data);
        }
      });
  };

  const toggleAvailability = (product) => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${product._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ isActive: !product.isActive }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
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
        .then((data) => {
          if (data) {
            setProducts(data);
          }
        });
    }
  };

  const popuplateTable = () => {
    const rows = products.map((product) => {
      return (
        <tr key={product._id}>
          <td>{product.productName}</td>
          <EditableCell {...product} />
          <td>{formatNumber(product.price)}</td>
          <td className="text-end">{product.stock}</td>
          <td>
            <img
              className="img-thumbnail product-thumbnail"
              src={product.imageURL}
            />
          </td>
          <td>
            <Button variant="primary" className="m-2" size="sm">
              Update
            </Button>
            {product.isActive ? (
              <Button
                className="m-2"
                size="sm"
                variant="danger"
                onClick={(e) => toggleAvailability(product)}
              >
                Disable
              </Button>
            ) : (
              <Button
                className="m-2"
                size="sm"
                variant="success"
                onClick={(e) => toggleAvailability(product)}
              >
                Enable
              </Button>
            )}
          </td>
        </tr>
      );
    });
    setTableRows(rows);
  };

  useEffect(() => {
    fetchData();
    popuplateTable();
  }, [products]);

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
              onChange={(e) => getProducts(e)}
              onKeyUp={(e) => getProducts(e)}
              type="text"
              placeholder="Search..."
              aria-label="Search..."
            />
          </InputGroup>
        </Col>
        <Col>
          <div className={"clearfix"}>
            <Button size="sm" className={"float-end"}>
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          </div>
        </Col>
      </Row>
      <Table size="sm" className="mt-4" hover>
        {products.length > 0 ? (
          <>
            <thead>
              <tr>
                <td className="fw-bold text-muted text-capitalize text-start">
                  Product Name
                </td>
                <td className="fw-bold text-muted text-capitalize text-center">
                  Description
                </td>
                <td className="fw-bold text-muted text-capitalize text-center">
                  Price
                </td>
                <td className="fw-bold text-muted text-capitalize text-center">
                  Stocks
                </td>
                <td className="fw-bold text-muted text-capitalize text-center">
                  Image
                </td>
                <td
                  colSpan={2}
                  className="fw-bold text-muted text-capitalize text-center"
                >
                  Actions
                </td>
              </tr>
            </thead>
            <tbody>{tableRows}</tbody>
          </>
        ) : (
          <Loader />
        )}
      </Table>
    </Container>
  );
}

function EditableCell({ props }) {
  const [editMode, setEditMode] = useState({
    product: props,
    field: null,
    onEditMode: false,
  });

  return (
    <>
      {editMode.onEditMode ? (
        <td>
          <input type="text" value={""} />
        </td>
      ) : (
        <td>{editMode.field}</td>
      )}
    </>
  );
}
