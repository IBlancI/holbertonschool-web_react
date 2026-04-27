import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/holbertonschool-web_react/',
  plugins: [react(), tailwindcss()],
});