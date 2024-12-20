import { useSelector } from "react-redux";

const FavourateItems = () => {
  const favItems = useSelector((state) => state.cartDetails);
  console.log(favItems);
  return (
    <>
      <div className="container products">
        <h3 style={{ marginTop: "15px" }}>Favourate Items</h3>
        <div className="row">
          {favItems.fav.length > 0 &&
            favItems.fav.map((product) => (
              <div className="col-sm-3" key={product.id}>
                <div className="card">
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
                    {/* <button
                    className="btn btn-primary float-end"
                    onClick={() => {
                      dispatch(addToCart(product));
                    }}
                  >
                    Add
                  </button> */}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default FavourateItems;
