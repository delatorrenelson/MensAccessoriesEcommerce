import { useHistory, Link, useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import {
  Col,
  Container,
  Row,
  Button,
  InputGroup,
  FormControl,
  Alert,
  Toast,
  Image,
} from "react-bootstrap";
import { formatNumber } from "../utils/NumberUtils";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

import "./ProductDetails.scss";

import EditProduct from "../pages/EditProduct";

import { useContext } from "react";
import UserContext from "../UserContext";

export default function ProductDetails(props) {
  const { user, setUser } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const product = props.location.state;
  const { productName, description, price, _id } = product;

  const [stock, setStock] = useState(product.stock);
  const [subTotal, setSubTotal] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [imageURL, setImageURL] = useState(product.imageURL);
  const [userCart, setUserCart] = useState(user.cart);

  const history = useHistory();

  const toast = () => {
    return (
      <Toast
        className="toast align-items-center text-white bg-success border-0"
        onClose={() => setShow(false)}
        show={show}
        delay={2500}
        autohide
      >
        <Toast.Body>Successfully add item to your cart.</Toast.Body>
      </Toast>
    );
  };

  const addToCart = useCallback(() => {
    const {
      productName,
      _id,
      color,
      description,
      price,
      rating,
      stock,
      imageURL,
    } = props.location.state;

    let currentItem = {
      _id: _id,
      color: color,
      productName: productName,
      description: description,
      rating: rating,
      price: price,
      quantity: quantity,
      subTotal: subTotal,
      stock: stock,
      imageURL: imageURL,
    };

    let cart_ = userCart;
    cart_.push(currentItem);
    cart_ = cart_
      .filter((v, i, a) => a.findLastIndex((v2) => v2._id === v._id) === i)
      .reverse();

    localStorage.setItem("cart", JSON.stringify(cart_));

    setUserCart(JSON.parse(localStorage.getItem("cart")) || 0);

    setUser({ ...user, cart: JSON.parse(localStorage.getItem("cart")) });
    setShow(true);
    setQuantity(0);
  }, [userCart, props.location.state, quantity, subTotal, setUser, user]);

  const setCartItems = useCallback(
    (qty) => {
      if (qty !== "" || qty !== null || qty !== "NaN") {
        if (qty > stock) {
          setQuantity(stock);
        } else {
          setQuantity(qty);
        }
        setSubTotal(quantity * price);
      }
    },
    [price, quantity, stock]
  );

  const zeroStock = () => {
    return (
      <Alert variant="danger">
        <p>No Stocks available for now.</p>
      </Alert>
    );
  };

  const cartItemControl = () => {
    if (user.id && !user.isAdmin) {
      return (
        <div className={"product-order-controller d-flex d-flex-row"}>
          <InputGroup size="sm" style={{ width: "8rem", marginRight: "2rem" }}>
            <FormControl
              min="0"
              max={stock}
              value={quantity}
              type="number"
              onChange={(e) => setCartItems(parseInt(e.target.value))}
            />
          </InputGroup>

          {quantity > 0 ? (
            <Button size="sm" variant="primary" onClick={() => addToCart()}>
              {formatNumber(subTotal)} <FontAwesomeIcon icon={faCartPlus} />
            </Button>
          ) : (
            <small></small>
          )}
          {toast()}
        </div>
      );
    } else {
      return (
        <Alert variant="warning">
          <p>
            Please <Link to={"/login"}>Login</Link> to place an order.
          </p>
        </Alert>
      );
    }
  };

  useEffect(() => {
    setCartItems(quantity);
  }, [quantity, setCartItems, userCart]);

  return user.isAdmin ? (
    <EditProduct />
  ) : (
    <Container className={"my-3 card p-3"}>
      <Row>
        <Col md={6}>
          {imageURL !== "" ? (
            <Image alt={`${productName}`} src={imageURL} rounded fluid />
          ) : (
            <Image
              alt={`${productName}`}
              rounded
              src={`https://via.placeholder.com/300?text=${productName}`}
              fluid
            />
          )}
        </Col>
        <Col md={6}>
          <h3>{productName}</h3>
          <p>{description}</p>
          <p>{formatNumber(price)}</p>
          <p>Stocks: {stock}</p>
          {stock !== 0 ? cartItemControl() : zeroStock()}
        </Col>
      </Row>
    </Container>
  );
}
