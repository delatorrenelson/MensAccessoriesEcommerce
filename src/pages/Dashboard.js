import { useState, useEffect, useContext } from "react";
import UserContext from "../UserContext";
import { Container } from "react-bootstrap";

export default function Dashboard(props) {
  const { user } = useContext(UserContext);
  return (
    <Container className={"mx-auto"}>
      <h1>Dashboard for admin</h1>
      <strong>We can place</strong>
      <ul>
        <li>Chart</li>
        <li>Top Selling Item</li>
        <li>Low Stock Level</li>
      </ul>
    </Container>
  );
}
