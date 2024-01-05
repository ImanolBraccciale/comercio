"use client"
import React from "react";
import FormGeneric from "../utils/GenericForm";
import { useAppDispatch } from "../utils/hooks";
import { postProducts } from "../redux/actions";

const ProductForm = ({ onSubmit }) => {
    const initialState = {
        name: "",
        price: 0,
        stock: 0,
        description: "",
    };

    const fields = [
        { label: "Nombre", type: "text", name: "name" },
        { label: "stock", type: "number", name: "stock" },
        { label: "Precio", type: "number", name: "price" },
        { label: "Descripción", type: "text", name: "description" },
    ];
    const dispatch = useAppDispatch()

    const handleFormSubmit = (formState) => {
       
        dispatch(postProducts({
            name: formState.name,
            description: formState.description,
            price: parseInt(formState.price),
            stock: parseInt(formState.stock)
        }))
    };

    return (
        <div>
            <h2>Agregar Producto</h2>
            <FormGeneric
                fields={fields}
                initialState={initialState}
                onSubmit={handleFormSubmit}
            />
        </div>
    );
};

export default ProductForm;