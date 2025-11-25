# 🚀 DEPLOYMENT GUIDE - GitHub + Vercel

## ✅ REKOMENDACJA: GitHub → Vercel (Auto Deploy)

**Dlaczego?**
- ✅ Automatyczny deploy przy push
- ✅ Preview URLs dla każdego PR
- ✅ Rollback w 1 klik
- ✅ Historia wszystkich deploymentów
- ✅ Team collaboration ready

---

## 📋 Krok 1: Przygotuj Repozytorium

```bash
# Sprawdź status
git status

# Dodaj wszystkie zmiany
git add .

# Commit
git commit -m "feat: Production ready - wszystkie funkcje działają

- ✅ Navigation (8 sekcji)
- ✅ Dark/Light mode
- ✅ Promo codes system (CHRISTMAS2024 aktywny)
- ✅ Admin panel (/admin/promo-codes)
- ✅ Tests (269/270 passed)
- 🎄 Ready to launch!"

# Push do GitHub
git push origin main
```

---

## 🔗 Krok 2: Połącz z Vercel

### Opcja A: Przez Dashboard (Łatwiejsza) ⭐
1. Idź na: **https://vercel.com**
2. Zaloguj się przez **GitHub**
3. Kliknij **"Add New Project"**
4. Wybierz repozytorium **`lykkreea`**
5. Kliknij **"Import"**
6. Gotowe! Auto deploy skonfigurowany ✅

### Opcja B: Przez CLI (Szybsza)
```bash
# Zainstaluj Vercel CLI
npm i -g vercel

# Login (otworzy przeglądarkę)
vercel login

# Deploy produkcyjny
vercel --prod
```

---

## ⚙️ Krok 3: Environment Variables

### W Vercel Dashboard:
**Settings → Environment Variables → Add**

```bash
# EMAIL (Resend) - Preferowane
RESEND_API_KEY=re_xxxxx
EMAIL_FROM=noreply@lykkreacji.pl
EMAIL_TO=czesc@lykkreacji.pl

# EMAIL (Gmail Fallback)
EMAIL_SERVER_USER=your@gmail.com
EMAIL_SERVER_PASSWORD=app_password_here

# AI
GEMINI_API_KEY=AIzaSyxxxxx

# Analytics (opcjonalnie)
NEXT_PUBLIC_GTM_ID=GTM-XXXXX
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
```

**⚠️ Ważne:** Po dodaniu zmiennych kliknij **"Redeploy"**

---

## 🌐 Krok 4: Własna Domena

### W Vercel Dashboard:
1. **Settings → Domains**
2. Dodaj: `lykkreacji.pl`
3. Dodaj: `www.lykkreacji.pl`
4. Kopiuj DNS records

### U Dostawcy Domeny (np. home.pl, OVH):
```
Type   Name   Value
----   ----   -----
A      @      76.76.21.21
CNAME  www    cname.vercel-dns.com
```

**⏱️ Propagacja DNS: 1-24 godziny**

---

## 🎯 Krok 5: Auto Deploy Configuration

### Vercel (automatycznie skonfigurowane):
```
✅ Production Branch: main
✅ Preview Branches: wszystkie inne
✅ Build Command: npm run build
✅ Output Directory: .next
✅ Install Command: npm install
✅ Node Version: 18.x
```

---

## ✅ Krok 6: Weryfikacja

### Sprawdź Live:
- [ ] Strona działa: https://your-project.vercel.app
- [ ] Popup świąteczny (CHRISTMAS2024) wyświetla się
- [ ] Kod promocyjny działa w kalkulatorze
- [ ] Formularz wysyła emaile
- [ ] Admin panel: /admin/promo-codes
- [ ] Dark/Light mode
- [ ] Mobile menu
- [ ] Wszystkie sekcje linkują

---

## 🔄 Workflow po Setupie

### Zwykły Development:
```bash
# 1. Pracuj lokalnie
npm run dev

# 2. Zmiany
git add .
git commit -m "feat: nowa funkcja"

# 3. Push
git push origin main

# ✨ Auto deploy na produkcję w ~2 min!
```

### Testuj przed Produkcją (Preview):
```bash
# 1. Utwórz branch
git checkout -b feature/test

# 2. Zmiany + commit
git add .
git commit -m "test: eksperymentalna funkcja"

# 3. Push brancha
git push origin feature/test

# ✨ Vercel tworzy preview URL!
# → Test bez wpływu na produkcję
# → Możesz pokazać klientowi
```

### Hotfix:
```bash
# Szybka poprawka błędu
git add .
git commit -m "fix: krytyczny błąd"
git push

# → Deploy w 2 minuty ⚡
```

---

## 📊 Porównanie Metod Deploymentu

| Metoda | Automatyzacja | Rollback | Preview | Team | Czas |
|--------|---------------|----------|---------|------|------|
| **GitHub + Vercel** | ✅ 100% | ✅ 1-klik | ✅ Auto | ✅ | ~2 min |
| **Vercel CLI** | ❌ Ręczne | ⚠️ Trudne | ❌ | ❌ | ~1 min |
| **FTP/cPanel** | ❌ | ❌ | ❌ | ❌ | ~10 min |

**Werdykt: GitHub + Vercel = WINNER 🏆**

---

## 📈 Monitoring po Deploy

### Vercel Dashboard:
```
✅ Analytics - ruch, geography, devices
✅ Logs - błędy, requesty, performance
✅ Deployments - historia, rollback
✅ Speed Insights - Core Web Vitals
```

### Aktualizacja Promocji:
```bash
# 1. Edytuj: src/data/promoConfig.ts
# Zmień: christmas.enabled = false
#       newYear.enabled = true

# 2. Commit + push
git add .
git commit -m "chore: activate NEWYEAR2025 promo"
git push

# 3. Auto deploy! 🎉
```

---

## 🆘 Troubleshooting

### ❌ Build Failed?
```bash
# Test lokalnie
npm run build

# Jeśli działa lokalnie:
# → Sprawdź Environment Variables w Vercel
# → Sprawdź Node version (Settings)
```

### ❌ 500 Error?
```bash
# Vercel Dashboard → Deployment → Logs
# Szukaj error stacktrace
# Fix + push
```

### ❌ Emails nie wysyłają?
```bash
# Sprawdź Environment Variables:
# → RESEND_API_KEY prawidłowy?
# → EMAIL_FROM zweryfikowany w Resend?
```

### ❌ Domena nie działa?
```bash
# Sprawdź DNS:
nslookup lykkreacji.pl

# Jeśli nie wskazuje na Vercel:
# → Poczekaj 24h na propagację
# → Sprawdź DNS records u dostawcy
```

---

## 🎁 Bonus: GitHub Actions (opcjonalnie)

### Auto Test przed Deployem:
```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm test
      - run: npm run build
```

Vercel automatycznie zaczeka na testy!

---

## 🎉 Podsumowanie

### Po setupie masz:
```
✅ Auto deploy (push = live)
✅ Preview URLs (każdy branch)
✅ Rollback w 1 klik
✅ Analytics built-in
✅ SSL automatyczny
✅ CDN globalny
✅ Zero downtime deploys
✅ Team collaboration
```

### Twój workflow:
```
Code → Commit → Push → Live (2 min)
```

**To jest profesjonalny setup! 🚀**

---

## 📞 Potrzebujesz Pomocy?

```
Vercel Docs: https://vercel.com/docs
Next.js Docs: https://nextjs.org/docs
Vercel Discord: https://vercel.com/discord
```

---

**SUKCESU Z DEPLOYMENTEM! 🎊**
