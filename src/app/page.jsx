"use client"
import React, { useEffect } from "react";
import { fetchProducts } from "./redux/actions";
import { useAppDispatch, useAppSelector } from "./utils/hooks";


export default function Home() {
  const dispatch = useAppDispatch();
  
 const productosAll = useAppSelector((state)=> state.products.products)

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <main>
      {
        productosAll.map((products) =>{
         return <p key={products.id}>{products.name}</p>
        })
      }
      <p>dasfaaaaaaaaaaaaa</p>
    </main>
  );
}