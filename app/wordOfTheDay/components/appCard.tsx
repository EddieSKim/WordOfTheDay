import { View } from "react-native"

interface AppCardProps {
    children: React.ReactNode
}

export default function AppCard({ children } : AppCardProps) {


    return (
        <View className="bg-white rounded-2xl shadow-md">
            {children}
        </View>
    )
}