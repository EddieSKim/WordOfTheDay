import { useState, useEffect } from "react";
import { fetchWordOfTheDay, fetchWordAudio } from "../services/wordnikService";

export function useWordOfDay() {
    const [word, setWord] = useState<any>({});
    const [wordAudioData, setWordAudioData] = useState<any>({});
    const [loading, setLoading] = useState(false);

    const loadWord = async () => {
        setLoading(true);

        try {
            const result = await fetchWordOfTheDay();
            const wordAudio = await fetchWordAudio(result?.word);

            // await addWord(result.word, result.definition, result.example);

            setWord(result);
            setWordAudioData(wordAudio);
        } catch (error) {
            console.error(error);
        }

        setLoading(false);
    };

    useEffect(() => {
        loadWord();
    }, []);

    return { word, wordAudioData, loading };
}