/* ==========================================================================
   1. MOTION TOGGLE LOGIC
   Handles the manual override for reduced motion preferences.
   ========================================================================== */

const motionToggleBtn = document.getElementById('motion-toggle');
const root = document.documentElement; // Targets the <html> element

// Check OS preference and LocalStorage
const osPrefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const savedPreference = localStorage.getItem('motion-preference');

// Determine initial state
// Use saved preference if it exists; otherwise, fall back to the OS setting.
let isReduced = savedPreference === 'reduce' || (!savedPreference && osPrefersReduced);

// Function to apply the styles and update button text
function applyMotionPreference() {
    // Safety check in case the button doesn't exist on the current page
    if (!motionToggleBtn) return; 

    if (isReduced) {
        root.setAttribute('data-motion', 'reduce');
        motionToggleBtn.setAttribute('aria-pressed', 'true');
        motionToggleBtn.innerText = 'Reduce Motion: On';
    } else {
        root.setAttribute('data-motion', 'allow');
        motionToggleBtn.setAttribute('aria-pressed', 'false');
        motionToggleBtn.innerText = 'Reduce Motion: Off';
    }
}

// Apply immediately on load so the UI doesn't flash
applyMotionPreference();

// Listen for button clicks
if (motionToggleBtn) {
    motionToggleBtn.addEventListener('click', () => {
        // Toggle the boolean state
        isReduced = !isReduced; 
        
        // Save the new preference to the browser
        localStorage.setItem('motion-preference', isReduced ? 'reduce' : 'allow');
        
        // Apply the changes to the DOM
        applyMotionPreference();
    });
}

/* ==========================================================================
   2. TOAST NOTIFICATION LOGIC
   Handles the exit animation for dismissible toasts.
   ========================================================================== */

const toast = document.getElementById('my-toast');
const closeBtn = document.getElementById('close-toast');

// Only run if the toast elements actually exist on the page
if (toast && closeBtn) {
    closeBtn.addEventListener('click', () => {
        // Adding the 'hidden' class triggers the CSS exit transition,
        // fading it out and eventually setting 'display: none'
        toast.classList.add('hidden');
    });
}