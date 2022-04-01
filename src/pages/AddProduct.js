import { useState, useEffect } from "react";
import { Container, Form, Button, Radio, Nav } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function AddProduct() {
  const [productId, setProductId] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [color, setColor] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  const token = localStorage.getItem("token");

  const history = useHistory();

  const selectCategory = (e) => {
    const v = e.target.value;
    setCategory(v);
  };

  const addProduct = (editedProduct) => {
    editedProduct.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productName: productName,
        category: category,
        description: description,
        price: price,
        color: color,
        stock: stock,
        imageURL: imageURL,
        isActive: isActive,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          Swal.fire({
            title: "Succesfully Udpate Product",
            icon: "success",
          });
          console.log(imageURL);
          // history.push("/products")
        } else {
          Swal.fire({
            title: "Failed",
            icon: "error",
            text: "Something went wrong",
          });
        }
      });
  };

  
  const createNewCategory = () => {    
    Swal.fire({
      title: "Create New Category",
      input: "text",
      showCancelButton: true,
    }).then((input) => {
      if (input.value !== "" || input.value !== "undefined") {
        if(!categories.map(e=>e.category).includes(input.value.toLocaleLowerCase())){
          setNewCategory(input.value);
          console.log(categories.includes(input.value));
          fetch(`${process.env.REACT_APP_API_URL}/categories`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ category: input.value }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data)
            });
        }
      }
    });
  };

  const getCategory = () => {
    fetch(`${process.env.REACT_APP_API_URL}/categories`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setCategories(data)
        }
      });
  };

  useEffect(() => {
    getCategory();
    if (isMounted) {}
    return () => {
      setIsMounted(false);
    };
  }, [categories, isMounted]);

  return (
    <Container>
      <h1 className="text-center">Add New Product</h1>
      <Form onSubmit={(editedProduct) => addProduct(editedProduct)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            value={productName}
            type="text"
            placeholder="Product Name"
            required
            onChange={(ev) => setProductName(ev.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Description</Form.Label>
          <Form.Control
            value={description}
            type="text"
            placeholder="Description"
            required
            onChange={(ev) => setDescription(ev.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Color</Form.Label>
          <Form.Control
            value={color}
            type="text"
            placeholder="Color"
            required
            onChange={(ev) => setColor(ev.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="d-flex-row">
            Category /{""}
            <Button variant="link" onClick={(ev) => createNewCategory()} className="text-decoration-none">
              Add New Category
            </Button>
          </Form.Label>
          <Form.Select
            as="select"
            required
            defaultValue={category}
            onChange={(ev) => selectCategory(ev)}
          > 
          <option></option>           
            {categories.map((curCategory) =>
              category === curCategory.category ? (
                <option value={curCategory.category} selected>
                  {curCategory.category}
                </option>
              ) : (
                <option value={curCategory.category}>{curCategory.category} </option>
              )
            )}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            value={imageURL}
            type="url"
            placeholder="image url..."
            onChange={(ev) => setImageURL(ev.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Price</Form.Label>
          <Form.Control
            value={price}
            required
            type="number"
            placeholder="Price"
            onChange={(ev) => setPrice(ev.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            value={stock}
            type="number"
            placeholder="Stock"
            onChange={(ev) => setStock(ev.target.value)}
          />
        </Form.Group>

        <Form.Group className="d-flex d-flex-row align-self-start justify-content-start">
          {isActive ? (
            <>
              <Form.Switch
                onChange={(e) => {
                  setIsActive(!isActive);
                }}
                checked
                type="switch"
              />
              <Form.Label className="mx-3">Set as Available</Form.Label>
            </>
          ) : (
            <>
              <Form.Switch
                onChange={(e) => {
                  setIsActive(!isActive);
                }}
                type="switch"
              />
              <Form.Label className="mx-3 text-danger">
                Set as Not Available
              </Form.Label>
            </>
          )}
        </Form.Group>
        <Form.Group className="d-flex d-flex-row align-self-end justify-content-end">
          <Link to={"/products"} className="btn btn-danger btn-sm mx-3">
            Cancel
          </Link>
          <Button variant="primary" type="submit" size="sm" className="">
            Submit
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
}
