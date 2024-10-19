import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { collection, addDoc, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useEffect } from "react";

export const Tasks = () => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);

  // Agregar una nueva tarea
  const addTask = async (data) => {
    console.log(data);
    const docRef = await addDoc(collection(db, "tasks"), {
      task_content: data.task,
      status: "pending"
    });
    console.log(docRef);
    reset(); // Limpiar los inputs
    getTasks();
  };

  // Traer las tareas desde la base de datos
  const getTasks = async () => {
    const tasksCollection = await getDocs(collection(db, "tasks"));
    const data = tasksCollection.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    console.log(data);
    setTasks(data);
  };

  // Obtener los datos de la tarea y setearlos en el input del form
  const editTask = (task) => {
    console.log("Editando un producto");
    console.log(task);
    setValue("task", task.task_content);
    // Guardamos el id para poder actualizar el producto
    setEditId(task.id);
  };

  // Editar una tarea
  const updateTask = async (data) => {
    const docRef = doc(db, "tasks", editId);

    await updateDoc(docRef, {
      task_content: data.task
    });

    setEditId(null);
    reset();
    getTasks();
  };

  // Marcar una tarea como completada

  // Marcar una tarea como incompleta

  // Eliminar una tarea

  useEffect(() => {
    // Ejecutamos funciones al momento de montar el componente
    getTasks();
  }, []);
  return (
    <>
      <form onSubmit={editId ? handleSubmit(updateTask) : handleSubmit(addTask)}>
        <label htmlFor="task">Tarea</label>
        <input
          type="text"
          placeholder="Pasear al perro..."
          id="task"
          {...register("task")}
          required
        />
        <button type="submit">{editId ? "Editar" : "Enviar"}</button>
      </form>
      <main>
        <h2>Lista de tareas</h2>
        {tasks.map((task) => (
          <article className="task-container" key={task.id}>
            <p>{task.task_content}</p>
            <button onClick={() => editTask(task)}>Editar</button>
            <button>Marcar como completada</button>
          </article>
        ))}
      </main>
    </>
  );
};
