import { useContext } from "react";
import UserContext from "../UserContext";
import {
  Container,
} from "react-bootstrap";


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
