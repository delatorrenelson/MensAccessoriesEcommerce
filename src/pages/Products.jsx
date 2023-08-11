import { useContext } from "react";
import UserContext from "../UserContext";
import {
  Container,
} from "react-bootstrap";


import AdminView from "./AdminView"
import UserView from "./UserView"

export default function Products() {
  const { user } = useContext(UserContext);
  return (
    <Container>
      {user.isAdmin ? <AdminView/>:<UserView/>}
    </Container>   
  );
}
