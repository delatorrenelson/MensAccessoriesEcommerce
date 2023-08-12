import { useState, useEffect, useContext, useRef } from "react";
import { Container, Row } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import UserContext from "../UserContext";

import Dasboard from "./Dashboard";
import Loader from "../components/Loader";
import Promo from "../components/Promo";

function Home() {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);

  const isMounted = useRef(true);
  const fetchData = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/products`);
    const data = await res.json();
    if (isMounted.current) {
      setProducts(data.filter((product) => product.isActive === true));
    }
  };

  const hotItems = products
    .splice(0, 4)
    .map((product) => <ProductCard key={product._id} product={product} />);

  useEffect(() => {
    if (isMounted.current) {
      fetchData();
    }

    return () => (isMounted.current = false);
  }, []);

  return (
    <Container className={"my-3"}>
      {user.isAdmin ? (
        <Dasboard />
      ) : (
        <>
          <Promo />
          <Row className="g-4">
            {hotItems.length === 0 ? <Loader /> : hotItems}
          </Row>
        </>
      )}
    </Container>
  );
}

export default Home;
