"use client"
import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
  },
  reducers: {
    setProducts: (state, action) => {
        state.products = action.payload;
    },
  },
});

export const { setProducts } = productSlice.actions; // Corrige la exportación aquí

export default productSlice.reducer