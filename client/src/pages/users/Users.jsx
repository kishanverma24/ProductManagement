import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./users.css";
function Users() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/auth/allusers",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "token": token,
            },
          }
        );

        const data = await response.json();
        if (data && data.users) {
          setUsers(data.users);
        } else {
          console.log("No Users found");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []); // Empty array ensures this effect runs only once after the initial render

  // console.log("Products:", products);

  return (
    <div className="user">
      {users.length > 0 ? (
        <ul>
          {users.map((item) => (
            <div className="users" key={item.userid}>
              <Link
                to={`/user/${item.userid}`}
                style={{ color: "black", textDecoration: "none" }}
              >
                <div className="user-details">
                  <h3>{item.username}</h3>
                  <h4>{item.userid}</h4>
                </div>
              </Link>
            </div>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Users;
