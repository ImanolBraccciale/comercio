"use client"
import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    productsID: {}
  },
  reducers: {
    setProducts: (state, action) => {
        state.products = action.payload;
    },
    setProductsID: (state, action) => {
      state.productsID = action.payload;
  },
  },
});

export const { setProducts,setProductsID } = productSlice.actions; // Corrige la exportación aquí

export default productSlice.reducer