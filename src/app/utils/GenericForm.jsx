"use client"
import React, { useState } from "react";

const FormGeneric = ({ fields, initialState, onSubmit }) => {
  const [formState, setFormState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formState);
    setFormState(initialState);
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name}>
          <label>{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            value={formState[field.name]}
            onChange={handleChange}
          />
        </div>
      ))}
      <button type="submit">Enviar</button>
    </form>
  );
};

export default FormGeneric;