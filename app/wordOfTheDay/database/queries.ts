import { db } from "./index";

// Save a new word
export const saveWord = (
  word: string,
  definition: string,
  example?: string
) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO words (word, definition, example) VALUES (?, ?, ?)`,
        [word, definition, example],
        (_, result) => resolve(result),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

// Get all saved words
export const getAllWords = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM words`,
        [],
        (_, { rows }) => resolve(rows._array),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};