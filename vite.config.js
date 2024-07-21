import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: 'flag-game', // Replace REPO_NAME with your GitHub repository name
})