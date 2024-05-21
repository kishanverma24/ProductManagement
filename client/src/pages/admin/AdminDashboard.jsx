import React from "react";
import Navbar from "../../components/navbar/navbar";
import Users from "../users/Users";
import "./admin.css";
function AdminDashboard() {
  return (
    <div>
      <Navbar />
      <div className="admindiv">
        <h1 className="adminh1">Admin Dashboard</h1>
        <hr style={{ width: "100%", marginTop: "10px" }} />
      </div>
        <Users />
    </div>
  );
}

export default AdminDashboard;
