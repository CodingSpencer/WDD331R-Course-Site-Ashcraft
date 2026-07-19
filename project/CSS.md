# Project CSS Documentation

## Architecture Overview

The CSS architecture follows a layered, token-based design system using modern CSS features including:
- CSS custom properties (variables) for design tokens
- `@layer` for cascade order management
- `light-dark()` for automatic dark mode support
- CSS nesting (native, no preprocessor required)
- Clamp functions for fluid typography and spacing

### Import Structure (`src/css/main.css`)

```css
@layer tokens, base, layout, components, utilities, vendor;

@import "./tokens/colors.css" layer(tokens);
@import "./tokens/variables.css" layer(tokens);
@import "./tokens/fonts.css" layer(tokens);

@import "./base/elements.css" layer(base);
@import "./base/reset.css" layer(base);

@import "./components/cards.css" layer(components);
@import "./components/board.css" layer(components);
@import "./components/page.css" layer(components);
@import "./components/header.css" layer(components);
@import "./components/theme-toggle.css" layer(components);
@import "./components/effects.css" layer(components);
@import "./components/icons.css" layer(components);
@import "./components/glass.css" layer(components);
@import "./components/pages/home.css" layer(components);

@import "./utilities/utilities.css" layer(utilities);
```

---

## Token System (`src/css/tokens/`)

### Design Philosophy

The token system uses a **seed-based architecture** where base values are defined once and derived automatically using `color-mix()` and `light-dark()` functions. This ensures consistency across light/dark modes and simplifies maintenance.

### Colors (`colors.css`)

**Seed Values:**
- `--seed-bg`: #ffffff (light) / oklch(0.18 0.005 140) (dark)
- `--seed-surface`: #f5f5f5 (light) / oklch(0.24 0.005 140) (dark)
- `--seed-text`: #111111 (light) / oklch(0.95 0 0) (dark)
- `--seed-text-muted`: #555555 (light) / oklch(0.74 0 0) (dark)
- `--seed-accent`: oklch(0.48 0.12 142.1) (green brand color)
- `--seed-accent-hover`: #22c55e
- `--seed-link`: #1a73e8
- `--seed-link-hover`: #1558b0
- `--seed-border`: #e5e5e5 (light) / oklch(0.32 0.005 140) (dark)

**Derived Accent Ramp:**
```css
--accent-200: color-mix(in oklch, var(--seed-accent) 30%, white);
--accent-300: color-mix(in oklch, var(--seed-accent) 50%, white);
--accent-400: color-mix(in oklch, var(--seed-accent) 75%, white);
--accent-500: var(--seed-accent);
--accent-600: color-mix(in oklch, var(--seed-accent) 80%, black);
--accent-700: color-mix(in oklch, var(--seed-accent) 60%, black);
--accent-800: color-mix(in oklch, var(--seed-accent) 40%, black);
```

