"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { executePRLQuery } from "./actions/prl";

type QueueState = {
  isWaiting: boolean;
  position: number;
};

type ResultsState = {
  columns: string[];
  rows: Record<string, unknown>[];
  changes?: number;
};

const MAX_RATION_CARDS = 5;
const JARUZEL_GIFS = [
  "/jaruzel/goodmorning-good-morning.gif",
  "/jaruzel/jaruzelski-prl.gif",
  "/jaruzel/pzpr-poland.gif",
  "/jaruzel/wojciech-jaruzelski-jaruzelski.gif",
];
const PRL_GLOSSARY = [
  { prl: "ZAŁÓŻ_KOMITET", sql: "CREATE TABLE" },
  { prl: "ROZWIĄZ_PARTIĘ", sql: "DROP TABLE" },
  { prl: "POŁĄCZ", sql: "JOIN" },
  { prl: "UKŁAD_WARSZAWSKI", sql: "UNION" },
  { prl: "PRZYDZIAŁ", sql: "LIMIT" },
  { prl: "REWALORYZUJ", sql: "UPDATE" },
  { prl: "INTERNUJ", sql: "DELETE" },
  { prl: "REORGANIZUJ", sql: "ALTER TABLE" },
  { prl: "POLICZ_GŁOSY", sql: "COUNT" },
  { prl: "UPORZĄDKUJ_WEDŁUG", sql: "ORDER BY" },
  { prl: "GRUPUJ_WEDŁUG", sql: "GROUP BY" },
  { prl: "WSTAW_DO", sql: "INSERT INTO" },
  { prl: "UNIKALNE", sql: "DISTINCT" },
  { prl: "WYBIERZ", sql: "SELECT" },
  { prl: "WARTOŚCI", sql: "VALUES" },
  { prl: "WYCZYŚĆ", sql: "TRUNCATE" },
  { prl: "WSZYSTKO", sql: "*" },
  { prl: "USTAL", sql: "SET" },
  { prl: "GDZIE", sql: "WHERE" },
  { prl: "JAKO", sql: "AS" },
  { prl: "LUB", sql: "OR" },
  { prl: "Z", sql: "FROM" },
  { prl: "I", sql: "AND" },
];
const SCHEMA_TABLES = [
  {
    name: "towary",
    columns: [
      { column: "id", type: "INTEGER", note: "PRIMARY KEY" },
      { column: "nazwa", type: "TEXT", note: "" },
      { column: "kategoria", type: "TEXT", note: "" },
      { column: "cena", type: "INTEGER", note: "" },
      { column: "na_kartki", type: "INTEGER", note: "0/1" },
    ],
  },
  {
    name: "sklepy",
    columns: [
      { column: "id", type: "INTEGER", note: "PRIMARY KEY" },
      { column: "nazwa", type: "TEXT", note: "" },
      { column: "typ", type: "TEXT", note: "Powszechny/Walutowy/Zakładowy" },
      { column: "adres", type: "TEXT", note: "" },
    ],
  },
  {
    name: "personel",
    columns: [
      { column: "id", type: "INTEGER", note: "PRIMARY KEY" },
      { column: "imie_nazwisko", type: "TEXT", note: "" },
      { column: "stanowisko", type: "TEXT", note: "" },
      { column: "ulubione_powiedzonko", type: "TEXT", note: "" },
      { column: "sklep_id", type: "INTEGER", note: "FK -> sklepy.id" },
    ],
  },
  {
    name: "ewidencja_stanu",
    columns: [
      { column: "id", type: "INTEGER", note: "PRIMARY KEY" },
      { column: "towar_id", type: "INTEGER", note: "FK -> towary.id" },
      { column: "sklep_id", type: "INTEGER", note: "FK -> sklepy.id" },
      { column: "dostepna_ilosc", type: "INTEGER", note: "" },
      { column: "spod_lady", type: "INTEGER", note: "0/1" },
    ],
  },
];

function formatCellValue(value: unknown) {
  if (value === null || value === undefined) return "";
  if (typeof value === "boolean") return value ? "1" : "0";
  return String(value);
}

