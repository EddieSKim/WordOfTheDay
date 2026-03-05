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
        <View className="items-center justify-center pt-6 pr-6 pl-6 pb-2 mt-8">
            <Text className="text-3xl font-semibold text-violet-600 mb-2">
                {title}
            </Text>
            <Text className="text-violet-600">
                {description}
            </Text>
        </View>
    );
}