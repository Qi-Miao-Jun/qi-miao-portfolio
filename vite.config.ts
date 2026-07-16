import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/qi-miao-portfolio/',
  plugins: [react(), tailwindcss()],
})
