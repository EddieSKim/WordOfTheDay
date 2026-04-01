import { db } from "./index";

// Save a new word
export async function saveWord(
    word: string,
    definition: string,
    example?: string,
): Promise<void> {
    try {
        await db.runAsync(
            `INSERT OR IGNORE INTO words (word, definition, example) VALUES (?, ?, ?)`,
            [word.trim(), definition, example],
        );
    } catch (error) {
        console.error("Error saving word:", error);
        throw error;
    }
}

export const deleteWord = async (id: number) => {
    try {
        await db.runAsync(`DELETE FROM words WHERE id = ?`, [id]);
    } catch (error) {
        console.error("Error deleting word:", error);
        throw error;
    }
};

export const updateWord = async (
    id: number,
    word: string,
    definition: string,
    example?: string,
) => {
    try {
        await db.runAsync(
            `UPDATE words SET word = ?, definition = ?, example = ? WHERE id = ?`,
            [word, definition, example, id],
        );
    } catch (error) {
        console.error("Error updating word:", error);
        throw error;
    }
};

// Get all saved words
export const getAllWords = async () => {
    try {
        const result = await db.getAllAsync(`SELECT * FROM words`);
        console.log(JSON.stringify(result));
        return result;
    } catch (error) {
        console.error("Error fetching words:", error);
        throw error;
    }
};
