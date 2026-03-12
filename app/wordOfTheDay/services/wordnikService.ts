const API_KEY = process.env.EXPO_PUBLIC_WORDNIK_API_KEY || '';
const BASE_URL = "https://api.wordnik.com/v4";

export async function fetchWordOfTheDay() {
    const res = await fetch(`${BASE_URL}/v4/words.json/wordOfTheDay?api_key=${API_KEY}`);

    if (!res.ok) {
        throw new Error(`Error fetching word of the day! status: ${res.status}`);
    }

    return await res.json();;
}

export async function fetchWordAudio(word: string) {
    const res = await fetch(`${BASE_URL}/v4/word.json/${word}/audio?useCanonical=false&limit=1&api_key=${API_KEY}`);
    
    if (!res.ok) {
        throw new Error(`Error fetching word audio! status: ${res.status}`);
    }

    return await res.json();
}