import { Text, View } from "react-native";
import DistributionProgressBarLarge from "./distributionProgressBarLarge";

export default function DistributionProgressCard({
    progressRange,
    numberOfWordsInRange,
    totalWords,
    category,
}: {
    progressRange: [number, number];
    numberOfWordsInRange: number;
    totalWords: number;
    category: string;
}) {
    return (
        <View className="mt-4">
            <View className="flex-row justify-between mb-2">
                <Text>{category}</Text>
                <Text className="text-gray-600">
                    {progressRange[0]}% - {progressRange[1]}%
                </Text>
            </View>
            <DistributionProgressBarLarge
                numberOfWordsInRange={numberOfWordsInRange}
                totalWords={totalWords}
                category={category}
            />
        </View>
    );
}
