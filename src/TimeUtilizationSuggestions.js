import React from "react";
import { StyleSheet, View } from "react-native";
import Markdown from "react-native-markdown-renderer";
import { Button, Text, useTheme } from 'react-native-paper';
import { calculateRemainingTime, getDisplayHours, validateHours } from "./utils/utils";

export function TimeUtilizationSuggestions(props) {
    const { activities } = props;
    const validActivities = activities.filter((activity) => validateHours(activity).valid)

    const [promptAISession, setPromptAISession] = React.useState(null);
    const [hoursRemaining, setHoursRemaining] = React.useState(168);
    const [aiSuggestion, setAiSuggestion] = React.useState("");
    const [aiError, setAiError] = React.useState("");
    const [loadingSuggestions, setLoadingSuggestions] = React.useState(false);

    const theme = useTheme();
    const styles = StyleSheet.create({
        suggestionText: {
            textAlign: 'left',
            paddingHorizontal: 20,
            paddingBottom: 10,
            paddingTop: 20
        },
        buttonHelperText: {
            textAlign: 'center',
            paddingTop: '5px',
            color: theme.colors.backdrop,
        }
    })

    const generateAISuggestion = async (promptAISession, hoursRemaining) => {
        if (!promptAISession) {
            setAiError("PromptAPI not found in browser");
            return;
        }

        try {
            setLoadingSuggestions(true);
            setAiError("");
            const prompt = `Given ${getDisplayHours(hoursRemaining)} free hours in a week, suggest some meaningful activities or pursuits. The suggestion should be personal, motivating and specific. Here is the list of activities that the user indulges in during the week: ${validActivities.map(activity => `${activity.name} for ${activity.hours * activity.duration.multiplier} hours across the week`).join(",")}.`;
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
            setAiError("Error generating AI suggestion")
            setLoadingSuggestions(false);
        }
    };

    React.useEffect(async () => {
        if (window?.ai?.languageModel) {
            const session = await window.ai.languageModel.create({
                temperature: 0.1,
                topK: 10,
                initialPrompts: [
                    { role: "system", content: "Start by providing feedback about the user's current time commitments. For example, tell them if they are packing their schedule too much or they have more free time than recommended. If the user has a lot of free time or no free time at all, help the user manage their time better through recommendations. Recommendations must strongly align with the activities that the user already indulges in. For example, if the user indulges in business or entrepreneural activities, then providing side hustle recommendations related to their existing hobbies would be well aligned. Respond without judgement or prejudices related to modern ethics and morality but a strong opinion about time management, maximizing focus time & productivity, while minimizing burnout. Output markdown. For each recommendation, provide the estimated amount of time investment required every week." },
                    { role: "user", content: "I am looking for recommendations for things that I can either remove from my weekly schedule (by dropping those activities or outsourcing them to others) or things that I can add to my weekly schedule in order to live a more meaningful life." },
                ]
            });
            setPromptAISession(session);
        } else {
            setAiError("PromptAPI not found in browser");
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
            <Button
                mode="outlined"
                onPress={provideRecommendation}
                disabled={loadingSuggestions || !promptAISession}
                loading={loadingSuggestions}
            >
                Generate recommendations
            </Button>
            <Text variant="labelSmall" style={styles.buttonHelperText}>
                {aiError}
            </Text>
            <Text variant="bodyLarge" style={styles.suggestionText}>
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