import { useState, useEffect } from "react";
import { fetchWordOfTheDay, fetchWordAudio } from "../services/wordnikService";
import type { WordNikWord } from "@/types/wordnikWord";

export function useWordOfDay(): {
    word: WordNikWord | null;
    loading: boolean;
} {
    const [word, setWord] = useState<WordNikWord | null>(null);
    const [loading, setLoading] = useState(false);

    const loadWord = async () => {
    setLoading(true);

    try {
        const baseWord = await fetchWordOfTheDay();
        const wordAudio = await fetchWordAudio(baseWord.word);

        const wordWithAudio: WordNikWord = {
            ...baseWord,
            audio: wordAudio ?? undefined,
        };

        setWord(wordWithAudio);
    } catch (error) {
        console.error(error);
    }

    setLoading(false);
    };

    useEffect(() => {
        loadWord();
    }, []);

    return { word, loading };
}