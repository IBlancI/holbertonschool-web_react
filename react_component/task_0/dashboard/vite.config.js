import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/holbertonschool-web_react/', // nom EXACT du repo
  plugins: [react()],
})