export default function Home() {
  const [rationCards, setRationCards] = useState(MAX_RATION_CARDS);
  const [queueState, setQueueState] = useState<QueueState>({
    isWaiting: false,
    position: 0,
  });
  const [martialLaw, setMartialLaw] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ResultsState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [martialLawGif, setMartialLawGif] = useState(JARUZEL_GIFS[0]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const martialTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isBlocked = rationCards <= 0 || queueState.isWaiting || martialLaw;

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (martialTimeoutRef.current) {
        clearTimeout(martialTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!martialLaw) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [martialLaw]);

  const handleExecute = async () => {
    if (isBlocked) return;
    if (!query.trim()) {
      setError("Wpisz zapytanie.");
      return;
    }

    setError(null);
    setResults(null);
    setMartialLaw(false);

    const queuedQuery = query;
    const waitMs = 2000 + Math.floor(Math.random() * 8001);
    const waitSeconds = Math.ceil(waitMs / 1000);
    const startPosition = Math.max(
      1,
      Math.floor(waitSeconds * (2 + Math.random() * 3))
    );
    const steps = Math.max(1, Math.ceil(waitMs / 500));
    const decrement = Math.max(1, Math.ceil(startPosition / steps));

    setQueueState({ isWaiting: true, position: startPosition });

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    intervalRef.current = setInterval(() => {
      setQueueState((prev) =>
        prev.isWaiting
          ? { ...prev, position: Math.max(0, prev.position - decrement) }
          : prev
      );
    }, 500);

    timeoutRef.current = setTimeout(async () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      setQueueState((prev) => ({ ...prev, position: 0 }));
      const result = await executePRLQuery(queuedQuery);
      setQueueState({ isWaiting: false, position: 0 });

      if (result.success) {
        setResults({
          columns: result.columns,
          rows: result.rows,
          changes: result.changes,
        });
        setRationCards((prev) => Math.max(0, prev - 1));
        return;
      }

      if (result.isSyntaxError) {
        setError(null);
        setMartialLawGif(
          JARUZEL_GIFS[Math.floor(Math.random() * JARUZEL_GIFS.length)]
        );
        setMartialLaw(true);
        martialTimeoutRef.current = setTimeout(() => {
          setMartialLaw(false);
        }, 10000);
        return;
      }

      setError(result.error ?? "Nieznany blad zapytania.");
    }, waitMs);
  };

  return (
    <div className="min-h-screen">
      <div
        className={`min-h-screen flex flex-col ${
          martialLaw ? "pointer-events-none select-none" : ""
        }`}
      >
        <header className="border-b border-paper-edge/60 bg-panel/80">
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.35em] text-muted">
                Centralny System Ewidencyjny
              </p>
              <h1 className="text-3xl font-semibold text-ink">PRL SQL</h1>
            </div>
            <div className="rounded-xl border border-paper-edge/60 bg-highlight/70 px-4 py-3 shadow-[0_10px_25px_-15px_rgba(0,0,0,0.45)]">
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted">
                Kartki
              </p>
              <div className="mt-2 flex items-center gap-3">
                <div className="flex gap-1">
                  {Array.from({ length: MAX_RATION_CARDS }).map((_, index) => (
                    <span
                      key={index}
                      className={`h-3 w-6 rounded-sm border border-paper-edge ${
                        index < rationCards
                          ? "bg-accent"
                          : "bg-paper-edge/30"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-ink">
                  {rationCards}
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-8">
          <section className="relative overflow-hidden rounded-2xl border border-paper-edge/70 bg-panel/80 p-6 shadow-[0_30px_60px_-40px_rgba(0,0,0,0.5)] animate-[rise_600ms_ease-out]">
            <div className="absolute -right-12 -top-16 h-48 w-48 rounded-full bg-accent/15 blur-3xl" />
            <div className="absolute -bottom-16 left-10 h-36 w-36 rounded-full bg-ink/5 blur-2xl" />
            <div className="relative space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-ink">
                  Terminal zapytan
                </h2>
                <p className="text-sm text-muted">
                  Wpisz rozkaz w języku PRL SQL.
                </p>
              </div>
              <textarea
                className="min-h-[140px] w-full rounded-lg border border-paper-edge/70 bg-paper/80 p-4 font-mono text-sm text-ink shadow-inner focus:outline-none focus:ring-2 focus:ring-accent/40 disabled:cursor-not-allowed disabled:opacity-60"
                placeholder="WYBIERZ WSZYSTKO Z towary"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                disabled={isBlocked}
              />
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-lg bg-accent px-5 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-paper shadow-[0_12px_30px_-20px_rgba(0,0,0,0.7)] transition hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-50"
                  onClick={handleExecute}
                  disabled={isBlocked}
                >
                  Stan w kolejce do terminala
                </button>
                <p className="text-xs text-muted">
                  {rationCards <= 0
                    ? "Brak kartek. Terminal wylaczony."
                    : "System pracuje w trybie kolejkowym."}
                </p>
              </div>

              {queueState.isWaiting && (
                <div className="rounded-lg border border-paper-edge/60 bg-paper/70 px-4 py-3 text-sm text-ink">
                  Jestes {queueState.position} w kolejce do terminala.
                </div>
              )}

              {error && (
                <div className="rounded-lg border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-danger">
                  {error}
                </div>
              )}
            </div>
          </section>

          <section
            className="rounded-2xl border border-paper-edge/70 bg-panel/60 p-6 shadow-[0_20px_45px_-35px_rgba(0,0,0,0.5)] animate-[rise_600ms_ease-out]"
            style={{ animationDelay: "90ms" }}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-ink">
                  Slowniczek PRL SQL
                </h2>
                <p className="text-sm text-muted">
                  Najwazniejsze slowa kluczowe w trybie PRL.
                </p>
              </div>
            </div>
            <div className="mt-4 grid gap-3 text-sm text-ink sm:grid-cols-2">
              {PRL_GLOSSARY.map((entry) => (
                <div
                  key={entry.prl}
                  className="flex items-center justify-between rounded-lg border border-paper-edge/60 bg-paper/70 px-4 py-2"
                >
                  <span className="font-mono">{entry.prl}</span>
                  <span className="text-muted">{entry.sql}</span>
                </div>
              ))}
            </div>
          </section>

          <section
            className="rounded-2xl border border-paper-edge/70 bg-panel/70 p-6 shadow-[0_25px_60px_-45px_rgba(0,0,0,0.5)] animate-[rise_600ms_ease-out]"
            style={{ animationDelay: "105ms" }}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-ink">
                  Struktura bazy danych
                </h2>
                <p className="text-sm text-muted">
                  Tabela towary i jej kolumny.
                </p>
              </div>
            </div>
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              {SCHEMA_TABLES.map((table) => (
                <div
                  key={table.name}
                  className="overflow-x-auto rounded-lg border border-paper-edge/60 bg-paper/80"
                >
                  <div className="bg-panel-strong px-4 py-3 text-xs uppercase tracking-[0.3em] text-muted">
                    {table.name}
                  </div>
                  <table className="min-w-full text-left text-sm text-ink">
                    <thead className="bg-panel/70 text-xs uppercase tracking-[0.2em] text-muted">
                      <tr>
                        <th className="px-4 py-3">Kolumna</th>
                        <th className="px-4 py-3">Typ</th>
                        <th className="px-4 py-3">Uwagi</th>
                      </tr>
                    </thead>
                    <tbody className="font-mono">
                      {table.columns.map((row) => (
                        <tr
                          key={`${table.name}-${row.column}`}
                          className="border-t border-paper-edge/50"
                        >
                          <td className="px-4 py-3">{row.column}</td>
                          <td className="px-4 py-3">{row.type}</td>
                          <td className="px-4 py-3">{row.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </section>

          <section
            className="rounded-2xl border border-paper-edge/70 bg-panel/70 p-6 shadow-[0_25px_60px_-45px_rgba(0,0,0,0.5)] animate-[rise_600ms_ease-out]"
            style={{ animationDelay: "120ms" }}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-ink">
                  Wyniki ewidencji
                </h2>
                <p className="text-sm text-muted">
                  Tabela aktualizuje sie po zatwierdzeniu zapytania.
                </p>
              </div>
              {results?.changes !== undefined && (
                <span className="rounded-full border border-paper-edge/60 bg-paper/70 px-3 py-1 text-xs font-semibold text-ink">
                  Zmiany: {results.changes}
                </span>
              )}
            </div>

            <div className="mt-4">
              {!results ? (
                <p className="text-sm text-muted">
                  Brak wynikow. Wpisz zapytanie, aby zobaczyc dane.
                </p>
              ) : results.rows.length === 0 ? (
                <p className="text-sm text-muted">Brak wynikow.</p>
              ) : (
                <div className="overflow-x-auto rounded-lg border border-paper-edge/60 bg-paper/80">
                  <table className="min-w-full text-left text-sm text-ink">
                    <thead className="bg-panel-strong text-xs uppercase tracking-[0.2em] text-muted">
                      <tr>
                        {results.columns.map((column) => (
                          <th key={column} className="px-4 py-3">
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="font-mono">
                      {results.rows.map((row, index) => (
                        <tr key={index} className="border-t border-paper-edge/50">
                          {results.columns.map((column) => (
                            <td key={column} className="px-4 py-3">
                              {formatCellValue(row[column])}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        </main>

        <footer className="mt-auto border-t border-paper-edge/60 bg-panel/70 px-6 py-4 text-center text-xs uppercase tracking-[0.35em] text-muted">
          Zasilane kredytem Gierka
        </footer>
      </div>

      {martialLaw && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-red-600 animate-pulse pointer-events-auto">
          <div className="mx-6 max-w-lg rounded-lg border border-red-900/40 bg-red-100/85 p-6 text-center text-red-950 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.7)]">
            <p className="text-xs uppercase tracking-[0.35em]">
              Stan wojenny
            </p>
            <h2 className="mt-3 text-2xl font-semibold">
              Przerwa w nadawaniu
            </h2>
            <p className="mt-2 text-sm text-red-900/80">
              Z powodu blednego syntaxu zapytania wprowadzono stan wojenny.
            </p>
            <div className="mt-4 flex justify-center">
              <Image
                src={martialLawGif}
                alt="Zastepczy obraz Jaruzelskiego"
                width={320}
                height={240}
                className="rounded-md border border-red-900/30"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
