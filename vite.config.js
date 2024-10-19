import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ghPages } from "vite-plugin-gh-pages";

export default defineConfig({
  plugins: [react(), ghPages()],
  base: "/to-do-list/" // Esto es importante para que GitHub Pages cargue correctamente tu aplicación.
});
