import { View, Pressable, Text } from "react-native";
import { Button } from "react-native-paper";
import AppHeader from "@/components/appHeader";
import AppCard from "@/components/appCard";
import TrainingGameCard from "@/components/trainingGameCard";

import { LABELS, TRAINING_LABELS } from "@/constants/labels";

export default function TrainingTab() {

    return(
        <View className="flex-1">
            <AppHeader title={LABELS.APP_TITLE} description={LABELS.APP_DESCRIPTION}/>
            <View className="p-6">
                <View className="flex-col justify-center w-full h-full">
                    <View className="bg-violet-500 rounded-2xl shadow-md mb-4">
                        <View className="flex-col justify-start p-6">
                            <Text className="text-white text-lg">AI Training Games</Text>
                            <Text className="text-white text-base">Master vocabulary through adaptive learning</Text>
                            <Text className="text-white mt-10 text-base">1 words in your study list</Text>
                        </View>
                    </View>
                    <View className="mb-4">
                        <TrainingGameCard
                            title={TRAINING_LABELS.DEFINITION_MATCHING_TITLE}
                            description="" 
                            icon=""
                            onPress={()=>{}}
                        />
                    </View>
                    <View className="mb-4">
                        <AppCard>
                            <View className="m-6">
                                <Button
                                    icon="book-open-variant-outline"
                                    mode="outlined"
                                    onPress={()=>console.log("Definition matching")}>
                                    {TRAINING_LABELS.START_GAME_BUTTON}
                                </Button>
                            </View>
                        </AppCard>
                    </View>
                <View>

                </View>
            </View>
            </View>
        </View>
    );
}