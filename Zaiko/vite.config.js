import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ["@swc/core"],
    },
  },
  optimizeDeps: {
    exclude: ["@swc/core"],
  },
  define: {
    "process.env.SWC_USE_WASM": "true",
  },
});
