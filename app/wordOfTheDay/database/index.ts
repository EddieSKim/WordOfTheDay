import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabase("wordoftheday.db");

export const initDb = () => {
  db.transaction(tx => {
    // Words table
    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS words (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        word TEXT NOT NULL,
        definition TEXT,
        example TEXT
      );
    `);

    // Word progress table
    tx.executeSql(`
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
  });
};