"use client"
import React, { useEffect } from "react";
import { fetchProducts } from "./redux/actions";
import { useAppDispatch,useAppSelector } from "./utils/hooks";
import Link from "next/link";

export default function Home() {
  const dispatch = useAppDispatch();

  const productosAll = useAppSelector((state) => state.products.products)

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <main>
      {
        productosAll.map((products) => (
          <Link href={`/ProductsID/${products.id}`}>
            <h2 key={products.id}>
              {products.name}
            </h2>
          </Link>
        )
        )
      }
      <Link href = {`/ProductsForm`}>
     <h4>Crear Producto</h4>
      </Link>
      <Link href = {`/UserForm`}>
     <h4>Crear Usuario</h4>
      </Link>
    </main>
  );
}