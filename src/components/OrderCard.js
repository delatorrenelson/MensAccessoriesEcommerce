import { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Card, Table, Button } from "react-bootstrap";
import UserContext from "../UserContext";
import { formatNumber, formatDate } from "../utils/NumberUtils";

export default function OrderCard({ order }) {
  const [isMounted, setIsMounted] = useState(true);
  const { user } = useContext(UserContext);

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
      .then(() => {});
  };

  const statusClass =
    order.status === "cancelled" ? "border-danger my-5" : "my-5";

  useEffect(() => {
    if (isMounted) {
    }

    return () => {
      setIsMounted(false);
    };
  }, [order, isMounted]);

  return (
    <Card className={statusClass}>
      <Card.Header className="d-flex d-flex-column justify-content-around">
        {user.isAdmin ? null : (
          <Card.Text className="text-start">
            Order by: {user.firstName}
          </Card.Text>
        )}
        <Card.Text className="text-end flex-fill">
          Date Ordered: {formatDate(order.createdOn)}
        </Card.Text>
      </Card.Header>
      <Card.Body>
        <Table>
          <tbody>
            {order.products.map((product) => {
              return (
                <tr key={product._id} className="text-muted">
                  <td>
                    <Link
                      to={{
                        pathname: `/products/${product._id}`,
                        state: product,
                      }}                      
                    >
                      {product.productName}
                    </Link>
                  </td>
                  <td>
                    {product.description} - {product.color.toUpperCase()}
                  </td>
                  <td className="text-end">
                    <small>
                      {formatNumber(product.price)} x {product.quantity}
                    </small>
                    <p>{formatNumber(product.subTotal)}</p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card.Body>
      <Card.Footer>
        <Card.Text className="text-end">
          Total: {formatNumber(order.totalPrice)}
        </Card.Text>

        <Card.Text className="text-end">
          Quantity: {order.totalQuantity}
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
