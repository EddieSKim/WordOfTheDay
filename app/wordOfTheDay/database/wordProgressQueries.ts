import { db } from "./index";

export const createWordProgress = (word_id: number) => {
    return new Promise((resolve, reject) => {
    db?.transaction(tx => {
        tx.executeSql(
        `INSERT INTO word_progress (word_id) VALUES (?)`,
        [word_id],
        (_: any, result: any) => resolve(result),
        (_: any, error: any) => {
            reject(error);
            return false;
        }
        );
    });
    });
};

export const updateWordProgress = (id: number, familiarity: number, last_reviewed: number, correct_count: number, wrong_count: number) => {
    return new Promise((resolve, reject) => {
    db?.transaction(tx => {
        tx.executeSql(
        `UPDATE word_progress SET familiarity = ?, last_reviewed = ?, correct_count = ?, wrong_count = ? WHERE id = ?`,
        [familiarity, last_reviewed, correct_count, wrong_count, id],
        (_: any, result: any) => resolve(result),
        (_: any, error: any) => {
            reject(error);
            return false;
        }
        );
    });
    });
};

export const deleteWordProgress = (id: number) => {
    return new Promise((resolve, reject) => {
    db?.transaction(tx => {
        tx.executeSql(
        `DELETE FROM word_progress WHERE id = ?`,
        [id],
        (_: any, result: any) => resolve(result),
        (_: any, error: any) => {
            reject(error);
            return false;
        }
        );
    });
    });
};

export const getAllWordProgress = () => {
    return new Promise((resolve, reject) => {
    db.transaction(tx => {
        tx.executeSql(
        `SELECT * FROM word_progress`,
        [],
        (_: any, { rows }: any) => resolve(rows._array),
        (_: any, error: any) => {
            reject(error);
            return false;
        }
        );
    });
    });
};