export type WordNikDefinition = {
    text: string;
    partOfSpeech?: string;
};

export type WordNikExample = {
    text: string;
};

export type WordNikAudio = {
    fileUrl: string;
};

export type WordNikWord = {
    word: string;
    definitions: WordNikDefinition[];
    examples: WordNikExample[];
    audio?: WordNikAudio;
};