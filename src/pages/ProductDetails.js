import { useState, useEffect } from "react";
import {
  Col,
  Container,
  Row,
  Button,
  InputGroup,
  FormControl,
  Alert,
  Toast,
} from "react-bootstrap";
import { formatNumber } from "../utils/NumberUtils";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

import "./ProductDetails.scss";

import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../UserContext";

export default function ProductDetails(props) {
  const { user } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const { productName, description, price } = props.location.state;
  const [stock, setStock] = useState(props.location.state.stock);
  const [subTotal, setSubTotal] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [userCart, setUserCart] = useState(
    JSON.parse(localStorage.getItem("cart"))
  );

  const toast = () => {
    return (
      <Toast onClose={() => setShow(false)} show={show} delay={2500} autohide>
        <Toast.Body>Successfully add item to your cart.</Toast.Body>
      </Toast>
    );
  };

  const addToCart = () => {
    const { productName, _id, color, description, price, rating, stock } =
      props.location.state;

    let currentItem = {
      _id: _id,
      color: color,
      productName: productName,
      description: description,
      rating: rating,
      unitPrice: price,
      quantity: quantity,
      subTotal: subTotal,
      stock: stock,
    };

    let cart = userCart;
    cart.push(currentItem);
    cart = cart.filter(
      (v, i, a) => a.findLastIndex((v2) => v2._id === v._id) === i
    );
    setUserCart(cart.reverse());

    localStorage.setItem("cart", JSON.stringify(cart));

    setShow(true);
    setQuantity(0);
  };

  const setCartItems = (qty) => {
    if (qty !== "" || qty !== null || qty !== "NaN") {
      if (qty > stock) {
        setQuantity(stock);
      } else {
        setQuantity(qty);
      }
      setSubTotal(quantity * price);
    }
  };

  const addToCartButton =
    !user.isAdmin && user.id && quantity > 0 ? (
      <Button size="sm" variant="primary" onClick={() => addToCart()}>
        {formatNumber(subTotal)} <FontAwesomeIcon icon={faCartPlus} />
      </Button>
    ) : (
      <small>0 item</small>
    );

  const cartItemControl = () => {
    if (user.isAdmin) {
      return <></>;
    }

    if (user.id && !user.isAdmin) {
      return (
        <div className={"d-flex d-flex-row"}>
          <InputGroup size="sm" style={{ width: "8rem", marginRight: "2rem" }}>
            <FormControl
              min="0"
              max={stock}
              value={quantity}
              type="number"
              onChange={(e) => setCartItems(parseInt(e.target.value))}
            />
          </InputGroup>

          {addToCartButton}
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
  }, [quantity]);

  return (
    <Container className={"my-3"}>
      <Row>
        <Col>
          <img
            alt={`${productName}`}
            src={`https://via.placeholder.com/300?text=${productName}`}
          />
          <h3>{productName}</h3>
          <p>{description}</p>
          <p>{formatNumber(price)}</p>
          <p>Stocks: {stock}</p>
          {cartItemControl()}
        </Col>
      </Row>
    </Container>
  );
}
