import Database from "better-sqlite3";

export const db = new Database("steam.db");

db.prepare(`
  CREATE TABLE IF NOT EXISTS steam_items (
    market_hash_name TEXT PRIMARY KEY,
    last_price REAL,
    currency TEXT,
    last_updated INTEGER
  )
`).run();
