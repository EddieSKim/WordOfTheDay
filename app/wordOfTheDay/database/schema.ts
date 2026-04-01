// database/schema.ts

// Table: Words
export type Word = {
    id?: number; // Auto-incremented
    word: string;
    definition: string;
    example?: string;
};

// Table: Word Progress (user's familiarity with words)
export type WordProgress = {
    id?: number; // Auto-incremented
    word_id: number; // Foreign key to Word.id
    familiarity: number; // e.g., 0-100 scale
    last_reviewed: number; // timestamp
    correct_count: number;
    wrong_count: number;
};

// Table: Training Results (for games / quizzes)
export type TrainingResult = {
    id?: number; // Auto-incremented
    word_id: number; // Foreign key to Word.id
    game_type: string; // e.g., 'word-match', 'definition-match'
    correct: boolean;
    timestamp: number; // when the game was played
};
