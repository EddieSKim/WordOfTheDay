import { getAllWords, saveWord } from "@/database/wordQueries";
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
    saveWordToCollection: (word: Word) => Promise<void>;
    loadWords: () => Promise<void>;
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

    const saveWordToCollection = async (word: Word) => {
        try {
            await saveWord(word.word, word.definition, word.example);
            await loadWords(); // Reload after saving
        } catch (error) {
            console.error("Error saving word to collection:", error);
        }
    };

    useEffect(() => {
        loadWords();
    }, []);

    return (
        <WordContext.Provider
            value={{
                wordsCollection,
                saveWordToCollection,
                loadWords,
                loading,
            }}
        >
            {children}
        </WordContext.Provider>
    );
};
