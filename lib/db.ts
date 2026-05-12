import Database from "better-sqlite3";

type SeedItem = {
  id: number;
  nazwa: string;
  kategoria: string;
  cena: number;
  na_kartki: number;
};

type SklepSeed = {
  id: number;
  nazwa: string;
  typ: string;
  adres: string;
};

type PersonelSeed = {
  id: number;
  imie_nazwisko: string;
  stanowisko: string;
  ulubione_powiedzonko: string;
  sklep_id: number;
};

type EwidencjaSeed = {
  id: number;
  towar_id: number;
  sklep_id: number;
  dostepna_ilosc: number;
  spod_lady: number;
};

const SEED_ITEMS: SeedItem[] = [
  {
    id: 1,
    nazwa: "Ocet",
    kategoria: "Artykuły Spożywcze",
    cena: 2,
    na_kartki: 0,
  },
  {
    id: 2,
    nazwa: "Masło",
    kategoria: "Artykuły Spożywcze",
    cena: 12,
    na_kartki: 1,
  },
  {
    id: 3,
    nazwa: "Mięso (z kością)",
    kategoria: "Mięsny",
    cena: 28,
    na_kartki: 1,
  },
  {
    id: 4,
    nazwa: "Cukier",
    kategoria: "Artykuły Spożywcze",
    cena: 8,
    na_kartki: 1,
  },
  {
    id: 5,
    nazwa: "Papier Toaletowy (rolka)",
    kategoria: "Higiena",
    cena: 4,
    na_kartki: 0,
  },
  {
    id: 6,
    nazwa: "Kawa zbożowa \"Inka\"",
    kategoria: "Napoje",
    cena: 6,
    na_kartki: 0,
  },
  {
    id: 7,
    nazwa: "Polo Cockta",
    kategoria: "Napoje",
    cena: 5,
    na_kartki: 0,
  },
  {
    id: 8,
    nazwa: "Mydło \"Biały Jeleń\"",
    kategoria: "Higiena",
    cena: 3,
    na_kartki: 0,
  },
  {
    id: 9,
    nazwa: "Proszek \"IXI\"",
    kategoria: "Chemia Gospodarcza",
    cena: 15,
    na_kartki: 0,
  },
  {
    id: 10,
    nazwa: "Woda Brzozowa",
    kategoria: "Kosmetyki",
    cena: 9,
    na_kartki: 0,
  },
  {
    id: 11,
    nazwa: "Szynka Konserwowa \"Turystyczna\"",
    kategoria: "Luksusowe",
    cena: 90,
    na_kartki: 1,
  },
  {
    id: 12,
    nazwa: "Buty \"Relaksy\"",
    kategoria: "Odzież",
    cena: 120,
    na_kartki: 0,
  },
  {
    id: 13,
    nazwa: "Pomarańcze (rzut świąteczny)",
    kategoria: "Towar Specjalny",
    cena: 45,
    na_kartki: 1,
  },
  {
    id: 14,
    nazwa: "Talon na Fiata 126p",
    kategoria: "Dobra Luksusowe",
    cena: 2500,
    na_kartki: 1,
  },
  {
    id: 15,
    nazwa: "Pusty Hak w Mięsnym",
    kategoria: "Symbol",
    cena: 0,
    na_kartki: 0,
  },
  {
    id: 16,
    nazwa: "Wycieczka do Bułgarii",
    kategoria: "Usługi",
    cena: 5000,
    na_kartki: 0,
  },
  {
    id: 17,
    nazwa: "Mieszkanie od Gierka",
    kategoria: "Dobra Luksusowe",
    cena: 100000,
    na_kartki: 0,
  },
];

const SEED_SKLEPY: SklepSeed[] = [
  {
    id: 1,
    nazwa: 'Społem "Tęcza"',
    typ: "Powszechny",
    adres: "ul. Absurdu 13",
  },
  { id: 2, nazwa: "Pewex", typ: "Walutowy", adres: "plac Defilad 1" },
  {
    id: 3,
    nazwa: 'GS "Samopomoc Chłopska"',
    typ: "Powszechny",
    adres: "Wąchock, ul. Sołtysa 2",
  },
];

const SEED_PERSONEL: PersonelSeed[] = [
  {
    id: 1,
    imie_nazwisko: "Krystyna Nowak",
    stanowisko: "Kierowniczka",
    ulubione_powiedzonko: "Czego?!",
    sklep_id: 1,
  },
  {
    id: 2,
    imie_nazwisko: "Janusz Wąs",
    stanowisko: "Magazynier",
    ulubione_powiedzonko: "Będzie dostawa w przyszłym miesiącu.",
    sklep_id: 1,
  },
  {
    id: 3,
    imie_nazwisko: "Grażyna Schmidt",
    stanowisko: "Ekspedientka",
    ulubione_powiedzonko: "Für Deutsche alles!",
    sklep_id: 2,
  },
  {
    id: 4,
    imie_nazwisko: "Zofia Bareja",
    stanowisko: "Ekspedientka",
    ulubione_powiedzonko: "Nie wiem, nie orientuję się.",
    sklep_id: 3,
  },
];

