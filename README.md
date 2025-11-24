# 🎯 LykKreacji - Landing Page

Profesjonalny landing page stworzony w Next.js 14 z fokusem na konwersję, performance i SEO.

![Next.js](https://img.shields.io/badge/Next.js-14.2.2-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)

---

## ✨ Features

- 🚀 **Błyskawiczna szybkość** - Next.js 14 z SSR
- 🎨 **Nowoczesny design** - Tailwind CSS + GSAP animations
- 📱 **Full responsive** - od mobile do 4K
- 🌓 **Dark/Light mode** - automatyczne przełączanie
- 📊 **SEO optimized** - perfekcyjne meta tags & structured data
- 💌 **Formularz kontaktowy** - integracja z EmailJS
- 🎭 **Smooth animations** - GSAP + Lenis smooth scroll
- ⚡ **Performance** - Lighthouse Score 90+

---

## 🚀 Quick Start

```bash
# 1. Instalacja
npm install

# 2. Konfiguracja .env.local
cp .env.example .env.local
# Edytuj .env.local i dodaj swoje klucze EmailJS

# 3. Uruchom development server
npm run dev

# Otwórz http://localhost:3000
```

---

## 📁 Struktura Projektu

```
lykkreea/
├── app/
│   ├── layout.tsx          # Root layout z meta tags
│   ├── page.tsx            # Strona główna
│   └── globals.css         # Style globalne
├── src/
│   ├── components/         # Komponenty React
│   │   ├── Hero.tsx        # Sekcja hero
│   │   ├── Services.tsx    # Korzyści
│   │   ├── Portfolio.tsx   # Realizacje
│   │   ├── Pricing.tsx     # Wycena
│   │   └── Contact.tsx     # Kontakt
│   ├── hooks/              # Custom hooks
│   └── store/              # Zustand store
├── public/
│   ├── images/             # Obrazy
│   └── sounds/             # Dźwięki
└── package.json
```

---

## 🔧 Konfiguracja

### Environment Variables

Stwórz plik `.env.local` w root projektu:

```env
# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

### EmailJS Setup

1. Zarejestruj się na [EmailJS.com](https://www.emailjs.com/)
2. Stwórz nowy Email Service
3. Stwórz Email Template
4. Skopiuj klucze do `.env.local`

---

## 📦 Scripts

```bash
# Development
npm run dev          # Start dev server (localhost:3000)

# Production
npm run build        # Build dla produkcji
npm start            # Start production server
npm run lint         # Linting (ESLint)

# Deploy
vercel              # Preview deploy
vercel --prod       # Production deploy
```

---

## 🎨 Customizacja

### Kolory

Edytuj `tailwind.config.ts` lub `app/globals.css`:

```css
/* Główne kolory brand */
--primary: cyan (#06B6D4)
--secondary: teal (#14B8A6)
--background: navy (#0B1121)
```

### Treść

1. **Hero** - `src/components/Hero.tsx`
2. **Korzyści** - `src/components/Services.tsx`
3. **Portfolio** - dodaj projekty w komponencie
4. **Kontakt** - zaktualizuj dane w `Contact.tsx`

### Meta Tags

Edytuj `app/layout.tsx`:
- Title
- Description
- Keywords
- Open Graph
- Twitter Cards

---

## 🚀 Deploy

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### Inne platformy:
- **Netlify** - automatic deploy z GitHub
- **AWS Amplify** - full AWS integration
- **Digital Ocean** - App Platform

📚 Szczegóły w [DEPLOY_CHECKLIST.md](./DEPLOY_CHECKLIST.md)

---

## 📊 Performance

### Lighthouse Scores (Target):
- **Performance**: 90+
- **SEO**: 95+
- **Accessibility**: 90+
- **Best Practices**: 95+

### Bundle Size:
- First Load JS: ~167 kB
- Route (app) /: ~79.5 kB

---

## 🛠️ Tech Stack

### Core:
- **Next.js 14** - React framework
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling

### Animations:
- **GSAP** - Advanced animations
- **Lenis** - Smooth scroll
- **@gsap/react** - GSAP React hooks

### UI Components:
- **Radix UI** - Accessible components
- **Lucide React** - Icons
- **Sonner** - Toast notifications

### Forms & Validation:
- **React Hook Form** - Form handling
- **EmailJS** - Email sending

### State Management:
- **Zustand** - Lightweight state

---

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 📖 Dokumentacja

- [LANDING_PAGE_INFO.md](./LANDING_PAGE_INFO.md) - Pełna dokumentacja
- [ZMIANY.md](./ZMIANY.md) - Lista zmian
- [DEPLOY_CHECKLIST.md](./DEPLOY_CHECKLIST.md) - Deploy checklist

---

## 🐛 Troubleshooting

### Port zajęty
```bash
lsof -ti:3000 | xargs kill -9
```

### Build errors
```bash
rm -rf .next node_modules
npm install
npm run build
```

### TypeScript errors
```bash
npm run lint
```

---

## 📞 Kontakt

**LykKreacji**  
Web Developer & Web3 Specialist

- 🌐 Website: [lykkreacji.pl](https://www.lykkreacji.pl)
- 📧 Email: czesc@lykkreacji.pl
- 📱 Phone: +48 790 629 497
- 📸 Instagram: [@lyk_kreacji](https://www.instagram.com/lyk_kreacji/)
- 👔 LinkedIn: [LykKreacji](https://www.linkedin.com/company/lykkreacji/?viewAsMember=true)
- 📘 Facebook: [LykKreacji](https://www.facebook.com/LykKreacji/)

---

## 📄 License

© 2025 LykKreacji. All rights reserved.

---

## 🙏 Credits

Built with ❤️ using:
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [GSAP](https://greensock.com/)
- [Vercel](https://vercel.com/)

---

**Made with 💙 by LykKreacji**

⭐ Star this repo if you like it!
