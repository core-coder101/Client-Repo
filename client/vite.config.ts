import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import path from 'path';

export default defineConfig({
    base: '',
    plugins: [react(), viteTsconfigPaths()],
    server: {    
        open: true,
        port: 3000, 
    },
    resolve: {
        alias: {
          'react-animated-popup': path.resolve(__dirname, 'node_modules/react-animated-popup/index.jsx'),
        },
      },
})