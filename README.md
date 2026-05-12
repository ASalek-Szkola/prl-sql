# PRL SQL: Cyfrowa ewidencja absurdu. W 100% wygenerowana przez AI, w 100% napędzana kreatywnością ludzkiej głupoty

Gra edukacyjno-rozrywkowa, która przenosi relacyjne bazy danych w realia PRL. Projekt powstał z kolizji algorytmów AI i genialnej ludzkiej niedorzeczności. Zasilany kredytem Gierka, sterowany przez AI, dedykowany Tobie, Obywatelu.

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
