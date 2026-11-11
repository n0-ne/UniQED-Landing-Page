import "server-only";

import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

type Row = Record<string, unknown>;

function supabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) return null;

  return createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

async function appendLocal(fileName: string, row: Row) {
  const dataDirectory = path.join(process.cwd(), ".data");
  await mkdir(dataDirectory, { recursive: true });
  await appendFile(path.join(dataDirectory, fileName), `${JSON.stringify(row)}\n`, "utf8");
}

async function store(table: "events" | "leads", row: Row) {
  const client = supabaseAdmin();
  if (client) {
    const { error } = await client.from(table).insert(row);
    if (error && error.code !== "23505") throw error;
    return "supabase" as const;
  }

  if (process.env.NODE_ENV !== "production") {
    await appendLocal(`${table}.jsonl`, row);
    return "local" as const;
  }

  throw new Error("STORAGE_NOT_CONFIGURED");
}

export function storeEvent(row: Row) {
  return store("events", row);
}

export function storeLead(row: Row) {
  return store("leads", row);
}
