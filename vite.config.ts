import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Sitio de usuario (eltimoteyo.github.io): se sirve desde la raíz.
export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
});
