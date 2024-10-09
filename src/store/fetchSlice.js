import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialData = {
  products: [],
  status: "",
  error: false,
};

export const fetchProducts = createAsyncThunk("user/fetch", async () => {
  const response = await fetch("https://fakestoreapi.com/products");
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
