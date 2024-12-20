import { useSelector, useDispatch } from "react-redux";
import { addToCart, addToFav } from "../store/cartSlice";
import Fav from "./Fav";

const Products = () => {
  const items = useSelector((state) => state.cartDetails.items);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.cartDetails);
  console.log(state);

  return (
    <>
      <div className="container products">
        <h3 style={{ marginTop: "15px" }}>Products</h3>
        <div className="row">
          {items.map((product) => (
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
