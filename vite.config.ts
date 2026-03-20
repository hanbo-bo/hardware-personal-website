import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vitejs.dev/config/

// vite.config.ts
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: [
      "65575t-5173.csb.app",
      "65575t-5174.csb.app",
      "65575t-5175.csb.app",
    ],
    proxy: {
      '/api': {
        target: 'http://43.106.102.92:3000', 
        changeOrigin: true,
      }
    }
  },
});
