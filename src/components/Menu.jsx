import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCartTotal } from "../store/cartSlice";

const Menu = () => {
  const cartCount = useSelector((state) => state.cartDetails);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getCartTotal());
  }, [cartCount]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
        <div className="container-fluid">
          <button
            data-mdb-collapse-init
            className="navbar-toggler"
            type="button"
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <NavLink className="navbar-brand mt-2 mt-lg-0" to="/">
              <b>Shopping Cart Demo App</b>
            </NavLink>

            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/products">
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/fetchdata">
                  Toolkit Fetch Data
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/maps">
                  Maps
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="d-flex align-items-center">
            <NavLink className="text-reset me-3" to="/cart">
              <i className="fas fa-shopping-cart"></i>
              <span className="badge rounded-pill badge-notification bg-danger">
                {cartCount.totalQuantity}
              </span>
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Menu;
