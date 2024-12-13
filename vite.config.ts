import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from "vite-tsconfig-paths"
import fs from 'fs';
import path from 'path';

const keyPath = path.resolve('./tls/key.pem');
const certPath = path.resolve('./tls/certificate.crt');

if (!fs.existsSync(keyPath) || !fs.existsSync(certPath)) {
  throw new Error('SSL-Zertifikatsdateien fehlen. Bitte key.pem und certificate.crt bereitstellen.');
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    https: {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
    },
    port: 3001,
    proxy: {
      '/graphql': {
        target: process.env.VITE_BACKEND_URL,
        changeOrigin: true,
        secure: false,
        headers: {
          'X-Custom-Header': 'my-custom-value',
        },
      },
    },
  },

})
