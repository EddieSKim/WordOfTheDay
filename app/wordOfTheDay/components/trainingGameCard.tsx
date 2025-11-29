import { View, Text } from "react-native";
import AppCard from "./appCard";

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
                        <Text>
                            {title}
                        </Text>
                        <Text>
                            {description}
                        </Text>
                    </View>
                </View>
            </AppCard>
        </View>
    )
}