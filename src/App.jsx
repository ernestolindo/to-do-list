import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Tasks } from "./pages/tasks/Tasks";
import "./assets/css/style.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <section className="header-bg">
        <header className="header-container contenedor">
          <h1>Atlacatl To Do</h1>
          <a className="mi-cuenta" href="javascript:">
            <img
              src="https://ca.slack-edge.com/T012J7JET96-U02P49DT8AV-b7a327375b0a-512"
              alt="Mi cuenta"
            />
          </a>
        </header>
      </section>

      <Tasks />
      <section className="footer-bg">
        <footer className="footer-container contenedor">
          <p> &reg; 2024 Atlacatl To Do - All Rights Reserved</p>
        </footer>
      </section>
    </>
  );
}

export default App;
