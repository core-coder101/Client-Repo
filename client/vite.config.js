import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import legacy from "@vitejs/plugin-legacy";
import path from "path";
import { createHtmlPlugin } from 'vite-plugin-html'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react(),
      legacy({
        targets: ["defaults", "not IE 11"],
      }),
      createHtmlPlugin({
        minify: true,
      })
    ],
    server: {
      open: true,
      host: "0.0.0.0",
      port: 3000,
    },
    base: env.VITE_BASE_PATH,
    resolve: {
      alias: {
        "react-animated-popup": path.resolve(
          __dirname,
          "node_modules/react-animated-popup/index.jsx"
        ),
      },
    },
  };
});
