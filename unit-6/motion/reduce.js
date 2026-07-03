/* ==========================================================================
   MOTION TOGGLE LOGIC
   Handles the manual override for reduced motion preferences.
   ========================================================================== */

const motionToggleBtn = document.getElementById('motion-toggle');
const root = document.documentElement; // Targets the <html> element

// 1. Check OS preference and LocalStorage
const osPrefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const savedPreference = localStorage.getItem('motion-preference');

// 2. Determine initial state
// Use saved preference if it exists; otherwise, fall back to the OS setting.
let isReduced = savedPreference === 'reduce' || (!savedPreference && osPrefersReduced);

// 3. Function to apply the styles and update button text
function applyMotionPreference() {
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

// 4. Listen for button clicks
motionToggleBtn.addEventListener('click', () => {
    // Toggle the boolean state
    isReduced = !isReduced; 
    
    // Save the new preference to the browser
    localStorage.setItem('motion-preference', isReduced ? 'reduce' : 'allow');
    
    // Apply the changes to the DOM
    applyMotionPreference();
});