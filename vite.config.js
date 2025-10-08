import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  preview: {
    allowedHosts: ['formmm-sqzj.onrender.com'],
    host: '0.0.0.0',
    port: process.env.PORT || 5173,
  },
})
