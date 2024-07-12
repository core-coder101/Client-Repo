import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
  },
  resolve: {
    alias: {
      "react-animated-popup": path.resolve(
        __dirname,
        "node_modules/react-animated-popup/index.jsx"
      ),
    },
  },
});
