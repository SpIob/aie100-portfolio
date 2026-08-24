import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// If you rename the GitHub repo, update `base` to match: '/<repo-name>/'
export default defineConfig({
  plugins: [react()],
  base: '/aie100-portfolio/',
})
