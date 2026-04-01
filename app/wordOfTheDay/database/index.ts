import { Platform } from "react-native";

let db: any = null;

if (Platform.OS !== "web") {
    const SQLite = require("expo-sqlite");
    db = SQLite.openDatabaseSync("wordOfTheDay.db");
}

export { db };

export const clearWordTable = () => {
    db?.execSync(`DELETE FROM words;`);
};

export const dropWordTable = () => {
    db?.execSync(`DROP TABLE IF EXISTS words;`);
};

export const initDb = () => {
    // Initialize word table
    db?.execSync(`
    CREATE TABLE IF NOT EXISTS words (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        word TEXT NOT NULL UNIQUE COLLATE NOCASE,
        definition TEXT,
        example TEXT
    );
`);

    // Initialize word progress table
    db?.execSync(`
    CREATE TABLE IF NOT EXISTS word_progress (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        word_id INTEGER NOT NULL,
        familiarity INTEGER DEFAULT 0,
        last_reviewed DATE DEFAULT NULL,
        correct_count INTEGER DEFAULT 0,
        wrong_count INTEGER DEFAULT 0,
        FOREIGN KEY(word_id) REFERENCES words(id)
    );
`);

    // Initialize training result table
    db?.execSync(`
    CREATE TABLE IF NOT EXISTS training_results (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        word_id INTEGER NOT NULL,
        game_type TEXT NOT NULL,
        correct BOOLEAN NOT NULL,
        timestamp DATE NOT NULL,
        FOREIGN KEY(word_id) REFERENCES words(id)
    );
`);
};
