import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' keeps asset paths relative, so the same build works on
// Cloudflare Pages, Vercel, GitHub Pages (project pages), or a custom domain.
export default defineConfig({
  base: './',
  plugins: [react()],
})
