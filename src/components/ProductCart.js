import {useRef, useState, useEffect} from 'react';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { FaSearch } from "react-icons/fa";

import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

import Pagination from "react-bootstrap/Pagination";


const getDocHeight  =  ()  =>  {
  return Math.max(
    document.body.scrollHeight,  document.documentElement.scrollHeight,
    document.body.offsetHeight,  document.documentElement.offsetHeight,
    document.body.clientHeight,  document.documentElement.clientHeight
  );
}

const ProductCard = () => {
  
  let products = [];
  for (let i = 0; i < 10; i++) {
    products.push({
      title: "Product Title",
      description: "description",
      price: 10.0,
    });
  }

  const [productsList, setProductsList] = useState(products)
  const [scrollY, setScrollY] = useState(0);

  let appendItem = 4;
  
  useEffect(() => {    
      window.addEventListener("scroll", ()=> setScrollY(window.pageYOffset));      


      let p = Math.floor((window.pageYOffset  /  getDocHeight())  *  100)
      
      
      // if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      if ((window.innerHeight + window.scrollY + 500) > document.body.offsetHeight) {
        for(let i = 0; i < appendItem; i++){
          productsList.push({
            title: "Product Title",
            description: "description",
            price: 10.0,
          })
        }        
      }  

      console.clear();
      console.log(`
      InnerHeight: ${window.innerHeight} 
      ScrollY: ${window.scrollY}
      BodyOffsetHeigth: ${document.body.offsetHeight}
      PageYOffset: ${window.pageYOffset}
      B: ${((window.innerHeight / document.body.offsetHeight) * 100).toFixed(2)}
      PageScreenY: ${(window.innerHeight / (window.innerHeight + window.scrollY)) * 100}`)

      console.log(`${p}%`)
      console.log("Scroll Height: ",document.body.scrollTop)
      console.log(`${productsList.length}`);    

      

      // return () => window.removeEventListener("scroll", null);      

  });  

  return (
    <Container className={"my-4"}>
      <InputGroup className={"mb-4"}>
        <InputGroup.Text id="btnGroupAddon2">
          <FaSearch />
        </InputGroup.Text>
        <FormControl
          type="text"
          placeholder="Search..."
          aria-label="Search..."
          aria-describedby="btnGroupAddon2"
        />
      </InputGroup>

      <Row xs={2} md={4} className="g-2 d-flex ">
        {productsList.map((el, i) => (
          <Col key={i}>
            <Button variant="transparent" className="p-0 text-left">
              <Card style={{}}>
                <Card.Img
                  style={{ width: "100%" }}
                  variant="top"
                  src="https://via.placeholder.com/300?text=Image"
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="">{el.title} {i}</Card.Title>
                  <Card.Text>{el.description}</Card.Text>
                  {/* <Button variant="primary">Go somewhere</Button> */}
                </Card.Body>
              </Card>
            </Button>
          </Col>
        ))}
      </Row>
      <Row>
        <Col className="text-center d-flex justify-content-center">
          <Pagination className="my-5">
            <Pagination.Prev />
            <Pagination.Item>{1}</Pagination.Item>
            <Pagination.Ellipsis />

            <Pagination.Item>{10}</Pagination.Item>
            <Pagination.Item>{11}</Pagination.Item>
            <Pagination.Item active>{12}</Pagination.Item>
            <Pagination.Item>{13}</Pagination.Item>
            <Pagination.Item disabled>{14}</Pagination.Item>

            <Pagination.Ellipsis />
            <Pagination.Item>{20}</Pagination.Item>
            <Pagination.Next />
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductCard;
