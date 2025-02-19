import { combineReducers } from "@reduxjs/toolkit";

import userReducer from "./slices/authSlice";
import orderReducer from "./slices/seller/orderSlice";

import variationReducer from "./slices/seller/variationSlice";
// import dataReducer from "./data/data.reducer";
// import useSpecModalReducer from "../hooks/useSpecModal";
// import useLoginReducer from "../hooks/useLoginModal";
// import useRegisterReducer from "../hooks/useRegisterModal";
// import cartReducer from "../store/cart/cartSlice";
export const rootReducer = combineReducers({
  //   filter: filterReducer,
  user: userReducer,
  order: orderReducer,
  variation: variationReducer,
  //   useSpecModal: useSpecModalReducer,
  //   useLoginModal: useLoginReducer,
  //   useRegisterModal: useRegisterReducer,
  cart: {},
});
