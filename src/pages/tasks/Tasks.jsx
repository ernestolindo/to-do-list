import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

export const Tasks = () => {
  const { register, handleSubmit } = useForm();

  const addTask = async (data) => {
    console.log(data);
    const docRef = await addDoc(collection(db, "tasks"), {
      task_content: data.task,
      list: data.list
    });
    console.log(docRef);
  };

  // Mostrar "Mi lista" por defecto en input list; cuando el usuario seleccion el input, seleccionar el texto
  const [inputValue, setInputValue] = useState("Mi lista");

  const handleFocus = (event) => {
    event.target.select(); // Selecciona el texto cuando se selecciona el input
  };

  return (
    <>
      <h2>Ingresar una nueva tarea</h2>
      <form onSubmit={handleSubmit(addTask)}>
        <label htmlFor="task">Tarea</label>
        <input
          type="text"
          placeholder="Pasear al perro..."
          id="task"
          {...register("task")}
          required
        />
        <label htmlFor="list">Lista</label>
        <input
          type="text"
          id="list"
          value={inputValue} // El valor por defecto es "Mi lista"
          onFocus={handleFocus} // Selecciona el texto cuando se hace clic en el input
          onChange={(e) => setInputValue(e.target.value)} // Actualiza el valor cuando el usuario escribe
          placeholder="Ingresa una lista"
          {...register("list")}
          required
        />
        <button type="submit">Agregar</button>
      </form>
    </>
  );
};
