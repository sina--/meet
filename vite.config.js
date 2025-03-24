import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({
      manifest: {
        short_name: "Meet App",
        name: "Meet App - Find Events Near You",
        icons: [
          {
            src: "icons/favicon.ico",
            sizes: "48x48",
            type: "image/x-icon",
            purpose: "maskable"
          },
          {
            src: "icons/meet-app-144.png",
            type: "image/png",
            sizes: "144x144",
            purpose: "any"
          },
          {
            src: "icons/meet-app-192.png",
            type: "image/png",
            sizes: "192x192",
            purpose: "maskable"
          },
          {
            src: "icons/meet-app-512.png",
            type: "image/png",
            sizes: "512x512",
            purpose: "maskable"
          }
        ],
        id: "./",
        start_url: "./",
        scope: "./",
        display: "standalone",
        theme_color: "#000000",
        background_color: "#ffffff"
      },
      srcDir: "src",
      filename: "service-worker.js",
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      strategies: 'generateSW',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/www\.googleapis\.com\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'google-apis',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 // 24 hours
              }
            }
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "images",
              expiration: {
                maxEntries: 50
              }
            }
          }
        ]
      }
    })
  ]
})