import React  from "react";
import Navbar from "../../components/navbar/navbar";
import Products from "../products/Products";
import "./home.css"

function Home() {
  return (
    <div className="home">
      <Navbar />
      <Products />
    </div>
  );
}

export default Home;
