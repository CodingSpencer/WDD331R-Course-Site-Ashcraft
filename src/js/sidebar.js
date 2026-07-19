/**
 * sidebar.js
 * Handles component injection, sidebar toggling, accessibility states, 
 * and conditional positioning.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Components are loaded by vite-plugin-html-inject at build time
    // No need to fetch them at runtime

    // 1. Reveal content now that components are injected
    document.body.classList.add('loaded');

    // 4. Initialize UI Logic
    const menuToggle = document.getElementById('menu-toggle');
    const backdrop = document.getElementById('sidebar-backdrop');
    const body = document.body;

    // Guard clause: Exit if the toggle button is missing
    if (!menuToggle) return;

    /**
     * Set the sidebar position based on page location.
     */
    const path = window.location.pathname;
    const isHomePage = path === '/' || path.endsWith('index.html');
    
    if (!isHomePage) {
        body.classList.add('sidebar-right');
    }

    /**
     * Toggles the sidebar visibility and updates ARIA attributes.
     */
    const toggleSidebar = (open) => {
        if (open) {
            body.classList.remove('sidebar-closed');
            menuToggle.setAttribute('aria-expanded', 'true');
        } else {
            body.classList.add('sidebar-closed');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    };

    // Initialize ARIA state based on existing body class
    const isInitiallyClosed = body.classList.contains('sidebar-closed');
    menuToggle.setAttribute('aria-expanded', isInitiallyClosed ? 'false' : 'true');

    // Event Listener: Toggle on button click
    menuToggle.addEventListener('click', () => {
        const isClosed = body.classList.contains('sidebar-closed');
        toggleSidebar(isClosed); 
    });

    // Event Listener: Close when clicking the mobile backdrop
    if (backdrop) {
        backdrop.addEventListener('click', () => {
            toggleSidebar(false);
        });
    }
});