import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  preview: {
    host: "0.0.0.0", // bind to all interfaces
    port: 4173,
    allowedHosts: ["task.bikeshsitikhu.com.np"],
  },
});
