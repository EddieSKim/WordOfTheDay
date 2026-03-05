import * as SQLite from "expo-sqlite";
import { Platform } from "react-native";

let db: any = null;

if (Platform.OS !== 'web') {
  const SQLite = require('expo-sqlite');
  db = SQLite.openDatabaseSync("wordOfTheDay.db");
}

export { db };

export function testDatabase() {
  try {
    // create table
    db?.execSync(`
      CREATE TABLE IF NOT EXISTS test (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT
      );
    `);

    // insert row
    db?.execSync(`
      INSERT INTO test (name) VALUES ('hello database');
    `);

    // query rows
    const rows = db?.getAllSync(`SELECT * FROM test;`);

    console.log("DATABASE RESULT:", rows);

  } catch (error) {
    console.error("DB ERROR:", error);
  }
}

export const initDb = () => {
  db?.execSync(`
    CREATE TABLE IF NOT EXISTS words (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      word TEXT NOT NULL,
      definition TEXT,
      example TEXT
    );
  `);

  // Word progress table
  db?.execSync(`
    CREATE TABLE IF NOT EXISTS word_progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      word_id INTEGER NOT NULL,
      familiarity INTEGER DEFAULT 0,
      last_reviewed INTEGER,
      correct_count INTEGER DEFAULT 0,
      wrong_count INTEGER DEFAULT 0,
      FOREIGN KEY(word_id) REFERENCES words(id)
    );
  `);
};