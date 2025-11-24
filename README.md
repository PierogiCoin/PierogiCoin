# 🎯 LykKreacji - Professional Web Platform

Enterprise-grade Next.js 14 application with complete development infrastructure, monitoring, and security.

![Next.js](https://img.shields.io/badge/Next.js-14.2.2-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)
![Tests](https://img.shields.io/badge/Tests-Passing-success?style=for-the-badge)
![Coverage](https://img.shields.io/badge/Coverage-80%25-success?style=for-the-badge)

---

## ✨ Features

### Core
- 🚀 **Blazing Fast** - Next.js 14 with App Router & SSR
- 🎨 **Modern Design** - Tailwind CSS + GSAP animations
- 📱 **Fully Responsive** - Mobile to 4K displays
- 🌓 **Dark/Light Mode** - Automatic theme switching
- 📊 **SEO Optimized** - Perfect meta tags & structured data
- 💌 **Contact Forms** - Email integration (Resend/Gmail)
- 🤖 **AI Calculator** - Google Gemini integration
- 🎭 **Smooth Animations** - GSAP + Framer Motion

### Development Infrastructure
- 🧪 **Testing** - Jest + React Testing Library
- 🪝 **Pre-commit Hooks** - Husky + lint-staged
- 📦 **Bundle Analysis** - Size optimization tools
- ✅ **Type Safety** - Zod validation + TypeScript
- 🔍 **Code Quality** - ESLint + Prettier

### Security & Performance
- 🚦 **Rate Limiting** - API protection (Upstash Redis)
- 🛡️ **Error Handling** - Comprehensive error boundaries
- 📊 **Performance Monitoring** - Web Vitals tracking
- ♿ **Accessibility** - WCAG 2.1 AA compliance
- 🔐 **Environment Validation** - Type-safe env vars

### Monitoring
- 📈 **Analytics** - Vercel Analytics + Google Analytics
- ⚡ **Speed Insights** - Real-time performance data
- 🐛 **Error Tracking** - Automatic error reporting
- 📉 **Bundle Monitoring** - Size regression detection

---

## 🚀 Quick Start

```bash
# 1. Clone & Install
git clone https://github.com/your-org/lykkreea.git
cd lykkreea
npm install

# 2. Environment Setup
cp .env.example .env.local
# Edit .env.local with your API keys

# 3. Run Development Server
npm run dev
# Open http://localhost:3000

# 4. Run Tests
npm test

# 5. Build for Production
npm run build
```

---

## 📁 Project Structure

```
lykkreea/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   ├── error.tsx          # Error page
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── ui/               # Base UI components
│   │   ├── sections/         # Page sections
│   │   ├── ErrorBoundary.tsx
│   │   ├── SkipToContent.tsx
│   │   └── ...
│   ├── lib/                   # Utilities
│   │   ├── env.ts            # Environment validation
│   │   ├── rateLimit.ts      # Rate limiting
│   │   ├── errorTracking.ts  # Error tracking
│   │   └── webVitals.ts      # Performance
│   ├── hooks/                 # Custom hooks
│   └── __tests__/            # Test files
├── docs/                      # Documentation
│   ├── TESTING.md
│   ├── PERFORMANCE.md
│   ├── DEPLOYMENT.md
│   └── ...
├── scripts/                   # Build scripts
├── public/                    # Static files
└── package.json
```

See [ARCHITECTURE.md](docs/ARCHITECTURE.md) for detailed structure.

---

## 🔧 Configuration

### Required Environment Variables

```env
# AI Configuration (REQUIRED)
GEMINI_API_KEY=your_gemini_api_key

# Email (REQUIRED - choose one)
RESEND_API_KEY=re_xxx
# OR
EMAIL_SERVER_USER=your@gmail.com
EMAIL_SERVER_PASSWORD=your_app_password

EMAIL_TO=czesc@lykkreacji.pl
```

### Optional Environment Variables

```env
# Rate Limiting (Production)
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxx

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLARITY_ID=xxx

# Admin
ADMIN_SECRET=your_secret_here
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
npm run dev                 # Start dev server (localhost:3000)
npm run lint               # Run ESLint checks
npm run format             # Format code with Prettier

# Testing
npm test                   # Run tests
npm run test:watch         # Watch mode
npm run test:coverage      # Coverage report

# Production
npm run build              # Production build
npm start                  # Start production server

# Analysis
npm run analyze            # Bundle analysis (visual)
npm run analyze:report     # Bundle report (text)

# Deployment
vercel                     # Preview deploy
vercel --prod             # Production deploy
```

---

## 🎨 Customization

### Colors

Edit `tailwind.config.ts` or `src/app/globals.css`:

```css
/* Brand colors */
--primary: cyan (#06B6D4)
--secondary: teal (#14B8A6)
--background: navy (#0B1121)
```

### Content

1. **Hero** - `src/components/sections/Hero.tsx`
2. **Services** - `src/components/sections/Services.tsx`
3. **Portfolio** - Add projects in component
4. **Contact** - Update data in `Contact.tsx`

### Meta Tags

Edit `src/app/layout.tsx`:
- Title
- Description
- Keywords
- Open Graph
- Twitter Cards

---

## 📚 Documentation

Complete documentation available in `/docs`:

- **[TESTING.md](docs/TESTING.md)** - Testing guide
- **[PRE-COMMIT.md](docs/PRE-COMMIT.md)** - Git hooks
- **[PERFORMANCE.md](docs/PERFORMANCE.md)** - Performance monitoring
- **[ERROR-HANDLING.md](docs/ERROR-HANDLING.md)** - Error handling
- **[RATE-LIMITING.md](docs/RATE-LIMITING.md)** - API security
- **[ENVIRONMENT.md](docs/ENVIRONMENT.md)** - Environment variables
- **[BUNDLE-ANALYSIS.md](docs/BUNDLE-ANALYSIS.md)** - Bundle optimization
- **[ACCESSIBILITY.md](docs/ACCESSIBILITY.md)** - a11y guidelines
- **[ARCHITECTURE.md](docs/ARCHITECTURE.md)** - System architecture
- **[DEPLOYMENT.md](docs/DEPLOYMENT.md)** - Deployment guide
- **[CHANGELOG.md](CHANGELOG.md)** - Version history
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Contribution guidelines

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage

# Target coverage: 80%+
```

**Test Stack:**
- Jest - Test runner
- React Testing Library - Component testing
- @testing-library/jest-dom - Custom matchers

---

## 🚦 CI/CD

### Pre-commit Hooks

Automatically runs on `git commit`:
- ✅ ESLint
- ✅ Prettier
- ✅ TypeScript
- ✅ Tests (changed files)

### Continuous Integration

Vercel automatically runs on push:
- ✅ Build
- ✅ Lint
- ✅ Type check
- ⚠️ Lighthouse
- ⚠️ Bundle size

---

## 📊 Performance Targets

### Lighthouse Scores
- **Performance**: 95+
- **Accessibility**: 95+
- **Best Practices**: 100
- **SEO**: 100

### Web Vitals
- **LCP**: < 2.5s
- **INP**: < 200ms
- **CLS**: < 0.1
- **FCP**: < 1.8s
- **TTFB**: < 800ms

### Bundle Sizes
- **First Load JS**: < 200 kB
- **Route**: < 100 kB

---

## 🔒 Security

### Features
- ✅ Rate limiting (API protection)
- ✅ Input validation (Zod schemas)
- ✅ CSRF protection
- ✅ Security headers (CSP, HSTS)
- ✅ Environment validation
- ✅ Error sanitization

### Rate Limits
- Contact form: 3 req/min
- Calculator: 5 req/min
- Default API: 10 req/10s

---

## ♿ Accessibility

### WCAG 2.1 Compliance
- ✅ **Level A** - Required
- ✅ **Level AA** - Target
- 🎯 **Level AAA** - Goal

### Features
- Keyboard navigation
- Screen reader support
- Skip to content link
- Focus management
- High contrast mode
- Reduced motion support
- ARIA labels

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
