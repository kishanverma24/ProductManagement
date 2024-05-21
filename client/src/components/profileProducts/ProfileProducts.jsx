import React, { useState, useEffect,useContext } from "react";
import { Link } from "react-router-dom";
import "./profileProducts.css"
import UserContext from "../../context/UserContext";

function Products() {
  const [profileProducts, setProfileProducts] = useState([]);
  const token = localStorage.getItem("token");
  const { user } = useContext(UserContext);
 const profileid = user.userid;
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/product/allproduct/${profileid}`,
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
        if (data && data.currentUserProducts) {
          setProfileProducts(data.currentUserProducts);
        } else {
          console.log("No products found");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [profileid]); // Empty array ensures this effect runs only once after the initial render

  // console.log("Products:", products);

  return (
    <div className="">
      {profileProducts.length > 0 ? (
        <ul className="mainprofileproducts">
          {profileProducts.map((item) => (
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
        <p>No Products Found!</p>
      )}
    </div>
  );
}

export default Products;
