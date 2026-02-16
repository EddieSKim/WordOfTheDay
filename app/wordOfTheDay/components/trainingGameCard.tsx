import { View, Text } from "react-native";
import AppCard from "./appCard";
import { Button, Chip } from "react-native-paper";
import { TRAINING_LABELS } from "@/constants/labels";

interface TrainingGameCardProps {
    title: string,
    icon: string,
    description: string,
    onPress: ()=> void
}

export default function TrainingGameCard({
    title,
    icon,
    description,
    onPress
} : TrainingGameCardProps) {

    return (
        <View>
            <AppCard>
                <View className="m-6">
                    <View className="flex-col justify-start">
                        <Text className="text-xl font-semibold my-4">
                            {title}
                        </Text>
                        <Text className="my-2">
                            {description}
                        </Text>
                        <Text className="my-4">
                            15-20 mins
                        </Text>
                        <Text className="my-1">
                            Skills Focused: 
                        </Text>
                        <View className="mt-1 mb-2 flex-row">
                            <Chip mode="outlined">
                                Understanding
                            </Chip>
                            <Chip mode="outlined">
                                Perception
                            </Chip>
                        </View>
                        <Button
                            icon="book-open-variant-outline"
                            mode="outlined"
                            onPress={()=>console.log("Definition matching")}>
                            {TRAINING_LABELS.START_GAME_BUTTON}
                        </Button>
                    </View>
                </View>
            </AppCard>
        </View>
    )
}