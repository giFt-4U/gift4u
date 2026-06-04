import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Vite의 빌드 환경과 sockjs-client 라이브러리의 호환성
  define: {
    global: 'window',
  },
})
