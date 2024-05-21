import React from "react";
import Navbar from "../../components/navbar/navbar";
import { useState, useContext } from "react";
import UserContext from "../../context/UserContext";
import "./profile.css";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate()
  function handleAddProduct(){
    navigate("/addproduct")
  }
  // console.log(user);
  return (
    <div>
      <Navbar />
      <div className="profilediv">
        <div className="h1">
          <h1>Profile</h1>
        </div>
        <button onClick={handleAddProduct} className="addbutton">Add</button>
        <hr style={{ width: "100%", marginTop: "10px" }} />

        <div className="profile">
          <h3>USER ID : {user.userid}</h3>
          <h3>USERNAME : {user.username}</h3>
          <h5>USEREMAIL : {user.useremail}</h5>
          <h5>Created At : {user.createdAt};</h5>
        </div>
        <hr style={{ width: "100%", marginTop: "10px" }} />
      </div>
    </div>
  );
}

export default Profile;
