import path from "path";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: { enabled: true },
      manifest: {
        name: "Diapason, your favorite online tuner",
        short_name: "Diapason",
        description: "A simple yet practical online tuner",
        theme_color: "#fff",
        icons: [
          { src: "logo-192*192.png", sizes: "192x192", type: "image/png" },
          { src: "logo-512*512.png", sizes: "512x512", type: "image/png" },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "esnext",
  },
});
