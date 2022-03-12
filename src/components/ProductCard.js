import { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";

export default function ProductCard({product}) {
    const {id, productName, description, price, isActive} = product
  return (
    <Card>
      <Card.Img
        style={{ width: "100%" }}
        variant="top"
        src="https://via.placeholder.com/300?text=Image"
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="">{productName}</Card.Title>
        <Card.Text>Description</Card.Text>
        <Button variant="primary" size="lg">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}
