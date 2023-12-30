"use client"
import productReducer from "../features/productSlice";

import { configureStore } from "@reduxjs/toolkit";
 
export const makeStore = () => {
  return configureStore({
    reducer: {
      products: productReducer 
    },
  })
}

 