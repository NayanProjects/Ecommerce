import React, { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";

import Home from "./Home/Home";
import Category from "./Category/Category";
import Product from "./Products/Product";
import Deals from "./Deals/Deals";
import Account from "./Comp/Account";
import Cart from "./Comp/Cart";
import Wishlist from "./Comp/Wishlist";
import { Mycontext } from "./Comp/Mycontext";

const App = () => {
  const {
    setMaindata,
    Cartdata,
  } = useContext(Mycontext);
const API = import.meta.env.VITE_API_URL || "http://localhost:3000";
  // Load products
  useEffect(() => {
    async function getProducts() {
      try {
        const response = await axios.get(
          `${API}/products`
        );

        console.log(
          "Products:",
          response.data
        );

        setMaindata(response.data);
      } catch (error) {
        console.error(
          "Products error:",
          error
        );
      }
    }

    getProducts();
  }, [setMaindata]);

  return (
    <div className="w-screen bg-white min-h-screen">

      <Routes>

        <Route
          path="/"
          element={
            <Home
              cartcount={Cartdata?.length}
            />
          }
        />

        <Route
          path="/Category"
          element={
            <Category
              cartcount={Cartdata?.length}
            />
          }
        />

        <Route
          path="/Product"
          element={
            <Product
              cartcount={Cartdata?.length}
            />
          }
        />

        <Route
          path="/Deals"
          element={
            <Deals
              cartcount={Cartdata?.length}
            />
          }
        />

        <Route
          path="/wishlist"
          element={
            <Wishlist
              cartcount={Cartdata?.length}
            />
          }
        />

        <Route
          path="/account"
          element={
            <Account
              cartcount={Cartdata?.length}
            />
          }
        />

        <Route
          path="/cart"
          element={
            <Cart
              cartcount={Cartdata?.length}
            />
          }
        />

      </Routes>

    </div>
  );
};

export default App;