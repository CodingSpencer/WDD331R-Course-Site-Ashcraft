import { defineConfig } from 'vite';
import injectHTML from 'vite-plugin-html-inject';

export default defineConfig({
    // 1. Register the HTML injection plugin
    plugins: [injectHTML()],

    // 2. Configure the development server settings
    server: {
        port: 3000,
        open: true, // Automatically opens the browser on load
    },

    // 3. Build configurations (if your files live in a specific folder like /src)
    root: './', 
});