import React from "react";
import "./navbar.css";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
function navbar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
      });
      const data = await response.json();
      if (data.message) {
        setUser("");
        localStorage.clear();
        navigate("/login");
      }
    } catch (error) {
      console.log("Client Error", error);
    }
  };

  return (
    <div className="navbar">
      <li>
        <Link className="link" to={"/"}>
          HOME
        </Link>
      </li>
      <li>
        <Link className="link" to={"/about"}>
          ABOUT
        </Link>
      </li>
      <li>
        <Link className="link" to={"/profile"}>
          PROFILE
        </Link>
      </li>
      {user && user.isAdmin && (
        <li>
          <Link className="link" to={"/admindashboard"}>
            ADMIN PANNEL
          </Link>
        </li>
      )}
      <li>
        <button
          onClick={handleLogout}
          style={{
            color: "white",
            backgroundColor: "red",
            borderRadius: "2px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </li>
    </div>
  );
}

export default navbar;
