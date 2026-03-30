import { getAllWords } from "@/database/wordQueries";
import { useEffect, useState } from "react";

export const useWord = () => {
  const [loading, setLoading] = useState(false);

  const loadWords = async () => {
    setLoading(true);

    try {
      const data: any = await getAllWords();
    } catch (error) {
      console.error("Error loading saved words: ", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    loadWords();
  }, []);

  return {loadWords, loading };
};