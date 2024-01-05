"use client"
import React from "react";
import FormGeneric from "../utils/GenericForm";
import { useAppDispatch } from "../utils/hooks";
import { postUser } from "../redux/actions";

const ProductForm = ({ onSubmit }) => {
    const initialState = {
        name: "",
        email: "",
        Contraseña: "",
        Confirmar: "",
    };

    const fields = [
        { label: "Nombre", type: "text", name: "name" },
        { label: "email", type: "text", name: "email" },
        { label: "Contraseña", type: "password", name: "password" },
        { label: "Confirmar", type: "password", name: "confirmPassword" },

    ];
    const dispatch = useAppDispatch()

    const handleFormSubmit = (formState) => {
       
        dispatch(postUser({
            name: formState.name,
            email: formState.email,
            password: formState.password,
            confirmPassword: formState.confirmPassword
        }))
    };

    return (
        <div>
            <h2>Crear Usuario</h2>
            <FormGeneric
                fields={fields}
                initialState={initialState}
                onSubmit={handleFormSubmit}
            />
        </div>
    );
};

export default ProductForm;