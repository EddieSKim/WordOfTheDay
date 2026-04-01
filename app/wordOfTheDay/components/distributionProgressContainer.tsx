import { distributionCategories } from "@/constants/distributionCategories";
import { useWordContext } from "@/contexts/WordContext";
import { WordProgressStats } from "@/types/word";
import { View } from "react-native";
import DistributionProgressCard from "./distributionProgressCard";

export default function DistributionProgressContainer({ wordProgressStats }: { wordProgressStats: WordProgressStats | null }) {
    const totalWords = wordProgressStats?.total || 0;

    return (
        <View className="mt-6">
            <View className="flex-col">
                <DistributionProgressCard
                    category={distributionCategories.MASTERED}
                    progressRange={[80, 100]}
                    numberOfWordsInRange={wordProgressStats?.mastered || 0}
                    totalWords={totalWords}
                />
                <DistributionProgressCard
                    category={distributionCategories.ADVANCED}
                    progressRange={[60, 79]}
                    numberOfWordsInRange={wordProgressStats?.advanced || 0}
                    totalWords={totalWords}
                />
                <DistributionProgressCard
                    category={distributionCategories.INTERMEDIATE}
                    progressRange={[40, 59]}
                    numberOfWordsInRange={wordProgressStats?.intermediate || 0}
                    totalWords={totalWords}
                />
                <DistributionProgressCard
                    category={distributionCategories.BEGINNER}
                    progressRange={[20, 39]}
                    numberOfWordsInRange={wordProgressStats?.beginner || 0}
                    totalWords={totalWords}
                />
                <DistributionProgressCard
                    category={distributionCategories.STARTING}
                    progressRange={[0, 19]}
                    numberOfWordsInRange={wordProgressStats?.starting || 0}
                    totalWords={totalWords}
                />
            </View>
        </View>
    );
}
