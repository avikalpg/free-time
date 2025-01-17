import React from "react";
import { View, StyleSheet } from "react-native";
import { Caption, Headline, Text, Title } from 'react-native-paper';
import { calculateRemainingTime, getDisplayHours, totalHoursInWeek, validateHours } from "./utils/utils";

export function TimeUtilizationSuggestions(props) {
    const { activities } = props;
    const validActivities = activities.filter((activity) => validateHours(activity).valid)

    const [hoursRemaining, setHoursRemaining] = React.useState(168);
    const [aiSuggestion, setAiSuggestion] = React.useState("");

    const generateAISuggestion = async () => {
        if (!window?.ai?.languageModel) return;

        try {
            const prompt = `Given ${getDisplayHours(hoursRemaining)} free hours in a week, suggest some meaningful activities or pursuits. The suggestion should be personal, motivating and specific. Keep it under 2 sentences.`;

            const response = await window.ai.generateText({
                messages: [{ role: "user", content: prompt }]
            });

            setAiSuggestion(response);
        } catch (error) {
            console.error("Error generating AI suggestion:", error);
            setAiSuggestion("");
        }
    }

    React.useEffect(() => {
        setHoursRemaining(calculateRemainingTime(validActivities));
    }, [validActivities])

    React.useEffect(() => {
        if (window?.ai?.languageModel) {
            generateAISuggestion();
        }
    }, [hoursRemaining]);

    const getDefaultSuggestion = () => {
        if (hoursRemaining > 40) return "You can take up another full time job";
        if (hoursRemaining > 20) return "You can probably start a side hustle or a part-time job like Uber driving";
        if (hoursRemaining > 5) return "You can probably schedule dedicated time to spend with your family, friends or hobbies";
        return "Congratulations, you are making the most of your life. But if you are aren't happy, you should probably reassess the importance and priority of some of these activities and remove/outsource the ones that don't give you a lot of joy";
    }

    return (
        <View style={props.style}>
            <Title>Recommendation</Title>
            <Text style={styles.suggestionText}>
                {(window?.ai?.languageModel && aiSuggestion) ?
                    aiSuggestion :
                    getDefaultSuggestion()
                }
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    suggestionText: {
        position: 'absolute',
        bottom: 0,
        textAlign: 'center',
        paddingHorizontal: 20,
        paddingBottom: 10
    }
})