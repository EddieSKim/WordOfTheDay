import { distributionCategories } from "@/constants/distributionCategories";
import { View } from "react-native";

const getColorClass = (category: string) => {
    switch (category) {
        case distributionCategories.STARTING:
            return "bg-blue-500";
        case distributionCategories.BEGINNER:
            return "bg-green-500";
        case distributionCategories.INTERMEDIATE:
            return "bg-yellow-500";
        case distributionCategories.ADVANCED:
            return "bg-orange-500";
        case distributionCategories.MASTERED:
            return "bg-purple-500";
        default:
            return "bg-gray-500";
    }
};

export default function DistributionProgressBarLarge({
    numberOfWordsInRange,
    totalWords,
    category,
}: {
    numberOfWordsInRange: number;
    totalWords: number;
    category: string;
}) {
    const progress =
        totalWords > 0 ? (numberOfWordsInRange / totalWords) * 100 : 0;

    return (
        <View className="w-full h-8 bg-gray-200 rounded-full">
            <View
                className={`h-full rounded ${getColorClass(category)}`}
                style={{ width: `${progress}%` }}
            />
        </View>
    );
}
