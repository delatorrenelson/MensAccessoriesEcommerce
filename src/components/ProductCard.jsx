import { Link } from "react-router-dom";
import { Card, Col } from "react-bootstrap";
import { formatNumber } from "../utils/NumberUtils";

import "./ProductCard.scss";

export default function ProductCard({ product }) {
  const { _id, productName, description, price, rating, color, imageURL } =
    product;

  // const rate = (stars) => `⭐⭐⭐⭐⭐`.slice(5 - stars, 10 - stars);

  return (
    <Col key={_id} className="product-card" xs={6} md={4} lg={3}>
      <Link
        to={{ pathname: `/products/${_id}`, state: product }}
        style={{ textDecoration: "none", color: "inherit" }}
        className=""
      >
        <Card className="">
          {imageURL !== null ? (
            <Card.Img
              variant="top"
              className="card-img border border-bottom-1 border-black-subtle"
              src={imageURL}
              alt={productName}
            />
          ) : (
            <Card.Img
              variant="top"
              className="bg-danger card-img border border-bottom-1 border-black-subtle"
              src={`https://via.placeholder.com/300?text=${productName}`}
              alt={productName}
            />
          )}
          <Card.Body className="d-flex flex-column flex-fill">
            <Card.Title className="h6">{productName}</Card.Title>
            <Card.Text className={"description fs-6"}>
              {description} - {color}
            </Card.Text>
            <Card.Text className="d-flex">
              <span className="fw-bold flex-grow-1">{`${formatNumber(
                price
              )}`}</span>
              <span className="text-end">{rating} sold</span>
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
}
