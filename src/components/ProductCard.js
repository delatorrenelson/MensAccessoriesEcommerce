import { Link } from "react-router-dom";
import { Card, Col, Button, Text } from "react-bootstrap";
import styled, { ThemeProvider } from "styled-components";
import { formatNumber } from "../utils/NumberUtils";
import UserContext from "../UserContext";
import { useState, useEffect, useContext } from "react";

import "./ProductCard.scss";

export default function ProductCard({ product }) {
  const { user } = useContext(UserContext);

  const { _id, productName, description, price, rating,color } = product;

  return (
    <Col key={_id} xs={6} md={3} className="g-4">
      <Link
        to={{ pathname: `/products/${_id}`, state: product }}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Card className="card">
          <Card.Img
            variant="top"
            src={`https://via.placeholder.com/300?text=${productName}`}
          />
          <Card.Body className="d-flex flex-column">
            <Card.Subtitle>{productName}</Card.Subtitle>
            <Card.Text className={"description"}>{description} - {color}</Card.Text>
          </Card.Body>
          <Card.Body className={""}>            
            <Card.Text className={"float-start"}>{`${formatNumber(price)}`}</Card.Text>            
            <Card.Text className={"float-end"}>{`${rating}`} sold</Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
}
