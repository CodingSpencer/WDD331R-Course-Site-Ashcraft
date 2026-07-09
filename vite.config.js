import { defineConfig } from 'vite';
import injectHTML from 'vite-plugin-html-inject';
import lightningcss from 'lightningcss'; // Required to convert your browser targets

export default defineConfig({
    // 1. Register the HTML injection plugin
    plugins: [injectHTML()],

    // 2. Configure the development server settings
    server: {
        port: 3000,
        open: true, // Automatically opens the browser on load
    },

    // 3. Build configurations
    root: './', 

    // 4. Native LightningCSS pipeline configuration
    css: {
        transformer: 'lightningcss',
        lightningcss: {
            // Replicates your command line targets rule: ">= 0.25%"
            targets: lightningcss.browserslistToTargets(['>= 0.25%'])
        }
    },
    build: {
        // Tells Vite's bundler to use lightningcss instead of esbuild/clean-css
        cssMinify: 'lightningcss'
    }
});