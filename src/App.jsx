import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Tasks } from "./pages/tasks/Tasks";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Atlacatl To Do</h1>
      <Tasks />
    </>
  );
}

export default App;
