import { useState, useEffect, useContext} from "react";
import UserContext from "../UserContext";
import {
  Container,
  Alert,
  Button,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { formatNumber } from "../utils/NumberUtils";
import { Link, useHistory } from "react-router-dom";

import Swal from "sweetalert2";

export default function Cart() {
  const { user, setUser } = useContext(UserContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [userCart, setUserCart] = useState(
    JSON.parse(localStorage.getItem("cart"))
  );

  const token = localStorage.getItem("token");

  const history = useHistory();

  const setItemQuantity = (id, qty) => {
    if (qty !== 0 && qty !== "NaN") {
      userCart.map((item) => {
        if (item._id === id) {
          item.quantity = qty;
          item.subTotal = item.unitPrice * qty;
        }
      });
    }

    setTotalPrice(
      userCart.map((cartItem) => cartItem.subTotal).reduce((c, p) => c + p)
    );
    setTotalQuantity(
      userCart
        .map((cartItem) => parseInt(cartItem.quantity))
        .reduce((c, p) => c + p)
    );

    localStorage.setItem("cart", JSON.stringify(userCart));

    setUserCart(userCart);
  };

  const removeItem = (id) => {
    const filteredCart = userCart.filter((item) => item._id !== id);
    setUserCart(filteredCart);
    localStorage.setItem("cart", JSON.stringify(filteredCart));
  };

  const checkOut = () => {
    const products = userCart.map(cartItem => {return {productId: cartItem._id, quantity: cartItem.quantity}})
    console.log(products)
    fetch(`${process.env.REACT_APP_API_URL}/order/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({products: products}),
    })
    .then((res) => res.json())
    .then((data) =>{
      if(data){
        Swal.fire({
          title: "Check Out successful",
          icon: "success",
          text: "Check Out",
        });
        history.push("/cart"); // redirect to login page
        setUserCart([]);
        localStorage.setItem("cart", JSON.stringify([]));
      }else{
        Swal.fire({
          title: "Fialed to place order",
          icon: "error",
          text: "Please try again",
        });        
      }
    })
  }

  const cart = userCart.map((cartItem) => (
    <div key={cartItem._id}>
      <InputGroup className="my-5">
        {cartItem.productName} {cartItem.color}
        {" - "} {formatNumber(cartItem.unitPrice)} x
        <FormControl
          min="0"
          value={cartItem.quantity}
          type="number"
          onChange={(e) =>
            setItemQuantity(cartItem._id, parseInt(e.target.value))
          }
        />
        = {formatNumber(cartItem.subTotal)}
        <Button size="sm" onClick={() => removeItem(cartItem._id)}>
          Remove
        </Button>
      </InputGroup>
    </div>
  ));

  useEffect(() => {
    if (userCart.length !== 0) {
      setTotalPrice(
        userCart.map((cartItem) => cartItem.subTotal).reduce((c, p) => c + p)
      );
      setTotalQuantity(
        userCart
          .map((cartItem) => parseInt(cartItem.quantity))
          .reduce((c, p) => c + p)
      );
    }
  }, [userCart]);

  const loadCart = () => {
    if (user.id !== null) {
      if (cart.length > 0) {
        return (
          <Container>
            {cart}
            <div className="text-end">
              <h3>Total: {formatNumber(totalPrice)}</h3>
              <h4>Qty: {totalQuantity}</h4>
              <Button onClick={() => checkOut()}>Check Out</Button>
            </div>
          </Container>
        );
      }
      return (
        <Container>
          <Alert variant="secondary" className="text-center">
            <Alert.Heading>Cart is Empty</Alert.Heading>
            <hr />
            <p>
              Go to <Link to={"/products"}>Product</Link> page and place an item
              to your cart.
            </p>
          </Alert>
        </Container>
      );
    } else {
      return (
        <Container>
          <Alert variant="secondary" className="text-center">
            <Alert.Heading>Cart is Empty</Alert.Heading>
            <p>Please login to make an order.</p>
            <hr />
            <div className="d-flex justify-content-end">
              <Link to={"/login"} className="btn btn-warning btn-sm">
                Go to login
              </Link>
            </div>
          </Alert>
        </Container>
      );
    }
  };

  return <>{loadCart()}</>;
}
