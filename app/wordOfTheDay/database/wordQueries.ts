import { db } from "./index";

// Save a new word
export const saveWord = (
    word: string,
    definition: string,
    example?: string
) => {
    return new Promise<void>((resolve: any, reject: any) => {
        db?.transaction((tx: any) => {
        tx.executeSql(
            `INSERT INTO words (word, definition, example) VALUES (?, ?, ?)`,
            [word, definition, example],
            (_: any, result: any) => resolve(result),
            (_: any, error: any) => {
                reject(error);
                return false;
            }
        );
    });
});
};

export const deleteWord = (id: number) => {
    return new Promise<void>((resolve: any, reject: any) => {
        db?.transaction((tx: any) => {
        tx.executeSql(
            `DELETE FROM words WHERE id = ?`,
            [id],
            (_: any, result: any) => resolve(void 0),
            (_: any, error: any) => {
            reject(error);
            return false;
        }
        );
    });
    });
};

export const updateWord = (id: number, word: string, definition: string, example?: string) => {
    return new Promise((resolve, reject) => {
    db?.transaction(tx => {
        tx.executeSql(
        `UPDATE words SET word = ?, definition = ?, example = ? WHERE id = ?`,
        [word, definition, example, id],
        (_: any, result: any) => resolve(result),
        (_: any, error: any) => {
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
    db?.transaction(tx => {
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