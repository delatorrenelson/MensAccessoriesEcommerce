import { useState, useEffect } from "react";
import {
  Container,
  Alert,
  Tab,
  Tabs,
} from "react-bootstrap";

import OrderCard from "../components/OrderCard";

export default function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [isMounted, setIsMounted] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (isMounted) {
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
    }

    return () => {
      setIsMounted(false);
    };
  }, [isMounted, orders, token]);

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
    <Container className="card p-4">
      <h3 className="text-center">Orders</h3>
      <Tabs
        defaultActiveKey="toShip"
        id="uncontrolled-tab-example"
        className="justify-content-around nav nav-pills flex-column flex-sm-row border-bottom-0"
      >
        <Tab eventKey="toShip" title="To Ship" className="flex-sm-fill">
          {toShipOrders.length > 0 ? (
            toShipOrders.map((order) => {
              return <OrderCard order={order} key={order._id} />;
            })
          ) : (
            <Container>
              <Alert variant="warning">
                <Alert.Heading className="text-center">
                  No Order List
                </Alert.Heading>
              </Alert>
            </Container>
          )}
        </Tab>

        <Tab eventKey="toRecieve" title="Shipped Out" className="flex-sm-fill">
          {toRecieveOrders.length > 0 ? (
            toRecieveOrders.map((order) => {
              return <OrderCard order={order} key={order._id} />;
            })
          ) : (
            <Container className="mt-3">
              <Alert variant="warning">
                <Alert.Heading className="text-center">
                  No Order List
                </Alert.Heading>
              </Alert>
            </Container>
          )}
        </Tab>
        <Tab eventKey="completed" title="Completed" className="flex-sm-fill">
          {completedOrders.length > 0 ? (
            completedOrders.map((order) => {
              return <OrderCard order={order} key={order._id} />;
            })
          ) : (
            <Container className="mt-3">
              <Alert variant="warning">
                <Alert.Heading className="text-center">
                  No Completed Order List
                </Alert.Heading>
              </Alert>
            </Container>
          )}
        </Tab>
        <Tab eventKey="canelled" title="Cancelled" className="flex-sm-fill">
          {cancelledOrders.length > 0 ? (
            cancelledOrders.map((order) => {
              return <OrderCard order={order} key={order._id} />;
            })
          ) : (
            <Container className="mt-3">
              <Alert variant="warning">
                <Alert.Heading className="text-center">
                  No Cancelled Order List
                </Alert.Heading>
              </Alert>
            </Container>
          )}
        </Tab>
      </Tabs>
    </Container>
  );
}
