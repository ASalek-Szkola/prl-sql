# PRL SQL

Gra edukacyjno-rozrywkowa symulujaca baze danych z czasow PRL.

## Wymagania

- Node.js 20+

## Uruchomienie lokalne

```bash
npm install
npm run dev
```

## Dialekt PRL SQL

- WYBIERZ -> SELECT
- WSZYSTKO -> *
- Z -> FROM
- GDZIE -> WHERE
- I -> AND
- LUB -> OR
- WSTAW DO -> INSERT INTO
- WARTOSCI -> VALUES

## Przyklady

```sql
WYBIERZ WSZYSTKO Z towary
WYBIERZ nazwa, cena Z towary GDZIE na_kartki = 1
WSTAW DO towary (nazwa, kategoria, cena, na_kartki) WARTOSCI ('Sok', 'napoje', 12, 0)
```

## Uwagi

- Baza danych dziala w pamieci (in-memory) i resetuje sie po restarcie serwera.
- Plik public/jaruzelski-placeholder.svg jest placeholderem i powinien zostac podmieniony na wlasne zdjecie.
