// Plugins
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import ViteFonts from 'unplugin-fonts/vite'

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss',
      },
    }),
    ViteFonts({
      google: {
        families: [{
          name: 'Roboto',
          styles: 'wght@100;300;400;500;700;900',
        }],
      },
    }),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'Types': fileURLToPath(new URL('./src/types', import.meta.url)),
      'Views': fileURLToPath(new URL('./src/views', import.meta.url)),
      'Assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      'Router': fileURLToPath(new URL('./src/router', import.meta.url)),
      'Stores': fileURLToPath(new URL('./src/stores', import.meta.url)),
      'Styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
      'Layouts': fileURLToPath(new URL('./src/layouts', import.meta.url)),
      'Plugins': fileURLToPath(new URL('./src/plugins', import.meta.url)),
      'Constant': fileURLToPath(new URL('./src/constant', import.meta.url)),
      'Components': fileURLToPath(new URL('./src/components', import.meta.url)),
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  server: {
    port: 3000,
  },
})
