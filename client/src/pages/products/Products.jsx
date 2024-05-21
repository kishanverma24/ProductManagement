import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./products.css";
function Products() {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/product/allproduct",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "token": token,
            },
          }
        );

        const data = await response.json();
        console.log(data);
        if (data && data.products) {
          setProducts(data.products);
        } else {
          console.log("No products found");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []); // Empty array ensures this effect runs only once after the initial render

  // console.log("Products:", products);

  return (
    <div className="">
      {products.length > 0 ? (
        <ul>
          {products.map((item) => (
            <div className="product" key={item.productid}>
              <Link
                to={`/product/${item.productid}`}
                style={{ color: "black", textDecoration: "none" }}
              >
                <div className="product-details">
                  <h3>{item.productname}</h3>
                  <h4>{item.productid}</h4>
                </div>
              </Link>
            </div>
          ))}
        </ul>
      ) : (
        <p>No Products Not Found!</p>
      )}
    </div>
  );
}

export default Products;
