export type Word = {
    id?: number;
    word: string;
    definition: string;
    example?: string;
    pronunciation?: string;
    audioUrl?: string;
    createdAt?: string;
};

export type WordWithProgress = {
    word_id: number;
    word: string;
    definition: string;
    example?: string;
    progress_id?: number;
    familiarity: number;
    last_reviewed?: number;
    correct_count: number;
    wrong_count: number;
};

export type WordProgressStats = {
    starting: number;
    beginner: number;
    intermediate: number;
    advanced: number;
    mastered: number;
    total: number;
};