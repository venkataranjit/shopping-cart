import React from "react";
import "./App.css";

import Products from "./components/Products";
import FavourateItems from "./components/FavourateItems";
import Cart from "./components/Cart";
import Menu from "./components/Menu";
import { HashRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <HashRouter>
        <Menu />
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/favproducts" element={<FavourateItems />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
