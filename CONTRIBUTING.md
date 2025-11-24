# 🤝 Contributing to LykKreacji

Dziękujemy za zainteresowanie projektem! 

## 📋 Przygotowanie środowiska

```bash
# 1. Fork & Clone
git clone https://github.com/YOUR_USERNAME/lykkreea.git
cd lykkreea

# 2. Instalacja
npm install

# 3. Konfiguracja
cp .env.example .env.local
# Edytuj .env.local z własnymi kluczami

# 4. Development
npm run dev
```

## 🔧 Git Workflow

### Branch naming
- `feat/` - nowa funkcjonalność
- `fix/` - naprawa błędu
- `docs/` - dokumentacja
- `refactor/` - refaktoryzacja
- `test/` - testy

Przykład: `feat/add-dark-mode`, `fix/button-alignment`

### Commit Convention

Używamy **Conventional Commits**:

```
<type>(<scope>): <description>

[optional body]
[optional footer]
```

**Types:**
- `feat`: Nowa funkcjonalność
- `fix`: Naprawa błędu
- `docs`: Dokumentacja
- `style`: Formatowanie (nie wpływa na kod)
- `refactor`: Refaktoryzacja
- `test`: Dodanie testów
- `chore`: Inne zmiany (build, deps)
- `perf`: Poprawa wydajności
- `ci`: Zmiany w CI/CD
- `revert`: Cofnięcie zmian

**Przykłady:**
```bash
feat(auth): add login functionality
fix(ui): resolve button alignment issue
docs: update README with new API
style: format code with prettier
refactor(calculator): simplify price logic
test(hero): add component tests
chore(deps): update dependencies
```

### Pre-commit Hooks

Automatycznie uruchamiane przy `git commit`:

1. **ESLint** - sprawdza kod
2. **Prettier** - formatuje kod
3. **Jest** - uruchamia związane testy
4. **Commit message** - waliduje format commita

## 🧪 Testing

```bash
# Uruchom wszystkie testy
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

**Wymagania:**
- Nowy kod musi mieć testy
- Wszystkie testy muszą przechodzić
- Coverage nie może spaść

## 📝 Code Style

Projekt używa ESLint + Prettier:

```bash
# Linting
npm run lint

# Format (automatycznie przez pre-commit)
npx prettier --write .
```

**Zasady:**
- TypeScript strict mode
- Functional components (React)
- Hooks zamiast class components
- Tailwind CSS (nie inline styles)
- Komentarze tylko gdzie niezbędne

## 🚀 Pull Request Process

1. **Create branch** z odpowiednią nazwą
2. **Implement changes** + testy
3. **Commit** zgodnie z konwencją
4. **Push** i utwórz PR
5. **Wait for review** i CI checks
6. **Address feedback** jeśli potrzebne
7. **Merge** po aprobacie

### PR Template

```markdown
## Opis
[Krótki opis zmian]

## Typ zmiany
- [ ] Bug fix
- [ ] Nowa funkcjonalność
- [ ] Breaking change
- [ ] Dokumentacja

## Testy
- [ ] Dodano/zaktualizowano testy
- [ ] Wszystkie testy przechodzą
- [ ] Coverage OK

## Checklist
- [ ] Kod jest self-documenting
- [ ] Dokumentacja zaktualizowana
- [ ] Commits zgodne z konwencją
- [ ] Branch up-to-date z main
```

## 🐛 Bug Reports

Znalazłeś błąd? Utwórz Issue z:

- **Opis problemu**
- **Kroki do reprodukcji**
- **Oczekiwane zachowanie**
- **Screenshoty** (jeśli możliwe)
- **Środowisko** (browser, OS, Node version)

## 💡 Feature Requests

Propozycja nowej funkcjonalności?

1. Sprawdź czy nie ma już Issue
2. Opisz szczegółowo use case
3. Dodaj mockupy/wireframes jeśli możliwe
4. Wyjaśnij dlaczego to ważne

## 📞 Kontakt

- 📧 Email: czesc@lykkreacji.pl
- 💬 Discord: [link]
- 🐛 Issues: GitHub Issues

## 📄 License

Kontrybuując do projektu, zgadzasz się na licencję projektu.

---

**Dziękujemy za wkład! 🙏**
