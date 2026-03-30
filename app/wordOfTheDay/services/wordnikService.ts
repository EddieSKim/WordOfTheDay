import type { WordNikAudio, WordNikDefinition, WordNikExample, WordNikWord } from "../types/wordnikWord";

const API_KEY = process.env.EXPO_PUBLIC_WORDNIK_API_KEY || "";
const BASE_URL = "https://api.wordnik.com/v4";

export async function fetchWordOfTheDay(): Promise<WordNikWord> {
  const res = await fetch(
    `${BASE_URL}/words.json/wordOfTheDay?api_key=${API_KEY}`,
  );
  console.log(API_KEY)

  if (!res.ok) {
    throw new Error(
      `Error fetching word of the day! status: ${res.status}`,
    );
  }
  console.log(res)
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
  try {
    const res = await fetch(
      `${BASE_URL}/word.json/${word}/audio?useCanonical=false&limit=1&api_key=${API_KEY}`,
    );

    // Quietly treat any audio fetch failure as "no audio available"
    if (!res.ok) return null;

    const data = (await res.json()) as WordNikAudio[];
    return data[0] ?? null;
  } catch {
    // Swallow network/JSON errors to keep the UI from spamming logs
    return null;
  }
}