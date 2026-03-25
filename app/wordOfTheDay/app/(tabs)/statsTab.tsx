import { useState } from "react";
import { View, Text } from "react-native";
import AppCard from "@/components/appCard";
import AppCardHeader from "@/components/appCardHeader";
import AppCardSubHeader from "@/components/appCardSubHeader";

export default function StatsTab() {
    const [wordCollection, setWordCollection] = useState([]);

    const getWordCollection = () => {

        return [];
    }

    // if (wordCollection.length === 0) {
    //     return (
    //         <View className="p-6">
    //             <AppCard>
    //                 <View className="p-6 flex-col justify-center items-center">
    //                     <AppCardHeader header="No analytics available yet!" />
    //                     <AppCardSubHeader subHeader="Start learning words and playing games to see your progress." center />
    //                 </View>
    //             </AppCard>
    //         </View>
    //     );
    // }

    return (
        <View className="p-6">
            <View className="p-6">

            </View>
            <View className="mb-4">
                <AppCard>
                    <View className="m-6">
                        <AppCardHeader header="Word Mastery" />
                        <AppCardSubHeader subHeader="Track your progress for each word" />
                    </View>
                </AppCard>
            </View>
            
            <View>
                <AppCard>
                    <View className="m-6">
                        <AppCardHeader header="Distribution" />
                        <AppCardSubHeader subHeader="Vocabulary knowledge breakdown" />
                    </View>
                </AppCard>
            </View>
        </View>
    );
}