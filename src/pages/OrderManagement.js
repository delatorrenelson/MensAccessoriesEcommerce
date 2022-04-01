import { useState, useEffect, useContext, useReducer } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Container,
  Card,
  Tab,
  Tabs,
  ListGroup,
  Badge,
  Button,
} from "react-bootstrap";
import UserContext from "../UserContext";
import { formatNumber, formatDate } from "../utils/NumberUtils";

import OrderCard from "../components/OrderCard"

export default function UserOrders() {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [isMounted, setIsMounted] = useState(true);
  
  const token = localStorage.getItem("token");

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/order/orders`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((order) => {
        if (order) {
          setOrders(order);
        }
      });
  };

  useEffect(() => {
    fetchData();
    if (isMounted) {
      
    }

    return () => {
      setIsMounted(false);
    };
  }, [orders]);

  const cancelledOrders = orders
    .filter((order) => order.status === "cancelled")
    .sort((a, b) => b.createdOn - a.createdOn);
  const completedOrders = orders
    .filter((order) => order.status === "completed")
    .sort((a, b) => b.createdOn - a.createdOn);
  const toShipOrders = orders.filter((order) => {
    return order.status === "to ship";
  });
  const toRecieveOrders = orders
    .filter((order) => order.status === "to receive")
    .sort((a, b) => b.createdOn - a.createdOn);

  return (
    <Container>
      <h3 className="text-center">Manage Order</h3>
      <Tabs
        defaultActiveKey="toShip"
        id="uncontrolled-tab-example"
        className="mb-5 justify-content-around nav nav-pills flex-column flex-sm-row"
      >
        <Tab eventKey="toShip" title="Pending Orders" className="flex-sm-fill">
          {toShipOrders.map((order) => {
            return <OrderCard order={order} key={order._id} />;
          })}
        </Tab>

        <Tab eventKey="toRecieve" title="Shipped Out" className="flex-sm-fill">
          {toRecieveOrders.map((order) => {
            return <OrderCard order={order} key={order._id} />;
          })}
        </Tab>
        <Tab eventKey="completed" title="Completed" className="flex-sm-fill">
          {completedOrders.map((order) => {
            return <OrderCard order={order} key={order._id} />;
          })}
        </Tab>
        <Tab eventKey="canelled" title="Cancelled" className="flex-sm-fill">
          {cancelledOrders.map((order) => {
            return <OrderCard order={order} key={order._id} />;
          })}
        </Tab>
      </Tabs>
    </Container>
  );
}

