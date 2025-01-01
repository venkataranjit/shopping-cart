import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  getCartTotal,
  increaseItem,
  decreaseItem,
  removeItem,
  addCoupon,
} from "../store/cartSlice";

const Cart = () => {
  const cartDetails = useSelector((state) => state.cartDetails);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getCartTotal());
  }, [cartDetails]);
  const [coupon, setCoupon] = useState("");

  const handlePayment = () => {
    const options = {
      key: "rzp_test_S5NjjMuME6NnP2", // Replace with your Razorpay key ID
      amount: "100", // Amount in smallest currency unit (e.g., paisa)
      currency: "INR",
      name: "Your Company Name",
      description: "Payment for some product",
      image: "https://yourlogo.com/logo.png", // Optional
      handler: function (response) {
        alert(
          "Payment Successful! Payment ID: " + response.razorpay_payment_id
        );
      },
      prefill: {
        name: "John Doe", // Optional
        email: "johndoe@example.com", // Optional
        contact: "9876543210", // Optional
      },
      notes: {
        address: "Some Address", // Optional
      },
      theme: {
        color: "#F37254", // Optional
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open(); // Open the Razorpay checkout modal
  };

  return (
    <>
      <div className="cart">
        <section className="h-100 h-custom">
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12">
                <div
                  className="card card-registration card-registration-2"
                  style={{ borderRadius: "15px" }}
                >
                  <div className="card-body p-0">
                    <div className="row g-0">
                      <div className="col-lg-8">
                        <div className="p-5">
                          <div className="d-flex justify-content-between align-items-center mb-5">
                            <h1 className="fw-bold mb-0">Shopping Cart</h1>
                            <h6 className="mb-0 text-muted">
                              {cartDetails.cart.length}{" "}
                              {cartDetails.cart.length === 1 ? "item" : "items"}
                            </h6>
                          </div>
                          <hr className="my-4" />
                          {cartDetails.cart.length > 0 ? (
                            <>
                              {cartDetails.cart.map((item) => (
                                <div
                                  className="row mb-4 d-flex justify-content-between align-items-center"
                                  key={item.id}
                                >
                                  <div className="col-md-2 col-lg-2 col-xl-2">
                                    <img
                                      src={item.image}
                                      className="img-fluid rounded-3"
                                      alt={item.title}
                                    />
                                  </div>
                                  <div className="col-md-3 col-lg-3 col-xl-3">
                                    <h6 className="text-muted">{item.title}</h6>
                                  </div>
                                  <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                                    <button
                                      data-mdb-button-init
                                      data-mdb-ripple-init
                                      className="btn btn-link px-2"
                                      onClick={() =>
                                        dispatch(decreaseItem(item.id))
                                      }
                                    >
                                      <i className="fas fa-minus"></i>
                                    </button>

                                    <input
                                      id="form1"
                                      name="quantity"
                                      value={item.quantity}
                                      readOnly
                                      className="form-control form-control-sm"
                                    />

                                    <button
                                      data-mdb-button-init
                                      data-mdb-ripple-init
                                      className="btn btn-link px-2"
                                      onClick={() =>
                                        dispatch(increaseItem(item.id))
                                      }
                                    >
                                      <i className="fas fa-plus"></i>
                                    </button>
                                  </div>
                                  <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                    <h6 className="mb-0">$ {item.price} </h6>
                                  </div>
                                  <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                    <Link
                                      className="text-muted"
                                      onClick={() => dispatch(removeItem(item))}
                                    >
                                      <i className="fas fa-times"></i>
                                    </Link>
                                  </div>
                                </div>
                              ))}
                            </>
                          ) : (
                            <h4>Cart is Empty</h4>
                          )}

                          <hr className="my-4" />

                          <div className="pt-5">
                            <h6 className="mb-0">
                              <Link to="/products" className="text-body">
                                <i className="fas fa-long-arrow-alt-left me-2"></i>
                                Back to shop
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 bg-body-tertiary">
                        <div className="p-5">
                          <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                          <hr className="my-4" />

                          <div className="d-flex justify-content-between mb-4">
                            <h5>
                              {" "}
                              {cartDetails.totalQuantity}{" "}
                              {cartDetails.totalQuantity === 1
                                ? "Product"
                                : "Products"}
                            </h5>
                            <h5>$ {cartDetails.totalPrice}</h5>
                          </div>
                          <div className="d-flex justify-content-between mb-4">
                            <h6>Shipping </h6>
                            <h6>$ {cartDetails.shippingPrice}</h6>
                          </div>

                          <h5 className=" mb-3">Do You Have Any Coupon</h5>

                          <div className="mb-5">
                            <div data-mdb-input-init className="form-outline">
                              <input
                                type="text"
                                id="coupon"
                                className="form-control form-control-lg"
                                name="coupon"
                                value={coupon}
                                onChange={(e) => setCoupon(e.target.value)}
                              />
                              <label
                                className="form-label"
                                htmlFor="form3Examplea2"
                              >
                                Enter your code
                              </label>

                              <button
                                type="button"
                                data-mdb-button-init
                                data-mdb-ripple-init
                                className="btn btn-dark btn-block btn-sm"
                                data-mdb-ripple-color="dark"
                                onClick={() => dispatch(addCoupon(coupon))}
                              >
                                Apply Coupon
                              </button>
                              {cartDetails.discountMsg && (
                                <span style={{ color: "red" }}>
                                  {cartDetails.discountMsg}
                                </span>
                              )}
                            </div>
                          </div>

                          <hr className="my-4" />

                          <div className="d-flex justify-content-between mb-5">
                            <h5 className="text-uppercase">Final price</h5>
                            <h5>$ {cartDetails.finalPrice}</h5>
                          </div>

                          <button
                            type="button"
                            data-mdb-button-init
                            data-mdb-ripple-init
                            className="btn btn-dark btn-block btn-lg"
                            data-mdb-ripple-color="dark"
                            onClick={handlePayment}
                          >
                            Order Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Cart;
