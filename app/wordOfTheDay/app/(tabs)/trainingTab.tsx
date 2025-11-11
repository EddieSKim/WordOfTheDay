import { View, Pressable, Text } from "react-native";
import { Button } from "react-native-paper";

import { TRAINING_LABELS } from "@/constants/labels";

export default function TrainingTab() {

    return(
        <View className="flex-1 bg-white">
            <View className="flex-col w-full p-6">
                <Button
                    className="m-2"
                    icon="puzzle"
                    mode="outlined"
                    onPress={()=>console.log("Word matching")}>
                    {TRAINING_LABELS.WORD_MATCHING_BUTTON}
                </Button>
                <Button
                    className="m-2"
                    icon="book-open-variant-outline"
                    mode="outlined"
                    onPress={()=>console.log("Definition matching")}>
                    {TRAINING_LABELS.DEFINITION_MATCHING_BUTTON}
                </Button>
            </View>
        </View>
    );
}