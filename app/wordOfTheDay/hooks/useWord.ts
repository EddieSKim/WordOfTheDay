import { useState, useEffect } from "react";
import { saveWord, getAllWords } from "@/database/wordQueries";

export const useWord = () => {
  const [words, setWords] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const loadWords = async () => {
    setLoading(true);

    try {
      const data: any = await getAllWords();
      setWords(data);
    } catch (error) {
      console.error("Error loading saved words: ", error);
    } finally {
      setLoading(false);
    }
  };

  const saveWordToCollection = async (word: any) => {

    try {
      await saveWord(word.word, word.definition, word.example);
      loadWords(); // reload after insert
    } catch (error) {
      console.error("Error saving word to collection: ", error);
    }
    
  };

  useEffect(() => {
    loadWords();
  }, []);

  return { words, saveWordToCollection, loadWords };
};