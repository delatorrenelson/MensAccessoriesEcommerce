import { useState, useEffect, useContext } from "react";
import {
  Container,
  Tab,
  Alert,
  Tabs,
} from "react-bootstrap";
import UserContext from "../UserContext";
import OrderCard from "../components/OrderCard";

export default function UserOrders() {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [isMounted, setIsMounted] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (isMounted) {
      fetch(`${process.env.REACT_APP_API_URL}/order/myorder`, {
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
  }, [orders, isMounted, token]);


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
      <h3 className="text-center">Order History</h3>
      <Tabs
        defaultActiveKey="toShip"
        id="uncontrolled-tab-example"
        className="mb-5 justify-content-aroun nav nav-pills no-wrap border-bottom-0"
      >
        <Tab eventKey="toShip" title="To Ship" className="flex-sm-fill">
          {toShipOrders.length > 0 ? (
            toShipOrders.map((order) => {
              return <OrderCard order={order} key={order._id} />;
            })
          ) : (
            <Alert variant="warning">
              <Alert.Heading className="text-center">
                No Order List
              </Alert.Heading>
            </Alert>
          )}
        </Tab>

        <Tab eventKey="toRecieve" title="To Receive" className="flex-sm-fill">
          {toRecieveOrders.length > 0 ? (
            toRecieveOrders.map((order) => {
              return <OrderCard order={order} key={order._id} />;
            })
          ) : (
            <Alert variant="warning">
              <Alert.Heading className="text-center">
                No Order List
              </Alert.Heading>
            </Alert>
          )}
        </Tab>
        <Tab eventKey="completed" title="Completed" className="flex-sm-fill">
          {completedOrders.length > 0 ? (
            completedOrders.map((order) => {
              return <OrderCard order={order} key={order._id} />;
            })
          ) : (
            <Alert variant="warning">
              <Alert.Heading className="text-center">
                No Order List
              </Alert.Heading>
            </Alert>
          )}
        </Tab>
        <Tab eventKey="canelled" title="Cancelled" className="flex-sm-fill">
          {cancelledOrders.length > 0 ? (
            cancelledOrders.map((order) => {
              return <OrderCard order={order} key={order._id} />;
            })
          ) : (
            <Alert variant="warning">
              <Alert.Heading className="text-center">
                No Order List
              </Alert.Heading>
            </Alert>
          )}
        </Tab>
      </Tabs>
    </Container>
  );
}
