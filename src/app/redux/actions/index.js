"use client"
import axios from "axios";
import {setProducts, setProductsID}  from "../features/productSlice";
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
export const postProducts = (product) => {
    return async function(dispatch){
        try {
            console.log(product);
            const response = await axios.post("/api/handlers/Products",product)
            return dispatch(setProducts(response.data))
        } catch (error) {
           return  "aaaaaaaa"
        }
    }
};

export const fetchProductsID = (id) => {
    return async function(dispatch){
        try {
            const response = await axios.get(`/api/handlers/Products?id=${id}`)
            console.log(response.data);
            return dispatch(setProductsID(response.data))
        } catch (error) {
           return  "aaaaaaaa"
        }
    }
};

export const postUser = (user) => {
    return async function(dispatch){
        try {
            console.log(user);
            const response = await axios.post(`/api/handlers/User`,user)
            console.log(response.data);
            return dispatch(setProducts(response.data))
        } catch (error) {
           return  "aaaaaaaa"
        }
    }
};