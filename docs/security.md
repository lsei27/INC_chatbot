# Bezpečnostní opatření

## 🔐 Ochrana API klíčů

### Environment proměnné
API klíče jsou uloženy v environment proměnných a **nikdy** nejsou součástí kódu:

```bash
# config/.env (NIKDY necommitovat!)
OPENAI_API_KEY=sk-your-secret-key-here
OPENAI_ORG_ID=org-your-org-id
OPENAI_ASSISTANT_ID=asst-your-assistant-id
```

### .gitignore
Citlivé soubory jsou vyloučeny z Git repozitáře:
- `config/.env`
- `*.key`
- `*.pem`
- `secrets/`

### Validace
Při spuštění se kontroluje:
- Přítomnost povinných proměnných
- Správný formát API klíče (`sk-`)
- Správný formát Assistant ID (`asst_`)

## 🛡️ Bezpečnostní opatření

### Rate Limiting
- 100 požadavků za 15 minut na IP adresu
- Ochrana proti DDoS útokům

### CORS
- Konfigurované pouze pro frontend doménu
- Credentials povoleny pro autentifikaci

### Helmet
- HTTP hlavičky pro bezpečnost
- XSS ochrana
- Content Security Policy

### Error Handling
- Citlivé informace se nezobrazují v produkci
- Generické chybové zprávy pro uživatele
- Detailní logy pouze v development módu

## 📋 Checklist pro nasazení

### Development
- [ ] Vytvořit `config/.env` z `config/env.example`
- [ ] Vyplnit OpenAI API klíče
- [ ] Otestovat připojení k OpenAI
- [ ] Zkontrolovat, že `.env` není v Git

### Produkce
- [ ] Nastavit environment proměnné na serveru
- [ ] Použít HTTPS
- [ ] Nastavit správné CORS origin
- [ ] Monitoring a logy
- [ ] Backup API klíčů

## 🚨 Varování

### Nikdy nedělat:
- ❌ Commitovat `.env` soubory
- ❌ Zobrazovat API klíče v logách
- ❌ Posílat klíče přes email
- ❌ Ukládat klíče v kódu
- ❌ Používat stejné klíče pro development a produkci

### Vždy dělat:
- ✅ Používat environment proměnné
- ✅ Rotovat API klíče pravidelně
- ✅ Monitorovat použití API
- ✅ Používat HTTPS v produkci
- ✅ Backup klíčů na bezpečném místě

## 🔄 Rotace klíčů

### Kdy rotovat:
- Každých 90 dní
- Při podezření na kompromitaci
- Při změně zaměstnanců
- Při změně přístupových práv

### Postup:
1. Vytvořit nový API klíč v OpenAI
2. Aktualizovat environment proměnné
3. Restartovat aplikaci
4. Otestovat funkčnost
5. Smazat starý klíč

## 📞 Incident Response

### Při kompromitaci klíče:
1. **Okamžitě** deaktivovat klíč v OpenAI
2. Vytvořit nový klíč
3. Aktualizovat všechny systémy
4. Prozkoumat logy pro neoprávněné použití
5. Nahlásit incident

### Kontakty:
- OpenAI Support: https://help.openai.com/
- Security Team: security@yourcompany.com 