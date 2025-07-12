# Frontend Modul - Summary

## Popis
Frontend modul poskytuje moderní React aplikaci s chatovým rozhraním pro komunikaci s OpenAI asistentem.

## Struktura souborů

### Hlavní soubory
- `src/App.js` - Hlavní App komponenta
- `src/index.js` - Vstupní bod aplikace
- `package.json` - Závislosti a skripty

### Komponenty
- `components/Header.js` - Hlavička aplikace
- `components/ChatInterface.js` - Hlavní chat rozhraní
- `components/ChatMessage.js` - Zobrazování zpráv
- `components/ChatInput.js` - Vstupní pole pro zprávy

### Services
- `services/ChatService.js` - Komunikace s backend API

### Styly
- `src/index.css` - Globální styly
- `src/App.css` - Styly pro App komponentu
- `components/*.css` - Styly pro jednotlivé komponenty

## Funkcionality

### Chat Interface
- Moderní chat rozhraní s tmavým designem
- Automatické scrollování na nové zprávy
- Loading stavy a animace
- Responsivní design pro mobilní zařízení

### Zprávy
- Různé typy zpráv (user, assistant, error)
- Časové razítko pro každou zprávu
- Ikony pro různé role
- Animované zobrazení

### Input
- Auto-resize textarea
- Odesílání Enter klávesou
- Disabled stavy během načítání
- Status indikátory

### Komunikace s API
- Axios pro HTTP požadavky
- Error handling
- Timeout nastavení
- Health check

## Design Systém

### Barvy
- Primární: #0a84ff (modrá)
- Akcent: #30d158 (zelená)
- Pozadí: #18191A (tmavé)
- Text: #f2f2f7 (světlý)

### Komponenty
- Glassmorphism efekt
- Zaoblené rohy (18px)
- Smooth animace
- Hover efekty

## Responsivní Design
- Desktop: 1200px max-width
- Tablet: 768px breakpoint
- Mobile: 480px breakpoint

## Spuštění
```bash
cd frontend
npm install
npm start
```

## Build
```bash
npm run build
```

## Další kroky
1. Nastavit environment proměnné
2. Otestovat komunikaci s backend
3. Implementovat další funkce (historie, export)
4. Optimalizace pro produkci 