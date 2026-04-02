import { db } from "./index";

export const createWordProgress = async (word_id: number) => {
    try {
        await db.runAsync(
            `INSERT OR IGNORE INTO word_progress (word_id) VALUES (?)`,
            [word_id],
        );
    } catch (error) {
        console.error("Error creating word progress:", error);
        throw error;
    }
};

export const updateWordProgress = async (
    id: number,
    familiarity: number,
    last_reviewed: number,
    correct_count: number,
    wrong_count: number,
) => {
    try {
        await db.runAsync(
            `UPDATE word_progress SET familiarity = ?, last_reviewed = ?, correct_count = ?, wrong_count = ? WHERE id = ?`,
            [familiarity, last_reviewed, correct_count, wrong_count, id],
        );
    } catch (error) {
        console.error("Error updating word progress:", error);
        throw error;
    }
};

export const deleteWordProgress = async (id: number) => {
    try {
        await db.runAsync(`DELETE FROM word_progress WHERE id = ?`, [id]);
    } catch (error) {
        console.error("Error deleting word progress:", error);
        throw error;
    }
};

export const getAllWordProgress = async () => {
    try {
        const result = await db.getAllAsync(`SELECT * FROM word_progress`);
        return result;
    } catch (error) {
        console.error("Error fetching word progress:", error);
        throw error;
    }
};

export const getWordsWithProgress = async () => {
    try {
        const result = await db.getAllAsync(`SELECT 
            w.id as word_id,
            w.word,
            w.definition,
            w.example,
            wp.id as progress_id,
            wp.familiarity,
            wp.last_reviewed,
            wp.correct_count,
            wp.wrong_count
        FROM words w
        LEFT JOIN word_progress wp ON w.id = wp.word_id
        ORDER BY w.word`);
        return result;
    } catch (error) {
        console.error("Error fetching words with progress:", error);
        throw error;
    }
};

export const getWordProgressStats = async () => {
    try {
        const result = await db.getAllAsync(`SELECT 
            COUNT(CASE WHEN wp.familiarity >= 0 AND wp.familiarity <= 19 THEN 1 END) as starting,
            COUNT(CASE WHEN wp.familiarity >= 20 AND wp.familiarity <= 39 THEN 1 END) as beginner,
            COUNT(CASE WHEN wp.familiarity >= 40 AND wp.familiarity <= 59 THEN 1 END) as intermediate,
            COUNT(CASE WHEN wp.familiarity >= 60 AND wp.familiarity <= 79 THEN 1 END) as advanced,
            COUNT(CASE WHEN wp.familiarity >= 80 AND wp.familiarity <= 100 THEN 1 END) as mastered,
            COUNT(*) as total
        FROM word_progress wp`);
        return result[0];
    } catch (error) {
        console.error("Error fetching word progress stats:", error);
        throw error;
    }
};
