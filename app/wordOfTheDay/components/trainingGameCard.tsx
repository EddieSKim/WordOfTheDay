import { View, Text } from "react-native";
import AppCard from "./appCard";
import { Button } from "react-native-paper";

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
                        <Text className="text-lg font-semibold my-4">
                            {title}
                        </Text>
                        <Text>
                            {description}
                        </Text>
                        <Text>
                            15-20 mins
                        </Text>
                        <Text>
                            Skills Focused: 
                        </Text>
                    </View>
                </View>
            </AppCard>
        </View>
    )
}