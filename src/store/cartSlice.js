import { createSlice } from "@reduxjs/toolkit";
import products from "../../products";

const initialData = {
  cart: [],
  items: products,
  totalQuantity: 0,
  totalPrice: 0,
  shippingPrice: 0,
  finalPrice: 0,
};

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
      state.finalPrice = state.totalPrice + state.shippingPrice;
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
  },
});

export const {
  addToCart,
  getCartTotal,
  increaseItem,
  decreaseItem,
  removeItem,
} = cartSlice.actions;
export default cartSlice.reducer;
