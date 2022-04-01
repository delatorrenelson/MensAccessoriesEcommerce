import { useState, useEffect, useContext } from "react";
import UserContext from "../UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FaSearch } from "react-icons/fa";
import {
  Button,
  Col,
  Container,
  FormControl,
  InputGroup,
  Row,
  Modal,
  Form,
} from "react-bootstrap";

import ProductCard from "../components/ProductCard";

import AdminView from "../pages/AdminView"
import UserView from "../pages/UserView"

export default function Products() {
  const { user } = useContext(UserContext);
  return (
    <Container>
      {user.isAdmin ? <AdminView/>:<UserView/>}
    </Container>   
  );
}
