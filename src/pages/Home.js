import { useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import UserContext from "../UserContext";

import Dasboard from "../pages/Dashboard";

export default function Home() {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setProducts(data.filter((product) => product.isActive === true));
        }
      });
  };

  const hotItems = products
    .map((product) => <ProductCard key={product._id} product={product} />)
    .filter((e, i) => i < 4);

  useEffect(() => {
    fetchData();
    console.log(user)
  }, []);

  return (
    <Container className={"my-3"}>
      {user.isAdmin ? (
        <Dasboard />
      ) : (
        <>
          <h1>Home</h1>
          <h2>Our Hot Items</h2>
          <Row>{hotItems}</Row>
        </>
      )}
    </Container>
  );
}
