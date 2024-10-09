import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../store/fetchSlice";
const FetchData = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  const data = useSelector((state) => state.fetchData);
  console.log(data);

  return (
    <>
      {data.error ? (
        data.error
      ) : data.products.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {data.products.map((product) => (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>{product.rating.rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products available</p>
      )}
    </>
  );
};

export default FetchData;
