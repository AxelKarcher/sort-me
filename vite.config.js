import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {port: 3000},
  resolve: {
    alias: {
      API: '/src/API',
      icons: '/src/assets/icons',
      images: '/src/assets/images',
      components: '/src/components',
      hooks: '/src/hooks',
      pages: '/src/pages',
      styles: '/src/styles'
    }
  }
})
