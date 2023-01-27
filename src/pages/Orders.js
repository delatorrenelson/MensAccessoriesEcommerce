import { useContext} from "react";
import { Container } from "react-bootstrap";
import UserContext from "../UserContext";

import OrderManagement from "./OrderManagement"
import UserOrders from "./UserOrders"

export default function Orders() {
  const { user } = useContext(UserContext);
  
  return (
    <Container className={"my-3"}>
      {user.isAdmin ? (<OrderManagement/>) : (<UserOrders/>)}      
    </Container>
  );
}
