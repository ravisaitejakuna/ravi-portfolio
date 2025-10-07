import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/ravi-portfolio/',  // 👈 Make sure this matches your repo name exactly
  build: {
    outDir: 'dist',
  },
})
