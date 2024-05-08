import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  resolve: {
    extensions: ['.mjs', '.js', '.jsx', '.json']
  },
  build: {
    assetsInlineLimit: 0, // Evita que los archivos se conviertan en datos URI
    outDir: 'dist', // Directorio de salida para los archivos construidos
    assetsDir: '.', // Directorio de salida relativo al directorio outDir
    rollupOptions: {
      output: {
        manualChunks: undefined // Deshabilita la agrupación de módulos manuales para evitar problemas con las rutas de los archivos estáticos
      }
    }
  }
});
