import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import products from "../../products";

const initialData = {
  cart: [],
  fav: [],
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  shippingPrice: 0,
  finalPrice: 0,
  discount: 0,
  discountMsg: "",
};

export const getProducts = createAsyncThunk("user/fetch", async () => {
  const response = await fetch(import.meta.env.VITE_PRODUCTS_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await response.json();
  return data;
});

const cartSlice = createSlice({
  name: "cart",
  initialState: initialData,
  reducers: {
    addToCart: (state, action) => {
      let find = state.cart.findIndex((item) => item.id === action.payload.id);
      if (find >= 0) {
        state.cart[find].quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    getCartTotal: (state) => {
      let { totalQuantity, totalPrice } = state.cart.reduce(
        (cartTotal, cartItem) => {
          const { price, quantity } = cartItem;
          const itemTotal = price * quantity;
          cartTotal.totalPrice += itemTotal;
          cartTotal.totalQuantity += quantity;
          return cartTotal;
        },
        { totalPrice: 0, totalQuantity: 0 }
      );
      state.totalPrice = parseFloat(totalPrice.toFixed(2));
      state.totalQuantity = totalQuantity;
      if (state.totalPrice > 25) {
        state.shippingPrice = 0;
      } else {
        if (state.cart.length > 0) {
          state.shippingPrice = 5;
        } else {
          state.shippingPrice = 0;
        }
      }
      const discountAmount = state.totalPrice * state.discount;
      state.finalPrice = (
        state.totalPrice +
        state.shippingPrice -
        discountAmount
      ).toFixed(2);
    },
    increaseItem: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      });
    },
    decreaseItem: (state, action) => {
      state.cart = state.cart.reduce((newCart, item) => {
        if (item.id === action.payload) {
          const updatedQuantity = item.quantity - 1;
          // Only add the item back to the cart if the updated quantity is greater than 0
          if (updatedQuantity > 0) {
            newCart.push({ ...item, quantity: updatedQuantity });
          }
        } else {
          // Always add the item back if it's not the one being decreased
          newCart.push(item);
        }
        return newCart;
      }, []);
    },

    removeItem: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },

    addToFav: (state, action) => {
      const favourateItem = state.items.find(
        (item) => item.id === action.payload
      );

      if (favourateItem) {
        const isAlreadyFav = state.fav.some(
          (item) => item.id === action.payload
        );

        if (isAlreadyFav) {
          state.fav = state.fav.filter((item) => item.id !== action.payload);
        } else {
          state.fav.push(favourateItem);
        }
      }
    },
    addCoupon: (state, action) => {
      switch (action.payload) {
        case "free10":
          state.discount = 0.1;
          state.discountMsg = "10% Discount Applied";
          break;
        case "free20":
          state.discount = 0.2;
          state.discountMsg = "20% Discount Applied";
          break;
        case "free30":
          state.discount = 0.3;
          state.discountMsg = "30% Discount Applied";
          break;
        default:
          state.discount = 0;
          state.discountMsg = "Invalid Coupon";
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = "Success";
        state.items = action.payload;
        state.error = false;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = "Fail";
        state.error = action.error.message;
        state.items = [];
      });
  },
});

export const {
  addToCart,
  getCartTotal,
  increaseItem,
  decreaseItem,
  removeItem,
  addToFav,
  addCoupon,
} = cartSlice.actions;
export default cartSlice.reducer;
