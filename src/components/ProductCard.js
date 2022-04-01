import { Link } from "react-router-dom";
import { Card, Col, Button, Text } from "react-bootstrap";
import styled, { ThemeProvider } from "styled-components";
import { formatNumber } from "../utils/NumberUtils";
import UserContext from "../UserContext";
import { useState, useEffect, useContext } from "react";

import "./ProductCard.scss";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ProductCard({ product }) {
  const { user } = useContext(UserContext);

  const { _id, productName, description, price, rating, color, imageURL } =
    product;

  return (
    <Col key={_id} xs={6} md={3} className="g-4">
      <Link
        to={{ pathname: `/products/${_id}`, state: product }}
        style={{ textDecoration: "none", color: "inherit" }}
        className="product-card"
      >
        <Card className="">
          {imageURL !== "" ? (
            <Card.Img variant="top" src={imageURL} alt={productName} />
          ) : (
            <Card.Img
              variant="top"
              src={`https://via.placeholder.com/300?text=${productName}`}
              alt={productName}
            />
          )}
          <Card.Body className="d-flex flex-column">
            <Card.Subtitle>{productName}</Card.Subtitle>
            <Card.Text className={"description"}>
              {description} - {color}
            </Card.Text>
          </Card.Body>
          <Card.Body className={""}>
            <Card.Text className={"float-start"}>{`${formatNumber(
              price
            )}`}</Card.Text>
            <Card.Text className={"float-end"}>{`${rating}`}</Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
}
