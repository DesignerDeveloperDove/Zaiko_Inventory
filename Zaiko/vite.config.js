import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ["@swc/core-darwin-x64"],
    },
  },
  optimizeDeps: {
    exclude: ["@swc/core-darwin-x64"],
  },
});
