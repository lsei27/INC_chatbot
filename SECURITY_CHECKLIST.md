# 🔒 Bezpečnostní Checklist

## ✅ Kontrola před commitem

### Soubory s citlivými údaji
- [ ] `config/.env` je v `.gitignore`
- [ ] Žádné API klíče v kódu
- [ ] Žádné API klíče v dokumentaci
- [ ] Žádné API klíče v commit zprávách

### Kontrola souborů
```bash
# Zkontrolujte, zda .env není v Git
git status config/.env

# Hledejte API klíče v souborech
grep -r "sk-" . --exclude-dir=node_modules
grep -r "asst_" . --exclude-dir=node_modules
```

### Bezpečné soubory
- [ ] `config/env.example` - pouze template
- [ ] `setup-with-key.sh` - API klíč pouze v .env
- [ ] `SETUP_INSTRUCTIONS.md` - bez citlivých údajů

## 🚨 Co NIKDY nedělat

### ❌ Zakázané akce
- Commitovat `.env` soubory
- Zobrazovat API klíče v logách
- Posílat klíče přes email
- Ukládat klíče v kódu
- Používat stejné klíče pro dev/prod

### ✅ Povolené akce
- Používat environment proměnné
- Rotovat API klíče pravidelně
- Monitorovat použití API
- Používat HTTPS v produkci
- Backup klíčů na bezpečném místě

## 🔍 Kontrola bezpečnosti

### Automatické kontroly
```bash
# Spusťte bezpečnostní kontroly
npm audit
npm audit fix
```

### Manuální kontroly
- [ ] Žádné hardcoded klíče
- [ ] Správné CORS nastavení
- [ ] Rate limiting aktivní
- [ ] Error messages bezpečné

## 📞 Incident Response

### Při kompromitaci
1. **Okamžitě** deaktivovat klíč
2. Vytvořit nový klíč
3. Aktualizovat všechny systémy
4. Prozkoumat logy
5. Nahlásit incident

### Kontakty
- OpenAI Support: https://help.openai.com/
- Security Team: security@yourcompany.com 