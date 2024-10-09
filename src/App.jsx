import React from "react";
import "./App.css";
import Home from "./components/Home";
import Products from "./components/Products";
import Cart from "./components/Cart";
import FetchData from "./components/FetchData";
import Maps from "./components/Maps";
import Menu from "./components/Menu";
import { HashRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <HashRouter>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/fetchdata" element={<FetchData />} />
          <Route path="/maps" element={<Maps />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
