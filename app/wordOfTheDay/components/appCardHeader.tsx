import { Text } from "react-native";

type AppCardHeaderProps = {
    header: string;
};

export default function AppCardHeader(props: AppCardHeaderProps) {

    return (
        <Text className={`text-3xl font-semibold mb-2`}>
            {props.header}
        </Text>
    )
}