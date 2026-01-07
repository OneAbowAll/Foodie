import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA(({
      registerType: 'autoUpdate',
      manifest: {
        name: "Foodie",
        short_name: "Foodie App",
        description: "Share and like recipes.",
        theme_color: "#2c4429ff",
        display: "fullscreen",
        start_url: "/",
        icons: [
          {
            src: "/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable"
          },
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
      },
      workbox: {
        navigateFallback: '/index.html'
      },
      devOptions: { enabled: true },
    })),
  ],
})
