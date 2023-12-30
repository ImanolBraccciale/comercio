"use client"
import axios from "axios";
import {setProducts}  from "../features/productSlice";
import  messages  from "@/app/utils/messagess";

export const fetchProducts = () => {
    return async function(dispatch){
        try {
            const response = await axios.get("/api/handlers/Products")
            console.log(response.data);
            return dispatch(setProducts(response.data))
        } catch (error) {
           return  "aaaaaaaa"
        }
    }
};