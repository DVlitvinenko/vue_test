import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@client": path.resolve(__dirname, "src/client"),
      "@typesDir": path.resolve(__dirname, "src/types"),
      "@router": path.resolve(__dirname, "src/router"),
      "@directives": path.resolve(__dirname, "src/directives"),
      "@store": path.resolve(__dirname, "src/store"),
    },
  },
});
