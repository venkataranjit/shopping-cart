import { useSelector, useDispatch } from "react-redux";
<<<<<<< Updated upstream
import { addToCart, addToFav, getProducts } from "../store/cartSlice";
import Fav from "./Fav";
import { useEffect } from "react";
=======
import { addToCart, addToFav, getItems } from "../store/cartSlice";

import Fav from "./Fav";
import { useEffect } from "react";
import { fetchProducts } from "../store/fetchSlice";
>>>>>>> Stashed changes

const Products = () => {
  const dispatch = useDispatch();
  // const cartState = useSelector((state) => state.cartDetails);
  const fetchState = useSelector((state) => state.fetchData);

<<<<<<< Updated upstream
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  if (state.status === "Loading") {
    return <div>Loading...</div>;
  }

  if (state.status === "Fail") {
    return <div>Error</div>;
  }
=======
  console.log(fetchState);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getItems(fetchState.products))
  }, [dispatch, fetchState.products]);

  if (fetchState.status === "Loading") {
    return <div>Loading...</div>;
  }

  if (fetchState.status === "Fail") {
    return <div>Error</div>;
  }


  
>>>>>>> Stashed changes
  return (
    <>
      <div className="container products">
        <h3 style={{ marginTop: "15px" }}>Products</h3>
        <div className="row">
<<<<<<< Updated upstream
          {state.items.map((product) => (
=======
          {fetchState.products.map((product) => (
>>>>>>> Stashed changes
            <div className="col-sm-3" key={product.id}>
              <div className="card">
                <Fav id={product.id} addToFav={addToFav} dispatch={dispatch} />
                <div
                  className="bg-image hover-overlay"
                  data-mdb-ripple-init
                  data-mdb-ripple-color="light"
                >
                  <img
                    src={product.image}
                    className="img-fluid"
                    alt={product.title}
                  />
                </div>
                <div className="card-body">
                  <h6 className="card-title">
                    {product.title.length > 20
                      ? product.title.substring(0, 24) + "..."
                      : product.title}
                  </h6>
                  <div
                    className="Stars"
                    style={{ "--rating": product.rating.rate }}
                  >
                    from {product.rating.count} users
                  </div>
                  <br />
                  <button className="btn btn-primary" data-mdb-ripple-init>
                    {product.price} $
                  </button>
                  <button
                    className="btn btn-primary float-end"
                    onClick={() => {
                      dispatch(addToCart(product));
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
