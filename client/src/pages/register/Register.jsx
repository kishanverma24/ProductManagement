import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./register.css";
function Register() {
  const [userid, setuserid] = useState("");
  const [password, setpassword] = useState("");
  const [useremail, setuseremail] = useState("");
  const [userphonenumber, setuserphonenumber] = useState("");
  const [username, setusername] = useState("");
  const navigate = useNavigate();
  const handlesubmit = async (e) => {
    try {
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid: userid,
          password: password,
          useremail: useremail,
          userphonenumber: userphonenumber,
          username: username,
        }),
      });
      const data = await response.json();
      if (data.error) {
        window.alert("Please provide valid credentials!");
      }
      if (data) {
        navigate("/login");
      }
      console.log(data);
    } catch (error) {
      console.log("client error", error);
    }
  };

  return (
    <div className="container">
      <div className="register-div">
        <h1>Register Page</h1>
        <hr />
        <input
          type="text"
          placeholder="UserId"
          onChange={(e) => setuserid(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setuseremail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phonenumber"
          onChange={(e) => setuserphonenumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setusername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setpassword(e.target.value)}
        />
        <button className="button" onClick={handlesubmit}>
          Register
        </button>
        <h5>
          Already have an account? <Link to="/login" style={{textDecoration:"none"}}><span style={{color:"lightgreen",display:"inline"}}>Login</span></Link>
        </h5>
      </div>
    </div>
  );
}

export default Register;
