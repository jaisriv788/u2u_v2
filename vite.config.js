import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      open: true, // automatically opens the browser
      gzipSize: true,
      brotliSize: true,
      filename: "bundle-analysis.html",
    }),
  ],
  base: "/app/",
});
