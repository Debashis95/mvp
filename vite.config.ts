import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          motion: ["framer-motion"],
          ui: ["radix-ui", "cmdk"],
          forms: ["react-hook-form", "@hookform/resolvers", "zod"],
          query: ["axios", "@tanstack/react-query"],
        },
      },
    },
  },
})

