import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base must match the GitHub Pages repo name so asset URLs resolve at
// https://nandinitata.github.io/saa-explorer/
export default defineConfig({
  plugins: [react()],
  base: '/saa-explorer/',
})
