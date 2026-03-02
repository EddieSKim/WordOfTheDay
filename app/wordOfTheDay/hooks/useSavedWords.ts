import { useState, useEffect } from "react";
import { saveWord, getAllWords } from "@/database/queries";

export const useSavedWords = () => {
  const [words, setWords] = useState<any[]>([]);

  const loadWords = async () => {
    const data: any = await getAllWords();
    setWords(data);
  };

  const addWord = async (word: any) => {
    await saveWord(word.word, word.definition, word.example);
    loadWords(); // reload after insert
  };

  useEffect(() => {
    loadWords();
  }, []);

  return { words, addWord, loadWords };
};