"use client"
import React from "react";
import FormGeneric from "../utils/GenericForm";
import { postUser } from "../redux/actions";
import Link from "next/link";
import { useAppDispatch } from "../utils/hooks";

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
            <Link href={"/ForgetForm"}>
            <p >Cambiar contraseña</p>
            </Link>
        </div>
    );
};

export default ProductForm;