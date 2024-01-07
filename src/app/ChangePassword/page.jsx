"use client"
import React from "react";
import { useAppDispatch } from "../utils/hooks";
import {  useRouter, useSearchParams } from "next/navigation";
import FormGeneric from "../utils/GenericForm";
import { changePassword } from "../redux/actions";


const ChangePassword = () => {
    const dispatch = useAppDispatch()
    const searchParams = useSearchParams()
    const token = searchParams?.get("token")
    const router = useRouter()
    const handleChangePassword = (formData) => {
        // Validar los datos del formulario

        dispatch(changePassword({
            email: formData.userEmail,
            password: formData.userPassword,
            confirmPassword: formData.userConfirmPassword,
        }, token)).then(() => router.push('/UserForm'))
     
        
    };

    const formFields = [
        {
            label: "Correo",
            name: "userEmail",
            type: "text",
        },
        {
            label: "Contraseña",
            name: "userPassword",
            type: "password",
        },
        {
            label: "Confirmar contraseña",
            name: "userConfirmPassword",
            type: "password",
        }
    ];

    const initialFormState = {
        userEmail: "",
        userPassword: "",
        userConfirmPassword: ""
    };

    return (
        <>
            <h1>Cambiar contraseña</h1>
            <FormGeneric
                fields={formFields}
                initialState={initialFormState}
                onSubmit={handleChangePassword}
            />
        </>
    );
};

export default ChangePassword;