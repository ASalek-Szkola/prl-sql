"use server";

import { getDb } from "@/lib/db";

type QueryRow = Record<string, unknown>;

export type PRLQueryResult =
  | { success: true; rows: QueryRow[]; columns: string[]; changes?: number }
  | { success: false; isSyntaxError: boolean; error?: string };

const REPLACEMENTS: Array<[RegExp, string]> = [
  [/\bZAŁÓŻ_KOMITET\b/gi, "CREATE TABLE"],
  [/\bROZWIĄZ_PARTIĘ\b/gi, "DROP TABLE"],
  [/\bREORGANIZUJ\b/gi, "ALTER TABLE"],
   [/\bPOŁĄCZ\b/gi, "JOIN"],
  [/\bUKŁAD_WARSZAWSKI\b/gi, "UNION"],
  [/\bUPORZĄDKUJ_WEDŁUG\b/gi, "ORDER BY"],
  [/\bGRUPUJ_WEDŁUG\b/gi, "GROUP BY"],
  [/\bPRZYDZIAŁ\b/gi, "LIMIT"],
  [/\bPOLICZ_GŁOSY\b/gi, "COUNT"],
  [/\bWSTAW_DO\b/gi, "INSERT INTO"],
  [/\bWSTAW\s+DO\b/gi, "INSERT INTO"],
  [/\bWARTO(?:Ś|S)CI\b/gi, "VALUES"],
  [/\bREWALORYZUJ\b/gi, "UPDATE"],
  [/\bINTERNUJ\b/gi, "DELETE"],
  [/\bWYCZY(?:Ś|S)Ć\b/gi, "TRUNCATE"],
  [/\bUNIKALNE\b/gi, "DISTINCT"],
  [/\bWYBIERZ\b/gi, "SELECT"],
  [/\bWSZYSTKO\b/gi, "*"],
  [/\bUSTAL\b/gi, "SET"],
  [/\bGDZIE\b/gi, "WHERE"],
  [/\bJAKO\b/gi, "AS"],
  [/\bI\b/gi, "AND"],
  [/\bLUB\b/gi, "OR"],
  [/\bZ\b/gi, "FROM"],
];

function translateQuery(input: string) {
  let output = input;
  for (const [pattern, replacement] of REPLACEMENTS) {
    output = output.replace(pattern, replacement);
  }
  return output;
}

export async function executePRLQuery(query: string): Promise<PRLQueryResult> {
  const trimmed = query.trim();
  if (!trimmed) {
    return { success: false, isSyntaxError: false, error: "Puste zapytanie" };
  }

  const sql = translateQuery(trimmed);

  try {
    const db = getDb();
    const statement = db.prepare(sql);

    if (/^\s*SELECT/i.test(sql)) {
      const rows = statement.all() as QueryRow[];
      const columns = statement.columns().map((column) => column.name);
      return { success: true, rows, columns };
    }

    const info = statement.run();
    return { success: true, rows: [], columns: [], changes: info.changes };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const isSyntaxError = /syntax error/i.test(message);
    return { success: false, isSyntaxError, error: message };
  }
}
