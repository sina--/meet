import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/*.{ico,png}'],
      manifest: {
        short_name: "Meet App",
        name: "Meet App - Find Events Near You",
        icons: [
          {
            src: "/icons/favicon.ico",
            sizes: "48x48",
            type: "image/x-icon",
            purpose: "maskable"
          },
          {
            src: "/icons/meet-app-144.png",
            type: "image/png",
            sizes: "144x144",
            purpose: "any"
          },
          {
            src: "/icons/meet-app-192.png",
            type: "image/png",
            sizes: "192x192",
            purpose: "maskable"
          },
          {
            src: "/icons/meet-app-512.png",
            type: "image/png",
            sizes: "512x512",
            purpose: "maskable"
          }
        ],
        categories: ["events", "entertainment", "social"],
        display_override: ["standalone", "window-controls-overlay"],
        id: "/",
        start_url: "/",
        scope: "/",
        display: "standalone",
        theme_color: "#000000",
        background_color: "#ffffff",
        orientation: "any",
        prefer_related_applications: false
      },
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
            handler: "CacheFirst",
            options: {
              cacheName: "images",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
              }
            }
          }
        ]
      },
      devOptions: {
        enabled: true,
        type: 'module'
      }
    })
  ]
});
