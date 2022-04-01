import { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Card, ListGroup, Button } from "react-bootstrap";
import UserContext from "../UserContext";
import { formatNumber, formatDate } from "../utils/NumberUtils";

export default function OrderCard({ order }) {
  const [isMounted, setIsMounted] = useState(true);
  const { user } = useContext(UserContext);

  const history = useHistory();

  const token = localStorage.getItem("token");

  const updateOrderStatus = (orderId, orderStatus) => {
    fetch(`${process.env.REACT_APP_API_URL}/order/myorder/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: orderStatus }),
    })
      .then((res) => res.json())
      .then((order) => {
        if (order) {
          // setOrders(order);
        }
      });
  };

  useEffect(() => {
    if (isMounted) {
    }

    return () => {
      setIsMounted(false);
    };
  }, [order]);

  return (
    <Card className="my-3">
      <Card.Header className="d-flex d-flex-column justify-content-around">
        {user.isAdmin ? (
          <Card.Text className="text-start flex-fill">
            Order by: {user.firstName}
          </Card.Text>
        ) : null}
        <Card.Text className="text-end">
          Date Ordered: {formatDate(order.createdOn)}
        </Card.Text>
      </Card.Header>
      <Card.Body>
        {order.products.map((product) => {
          return (
            <ListGroup key={product._id} variant="flush">
              <ListGroup.Item className="d-flex justify-content-between">
                <Card.Text className="text-muted text-start">
                  <Link
                    to={{
                      pathname: `/products/${product._id}`,
                      state: product,
                    }}
                    style={{ color: "inherit" }}
                  >
                    {product.productName}
                  </Link>
                </Card.Text>
                <Card.Text className="text-muted text-start">
                  {product.description}
                </Card.Text>
                <Card.Text className="text-muted text-end">
                  <small>
                    {formatNumber(product.price)} x {product.quantity}{" "}
                  </small>
                  <strong>{formatNumber(product.subTotal)}</strong>
                </Card.Text>
              </ListGroup.Item>
            </ListGroup>
          );
        })}
      </Card.Body>
      <Card.Footer>
        <Card.Text className="text-end">
          <strong>{formatNumber(order.totalPrice)}</strong>
        </Card.Text>

        {order.status === "to ship" ? (
          <Card.Text className="text-end">
            <Button
              variant="link"
              className="text-muted text-decoration-none"
              onClick={() => {
                updateOrderStatus(order._id, "cancelled");
              }}
            >
              Cancel
            </Button>
            {user.isAdmin ? (
              <Button
                variant="link"
                className="text-primary text-decoration-none"
                onClick={() => {
                  updateOrderStatus(order._id, "to receive");
                }}
              >
                Ship Out
              </Button>
            ) : null}
          </Card.Text>
        ) : null}
      </Card.Footer>
    </Card>
  );
}
