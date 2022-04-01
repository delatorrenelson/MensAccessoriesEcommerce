import { useState, useEffect, useContext} from "react";
import { Container } from "react-bootstrap";
import Loader from "../components/Loader"
import UserContext from "../UserContext";

import OrderManagement from "./OrderManagement"
import UserOrders from "./UserOrders"

export default function Orders() {
  const { user, setUser } = useContext(UserContext);
  
  const [orders, setOrders] = useState([]);
  const [onLoadData, setLoadData] = useState(true);

  const [isMounted, setIsMounted] = useState(true)
  
  const token = localStorage.getItem("token");

  // const getOrders = () => {
  //   fetch(`${process.env.REACT_APP_API_URL}/order/orders`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data) {
  //         setOrders(data);  
              
  //       }
  //     });
  // };


  

  // useEffect(() => {  
  //   getOrders(); 

  //   if(isMounted){}            
    
  //   return () => {setIsMounted(false)}
  // }, []);

  return (
    <Container className={"my-3"}>
      {user.isAdmin ? (<OrderManagement/>) : (<UserOrders/>)}      
    </Container>
  );
}
