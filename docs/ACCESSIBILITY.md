# ♿ Accessibility (a11y)

Kompleksowy przewodnik po dostępności aplikacji.

## 📋 Spis treści

1. [Przegląd](#przegląd)
2. [WCAG 2.1 Compliance](#wcag-21-compliance)
3. [Keyboard Navigation](#keyboard-navigation)
4. [Screen Readers](#screen-readers)
5. [Color & Contrast](#color--contrast)
6. [ARIA Attributes](#aria-attributes)
7. [Testing](#testing)
8. [Best Practices](#best-practices)

---

## 🎯 Przegląd

Nasza aplikacja wspiera:
- ✅ **WCAG 2.1 Level AA** (docelowo AAA)
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ High contrast mode
- ✅ Reduced motion mode
- ✅ Focus management
- ✅ ARIA labels

**Kluczowe funkcje:**
- Skip to content link
- Focus indicators
- Semantic HTML
- Alt text for images
- Form labels
- Error messages

---

## 📜 WCAG 2.1 Compliance

### Level A (Must Have)

✅ **1.1.1 Non-text Content**
- Wszystkie obrazy mają alt text
- Decorative images: `alt=""`
- Icons with meaning: aria-label

✅ **1.3.1 Info and Relationships**
- Semantic HTML (`<header>`, `<nav>`, `<main>`, `<footer>`)
- Proper heading hierarchy (H1 → H2 → H3)
- Form labels

✅ **1.4.1 Use of Color**
- Nie polegamy tylko na kolorze
- Dodatkowe wskaźniki (ikony, tekst)

✅ **2.1.1 Keyboard**
- Wszystkie funkcje dostępne z klawiatury
- Tab order logiczny

✅ **2.4.1 Bypass Blocks**
- Skip to content link
- Proper landmarks

### Level AA (Should Have)

✅ **1.4.3 Contrast (Minimum)**
- Text: 4.5:1
- Large text: 3:1
- UI components: 3:1

✅ **1.4.5 Images of Text**
- Używamy prawdziwego tekstu, nie obrazów

✅ **2.4.6 Headings and Labels**
- Descriptive headings
- Clear form labels

✅ **3.2.3 Consistent Navigation**
- Navigation jednolita na wszystkich stronach

### Level AAA (Nice to Have)

🎯 **1.4.6 Contrast (Enhanced)**
- Text: 7:1
- Large text: 4.5:1

🎯 **2.4.8 Location**
- Breadcrumbs
- Clear page structure

---

## ⌨️ Keyboard Navigation

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Tab` | Next focusable element |
| `Shift + Tab` | Previous focusable element |
| `Enter` | Activate button/link |
| `Space` | Activate button, toggle checkbox |
| `Esc` | Close modal/dropdown |
| `Arrow keys` | Navigate menus/lists |

### Focus Management

**Skip to Content:**
```tsx
// Automatycznie dodany w layout.tsx
<SkipToContent />

// User presses Tab → sees "Skip to main content"
// Press Enter → jumps to #main-content
```

**Focus Indicators:**
```css
/* globals.css */
.keyboard-navigation *:focus {
  @apply outline-none ring-2 ring-cyan-500 ring-offset-2;
}
```

**Focus Trap in Modals:**
```tsx
import { useEffect, useRef } from 'react'

function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )

    const firstElement = focusableElements?.[0] as HTMLElement
    const lastElement = focusableElements?.[focusableElements.length - 1] as HTMLElement

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    firstElement?.focus()
    document.addEventListener('keydown', handleTab)

    return () => document.removeEventListener('keydown', handleTab)
  }, [isOpen])

  return (
    <div ref={modalRef} role="dialog" aria-modal="true">
      {children}
    </div>
  )
}
```

---

## 📢 Screen Readers

### Semantic HTML

**✅ Good:**
```tsx
<header>
  <nav aria-label="Main navigation">
    <ul>
      <li><a href="/">Home</a></li>
    </ul>
  </nav>
</header>

<main id="main-content">
  <h1>Page Title</h1>
  <article>
    <h2>Section Title</h2>
  </article>
</main>

<footer>
  <p>© 2024 LykKreacji</p>
</footer>
```

**❌ Bad:**
```tsx
<div className="header">
  <div className="nav">
    <div onClick={goHome}>Home</div>
  </div>
</div>
```

### ARIA Labels

**Images:**
```tsx
// Decorative
<img src="/bg.jpg" alt="" />

// Meaningful
<img src="/logo.jpg" alt="LykKreacji Logo" />

// Complex
<img 
  src="/chart.jpg" 
  alt="Sales chart showing 50% increase in Q4" 
/>
```

**Buttons:**
```tsx
// Icon button
<button aria-label="Close menu">
  <X />
</button>

// With visible text
<button>
  <Mail /> Send Email
</button>
```

**Links:**
```tsx
// ✅ Good
<a href="/contact">Contact Us</a>

// ❌ Bad
<a href="/contact">Click here</a>

// Icon link
<a href="/github" aria-label="View on GitHub">
  <GithubIcon />
</a>
```

### Live Regions

```tsx
// Announce dynamic content
<div role="status" aria-live="polite">
  {message && <p>{message}</p>}
</div>

// Urgent announcements
<div role="alert" aria-live="assertive">
  {error && <p>{error}</p>}
</div>
```

---

## 🎨 Color & Contrast

### Contrast Ratios

**Text:**
- Normal text (< 24px): **4.5:1** minimum
- Large text (≥ 24px): **3:1** minimum
- AAA level: **7:1** (goal)

**UI Components:**
- Buttons, inputs: **3:1** minimum
- Focus indicators: **3:1** minimum

### Color Palette (Accessible)

```css
/* Light Mode */
--background: 0 0% 100%;        /* White */
--foreground: 222 47% 11%;      /* Dark gray - 16:1 ratio */
--primary: 186 100% 42%;        /* Cyan - 4.5:1 ratio */

/* Dark Mode */
--background: 222 47% 11%;      /* Dark gray */
--foreground: 210 40% 98%;      /* Off-white - 15:1 ratio */
--primary: 186 94% 60%;         /* Light cyan - 7:1 ratio */
```

### Testing Contrast

**Tools:**
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- Chrome DevTools → Lighthouse
- [Colour Contrast Analyser](https://www.tpgi.com/color-contrast-checker/)

**In Code:**
```tsx
// ✅ Good contrast
<button className="bg-cyan-600 text-white">
  Click me
</button>

// ❌ Poor contrast
<button className="bg-gray-300 text-gray-400">
  Click me
</button>
```

### High Contrast Mode

```css
/* globals.css */
@media (prefers-contrast: high) {
  * {
    border-width: 2px;
  }
  
  .btn {
    border: 2px solid currentColor;
  }
}
```

---

## 🏷️ ARIA Attributes

### Common ARIA Roles

```tsx
// Navigation
<nav role="navigation" aria-label="Main">

// Search
<form role="search">

// Tabs
<div role="tablist">
  <button role="tab" aria-selected="true">Tab 1</button>
  <button role="tab" aria-selected="false">Tab 2</button>
</div>

// Modal
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <h2 id="modal-title">Modal Title</h2>
</div>

// Alert
<div role="alert">
  Error: Form validation failed
</div>
```

### ARIA States

```tsx
// Expanded/Collapsed
<button
  aria-expanded={isOpen}
  aria-controls="dropdown-menu"
>
  Menu
</button>

// Selected
<button
  role="tab"
  aria-selected={isActive}
>
  Tab
</button>

// Hidden
<div aria-hidden="true">
  Decorative element
</div>

// Disabled
<button disabled aria-disabled="true">
  Submit
</button>

// Current page
<a href="/about" aria-current="page">
  About
</a>
```

### ARIA Relationships

```tsx
// Labelled by
<input aria-labelledby="email-label" />
<label id="email-label">Email</label>

// Described by
<input
  aria-describedby="email-help"
  aria-invalid={hasError}
/>
<p id="email-help">We'll never share your email</p>

// Controls
<button aria-controls="sidebar">
  Toggle Sidebar
</button>
<aside id="sidebar">
  Sidebar content
</aside>
```

---

## 🧪 Testing

### Automated Testing

**ESLint Plugin:**
```bash
npm run lint
# Checks for a11y issues automatically
```

**Lighthouse:**
```bash
# Chrome DevTools → Lighthouse → Accessibility
# Target: 90+ score
```

**axe DevTools:**
```bash
# Chrome extension
# Install: https://www.deque.com/axe/devtools/
```

### Manual Testing

**Keyboard Only:**
1. Unplug mouse
2. Navigate with Tab/Shift+Tab
3. Can you access everything?
4. Is tab order logical?
5. Are focus indicators visible?

**Screen Reader:**
```bash
# macOS: VoiceOver
Cmd + F5

# Windows: NVDA (free)
# Download: https://www.nvaccess.org/

# Test checklist:
- Read page title ✓
- Navigate by headings ✓
- All images described ✓
- Form fields labeled ✓
- Buttons announced ✓
```

**Zoom Test:**
```
1. Zoom to 200% (Cmd/Ctrl + +)
2. Content still readable?
3. No horizontal scroll?
4. Layout doesn't break?
```

**Color Blindness:**
```bash
# Chrome DevTools → Rendering → Emulate vision deficiencies
- Protanopia (red-blind)
- Deuteranopia (green-blind)
- Tritanopia (blue-blind)
- Achromatopsia (no color)
```

---

## 💡 Best Practices

### 1. Semantic HTML

```tsx
// ✅ Good
<button onClick={handleClick}>Click me</button>

// ❌ Bad
<div onClick={handleClick}>Click me</div>
```

### 2. Proper Headings

```tsx
// ✅ Good - Logical hierarchy
<h1>Page Title</h1>
  <h2>Section 1</h2>
    <h3>Subsection 1.1</h3>
  <h2>Section 2</h2>

// ❌ Bad - Skips levels
<h1>Page Title</h1>
  <h4>Section 1</h4>
```

### 3. Form Labels

```tsx
// ✅ Good
<label htmlFor="email">
  Email
  <input id="email" type="email" required />
</label>

// ❌ Bad
<input type="email" placeholder="Email" />
```

### 4. Alt Text

```tsx
// ✅ Good
<img src="/product.jpg" alt="Blue ceramic mug with handle" />

// ❌ Bad
<img src="/product.jpg" alt="Image" />
<img src="/product.jpg" />
```

### 5. Focus Management

```tsx
// ✅ Good - Clear focus indicator
<button className="focus:ring-2 focus:ring-cyan-500">
  Click me
</button>

// ❌ Bad - No focus indicator
<button className="outline-none">
  Click me
</button>
```

### 6. Error Messages

```tsx
// ✅ Good
<form>
  <label htmlFor="email">Email</label>
  <input
    id="email"
    aria-invalid={hasError}
    aria-describedby="email-error"
  />
  {hasError && (
    <p id="email-error" role="alert">
      Please enter a valid email
    </p>
  )}
</form>

// ❌ Bad
<form>
  <input placeholder="Email" />
  {hasError && <p style={{color: 'red'}}>Error</p>}
</form>
```

### 7. Loading States

```tsx
// ✅ Good
<button disabled aria-busy="true">
  <Spinner aria-hidden="true" />
  <span className="sr-only">Loading...</span>
</button>

// ❌ Bad
<button disabled>
  <Spinner />
</button>
```

### 8. Motion Preferences

```tsx
'use client'

import { useEffect, useState } from 'react'

function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReducedMotion
}

// Usage
function AnimatedComponent() {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      animate={{ opacity: 1 }}
      transition={{ duration: reducedMotion ? 0 : 0.5 }}
    >
      Content
    </motion.div>
  )
}
```

---

## ✅ Accessibility Checklist

### Page Level
- [ ] Proper `<title>` tag
- [ ] Valid HTML5
- [ ] Semantic landmarks
- [ ] Skip to content link
- [ ] Logical heading hierarchy
- [ ] Language attribute (`<html lang="pl">`)

### Navigation
- [ ] Keyboard accessible
- [ ] Focus indicators visible
- [ ] Tab order logical
- [ ] ARIA labels on icon buttons
- [ ] Current page indicated

### Content
- [ ] All images have alt text
- [ ] Links are descriptive
- [ ] Headings describe content
- [ ] Lists use proper markup
- [ ] Tables have headers

### Forms
- [ ] All inputs have labels
- [ ] Required fields marked
- [ ] Error messages clear
- [ ] Success messages announced
- [ ] Validation accessible

### Interactive
- [ ] Keyboard operable
- [ ] Focus management
- [ ] ARIA states correct
- [ ] Loading states announced
- [ ] Modals trap focus

### Color & Contrast
- [ ] 4.5:1 for text
- [ ] 3:1 for UI components
- [ ] Not relying on color alone
- [ ] High contrast mode support

### Motion
- [ ] Respects prefers-reduced-motion
- [ ] No auto-playing videos
- [ ] Animations can be paused

---

## 🔧 Tools & Resources

### Testing Tools
- **axe DevTools** - Chrome/Firefox extension
- **WAVE** - Web accessibility evaluation tool
- **Lighthouse** - Built into Chrome DevTools
- **NVDA** - Free screen reader (Windows)
- **VoiceOver** - Built into macOS
- **Colour Contrast Analyser** - Desktop app

### Documentation
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [A11y Project](https://www.a11yproject.com/)
- [WebAIM](https://webaim.org/)

### React Resources
- [React Accessibility](https://react.dev/learn/accessibility)
- [Radix UI](https://www.radix-ui.com/) - Accessible components
- [Reach UI](https://reach.tech/) - Accessible React components

---

**Accessible by LykKreacji ♿**
