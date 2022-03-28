import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  const getOrders = () => {
    fetch(`${process.env.REACT_APP_API_URL}/order/orders`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          // setOrders(data);     
          console.log(data)     
        }
      });
  };

  const ordersToShip = orders.filter((order) => order.status === "to ship");
  const ordersCompleted = orders.filter((order) => order.status === "completed");
  const ordersCancelled = orders.filter((order) => order.status === "cancelled");
  
  useEffect(() => {
    getOrders();    
  }, [orders]);

  return (
    <Container className={"my-3"}>
      <h1>Orders</h1>
    </Container>
  );
}
