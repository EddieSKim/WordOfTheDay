import { distributionCategories } from "@/constants/distributionCategories";
import { useWordContext } from "@/contexts/WordContext";
import { View } from "react-native";
import DistributionProgressCard from "./distributionProgressCard";

export default function DistributionProgressContainer() {
    const { wordsCollection } = useWordContext();

    const getStartingWordsProgress = () => {};

    const getBeginnerWordsProgress = () => {};

    const getIntermediateWordsProgress = () => {};

    const getAdvancedWordsProgress = () => {};

    const getMasteredWordsProgress = () => {};

    return (
        <View className="mt-6">
            <View className="flex-col">
                <DistributionProgressCard
                    category={distributionCategories.MASTERED}
                    progressRange={[80, 100]}
                    numberOfWordsInRange={0}
                    totalWords={0}
                />
                <DistributionProgressCard
                    category={distributionCategories.ADVANCED}
                    progressRange={[60, 79]}
                    numberOfWordsInRange={0}
                    totalWords={0}
                />
                <DistributionProgressCard
                    category={distributionCategories.INTERMEDIATE}
                    progressRange={[40, 59]}
                    numberOfWordsInRange={0}
                    totalWords={0}
                />
                <DistributionProgressCard
                    category={distributionCategories.BEGINNER}
                    progressRange={[20, 39]}
                    numberOfWordsInRange={0}
                    totalWords={0}
                />
                <DistributionProgressCard
                    category={distributionCategories.STARTING}
                    progressRange={[0, 19]}
                    numberOfWordsInRange={0}
                    totalWords={0}
                />
            </View>
        </View>
    );
}
