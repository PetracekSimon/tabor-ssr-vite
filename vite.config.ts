import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  console.log(mode);

  return {
    plugins: [react()],
    server: { port: 3000 },

    build: {
      minify: true,
      sourcemap: false,
    },
    resolve: {
      alias: {
        "@client": fileURLToPath(new URL("./src/client", import.meta.url)),
        "@app-assets": fileURLToPath(new URL("./src/client/assets", import.meta.url)),
      },
    },
  }
});