const SEED_EWIDENCJA: EwidencjaSeed[] = [
  { id: 1, towar_id: 1, sklep_id: 1, dostepna_ilosc: 200, spod_lady: 0 },
  { id: 2, towar_id: 1, sklep_id: 3, dostepna_ilosc: 50, spod_lady: 0 },
  { id: 3, towar_id: 5, sklep_id: 1, dostepna_ilosc: 10, spod_lady: 0 },
  { id: 4, towar_id: 15, sklep_id: 1, dostepna_ilosc: 1, spod_lady: 0 },
  { id: 5, towar_id: 11, sklep_id: 1, dostepna_ilosc: 2, spod_lady: 1 },
  { id: 6, towar_id: 11, sklep_id: 2, dostepna_ilosc: 30, spod_lady: 0 },
  { id: 7, towar_id: 14, sklep_id: 2, dostepna_ilosc: 1, spod_lady: 0 },
  { id: 8, towar_id: 12, sklep_id: 3, dostepna_ilosc: 5, spod_lady: 0 },
  { id: 9, towar_id: 13, sklep_id: 1, dostepna_ilosc: 15, spod_lady: 1 },
];

function createDatabase() {
  return new Database(":memory:");
}

type DbInstance = ReturnType<typeof createDatabase>;

declare global {
  // eslint-disable-next-line no-var
  var __prlDb: DbInstance | undefined;
  // eslint-disable-next-line no-var
  var __prlDbSeeded: boolean | undefined;
}

function initializeDatabase(db: DbInstance) {
  db.pragma("foreign_keys = ON");
  db.exec(
    "CREATE TABLE IF NOT EXISTS towary (id INTEGER PRIMARY KEY, nazwa TEXT, kategoria TEXT, cena INTEGER, na_kartki INTEGER)"
  );
  db.exec(
    "CREATE TABLE IF NOT EXISTS sklepy (id INTEGER PRIMARY KEY AUTOINCREMENT, nazwa TEXT NOT NULL, typ TEXT NOT NULL, adres TEXT)"
  );
  db.exec(
    "CREATE TABLE IF NOT EXISTS personel (id INTEGER PRIMARY KEY AUTOINCREMENT, imie_nazwisko TEXT NOT NULL, stanowisko TEXT NOT NULL, ulubione_powiedzonko TEXT, sklep_id INTEGER, FOREIGN KEY (sklep_id) REFERENCES sklepy(id))"
  );
  db.exec(
    "CREATE TABLE IF NOT EXISTS ewidencja_stanu (id INTEGER PRIMARY KEY AUTOINCREMENT, towar_id INTEGER, sklep_id INTEGER, dostepna_ilosc INTEGER, spod_lady INTEGER DEFAULT 0, FOREIGN KEY (towar_id) REFERENCES towary(id), FOREIGN KEY (sklep_id) REFERENCES sklepy(id))"
  );

  db.exec("DELETE FROM ewidencja_stanu");
  db.exec("DELETE FROM personel");
  db.exec("DELETE FROM sklepy");
  db.exec("DELETE FROM towary");

  const insertTowary = db.prepare(
    "INSERT INTO towary (id, nazwa, kategoria, cena, na_kartki) VALUES (@id, @nazwa, @kategoria, @cena, @na_kartki)"
  );
  const insertSklepy = db.prepare(
    "INSERT INTO sklepy (id, nazwa, typ, adres) VALUES (@id, @nazwa, @typ, @adres)"
  );
  const insertPersonel = db.prepare(
    "INSERT INTO personel (id, imie_nazwisko, stanowisko, ulubione_powiedzonko, sklep_id) VALUES (@id, @imie_nazwisko, @stanowisko, @ulubione_powiedzonko, @sklep_id)"
  );
  const insertEwidencja = db.prepare(
    "INSERT INTO ewidencja_stanu (id, towar_id, sklep_id, dostepna_ilosc, spod_lady) VALUES (@id, @towar_id, @sklep_id, @dostepna_ilosc, @spod_lady)"
  );

  const insertMany = db.transaction(() => {
    for (const row of SEED_ITEMS) {
      insertTowary.run(row);
    }
    for (const row of SEED_SKLEPY) {
      insertSklepy.run(row);
    }
    for (const row of SEED_PERSONEL) {
      insertPersonel.run(row);
    }
    for (const row of SEED_EWIDENCJA) {
      insertEwidencja.run(row);
    }
  });

  insertMany();
  globalThis.__prlDbSeeded = true;
}

export function getDb(): DbInstance {
  if (!globalThis.__prlDb) {
    globalThis.__prlDb = createDatabase();
  }

  if (!globalThis.__prlDbSeeded) {
    initializeDatabase(globalThis.__prlDb);
  }

  return globalThis.__prlDb;
}
