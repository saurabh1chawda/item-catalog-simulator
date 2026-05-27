import react from '@vitejs/plugin-react'
import vike from 'vike/plugin'
import tailwindcss from '@tailwindcss/vite'

export default {
  plugins: [
    tailwindcss(),
    react(), 
    vike()
  ],
}
