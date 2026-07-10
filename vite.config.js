import { resolve } from 'path';
import { defineConfig } from 'vite';
// Keep your existing imports for injectHTML and lightningcss here:
import injectHTML from 'vite-plugin-html-inject';
import * as lightningcss from 'lightningcss';

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
    
    // 5. Build output and Multi-Page App routing
    build: {
        // Tells Vite's bundler to use lightningcss instead of esbuild/clean-css
        cssMinify: 'lightningcss',
        
        // Tells Vite to bundle all of these HTML files, not just index.html
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                unit1: resolve(__dirname, 'unit-1/custom-properties/index.html'),
                unit2Layered: resolve(__dirname, 'unit-2/layered-components/index.html'),
                unit2Lightning: resolve(__dirname, 'unit-2/lightning-css-demo/index.html'),
                unit3: resolve(__dirname, 'unit-3/visual-effects/index.html'),
                unit4Editorial: resolve(__dirname, 'unit-4/grid-layouts/editorial.html'),
                unit4Container: resolve(__dirname, 'unit-4/advanced/container-demo.html'),
                unit4Sticky: resolve(__dirname, 'unit-4/advanced/sticky-demo.html'),
                unit5Resume: resolve(__dirname, 'unit-5/resume.html'),
                unit5Contact: resolve(__dirname, 'unit-5/contact.html'),
                unit6Motion: resolve(__dirname, 'unit-6/motion/index.html'),
                unit6Icons: resolve(__dirname, 'unit-6/css-icons/index.html'),
            }
        }
    }
});