import React from "react";
import { useState } from "react";
import Navbar from "../../components/navbar/navbar";
import "./addNewProduct.css";
import { useNavigate } from "react-router-dom";
function AddNewProduct() {
  const navigate = useNavigate();
  const [productid, setproductid] = useState("");
  const [productNumber, setproductNumber] = useState("");
  const [productName, setproductName] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:3001/product/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({
          productid: productid,
          productnumber: productNumber,
          productname: productName,
        }),
      });
      const data = await response.json();
      if (data) {
        navigate("/profile");
      }
    } catch (error) {
      console.log("client error", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="item">
        {" "}
        <h1>Add New Product</h1>
        <hr style={{ width: "100%", marginTop: "10px" }} />
      </div>
      <div className="form-container">
        <div className="form">
          <input
            value={productid}
            onChange={(e) => {
              setproductid(e.target.value);
            }}
            type="text"
            placeholder="Productid"
          />
          <input
            value={productNumber}
            onChange={(e) => {
              setproductNumber(e.target.value);
            }}
            type="text"
            placeholder="Product Number"
          />
          <input
            value={productName}
            onChange={(e) => {
              setproductName(e.target.value);
            }}
            type="text"
            placeholder="Product Name"
          />
          <button className="buttonclass" onClick={submit}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default AddNewProduct;
