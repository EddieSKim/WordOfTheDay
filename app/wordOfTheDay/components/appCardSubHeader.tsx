import { Text } from "react-native";

type AppCardSubHeaderProps = {
    subHeader: string;
    center?: boolean;
    italic?: boolean;
    className?: string;
};

export default function AppCardSubHeader({
    subHeader,
    center,
    italic,
    className,
}: AppCardSubHeaderProps) {
    return (
        <Text
            className={`text-gray-500 text-lg ${center ? "text-center" : ""} ${italic ? "italic" : ""} ${className ?? ""}`}
        >
            {subHeader}
        </Text>
    );
}
