import {
    getWordProgressStats,
    getWordsWithProgress,
} from "@/database/wordProgressQueries";
import { getAllWords, saveWord } from "@/database/wordQueries";
import { WordProgressStats, WordWithProgress } from "@/types/word";
import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

interface Word {
    word: string;
    definition: string;
    example?: string;
}

interface WordContextType {
    wordsCollection: Word[];
    wordsWithProgress: WordWithProgress[];
    wordProgressStats: WordProgressStats | null;
    saveWordToCollection: (word: Word) => Promise<void>;
    loadWords: () => Promise<void>;
    loadWordsWithProgress: () => Promise<void>;
    loadWordProgressStats: () => Promise<void>;
    loading: boolean;
}

const WordContext = createContext<WordContextType | undefined>(undefined);

export const useWordContext = () => {
    const context = useContext(WordContext);
    if (!context) {
        throw new Error("useWordContext must be used within a WordProvider");
    }
    return context;
};

interface WordProviderProps {
    children: ReactNode;
}

export const WordProvider: React.FC<WordProviderProps> = ({ children }) => {
    const [wordsCollection, setWordsCollection] = useState<Word[]>([]);
    const [wordsWithProgress, setWordsWithProgress] = useState<
        WordWithProgress[]
    >([]);
    const [wordProgressStats, setWordProgressStats] =
        useState<WordProgressStats | null>(null);
    const [loading, setLoading] = useState(false);

    const loadWords = async () => {
        setLoading(true);
        try {
            const data: Word[] = await getAllWords();
            setWordsCollection(data);
        } catch (error) {
            console.error("Error loading saved words:", error);
        } finally {
            setLoading(false);
        }
    };

    const loadWordsWithProgress = async () => {
        setLoading(true);
        try {
            const data = (await getWordsWithProgress()) as WordWithProgress[];
            setWordsWithProgress(data);
        } catch (error) {
            console.error("Error loading words with progress:", error);
        } finally {
            setLoading(false);
        }
    };

    const loadWordProgressStats = async () => {
        try {
            const data = (await getWordProgressStats()) as WordProgressStats;
            setWordProgressStats(data);
        } catch (error) {
            console.error("Error loading word progress stats:", error);
        }
    };

    const saveWordToCollection = async (word: Word) => {
        try {
            await saveWord(word.word, word.definition, word.example);
            await loadWords(); // Reload after saving
            await loadWordsWithProgress(); // Reload progress data too
        } catch (error: any) {
            // Re-throw the error so calling code can handle it
            console.error("Error saving word to collection:", error);
            throw error;
        }
    };

    useEffect(() => {
        loadWords();
        loadWordsWithProgress();
        loadWordProgressStats();
    }, []);

    return (
        <WordContext.Provider
            value={{
                wordsCollection,
                wordsWithProgress,
                wordProgressStats,
                saveWordToCollection,
                loadWords,
                loadWordsWithProgress,
                loadWordProgressStats,
                loading,
            }}
        >
            {children}
        </WordContext.Provider>
    );
};
