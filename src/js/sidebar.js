document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const backdrop = document.getElementById('sidebar-backdrop');
    const body = document.body;

    const toggleSidebar = (open) => {
        if (open) {
            body.classList.remove('sidebar-closed');
            menuToggle.setAttribute('aria-expanded', 'true');
        } else {
            body.classList.add('sidebar-closed');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    };

    // Initialize Aria-expanded states properly depending on markup base configuration state
    const isInitiallyClosed = body.classList.contains('sidebar-closed');
    menuToggle.setAttribute('aria-expanded', isInitiallyClosed ? 'false' : 'true');

    // Toggle on button click (desktop close, mobile open/close)
    menuToggle.addEventListener('click', () => {
        const isClosed = body.classList.contains('sidebar-closed');
        toggleSidebar(isClosed); // If it's closed, pass true to open it (and vice versa)
    });

    // Close when clicking the backdrop (mobile only overlay interaction helper)
    backdrop.addEventListener('click', () => {
        toggleSidebar(false);
    });
});