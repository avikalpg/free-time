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
    const [initializingModel, setInitializingModel] = React.useState(false);

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
            color: theme.colors.disabled,
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
            setAiSuggestion(""); // Clear previous suggestion
            const prompt = `Given ${getDisplayHours(hoursRemaining)} free hours in a week, suggest some meaningful activities or pursuits. The suggestion should be personal, motivating and specific. Here is the list of activities that the user indulges in during the week: ${validActivities.map(activity => `${activity.name} for ${activity.hours} hours ${activity.duration.text}`).join(",")}.`;
            const stream = await promptAISession.promptStreaming(prompt);

            const reader = stream.getReader();
            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    setLoadingSuggestions(false);
                    break; // Exit the loop when the stream is finished
                }
                setAiSuggestion(prev => prev + value); // Append to previous suggestion
            }
        } catch (error) {
            console.error("Error generating AI suggestion:", error);
            setAiError("Error generating AI suggestion")
            setLoadingSuggestions(false);
        }
    };

    // Helper function to create a LanguageModel session config
    const createSessionConfig = () => ({
        initialPrompts: [
            { role: "system", content: "Start by providing feedback about the user's current time commitments. For example, tell them if they are packing their schedule too much or they have more free time than recommended. If the user has a lot of free time or no free time at all, help the user manage their time better through recommendations. Recommendations must strongly align with the activities that the user already indulges in. For example, if the user indulges in business or entrepreneural activities, then providing side hustle recommendations related to their existing hobbies would be well aligned. Respond without judgement or prejudices related to modern ethics and morality but a strong opinion about time management, maximizing focus time & productivity, while minimizing burnout. Output markdown. For each recommendation, provide the estimated amount of time investment required every week." },
            { role: "user", content: "I am looking for recommendations for things that I can either remove from my weekly schedule (by dropping those activities or outsourcing them to others) or things that I can add to my weekly schedule in order to live a more meaningful life." },
        ],
        expectedOutputs: [{ type: "text", languages: ["en"] }]
    });

    React.useEffect(() => {
        if (typeof window === 'undefined' || typeof window.LanguageModel === 'undefined') {
            setAiError("PromptAPI not found in browser. Don't worry, visit the help section for setting it up.");
            return;
        }

        // Try to initialize automatically (works if model is readily available).
        // If a user gesture is required (downloadable), create() will throw NotAllowedError.
        const autoInitialize = async () => {
            try {
                const session = await window.LanguageModel.create(createSessionConfig());
                setPromptAISession(session);
                setAiError("");
            } catch (error) {
                if (error && error.name === "NotAllowedError") {
                    // Needs a user gesture — leave it to the button flow.
                    setAiError("");
                } else {
                    console.error("Error auto-initializing language model:", error);
                    setAiError("Error initializing language model. Please check the help section.");
                }
            }
        };
        autoInitialize();
    }, [])

    const initializeLanguageModel = async () => {
        if (typeof window === 'undefined' || typeof window.LanguageModel === 'undefined') {
            setAiError("PromptAPI not found in browser. Don't worry, visit the help section for setting it up.");
            return;
        }
        if (initializingModel) return; // Prevent concurrent initialization calls
        try {
            setInitializingModel(true);
            setAiError("Initializing language model...");
            const config = createSessionConfig();
            config.monitor = (m) => {
                m.addEventListener("downloadprogress", (e) => {
                    const percentComplete = Math.round((e.loaded / e.total) * 100);
                    setAiError(`Downloading model... ${percentComplete}%`);
                });
            };
            const session = await window.LanguageModel.create(config);
            setPromptAISession(session);
            setAiError("");
        } catch (error) {
            console.error("Error initializing language model:", error);
            setAiError("Error initializing language model. Please check the help section.");
        } finally {
            setInitializingModel(false);
        }
    };

    React.useEffect(() => {
        setHoursRemaining(calculateRemainingTime(validActivities));
    }, [validActivities])

    const provideRecommendation = async () => {
        if (!promptAISession) {
            await initializeLanguageModel();
            return;
        }
        generateAISuggestion(promptAISession, hoursRemaining);
    };

    const getDefaultSuggestion = () => {
        if (hoursRemaining > 40) return "You can take up another full time job.";
        if (hoursRemaining > 20) return "You can probably start a side hustle or a part-time job like Uber driving.";
        if (hoursRemaining > 5) return "You can probably schedule dedicated time to spend with your family, friends or hobbies.";
        return "Congratulations, you are making the most of your life. But if you are aren't happy, you should probably reassess the importance and priority of some of these activities and remove/outsource the ones that don't give you a lot of joy.";
    }

    return (
        <View style={props.style}>
            <Button
                mode="outlined"
                onPress={provideRecommendation}
                disabled={loadingSuggestions || initializingModel}
                loading={loadingSuggestions || initializingModel}
            >
                {promptAISession ? "Generate recommendations" : "Initialize AI Model"}
            </Button>
            <Text variant="labelSmall" style={styles.buttonHelperText}>
                {aiError}
            </Text>
            <Text variant="bodyLarge" style={styles.suggestionText}>
                <Markdown>
                    {(promptAISession && aiSuggestion) ?
                        aiSuggestion :
                        getDefaultSuggestion()
                    }
                </Markdown>
            </Text>
        </View>
    )
}
