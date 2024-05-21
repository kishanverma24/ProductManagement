import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Product from "./pages/product/Product";
import User from "./pages/user/User";
import Users from "./pages/users/Users";
import Login from "./pages/login/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import About from "./pages/about/About";
import Profile from "./pages/profile/Profile";
import AddNewProduct from "./pages/addproduct/AddNewProduct";
import UpdateProduct from "./pages/updateproduct/UpdateProduct";
import Userprofile from "./pages/userprofile/Userprofile";
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../src/context/UserContext";
import UpdateUser from "./pages/updateuser/UpdateUser";
import "./App.css";
const App = () => {
  const { user } = useContext(UserContext);
  return (
    <Routes>
      <Route exact path="/" element={user ? <Home /> : <Register />} />
      <Route path="/register" element={user ? <Home /> : <Register />} />
      <Route path="/login" element={user ? <Home /> : <Login />} />

      {user ? (
        <>
          <Route path="/users" element={<Users />} />
          <Route path="/about" element={<About />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/profile/:id" element={<Userprofile />} />
          <Route path="/addproduct" element={<AddNewProduct />} />
          <Route
            path="/updateproduct/:id"
            element={<UpdateProduct />}
          />
          <Route
            path="/updateuser/:id"
            element={<UpdateUser />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
        </>
      ) : (
        <Route path="/login" element={user ? <Home /> : <Login />} />
      )}
    </Routes>
  );
};

export default App;
