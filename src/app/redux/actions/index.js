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
export const confirmEmail = (token) => {
    return async function(dispatch){
        try {
            const response = await axios.post(`/api/handlers/Auth/ConfirmEmail`,{token})
            console.log(response);
        } catch (error) {
           return  "error en el confirm"
        }
    }
};
export const forgetPassword = (newUser) => {
    return async function (dispatch) {
        try {
            const response = await axios.post("/api/handlers/Auth/ForgetPassword",newUser)
        
        } catch (error) {
            throw new Error('Failed to search forgetPassword in client');
        }
    }
}

export const changePassword = (newUser, token) => {
    return async function (dispatch) {
      try {
            console.log(newUser, token);
        const response = await axios.post(
          "/api/handlers/Auth/ChangePassword",
          newUser,
          {
            headers: {
              Authorization: ` ${token}`,
            },
          }
        );

      } catch (error) {
        throw new Error("Failed to change password in client");
      }
    };
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