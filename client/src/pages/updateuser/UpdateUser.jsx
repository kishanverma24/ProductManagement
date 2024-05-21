import React from "react";
import { useState } from "react";
import Navbar from "../../components/navbar/navbar";
import "./updateuser.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
function UpdateUser() {
  const navigate = useNavigate();
  const [updatingUser, setupdatingUser] = useState("");
  const [username, setusername] = useState("");
  const [useremail, setuseremail] = useState("");
  const [userphonenumber, setuserphonenumber] = useState("");
  const [password, setpassword] = useState("");
  const { id } = useParams();
  // -----------------------------------------------------------------------------------------------
  useEffect(() => {
    const existedUser = JSON.parse(localStorage.getItem("updatingUser"));
    setupdatingUser(existedUser);
  }, [id]);
  //  ---------------------------------------------------------------------------------------------
  const submit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:3001/auth/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({
          username,
          useremail,
          userphonenumber,
          password,
        }),
      });
      const data = await response.json();
      if (data) {
        localStorage.removeItem("updatingProduct");
        console.log(data);
        navigate("/");
      }
    } catch (error) {
      console.log("Client error", error);
    }
  };
  // --------------------------------------------------------------------------------------------------
  
  return (
    <>
      <Navbar />
      <div className="item">
        {" "}
        <h1>Updating User</h1>
        <hr style={{ width: "100%", marginTop: "10px" }} />
      </div>
      <div className="form-container">
        <div className="form">
          <h3>User id: {updatingUser.userid}</h3>
          <hr />
          <h4>User Name: {updatingUser.username}</h4>
          <input
            className="updateinput"
            value={username}
            onChange={(e) => {
              setusername(e.target.value);
            }}
            type="text"
            placeholder="Updated User Name"
          />
          <h4>User Phone Number: {updatingUser.userphonenumber}</h4>

          <input
            className="updateinput"
            value={userphonenumber}
            onChange={(e) => {
              setuserphonenumber(e.target.value);
            }}
            type="text"
            placeholder="Updated User Phone Number"
          />
          <h4>User Password: </h4>

          <input
            className="updateinput"
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            type="text"
            placeholder="Updated User Password"
          />

          <button className="buttonclass" onClick={submit}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default UpdateUser;
