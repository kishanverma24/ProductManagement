import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./product.css";
import Navbar from "../../components/navbar/navbar";
import UserContext from "../../context/UserContext";
function Product() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/product/product/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          }
        );
        const data = await response.json();
        if (data && data.product) {
          setProduct(data.product);
        } else {
          console.log("Product not found");
        }
      } catch (error) {
        console.error("Error while loading product", error);
      }
    };
    fetchData();
  }, [id]);
  const deleteproduct = async () => {
    const response = await fetch(`http://localhost:3001/product/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });
    const data = await response.json();
    if (data.success == true) {
      navigate("/");
    }
  };
  const updateProduct = () => {
localStorage.setItem("updatingProduct", JSON.stringify(product));
  }
     

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="div">
          <div className="singleproductImage"></div>
          <div className="productsingle">
            {product ? (
              <div className="singleproduct-details">
                <h5>PRODUCT ID: {product.productid}</h5>
                <h5>USER ID: {product.userid}</h5>
                <h5>PRODUCT NAME: {product.productname}</h5>
                <h5>PRODUCT NUMBER: {product.productnumber}</h5>
                {user.userid == product.userid || user.isAdmin == true ? (
                  <div className="changebuttons">
                    <button onClick={deleteproduct}>Delete</button>
                    <Link to={`/updateproduct/${product.productid}`}>
                      <button onClick={updateProduct}>Update</button>
                    </Link>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
