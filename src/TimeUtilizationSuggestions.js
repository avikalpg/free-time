import React from "react";
import { StyleSheet, View } from "react-native";
import Markdown from "react-native-markdown-renderer";
import { Button, Text } from 'react-native-paper';
import { calculateRemainingTime, getDisplayHours, validateHours } from "./utils/utils";

export function TimeUtilizationSuggestions(props) {
    const { activities } = props;
    const validActivities = activities.filter((activity) => validateHours(activity).valid)

    const [promptAISession, setPromptAISession] = React.useState(null);
    const [hoursRemaining, setHoursRemaining] = React.useState(168);
    const [aiSuggestion, setAiSuggestion] = React.useState("");
    const [loadingSuggestions, setLoadingSuggestions] = React.useState(false);

    const generateAISuggestion = async (promptAISession, hoursRemaining) => {
        if (!promptAISession) {
            console.warn("[TimeUtilizationSuggestions] No promptAI session")
            return;
        }

        try {
            setLoadingSuggestions(true);
            const prompt = `Given ${getDisplayHours(hoursRemaining)} free hours in a week, suggest some meaningful activities
             or pursuits. The suggestion should be personal, motivating and specific. Here is the list of activities that
             I indulge in during the week: ${validActivities.map(activity => activity.name).join(",")}. Generate the output as markdown.`;
            console.log(`prompt: ${prompt}`)
            const stream = await promptAISession.promptStreaming(prompt);

            const reader = stream.getReader();
            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    setLoadingSuggestions(false);
                    break; // Exit the loop when the stream is finished
                }
                setAiSuggestion(value)
            }
        } catch (error) {
            console.error("Error generating AI suggestion:", error);
        }
    };

    React.useEffect(async () => {
        if (window?.ai?.languageModel) {
            const session = await window.ai.languageModel.create();
            setPromptAISession(session);
        }
    }, [])

    React.useEffect(() => {
        setHoursRemaining(calculateRemainingTime(validActivities));
    }, [validActivities])

    const provideRecommendation = () => {
        if (window?.ai?.languageModel) {
            generateAISuggestion(promptAISession, hoursRemaining);
        }
    };

    const getDefaultSuggestion = () => {
        if (hoursRemaining > 40) return "You can take up another full time job";
        if (hoursRemaining > 20) return "You can probably start a side hustle or a part-time job like Uber driving";
        if (hoursRemaining > 5) return "You can probably schedule dedicated time to spend with your family, friends or hobbies";
        return "Congratulations, you are making the most of your life. But if you are aren't happy, you should probably reassess the importance and priority of some of these activities and remove/outsource the ones that don't give you a lot of joy";
    }

    return (
        <View style={props.style}>
            <Button mode="outlined" onPress={provideRecommendation} disabled={loadingSuggestions} loading={loadingSuggestions}>Generate recommendations</Button>
            <Text style={styles.suggestionText}>
                <Markdown>
                    {(window?.ai?.languageModel && aiSuggestion) ?
                        aiSuggestion :
                        getDefaultSuggestion()
                    }
                </Markdown>
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    suggestionText: {
        textAlign: 'left',
        paddingHorizontal: 20,
        paddingBottom: 10,
        paddingTop: 20
    }
})