import AppCard from "@/components/appCard";
import AppCardHeader from "@/components/appCardHeader";
import AppCardSubHeader from "@/components/appCardSubHeader";
import DistributionProgressContainer from "@/components/distributionProgressContainer";
import { useWordContext } from "@/contexts/WordContext";
import { ScrollView, Text, View } from "react-native";

export default function StatsTab() {
    const { wordsWithProgress, wordProgressStats } = useWordContext();

    if (wordsWithProgress.length === 0) {
        return (
            <View className="p-6">
                <AppCard>
                    <View className="p-6 flex-col justify-center items-center">
                        <AppCardHeader header="No analytics available yet!" />
                        <AppCardSubHeader
                            subHeader="Start learning words and playing games to see your progress."
                            center
                        />
                    </View>
                </AppCard>
            </View>
        );
    }

    return (
        <ScrollView className="p-6">
            <View className="p-6"></View>
            <View className="mb-4">
                <AppCard>
                    <View className="m-6">
                        <AppCardHeader header="Word Mastery" />
                        <AppCardSubHeader subHeader="Track your progress for each word" />
                        <View className="mt-4">
                            {wordsWithProgress.map((item, index) => (
                                <View
                                    key={index}
                                    className="flex-row justify-between items-center py-2 border-b border-gray-200"
                                >
                                    <View className="flex-1">
                                        <Text className="font-semibold">
                                            {item.word}
                                        </Text>
                                    </View>
                                    <View className="flex-col items-end">
                                        <Text className="text-sm font-medium">
                                            {item.familiarity}%
                                        </Text>
                                        <Text className="text-xs text-gray-500">
                                            {item.correct_count}✓ /{" "}
                                            {item.wrong_count}✗
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                </AppCard>
            </View>

            <View>
                <AppCard>
                    <View className="m-6">
                        <AppCardHeader header="Distribution" />
                        <AppCardSubHeader subHeader="Vocabulary knowledge breakdown" />
                        <DistributionProgressContainer
                            wordProgressStats={wordProgressStats}
                        />
                    </View>
                </AppCard>
            </View>
        </ScrollView>
    );
}