**Semantic Tokens:**
- `--title-color`: Light-dark(#1f7a4c variant, oklch(0.81 0.17 142.5))
- `--bg-color`: Uses `light-dark()` for automatic theme switching
- `--surface-color`: Uses `light-dark()` for cards/sidebar
- `--text-color`: Primary text color
- `--text-muted`: Secondary/muted text
- `--primary-color`: Main accent (green)
- `--accent-color`: Hover/active accent
- `--link-color`: #1a73e8 (blue)
- `--link-hover-color`: #1558b0
- `--border-color`: Subtle borders

### Variables & Spacing (`variables.css`)

**Spacing Scale (based on 8px unit):**
- `--space-unit`: 8px
- `--space-xs`: 4px
- `--space-sm`: 8px
- `--space-md`: clamp(1rem, 0.73rem + 1.36vw, 1.5rem) [16-24px]
- `--space-lg`: clamp(1.5rem, 1.05rem + 2.27vw, 2.33rem) [24-37px]
- `--space-xl`: clamp(2rem, 1.27rem + 3.64vw, 3.33rem) [32-53px]

**Border Radius:**
- `--radius-sm`: 4px
- `--radius-md`: 8px
- `--radius-lg`: 12px

**Typography Scale:**
- `--font-size-sm`: 0.875rem (~14px)
- `--font-size-md`: 1rem (~16px)
- `--font-size-lg`: clamp(1.25rem, 1.14rem + 0.57vw, 1.5rem) [20-24px]
- `--font-size-xl`: clamp(1.5rem, 1.27rem + 0.57vw, 2rem) [24-32px]
- `--font-size-hero`: clamp(2.25rem, 1.95rem + 2.73vw, 3.7rem) [36-59px]

**Semantic Font Roles:**
- `--font-size-body`: var(--font-size-md)
- `--font-size-caption`: var(--font-size-sm)
- `--font-size-heading-sm`: var(--font-size-lg)
- `--font-size-heading-md`: var(--font-size-xl)
- `--font-size-display-sm`: var(--font-size-hero)

**Font Weights:**
- `--font-light`: 300
- `--font-regular`: 400
- `--font-medium`: 500
- `--font-semibold`: 600
- `--font-bold`: 700

**Line Heights:**
- `--line-height-body`: 1.6
- `--line-height-heading`: 1.25
- `--line-height-display`: 1.1

**Motion & Interaction:**
- `--transition-base`: 0.2s ease
- `--outline-width`: 2px
- `--icon-size-sm`: 24px
- `--icon-size-md`: 32px

**Shadows (dark mode aware):**
- `--shadow-sm`: Subtle elevation for cards
- `--shadow-md`: Medium elevation for modals/glass panels
- `--text-shadow-hero`: Text shadow for hero headings

**Glass Morphism:**
- `--surface-glass`: light-dark(rgba(255,255,255,0.45), rgba(30,30,30,0.65))
- `--border-glass`: light-dark(rgba(255,255,255,0.4), rgba(255,255,255,0.1))

### Fonts (`fonts.css`)

Custom font faces loaded via `@font-face`:
- **Major Mono Display** (400 weight) - Used for headings
- **Lora** (400 and 700 weights) - Used for body text

Font families are assigned in `variables.css`:
- `--font-family-heading`: var(--font-heading-system) → System font stack
- `--font-family-body`: var(--font-body-system) → Georgia, Cambria, serif

Custom font `.woff2` files remain available but are not actively used.

---

## Base Styles (`src/css/base/`)

### Reset (`reset.css`)

Minimal modern reset:
```css
*,
*::before,
*::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
```

### Elements (`elements.css`)

Base styles applied to HTML elements:
- **Body**: Font family, size, line-height, color, background, padding
- **Main**: Max-width container, centered, padding
- **Nav**: Padding, background, border
- **Headings (h2, h3)**: Uppercase, custom font, sizing, color
- **Paragraphs**: Body font, line-height, margins
- **Lists**: No list-style, spacing
- **Links**: Color with hover state

---

## Components (`src/css/components/`)

### Page Layout (`page.css`)

**Core Layout Structure:**
```css
.page-layout {
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: var(--space-lg);
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 var(--space-md);
    transition: grid-template-columns 0.3s ease;
}
```

**Desktop Sidebar:**
- Full-height layout (min-height: 100vh)
- Gray background: var(--surface-color)
- No card styling (no border-radius, no full border)
- Right border only: 1px solid var(--border-color) for subtle separation
- Smooth fade transition when closed via opacity/visibility

**Open/Closed Behavior:**
- **Open (default)**: Sidebar visible, full-height gray panel
- **Closed**: Sidebar fades out, content takes full width
- Closed state uses `grid-template-columns: 1fr` (not 0px) for smooth transition

**Hamburger Button:**
- Always visible on all screen sizes (fixed position, top-left)
- Z-index: 1000 to stay above sidebar and content
- Click toggles sidebar open/closed on desktop and mobile
- Transforms to X icon when sidebar is open

**Mobile Breakpoint (768px):**
- Layout becomes single column
- Sidebar transforms into fixed off-canvas drawer
- Transform: translateX for sliding animation
- Backdrop overlay appears with opacity transition

**Backdrop:**
- Hidden on desktop (`display: none`)
- Visible on mobile with semi-transparent black background
- Click closes sidebar

### Home Page Specifics (`pages/home.css`)

**Menu Toggle Button:**
- Fixed position (top-left corner)
- Always visible and clickable on desktop and mobile
- Hamburger icon with CSS transitions (three lines → X)
- Transforms to X when `aria-expanded="true"`
- Z-index: 1000 ensures it stays above sidebar (z-index: 90)

**Hamburger Animation:**
- Three-line icon using ::before and ::after pseudo-elements
- Rotates 45° and -45° to form X
- Middle line fades to transparent

**Note:** `home.css` only contains menu toggle button styles. All sidebar layout behavior is in `page.css`.

### Header/Hero (`header.css`)

**Hero Section:**
- Flexbox centering
- Min-height: 60vh
- Large padding with spacing tokens
- Text centered

**Typography:**
- Title: var(--font-size-display-sm), var(--line-height-display)
- Subtitle: var(--font-size-lg), var(--font-semibold), var(--accent-color)

**Note:** Does NOT redefine `main` to avoid conflicts with base elements.css

### Cards (`cards.css`)

**Card Group:**
- Responsive grid with auto-fit and minmax
- Gap spacing between cards
- Heading with clamp for fluid sizing

**Individual Card:**
- Background: var(--surface-color)
- Border: 1px solid var(--border-color)
- Border radius: var(--radius-lg)
- Shadow: var(--shadow-sm) (elevates to --shadow-md on hover)
- Flex column layout with gap

**Card Image:**
- Fixed 180px height
- Grayscale filter (80%) by default
- Full color on card hover
- Border radius: var(--radius-md)

**Card Tag:**
- Accent background with contrasting text
- Rounded, compact padding
- Uses `light-dark()` for text color

**Card Meta:**
- Pushed to bottom with `margin-top: auto`
- Flex row with space-between
- Links use semantic link colors

**Hover Effects:**
- TranslateY(-4px) lift
- Border color change to --primary-color
- Shadow elevation
- Image color restoration

### Board (`board.css`)

Simple header/footer for content boards:
- Centered text
- Standard heading and body styles
- Top border on footer

### Theme Toggle (`theme-toggle.css`)

**Color Scheme Management:**
- Sets `color-scheme: light` on :root
- Uses `:has()` selector for dark mode triggers
- Supports radio buttons for Light/Dark/System preferences

**Component Structure:**
- `<details>` wrapper with summary trigger
- Dropdown menu for theme options
- Visual feedback for selected/checked states

**Accessibility:**
- Focus-visible outlines
- Proper ARIA states (via HTML)
- Smooth dropdown animation (0.2s ease-out)

**Dynamic Labels:**
- Uses `::after` pseudo-element to show current selection
- Content changes based on checked radio value

### Effects (`effects.css`)

**Clip Path Animation:**
- Circular clip on shield image
- Hover shrinks circle (demonstration only)
- 0.3s ease transition

### Icons (`icons.css`)

**Base Icon:**
- Inline-block display
- Stroke: var(--primary-color)
- 1em sizing (inherits font-size)
- Vertical alignment adjustment

**Icon Row:**
- Flex container with gap
- Background card with border
- Uses `currentColor` for stroke to inherit parent color
- Stacked drop-shadow filter for depth

**Hover Effects:**
- Scale(1.15) with translateY(-2px)
- Shadow intensifies using --link-color

### Glass Morphism (`glass.css`)

**Glass Section:**
- Relative positioning for background image
- Min-height: 450px
- Overflow hidden for border radius clipping

**Background Layer:**
- Absolute positioned, full coverage
- Z-index: 1 (behind panel)

**Glass Panel:**
- Relative, z-index: 2
- Max-width: 600px
- Padding: var(--space-xl)
- Border: 1px solid var(--border-glass)
- Background: var(--surface-glass) with transparency
- Backdrop-filter: blur(12px) saturate(160%)
- Webkit prefix for Safari

**Reduced Motion Fallback:**
```css
@media (prefers-reduced-motion: reduce) {
    .glass-panel {
        backdrop-filter: none;
        background-color: light-dark(#fff, #1e1e1e);
    }
}
```

---

## Utilities (`src/css/utilities/`)

### Utilities (`utilities.css`)

**Visually Hidden:**
```css
.visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
    border: 0;
}
```
Used for screen-reader-only content.

---

## Dark Mode Implementation

The project uses the **`light-dark()` CSS function** for automatic theme switching:

```css
color: light-dark(#ffffff, #1e1e1e);
```

**How it works:**
- Automatically uses first value in light mode
- Automatically uses second value in dark mode
- Triggered by `color-scheme` property set in `theme-toggle.css`
- No JavaScript required for basic theme detection
- User preference override via radio buttons

**Theme Preference Flow:**
1. `theme-preference.js` loads and checks localStorage/system preference
2. Sets hidden radio button (light/dark/system)
3. `theme-toggle.css` updates `color-scheme` based on checked radio
4. All `light-dark()` functions update automatically

---

## Known Resolved Issues

### ✅ Fixed: Sidebar Conflicts

**Problem:** Multiple files defined `.page-layout`, `.sidebar`, and mobile breakpoints with conflicting values and different breakpoints (1024px vs 768px).

**Solution:**
- `page.css` is the source of truth for sidebar layout
- `home.css` only contains toggle button styles and mobile grid override
- Consistent 768px breakpoint across all components
- All hardcoded colors replaced with design tokens

### ✅ Fixed: Sidebar Layout

**Problem:** Sidebar had card styling (border-radius, border) and didn't extend full height.

**Solution:**
- Removed card styling (border-radius, full border)
- Added min-height: 100vh for full-height layout
- Right border only for subtle separation
- Gray background via --surface-color token
- Hamburger button visible on all screen sizes with z-index: 1000

### ✅ Fixed: Header vs Elements Conflicts

**Problem:** `header.css` redefined `main` with conflicting padding (2rem vs var(--space-lg)) and max-width (900px vs 1200px).

**Solution:**
- Removed `main` redefinition from `header.css`
- Only `.hero` and section spacing remain in header component
- `main` styling stays in `elements.css` (base layer)

### ✅ Fixed: Font Family

**Decision:** Using system fonts instead of custom web fonts for better performance and simplicity.

**Current configuration:**
- `--font-family-heading`: System font stack (-apple-system, BlinkMacSystemFont, etc.)
- `--font-family-body`: Georgia, Cambria, "Times New Roman", Times, serif

Custom font files remain available in `fonts/` directory but are not loaded.

---

## Component Hierarchy

```
Page Structure
├── page-layout (grid container)
│   ├── sidebar (sticky/fixed drawer)
│   │   ├── menu-toggle (floating button)
│   │   └── sidebar-content
│   │       └── unit-links-nav
│   └── main
│       ├── hero (hero.css)
│       ├── about-section (elements.css)
│       └── card-group (cards.css)
│           └── cards grid
│               └── card items
├── sidebar-backdrop (mobile only)
└── theme-switcher (floating component)
```

---

## Browser Support

- **CSS Layers**: Chrome 99+, Firefox 97+, Safari 15.4+
- **color-mix()**: Chrome 111+, Firefox 113+, Safari 16.2+
- **light-dark()**: Chrome 111+, Firefox 118+, Safari 15.2+
- **@layer**: Chrome 99+, Firefox 97+, Safari 15.4+
- **CSS Nesting**: Chrome 120+, Firefox 117+, Safari 17.2+
- **clamp()**: Chrome 79+, Firefox 75+, Safari 13.1+
- **:has()**: Chrome 105+, Firefox 121+, Safari 15.4+

---

## File Reference

| File | Lines | Purpose |
|------|-------|---------|
| `reset.css` | 10 | Minimal box-sizing reset |
| `elements.css` | 71 | Base element styles |
| `colors.css` | 48 | Color tokens with dark mode |
| `variables.css` | 89 | Spacing, typography, shadows |
| `fonts.css` | 23 | @font-face declarations |
| `page.css` | 74 | Sidebar layout and mobile drawer |
| `home.css` | 79 | Toggle button, mobile grid override |
| `header.css` | 32 | Hero section styles |
| `cards.css` | 110 | Card component with hover effects |
| `board.css` | 35 | Board header/footer |
| `theme-toggle.css` | 205 | Theme switcher component |
| `effects.css` | 26 | Clip-path animations |
| `icons.css` | 89 | Icon styling with shadows |
| `glass.css` | 77 | Glass morphism panels |
| `utilities.css` | 11 | Visually hidden helper |

**Total:** ~1,078 lines of authored CSS (excluding generated/vendor files)

---

## Development Notes

- Uses Vite for build/dev server (check `package.json` for scripts)
- CSS processed through lightningcss (see `vite.config.js`)
- Import order matters: tokens → base → components → utilities
- Always use design tokens instead of hardcoded values
- Mobile breakpoint: 768px (tablets and below)
- Max content width: 1400px
- Sidebar width: 280px (fixed)

---

## Compiled Home Page CSS Reference

This section provides the complete effective CSS applied to the home page after all imports and cascade resolution.

### CSS Import Chain

The home page receives styles from these files (in order):

1. `src/css/tokens/colors.css` - Color design tokens
2. `src/css/tokens/variables.css` - Spacing, typography, shadows
3. `src/css/tokens/fonts.css` - Custom font faces
4. `src/css/base/reset.css` - Box-sizing reset
5. `src/css/base/elements.css` - Base HTML element styles
6. `src/css/components/page.css` - Sidebar layout and mobile drawer
7. `src/css/components/pages/home.css` - Menu toggle button
8. `src/css/components/header.css` - Hero section
9. `src/css/components/cards.css` - Card components
10. `src/css/components/board.css` - Board header/footer
11. `src/css/utilities/utilities.css` - Utility classes

### Key Selectors & Final Styles

#### Page Layout
```css
.page-layout {
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: var(--space-lg);
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 var(--space-md);
    transition: grid-template-columns 0.3s ease;
}
```
**Source:** `page.css`

#### Sidebar (Desktop)
```css
.sidebar {
    background-color: var(--surface-color);
    padding: var(--space-lg);
    min-height: 100vh;
    border-radius: 0;
    border: none;
    border-right: 1px solid var(--border-color);
    transition: opacity 0.3s ease, visibility 0.3s;
}
```
**Source:** `page.css`

#### Sidebar (Mobile - 768px and below)
```css
.sidebar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 90;
    width: 280px;
    height: 100vh;
    max-height: 100vh;
    border-radius: 0;
    border-top: none;
    border-bottom: none;
    border-left: none;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    overflow-y: auto;
}

body:not(.sidebar-closed) .sidebar {
    transform: translateX(0);
    box-shadow: 2px 0 10px rgba(0,0,0,0.1);
}
```
**Source:** `page.css`

#### Sidebar Closed State
```css
body.sidebar-closed .sidebar {
    opacity: 0;
    visibility: hidden;
    padding: 0;
    pointer-events: none;
}

body.sidebar-closed .page-layout {
    grid-template-columns: 1fr;
}
```
**Source:** `page.css`

#### Sidebar Backdrop (Mobile Only)
```css
.sidebar-backdrop {
    display: none;
}

@media (max-width: 768px) {
    .sidebar-backdrop {
        display: block;
        position: fixed;
        inset: 0;
        z-index: 85;
        background: rgba(0,0,0,0.5);
        opacity: 1;
        pointer-events: auto;
        transition: opacity 0.3s;
    }

    body.sidebar-closed .sidebar-backdrop {
        opacity: 0;
        pointer-events: none;
    }
}
```
**Source:** `page.css`

#### Menu Toggle Button (Hamburger)
```css
.menu-toggle {
    position: fixed;
    top: 1rem;
    left: 1rem;
    z-index: 1000;
    background-color: var(--surface-color);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    cursor: pointer;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-sm);
    transition: background-color var(--transition-base);
}

.menu-toggle:hover {
    background-color: var(--bg-color);
}
```
**Source:** `home.css`

#### Hamburger Icon Animation
```css
.hamburger-icon {
    display: block;
    width: 24px;
    height: 3px;
    background-color: var(--text-color);
    position: relative;
    border-radius: 2px;
}

.hamburger-icon::before,
.hamburger-icon::after {
    content: "";
    position: absolute;
    left: 0;
    width: 24px;
    height: 3px;
    background-color: var(--text-color);
    border-radius: 2px;
    transition: transform 0.2s ease, top 0.2s ease;
}

.hamburger-icon::before { top: -8px; }
.hamburger-icon::after { top: 8px; }

/* Open state (aria-expanded="true") */
.menu-toggle[aria-expanded="true"] .hamburger-icon::before {
    transform: rotate(45deg);
    top: 0;
}

.menu-toggle[aria-expanded="true"] .hamburger-icon::after {
    transform: rotate(-45deg);
    top: 0;
}

.menu-toggle[aria-expanded="true"] .hamburger-icon {
    background-color: transparent;
}
```
**Source:** `home.css`

#### Hero Section
```css
.hero {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    padding: var(--space-xl);
    text-align: center;
}

.hero__title {
    font-size: var(--font-size-display-sm);
    margin-bottom: 0.5rem;
    color: var(--title-color);
    line-height: var(--line-height-display);
}

.hero__subtitle {
    font-weight: var(--font-semibold);
    color: var(--accent-color);
    margin-bottom: 1.5rem;
    font-size: var(--font-size-lg);
}
```
**Source:** `header.css`

#### Card Group & Cards
```css
.card-group {
    margin-bottom: var(--space-xl);
}

.card-group h2 {
    font-size: clamp(var(--font-size-md), 3vw, var(--font-size-lg));
    font-weight: var(--font-semibold);
    line-height: var(--line-height);
    margin-bottom: var(--space-md);
    color: var(--text-color);
}

.cards {
    display: grid;
    gap: var(--space-md);
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.card {
    background-color: var(--surface-color);
    padding: var(--space-md);
    border-radius: var(--radius-lg);
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow-sm);
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    transition: transform var(--transition-base), box-shadow var(--transition-base), border-color var(--transition-base);
}

.card:hover {
    transform: translateY(-4px);
    border-color: var(--primary-color);
    box-shadow: var(--shadow-md);
}

.card h3 {
    color: var(--text-color);
    font-size: clamp(1.1rem, 2vw, 1.4rem);
    font-weight: var(--font-bold);
}

.card p {
    font-size: var(--font-size-sm);
    font-weight: var(--font-regular);
    color: var(--text-muted);
    line-height: var(--line-height);
}
```
**Source:** `cards.css`

#### Base Styles (Applied Globally)
```css
body {
    font-family: var(--font-family-body);
    font-size: var(--font-size-md);
    line-height: var(--line-height-body);
    color: var(--text-color);
    background-color: var(--bg-color);
    padding: var(--space-md);
}

main {
    max-width: 1200px;
    margin: 0 auto;
    padding: var(--space-lg);
}

h2 {
    text-transform: uppercase;
    font-family: var(--font-family-heading);
    font-size: var(--font-size-lg);
    color: var(--title-color);
    line-height: var(--line-height-heading);
    font-weight: var(--font-semibold);
    margin-bottom: var(--space-md);
}

h3 {
    text-transform: uppercase;
    font-family: var(--font-family-heading);
    font-size: var(--font-size-md);
    line-height: var(--line-height-heading);
    margin-bottom: var(--space-sm);
}

a {
    color: var(--link-color);
}

a:hover {
    color: var(--link-hover-color);
}

ul {
    list-style: none;
}

li {
    margin-bottom: var(--space-sm);
}
```
**Sources:** `elements.css`, `reset.css`

### Design Token Values (Current Theme)

```css
/* Colors */
--surface-color: #f5f5f5;
--bg-color: #ffffff;
--text-color: #111111;
--text-muted: #555555;
--title-color: #1f7a4c;
--accent-color: #22c55e;
--link-color: #1a73e8;
--link-hover-color: #1558b0;
--border-color: #e5e5e5;

/* Spacing */
--space-md: clamp(1rem, 0.73rem + 1.36vw, 1.5rem);
--space-lg: clamp(1.5rem, 1.05rem + 2.27vw, 2.33rem);
--space-xl: clamp(2rem, 1.27rem + 3.64vw, 3.33rem);

/* Typography */
--font-family-heading: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
--font-family-body: Georgia, Cambria, "Times New Roman", Times, serif;
--font-size-display-sm: clamp(2.25rem, 1.95rem + 2.73vw, 3.7rem);
--font-size-lg: clamp(1.25rem, 1.14rem + 0.57vw, 1.5rem);
--line-height-display: 1.1;
--line-height-heading: 1.25;
--line-height-body: 1.6;

/* Effects */
--transition-base: 0.2s ease;
--shadow-sm: 0 1px 2px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.05);
```
**Sources:** `colors.css`, `variables.css`

### Complete Raw CSS Files

For the complete source CSS, refer to these files:

- `src/css/tokens/colors.css` (48 lines)
- `src/css/tokens/variables.css` (89 lines)
- `src/css/tokens/fonts.css` (23 lines)
- `src/css/base/reset.css` (10 lines)
- `src/css/base/elements.css` (71 lines)
- `src/css/components/page.css` (74 lines)
- `src/css/components/pages/home.css` (79 lines)
- `src/css/components/header.css` (32 lines)
- `src/css/components/cards.css` (110 lines)
- `src/css/components/board.css` (35 lines)
- `src/css/utilities/utilities.css` (11 lines)

**Total:** ~582 lines of authored CSS affecting the home page
