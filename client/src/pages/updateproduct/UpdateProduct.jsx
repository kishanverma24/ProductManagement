import React from "react";
import { useState } from "react";
import Navbar from "../../components/navbar/navbar";
import "./updateproduct.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
function UpdateProduct() {
  const navigate = useNavigate();
  const [updatingProduct, setupdatingPeoduct] = useState("");
  const [productNumber, setproductNumber] = useState("");
  const [productName, setproductName] = useState("");
  const { id } = useParams();
  // -----------------------------------------------------------------------------------------------
  useEffect(() => {
    const existedProduct = JSON.parse(localStorage.getItem("updatingProduct"));
    setupdatingPeoduct(existedProduct);
  }, [id]);
  //  console.log(updatingProduct);

  //  ---------------------------------------------------------------------------------------------
  const submit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:3001/product/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({
          productid: updatingProduct.productid,
          productnumber: productNumber,
          productname: productName,
        }),
      });
      const data = await response.json();
      if (data) {
        localStorage.removeItem("updatingProduct")
        // console.log(data);
        navigate("/");
      }
    } catch (error) {
      console.log("client error", error);
    }
  };
  // --------------------------------------------------------------------------------------------------

  return (
    <>
      <Navbar />
      <div className="item">
        {" "}
        <h1>Updating Product</h1>
        <hr style={{ width: "100%", marginTop: "10px" }} />
      </div>
      <div className="form-container">
        <div className="form">
          <h3>Product id: {updatingProduct.productid}</h3>
          <hr />
          <h4>Product Name: {updatingProduct.productname}</h4>
          <input
           className="updateinput" value={productName}
            onChange={(e) => {
              setproductName(e.target.value);
            }}
            type="text"
            placeholder= "Updated Product Name"
          />
          <h4>Product Number: {updatingProduct.productnumber}</h4>

          <input
          className="updateinput"
            value={productNumber}
            onChange={(e) => {
              setproductNumber(e.target.value);
            }}
            type="text"
            placeholder="Updated Product Number"
          />

          <button className="buttonclass" onClick={submit}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default UpdateProduct;
