import { useState, useEffect, useCallback } from "react";
import {
  Container,
  Form,
  Button,
  Col,
  Row,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { useHistory, Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function EditProduct(props) {
  const { productId } = useParams();

  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(product.category);
  const [newCategory, setNewCategory] = useState("");
  const [productName, setProductName] = useState(product.productName);
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [color, setColor] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [isActive, setIsActive] = useState();

  const [isMounted, setIsMounted] = useState(true);

  const token = localStorage.getItem("token");

  const history = useHistory();

  const setCurrentProduct = (data) => {
    setProduct(data);
    setCategory(data.category);
    setDescription(data.description);
    setProductName(data.productName);
    setPrice(data.price);
    setColor(data.color);
    setIsActive(data.isActive);
    setImageURL(data.imageURL);
    setStock(data.stock);
  };

  const selectCategory = (e) => {
    const v = e.target.value;
    setCategory(v);
  };

  const editProduct = useCallback(
    (editedProduct) => {
      editedProduct.preventDefault();
      fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`, {
        method: "PUT",
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
            history.push("/products");
          } else {
            Swal.fire({
              title: "Failed",
              icon: "error",
              text: "Something went wrong",
            });
          }
        });
    },
    [
      category,
      color,
      description,
      history,
      imageURL,
      isActive,
      price,
      productId,
      productName,
      stock,
      token,
    ]
  );
  const createNewCategory = () => {
    Swal.fire({
      title: "Create New Category",
      input: "text",
      showCancelButton: true,
    }).then((input) => {
      if (input.value !== "" || input.value !== "undefined") {
        if (
          !categories
            .map((e) => e.category)
            .includes(input.value.toLocaleLowerCase())
        ) {
          setNewCategory(input.value);

          fetch(`${process.env.REACT_APP_API_URL}/categories`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ category: input.value }),
          })
            .then((res) => res.json())
            .then((data) => {});
        }
      }
    });
  };

  const getCategories = useCallback(() => {
    fetch(`${process.env.REACT_APP_API_URL}/categories`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setCategories(data);
        }
      });
  }, [token, setCategories]);

  useEffect(() => {
    if (isMounted) {
      fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setCurrentProduct(data);
          }
        });
        getCategories();
    }
    
    return () => {
      setIsMounted(false);
    };
  }, [categories, isMounted, getCategories, productId]);

  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <Col md={6} className="card p-4">
          <Form onSubmit={(editedProduct) => editProduct(editedProduct)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                value={productName}
                type="text"
                placeholder="Product Name"
                onChange={(ev) => setProductName(ev.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Description</Form.Label>
              <Form.Control
                value={description}
                type="text"
                placeholder="Description"
                onChange={(ev) => setDescription(ev.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Color</Form.Label>
              <Form.Control
                value={color}
                type="text"
                placeholder="Color"
                onChange={(ev) => setColor(ev.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="d-flex-row">
                {"Category /"}
                <Button
                  variant="link"
                  onClick={createNewCategory}
                  className="text-decoration-none"
                >
                  Add New Category
                </Button>
              </Form.Label>
              <Form.Select
                as="select"
                defaultValue={category}
                onChange={(ev) => selectCategory(ev)}
              >
                {categories.map((curCategory) =>
                  category === curCategory.category ? (
                    <option value={category} selected>
                      {curCategory.category}
                    </option>
                  ) : (
                    <option value={curCategory.category}>
                      {curCategory.category}{" "}
                    </option>
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
                  <Form.Label className="mx-3">Set as "Available"</Form.Label>
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
                    Set as Not "Available"
                  </Form.Label>
                </>
              )}
            </Form.Group>
            {!isMounted ? (
              <Form.Group className="d-flex d-flex-row align-self-end justify-content-end">
                <Link to={"/products"} className="btn btn-danger btn-sm mx-3">
                  Cancel
                </Link>
                <Button variant="primary" type="submit" size="sm" className="">
                  Update
                </Button>
              </Form.Group>
            ) : (
              <Form.Group className="d-flex d-flex-row align-self-end justify-content-end">
                <Link
                  to={"/products"}
                  className="btn btn-danger btn-sm mx-3 disabled"
                >
                  Cancel
                </Link>
                <Button
                  variant="primary"
                  type="submit"
                  size="sm"
                  className=" disabled"
                >
                  Submit
                </Button>
              </Form.Group>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
