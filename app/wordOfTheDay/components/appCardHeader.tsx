import { Text } from "react-native";

type AppCardHeaderProps = {
    header: string;
  center?: boolean;
  className?: string;
};

export default function AppCardHeader(props: AppCardHeaderProps) {

    return (
        <Text className={`text-xl ${props.center ? "text-center" : ""} ${props.className ?? ""}`}>
            {props.header}
        </Text>
    )
}