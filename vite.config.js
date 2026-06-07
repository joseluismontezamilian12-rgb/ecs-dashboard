import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    base: '/ecs-dashboard/', // <-- Obligatorio para GitHub Pages
    plugins: [react()],
    server: {
        watch: {
            ignored: ['**/.vs/**']
        }
    }
})