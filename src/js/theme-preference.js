(() => {
    const ALLOWED = new Set(['light', 'system', 'dark']);
    const ICON_MAP = {
        light: '#icon-sun',
        system: '#icon-settings',
        dark: '#icon-moon'
    };

    let stored = null;
    try { 
        stored = localStorage.getItem('theme-preference'); 
    } catch {}
    const value = ALLOWED.has(stored) ? stored : 'system';

    // 1. Inject FOUC styles and SVG constraints immediately
    const style = document.createElement('style');
    style.id = 'theme-fouc-override';
    let cssRules = '';
    if (value === 'light') cssRules += 'html { color-scheme: light !important; }';
    if (value === 'dark') cssRules += 'html { color-scheme: dark !important; }';
    
    cssRules += `
        .theme-switcher { visibility: hidden !important; transition: none !important; font-size: 1rem !important; line-height: 1 !important; }
        .theme-control { display: inline-flex !important; align-items: center !important; font-size: inherit !important; }
        .theme-switcher svg, .theme-control svg, svg.theme-icon { 
            width: 1em !important; height: 1em !important; display: inline-block !important; flex-shrink: 0 !important; overflow: hidden !important;
        }
    `;
    style.textContent = cssRules;
    document.head.appendChild(style);

    const updateUI = (theme) => {
        const input = document.querySelector(`input[name="theme-preference"][value="${theme}"]`);
        const useElement = document.querySelector('.theme-control use');
        
        if (input) input.checked = true;
        if (useElement) {
            useElement.setAttribute('href', ICON_MAP[theme]);
        }

        if (input && useElement) {
            document.getElementById('theme-fouc-override')?.remove();
            return true;
        }
        return false;
    };

    // 2. Logic Controller: Manage template unwrapping vs pre-rendered plain elements
    const initializeComponent = () => {
        if (document.querySelector('input[name="theme-preference"]')) {
            return updateUI(value);
        }

        const template = document.querySelector('template[data-inline-component="theme-switcher"]');
        if (template) {
            template.replaceWith(template.content.cloneNode(true));
            return updateUI(value);
        }

        return false;
    };

    // Run execution check on immediate script evaluation pass
    if (!initializeComponent()) {
        window.addEventListener('DOMContentLoaded', () => {
            initializeComponent();
        });
    }

    // 3. User Interaction Controller
    document.addEventListener('change', (e) => {
        if (e.target.name === 'theme-preference') {
            const newValue = e.target.value;
            try { 
                localStorage.setItem('theme-preference', newValue); 
            } catch {}
            updateUI(newValue);
        }
    });
})();