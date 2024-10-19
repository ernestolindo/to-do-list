import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
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
  const completeTask = async (id) => {
    const docRef = doc(db, "tasks", id);

    await updateDoc(docRef, {
      status: "completed"
    });

    getTasks();
  };

  // Marcar una tarea como incompleta
  const uncompleteTask = async (id) => {
    const docRef = doc(db, "tasks", id);

    await updateDoc(docRef, {
      status: "pending"
    });

    getTasks();
  };

  // Eliminar una tarea
  const deleteTask = async (id) => {
    const docRef = doc(db, "tasks", id);
    await deleteDoc(docRef);

    getTasks();
  };

  useEffect(() => {
    // Ejecutamos funciones al momento de montar el componente
    getTasks();
  }, []);
  return (
    <main className="main-container contenedor">
      <form
        className="form-container"
        onSubmit={editId ? handleSubmit(updateTask) : handleSubmit(addTask)}
      >
        <input
          type="text"
          placeholder="Pasear al perro..."
          id="task"
          {...register("task")}
          required
        />
        <button type="submit">
          {editId ? <i class="fa-solid fa-rotate-right"></i> : <i class="fa-solid fa-plus"></i>}
        </button>
      </form>
      <section className="tareas-container">
        <h2>Task list</h2>
        <article className="lista-tareas" id="lista-pendientes">
          {tasks
            // Solo mostrar en la vista las tareas cuyo task.status === "pending"
            .filter((task) => task.status === "pending")

            .map((task) => (
              <section className="task-container" key={task.id}>
                <button className="check-button" onClick={() => completeTask(task.id)}></button>
                <p className="task-content">{task.task_content}</p>
                <button className="action-button" onClick={() => editTask(task)}>
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button className="action-button" onClick={() => deleteTask(task.id)}>
                  <i class="fa-solid fa-trash"></i>
                </button>
              </section>
            ))}
        </article>
        <h2>Completed</h2>
        <article className="lista-tareas" id="lista-tareas-completadas">
          {tasks
            // Solo mostrar en la vista las tareas cuyo task.status === "completed"
            .filter((task) => task.status === "completed")

            .map((task) => (
              <section className="task-container" key={task.id}>
                <button className="uncheck-button" onClick={() => uncompleteTask(task.id)}>
                  <i class="fa-solid fa-check"></i>
                </button>
                <p className="task-content">{task.task_content}</p>
                <button className="action-button" onClick={() => editTask(task)}>
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button className="action-button" onClick={() => deleteTask(task.id)}>
                  <i class="fa-solid fa-trash"></i>
                </button>
              </section>
            ))}
        </article>
      </section>
    </main>
  );
};
