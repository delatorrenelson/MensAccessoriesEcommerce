import { useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import UserContext from "../UserContext";

import Dasboard from "../pages/Dashboard";
import Loader from "../components/Loader";

export default function Home() {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);
const [isMounted, setIsMounted] = useState(true)
  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          let activeProduct = data.filter((product) => product.isActive === true)
          setProducts(activeProduct);
        }
      });
  };

  const hotItems = products
    .map((product) => <ProductCard key={product._id} product={product} />)
    .filter((e, i) => i < 4);

  useEffect(() => {
    if(isMounted){
      fetchData();
    }
    return () => {
      setIsMounted(false)
    };
  }, [products]);

  return (
    <Container className={"my-3"}>
      {user.isAdmin ? (
        <Dasboard />
      ) : (
        <>
          <h1>Home</h1>
          <h2>Our Hot Items</h2>
          <Row> {hotItems.length === 0 ? <Loader /> : hotItems}</Row>
        </>
      )}
    </Container>
  );
}
