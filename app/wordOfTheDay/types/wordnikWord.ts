export type WordnikDefinition = {
    text: string;
    partOfSpeech?: string;
};

export type WordnikExample = {
    text: string;
};

export type WordnikAudio = {
    fileUrl: string;
};

export type WordnikWord = {
    word: string;
    definitions: WordnikDefinition[];
    examples: WordnikExample[];
    audio?: WordnikAudio;
};