import { View, Pressable, Text } from "react-native";
import { Button } from "react-native-paper";
import AppHeader from "@/components/appHeader";
import AppCard from "@/components/appCard";

import { TRAINING_LABELS } from "@/constants/labels";

export default function TrainingTab() {

    return(
        <View className="flex-1">
            <AppHeader title={TRAINING_LABELS.WORD_GYM_TITLE}/>
            <View className="p-6">
                <AppCard>
                <View className="flex-col justify-center w-full h-full pl-10 pr-10">
                <View className="m-2">
                    <Button
                        icon="puzzle"
                        mode="outlined"
                        onPress={()=>console.log("Word matching")}>
                        {TRAINING_LABELS.WORD_MATCHING_BUTTON}
                    </Button>
                </View>
                <View className="m-2">
                    <Button
                        icon="book-open-variant-outline"
                        mode="outlined"
                        onPress={()=>console.log("Definition matching")}>
                        {TRAINING_LABELS.DEFINITION_MATCHING_BUTTON}
                    </Button>
                </View>
                <View>

                </View>
            </View>
                </AppCard>
            </View>
        </View>
    );
}