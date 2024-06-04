import React from "react";
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";
import UserContext from "../../context/UserContext";
function Login() {
  const [userid, setuserid] = useState("");
  const [password, setpassword] = useState("");
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();
  const handlesubmit = async (e) => {
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // Your request body data
          userid: userid,
          password: password,
        }),
      });
      const data = await response.json();

      if (data.success == false) {
        setuserid("");
        setpassword("");
        window.alert("Please Provide Valid Email and Password");
        navigate("/login");
      }
      const token = data.token;
      if (data.success == true) {
        localStorage.setItem("token", token);
        setUser(data.user);
        navigate("/");
      }
    } catch (error) {
      console.log("client error", error);
    }
  };

  return (
    <div className="container">
      <div className="login-div">
        <h1>Login Page</h1>
        <hr className="hr" />
        <input
          value={userid}
          type="text"
          placeholder="UserId"
          onChange={(e) => setuserid(e.target.value)}
        />
        <input
          value={password}
          type="password"
          placeholder="Password"
          onChange={(e) => setpassword(e.target.value)}
        />
        <button className="button" onClick={handlesubmit}>
          Login
        </button>
        <h5>
          Don't have an account?{" "}
          <Link to="/register" style={{textDecoration:"none"}}>
            <span style={{ color: "lightgreen", display: "inline" }}>
              Register
            </span>
          </Link>
        </h5>
      </div>
    </div>
  );
}

export default Login;
