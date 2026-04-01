import AppCard from "@/components/appCard";
import WordExampleCard from "@/components/wordExampleCard";
import { LABELS } from "@/constants/labels";
import { useWordContext } from "@/contexts/WordContext";
import { useWordOfDay } from "@/hooks/useWordOfTheDay";
import { useAudioPlayer } from "expo-audio";
import React, { useRef, useState } from "react";
import { Button, Image, Platform, ScrollView, Text, View } from "react-native";
import { Chip, Divider, IconButton } from "react-native-paper";
import ViewShot from "react-native-view-shot";

import { clearWordTable, dropWordTable } from "@/database";
import { getAllWords } from "@/database/wordQueries";

export default function HomeScreen() {
    const { word, loading } = useWordOfDay();
    const { wordsCollection, saveWordToCollection } = useWordContext();
    const [currentDate, setCurrentDate] = useState<Date>(new Date());

    const viewShotRef = useRef<ViewShot>(null);
    const [snapshotUri, setSnapshotUri] = React.useState<string | null>(null);

    // Only create audio player when we have audio data
    const wordAudio = useAudioPlayer(word?.audio?.fileUrl || "", {
        downloadFirst: true,
    });

    const getWord = (): string => {
        if (!word || !word.word) {
            return "";
        }
        return word.word.toUpperCase();
    };

    const getDefinitions = () => {
        return word?.definitions || [];
    };

    const getExampleSentences = () => {
        return word?.examples || [];
    };

    const getCurrentDate = (): string => {
        return currentDate.toLocaleDateString("en-us", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const handleAddToWordCollection = async () => {
        if (Platform.OS === "web") {
            return;
        }

        try {
            if (!word) {
                return;
            }

            await saveWordToCollection({
                word: word.word,
                definition: word.definitions?.[0]?.text ?? "",
                example: word.examples?.[0]?.text,
            });
        } catch (err) {
            console.warn("Failed to add word to collections:", err);
        }
    };

    if (loading || !word) {
        return <ScrollView className="flex-1" />;
    }

    return (
        <ScrollView className="flex-1">
            <View className="flex-1 p-6">
                <AppCard>
                    <Button
                        title="Drop Word Table"
                        onPress={() => dropWordTable()}
                    ></Button>
                    <Button
                        title="Clear Word Table"
                        onPress={() => clearWordTable()}
                    ></Button>
                    <Button
                        title="Get all Words"
                        onPress={() => getAllWords()}
                    ></Button>
                    <View className="flex-col items-start pl-6 pt-6 pr-6 mb-2">
                        {snapshotUri && (
                            <Image
                                source={{ uri: snapshotUri }}
                                style={{
                                    width: 200,
                                    height: 200,
                                    marginTop: 20,
                                    borderWidth: 1,
                                }}
                            />
                        )}
                        <Text>{getCurrentDate()}</Text>
                        <View>
                            <ViewShot ref={viewShotRef}>
                                <Text className="text-4xl text-grey-900 font-medium">
                                    {getWord()
                                        ? getWord()
                                        : LABELS.NO_WORD_TODAY}
                                </Text>
                            </ViewShot>
                            {word?.audio?.fileUrl ? (
                                <IconButton
                                    size={20}
                                    icon="volume-high"
                                    onPress={() => wordAudio.play()}
                                ></IconButton>
                            ) : (
                                <></>
                            )}
                        </View>
                    </View>
                    <View className="flex-1 pb-6 pr-6 pl-6">
                        <View className="mb-6">
                            <Text className="text-xl font-semibold text-gray-800 mb-3">
                                {getDefinitions().length > 1
                                    ? LABELS.DEFINITIONS
                                    : LABELS.DEFINITION}
                            </Text>
                            {getDefinitions().length > 0 ? (
                                getDefinitions().map(
                                    (definition: any, index: number) => (
                                        <View className="flex-wrap flex-row">
                                            <Chip>
                                                {definition.partOfSpeech}
                                            </Chip>
                                            <Text
                                                key={index}
                                                className="text-gray-700 mb-2 leading-6 my-2"
                                            >
                                                {definition.text}
                                            </Text>
                                        </View>
                                    ),
                                )
                            ) : (
                                <Text className="text-gray-500 italic">
                                    {LABELS.NO_DEFINITIONS}
                                </Text>
                            )}
                        </View>
                        <Divider />
                        <View className="my-4">
                            <Text className="text-xl font-semibold text-gray-800 mb-3">
                                {getExampleSentences().length > 1
                                    ? LABELS.EXAMPLES
                                    : LABELS.EXAMPLE}
                            </Text>
                            {getExampleSentences().length > 0 ? (
                                getExampleSentences().map(
                                    (exampleSentence: any, index: number) => (
                                        <View className="p-2">
                                            <WordExampleCard
                                                key={index}
                                                example={exampleSentence.text}
                                            />
                                        </View>
                                    ),
                                )
                            ) : (
                                <Text className="text-gray-500 italic">
                                    {LABELS.NO_EXAMPLES}
                                </Text>
                            )}
                        </View>
                        <Divider />
                    </View>
                    {getWord() !== "" && (
                        <View className="p-6">
                            <View>
                                <Button
                                    title={LABELS.ADD_TO_WORDS}
                                    onPress={handleAddToWordCollection}
                                ></Button>
                            </View>
                        </View>
                    )}
                </AppCard>
            </View>
        </ScrollView>
    );
}
