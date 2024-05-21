import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams,Link } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import UserContext from "../../context/UserContext";
import "./user.css";
function User() {
  const [usersearch, setUsersearch] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/auth/users/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        });
        const data = await response.json();
        if (data && data.user) {
          setUsersearch(data.user);
        } else {
          console.log("Product not found");
        }
      } catch (error) {
        console.error("Error while loading product", error);
      }
    };
    fetchData();
  }, [id, token, usersearch]);

  const deleteuser = async () => {
    const response = await fetch(`http://localhost:3001/auth/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });
    const data = await response.json();
    if (data.success === true) {
      navigate("/admindashboard");
    }
  };

  const makeAdmin = async () => {
    const response = await fetch(
      `http://localhost:3001/auth/users/admin/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    );
    const data = await response.json();
    if (data.success === true) {
      setUsersearch(data.user);
    }
  };
  const updateUser = () => {
    localStorage.setItem("updatingUser", JSON.stringify(usersearch));
      }
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="div">
          <div className="singleUserImage"></div>
          <div className="usersingle">
            {usersearch ? (
              <div className="singleuser-details">
                <h5>USER ID: {usersearch.userid}</h5>
                <h5>User NAME: {usersearch.username}</h5>
                <h5>User Phone Number: {usersearch.userphonenumber}</h5>
                <h5>User Email id: {usersearch.useremail}</h5>
                {(user.isAdmin === true && usersearch.isAdmin !== true) ||
                (user.isAdmin === true &&
                  user.isMainAdmin == true &&
                  usersearch.isMainAdmin !== true) ? (
                  <div className="changebuttons">
                    <button onClick={deleteuser}>Delete</button>
                  <Link to= {`/updateuser/${usersearch.userid}`}>
                  <button onClick={updateUser}>Update</button>
                  </Link> 
                  </div>
                ) : (
                  ""
                )}
                {user.isAdmin == true && usersearch.isAdmin == true && user.isMainAdmin !== true  ? (
                  <div>
                    <h5>Admin: {usersearch.isAdmin ? "true" : "false"}</h5>
                  </div>
                ) : (
                  ""
                )}
                {user.isAdmin == true &&
                user.isMainAdmin == true &&
                usersearch.isMainAdmin !== true ? (
                  <div>
                    <h5>isAdmin: {usersearch.isAdmin ? "true" : "false"}</h5>
                    <button onClick={makeAdmin}>UpdateAdmin</button>
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

export default User;
