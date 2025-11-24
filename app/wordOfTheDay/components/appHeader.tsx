import { View, Text } from "react-native";


interface AppHeaderComponent {
    title: string,
    description?: string,
}

export default function AppHeader(
    {
        title,
        description
    } : AppHeaderComponent
) {

    return (
        <View className="items-center justify-center p-6">
            <Text className="text-3xl font-semibold text-violet-600 mb-2">
                {title}
            </Text>
            <Text className="text-violet-600">
                {description}
            </Text>
        </View>
    );
}