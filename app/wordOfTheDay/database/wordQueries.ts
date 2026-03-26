import { db } from "./index";

// Save a new word
export async function saveWord(
    word: string,
    definition: string,
    example?: string
): Promise<void> {
    try {
        await db.runAsync(
            `INSERT OR IGNORE INTO words (word, definition, example) VALUES (?, ?, ?)`,
            [word, definition, example]
        );
    } catch (error) {
        console.error("Error saving word:", error);
        throw error;
    }
}

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
export const getAllWords = async () => {
    try {
        const result = await db.getAllAsync(`SELECT * FROM words`);
        return result;
    } catch (error) {
        console.error("Error fetching words:", error);
        throw error;
    }
};