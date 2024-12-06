import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    server: {
        https: {
            key: fs.readFileSync('./tls/key.pem'), // Dein privater Schlüssel
            cert: fs.readFileSync('./tls/certificate.crt'), // Dein Zertifikat
        },
        port: 3001, // Setzt den Port auf 3001
    },

    proxy: {
        '/graphql': {
            target: 'https://localhost:3000', // Das Backend-URL
            changeOrigin: true,
            secure: false, // Deaktiviert die Sicherheitsprüfung für selbstsignierte Zertifikate
        },
    },
});
