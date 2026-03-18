import type { WordNikWord, WordNikAudio, WordNikDefinition, WordNikExample } from "../types/wordnikWord";

const API_KEY = process.env.EXPO_PUBLIC_WORDNIK_API_KEY || "";
const BASE_URL = "https://api.wordnik.com/v4";

export async function fetchWordOfTheDay(): Promise<WordNikWord> {
  const res = await fetch(
    `${BASE_URL}/v4/words.json/wordOfTheDay?api_key=${API_KEY}`,
  );

  if (!res.ok) {
    throw new Error(
      `Error fetching word of the day! status: ${res.status}`,
    );
  }

  const raw = await res.json() as any;

  const definitions: WordNikDefinition[] =
    Array.isArray(raw.definitions)
      ? raw.definitions.map((d: any) => ({
          text: String(d.text ?? ""),
          partOfSpeech: d.partOfSpeech ? String(d.partOfSpeech) : undefined,
        }))
      : [];

  const examples: WordNikExample[] =
    Array.isArray(raw.examples)
      ? raw.examples.map((e: any) => ({
          text: String(e.text ?? ""),
        }))
      : [];

  const wordNikWord: WordNikWord = {
    word: String(raw.word ?? ""),
    definitions,
    examples,
    // audio is filled separately via fetchWordAudio
  };

  return wordNikWord;
}

export async function fetchWordAudio(
  word: string,
): Promise<WordNikAudio | null> {
  const res = await fetch(
    `${BASE_URL}/v4/word.json/${word}/audio?useCanonical=false&limit=1&api_key=${API_KEY}`,
  );

  if (!res.ok) {
    throw new Error(`Error fetching word audio! status: ${res.status}`);
  }

  const data = (await res.json()) as WordNikAudio[];
  return data[0] ?? null;
}