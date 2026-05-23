(() => {
    const ALLOWED = new Set(['light', 'system', 'dark']);

    // 1. Grab preference early
    let stored = null;
    try { stored = localStorage.getItem('theme-preference'); } catch {}
    const value = ALLOWED.has(stored) ? stored : 'system';

    // 2. PRE-PAINT INTERCEPT: Hide the background AND the switcher UI during load
    const style = document.createElement('style');
    style.id = 'theme-fouc-override';
    
    let cssRules = '';
    if (value === 'light') cssRules += 'html { color-scheme: light !important; }';
    if (value === 'dark') cssRules += 'html { color-scheme: dark !important; }';
    
    // Smoothness Trick: Hide the switcher container visually so it doesn't flash its button state change
    cssRules += ' .theme-switcher { visibility: hidden !important; transition: none !important; }';
    
    style.textContent = cssRules;
    document.head.appendChild(style);

    // 3. LOCK BEFORE PAINT: Match the input states
    const selectRadio = () => {
        const input = document.querySelector(`input[name="theme-preference"][value="${value}"]`);
        if (input) {
            input.checked = true;
            // Reveal everything seamlessly now that the state is perfectly assigned
            document.getElementById('theme-fouc-override')?.remove();
            return true;
        }
        return false;
    };

    if (!selectRadio()) {
        const observer = new MutationObserver(() => {
            if (selectRadio()) {
                observer.disconnect();
            }
        });
        observer.observe(document.documentElement, { childList: true, subtree: true });
    }

    // 4. RUNTIME CAPTURE: Save choices when clicked
    document.addEventListener('change', (e) => {
        if (e.target.name === 'theme-preference') {
            try { 
                localStorage.setItem('theme-preference', e.target.value); 
            } catch {}
        }
    });
})();