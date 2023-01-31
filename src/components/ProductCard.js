import { Link } from "react-router-dom";
import { Card, Col } from "react-bootstrap";
import { formatNumber } from "../utils/NumberUtils";

import "./ProductCard.scss";

export default function ProductCard({ product }) {
  const { _id, productName, description, price, rating, color, imageURL } =
    product;

  const rate = (stars) => `⭐⭐⭐⭐⭐`.slice(5 - stars, 10 - stars);

  return (
    <Col key={_id}  md={4} lg={3} className="g-4">
      <Link
        to={{ pathname: `/products/${_id}`, state: product }}
        style={{ textDecoration: "none", color: "inherit" }}
        className="product-card"
      >
        <Card className="d-flex flex-column">
          {imageURL !== null ? (
            <Card.Img
              variant="top"
              className="fluid card-img"              
              src={imageURL}
              alt={productName}
            />
          ) : (
            <Card.Img
              variant="top"
              className="fluid card-img"              
              src={`https://via.placeholder.com/300?text=${productName}`}
              alt={productName}
            />
          )}
          <Card.Body className="d-flex flex-column flex-fill">
            <Card.Subtitle>{productName}</Card.Subtitle>
            <Card.Text className={"description card-text"}>
              {description} - {color}
            </Card.Text>
          </Card.Body>
          <Card.Body className={""}>
            <Card.Text className={"float-start"}>{`${formatNumber(
              price
            )}`}</Card.Text>
            <Card.Text className={"float-end"}>{rating} sold</Card.Text>
            {/* <Card.Text className={"float-end"}>{`${rate(Math.floor(Math.random() * (5 - 1 + 1)) + 1)}`}</Card.Text> */}
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
}
