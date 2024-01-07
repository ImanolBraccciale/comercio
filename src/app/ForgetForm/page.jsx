"use client"
import React from "react";

import { forgetPassword } from "../redux/actions";
import { useAppDispatch } from "../utils/hooks";
import FormGeneric from "../utils/GenericForm";
 
const ForgetPassword = () => {
  const dispatch = useAppDispatch()

  const handleRegister = (formData) => {
        const newUser = {
          email: formData.userEmail,
        };
        dispatch(forgetPassword(newUser));
  };

  const formFields = [
    {
      label: "Correo",
      name: "userEmail",
      type: "text",
    },
  ];

  const initialFormState = {
    userEmail: "",
  };

  return (
    <>
      <h1>Recuperar Contraseña</h1>
      <FormGeneric
        fields={formFields}
        initialState={initialFormState}
        onSubmit={handleRegister}
      />
    </>
  );
};

export default ForgetPassword;