import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/splitable/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // automatically update SW when new version is available
      manifest: {
        name: 'Split-A-Bill',
        short_name: 'Split-A-Bill',
        start_url: '.',
        display: 'standalone',
        theme_color: '#5D8064',
        background_color: '#ffffff',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' }
        ]
      }
    })
  ]
});
