import React from "react";
import { Text, View } from "react-native";
import { Card } from "react-native-paper";

interface wordExampleCardProps {
    example: string
}

export default function WordExampleCard({ example }: wordExampleCardProps) {
    return (
        <Card>
            <View className="bg-purple-100 p-2">
                <Text className="italic">
                    {example}
                </Text>
            </View>
        </Card>
    );
}