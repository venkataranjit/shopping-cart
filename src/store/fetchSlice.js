import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
const initialData = {
  products: savedProducts,
  status: "",
  error: false,
};

export const fetchProducts = createAsyncThunk("user/fetch", async () => {
  const response = await fetch(import.meta.env.VITE_PRODUCTS_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await response.json();
  return data;
});

const fetchSlice = createSlice({
  name: "getData",
  initialState: initialData,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "Success";
        state.products = action.payload;
        state.error = false;

        localStorage.setItem("products", JSON.stringify(action.payload));
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "Fail";
        state.error = action.error.message;
        state.products = [];
      });
  },
});

export const { fetchProductsData } = fetchSlice.actions;

export default fetchSlice.reducer;
