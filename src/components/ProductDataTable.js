import { useState, useEffect, useMemo } from "react";

import { Button, Container } from "react-bootstrap";

import DataTable from "react-data-table-component";

import Loader from "../components/Loader"

export default function ProductDataTable() {
  const [products, setProducts] = useState([]);
  const [header, setHeader] = useState([]);
  const [keyword, setKeyWord] = useState("");
  const [pending, setPending] = useState(true);

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setProducts(data.filter((product) => product.isActive === true));
          setHeader(Object.keys(products[0]));
        }
      });
  };

  const handleButtonClick = () => {
    console.log("clicked");
  };

  // const columns = ["productName", "description", "price", "stock"];
  const columns = useMemo(
    () => [
      {
        name: "Product",
        selector: (row) => row.productName,
      },
      {
        name: "Description",
        selector: (row) => row.description,
      },
      {
        name: "Unit Price",
        selector: (row) => row.price,
      },
      {
        name: "Stocks",
        selector: (row) => row.stock,
      },
      {
        cell: () => (
          <Button size="sm" onClick={handleButtonClick}>
            Update
          </Button>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      },
      {
        cell: () => (
          <Button size="sm" variant="danger" onClick={handleButtonClick}>
            Disable
          </Button>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      },
    ],
    []
  );

  const data = products;

  useEffect(() => {
    fetchData();
    
    const timeout = setTimeout(() => {        
     setPending(false);   
    }, 2000);
    return () => clearTimeout(timeout);    
  }, [products,header]);
  return (
    <DataTable
      columns={columns}
      data={data}
      progressPending={pending}
      progressComponent={<Loader />}    
    />
  );
}
