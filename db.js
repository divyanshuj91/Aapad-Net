import sqlite3 from "sqlite3";
import { fileURLToPath } from "url";
import path from "path";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, "database.sqlite");

const db = new sqlite3.Database(dbPath, async (err) => {
  if (err) {
    console.error("❌ Error connecting to SQLite:", err.message);
    return;
  }

  console.log("✅ Connected to SQLite database.");

  // Enable foreign keys (good practice)
  db.run("PRAGMA foreign_keys = ON");

  // Create requests table
  db.run(`
    CREATE TABLE IF NOT EXISTS requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT,
      type TEXT,
      location TEXT,
      urgency TEXT,
      image TEXT,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
<<<<<<< HEAD

  db.run(
    "ALTER TABLE requests ADD COLUMN status TEXT DEFAULT 'pending'",
    (err) => {
      // Ignore error if column already exists
    },
  );
=======
>>>>>>> d99b8190baaaf723e2e5bc0f79ffdd4526b299e8
  db.run(`
  CREATE TABLE IF NOT EXISTS safe_people (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    location TEXT,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);
  // Optional: Index for faster sorting by date
  db.run(`
    CREATE INDEX IF NOT EXISTS idx_requests_created_at 
    ON requests(created_at)
  `);
});

export default db;
