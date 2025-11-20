import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import Markdown from "react-native-markdown-renderer";
import { Button, Text, TextInput, useTheme, IconButton } from 'react-native-paper';
import { calculateRemainingTime, getDisplayHours, validateHours } from "./utils/utils";

export function TimeUtilizationSuggestions(props) {
    const { activities, compactMode = false, onChatStart } = props;
    const validActivities = activities.filter((activity) => validateHours(activity).valid)

    const [promptAISession, setPromptAISession] = React.useState(null);
    const [hoursRemaining, setHoursRemaining] = React.useState(168);
    const [chatHistory, setChatHistory] = React.useState([]);
    const [aiError, setAiError] = React.useState("");
    const [loadingSuggestions, setLoadingSuggestions] = React.useState(false);
    const [userGoal, setUserGoal] = React.useState("");
    const [chatStarted, setChatStarted] = React.useState(false);
    const [followUpMessage, setFollowUpMessage] = React.useState("");
    const scrollViewRef = React.useRef(null);

    const theme = useTheme();
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
        },
        chatContainer: {
            flex: 1,
            paddingHorizontal: 12,
            paddingTop: 8,
        },
        messageContainer: {
            marginVertical: 6,
            padding: 12,
            borderRadius: 12,
            maxWidth: '85%',
        },
        userMessage: {
            alignSelf: 'flex-end',
            backgroundColor: '#DCF8C6',
        },
        aiMessage: {
            alignSelf: 'flex-start',
            backgroundColor: '#FFFFFF',
            borderWidth: 1,
            borderColor: '#E0E0E0',
        },
        messageLabel: {
            fontSize: 11,
            fontWeight: '600',
            marginBottom: 4,
            color: theme.colors.primary,
        },
        messageText: {
            fontSize: 14,
            color: '#000000',
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 12,
            paddingVertical: 12,
            borderTopWidth: 1,
            borderTopColor: '#E0E0E0',
            backgroundColor: '#F5F5F5',
        },
        textInput: {
            flex: 1,
            marginRight: 8,
        },
        buttonHelperText: {
            textAlign: 'center',
            paddingTop: 5,
            paddingBottom: 5,
            color: theme.colors.error,
            fontSize: 12,
        },
        defaultSuggestionText: {
            textAlign: 'left',
            paddingHorizontal: 20,
            paddingBottom: 10,
            paddingTop: 20
        },
        introMessage: {
            alignSelf: 'flex-start',
            backgroundColor: '#E3F2FD',
            marginVertical: 6,
            padding: 12,
            borderRadius: 12,
            maxWidth: '95%',
        },
        introText: {
            fontSize: 14,
            color: '#000000',
            lineHeight: 20,
        },
        uninitializedContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingVertical: 20,
        },
    })

    const generateAISuggestion = async (promptAISession, userMessage, isInitial = false) => {
        if (!promptAISession) {
            setAiError("PromptAPI not found in browser");
            return;
        }

        try {
            setLoadingSuggestions(true);
            setAiError("");

            let prompt;
            if (isInitial) {
                prompt = `User's goal: ${userMessage}\n\nThe user currently has ${getDisplayHours(hoursRemaining)} free hours in a week. Here is their current weekly schedule: ${validActivities.map(activity => `${activity.name} for ${activity.hours} hours ${activity.duration.text}`).join(", ")}.\n\nAnalyze their time allocation against their goal in 2-3 sentences. Then ask ONE clarifying question to understand what's blocking them.`;
            } else {
                prompt = userMessage;
            }

            const userMessageObj = { role: 'user', content: userMessage };
            setChatHistory(prev => [...prev, userMessageObj]);

            const aiMessageObj = { role: 'ai', content: '' };
            setChatHistory(prev => [...prev, aiMessageObj]);

            const stream = await promptAISession.promptStreaming(prompt);
            const reader = stream.getReader();

            let accumulatedResponse = '';
            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    setLoadingSuggestions(false);
                    break;
                }
                accumulatedResponse += value;
                setChatHistory(prev => {
                    const updated = [...prev];
                    updated[updated.length - 1] = { role: 'ai', content: accumulatedResponse };
                    return updated;
                });
            }

            setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
            }, 100);
        } catch (error) {
            console.error("Error generating AI suggestion:", error);
            setAiError("Error generating AI suggestion")
            setLoadingSuggestions(false);
        }
    };

    const createSessionConfig = () => ({
        initialPrompts: [
            { role: "system", content: "You are a time management coach. Keep ALL responses to 2-3 sentences maximum. Focus on asking clarifying questions rather than giving prescriptive advice. Be conversational, empathetic, and Socratic. Help users discover insights about their time allocation through guided questions. Never give long lists or detailed plans unless explicitly asked. Think like a human coach in a conversation, not a report writer. Always start from the end goal - if you are not exactly clear about what that goal means, ask clarifying question about that first. Next, try to find out how do the current time commitments align with that goal. If the commitment listed are vague, ask clarifying questions first. Your goal is to help the user prioritise the right activities in their life so that they are able to achieve their goal without compromising on interim happiness." },
            { role: "user", content: "I want to ensure that I am spending my time doing the right things such that I'm able to achieve my goals." },
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
        try {
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
        }
    };

    React.useEffect(() => {
        setHoursRemaining(calculateRemainingTime(validActivities));
    }, [validActivities])

    React.useEffect(() => {
        if (promptAISession && chatHistory.length === 0) {
            const introMessages = [
                {
                    role: 'intro',
                    content: "Do you know, we have 168 hours in a week? Most full time jobs demand only 40-48 hours of work in a week. This means that we have almost 3-times as much time in our week as we devote to our full-time jobs. How do you spend this time?\n\nThe purpose of this website is gaining self-awareness about the amount of free time you have in your week."
                },
                {
                    role: 'ai',
                    content: "What is the one thing you want to achieve in the next 1 year?"
                }
            ];
            setChatHistory(introMessages);
        }
    }, [promptAISession]);

    const sendMessage = async () => {
        if (!promptAISession) {
            await initializeLanguageModel();
            return;
        }

        if (!followUpMessage.trim()) return;

        const isFirstMessage = chatHistory.length === 2 && chatHistory[0].role === 'intro';

        if (isFirstMessage && onChatStart) {
            onChatStart();
        }

        await generateAISuggestion(promptAISession, followUpMessage, isFirstMessage);
        setFollowUpMessage("");
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const getDefaultSuggestion = () => {
        if (hoursRemaining > 40) return "You can take up another full time job.";
        if (hoursRemaining > 20) return "You can probably start a side hustle or a part-time job like Uber driving.";
        if (hoursRemaining > 5) return "You can probably schedule dedicated time to spend with your family, friends or hobbies.";
        return "Congratulations, you are making the most of your life. But if you are aren't happy, you should probably reassess the importance and priority of some of these activities and remove/outsource the ones that don't give you a lot of joy.";
    }

    if (!promptAISession && aiError) {
        return (
            <View style={[props.style, styles.container, styles.uninitializedContainer]}>
                <Button
                    mode="outlined"
                    onPress={initializeLanguageModel}
                    disabled={loadingSuggestions}
                >
                    Initialize AI Model
                </Button>
                {aiError && (
                    <Text variant="labelSmall" style={styles.buttonHelperText}>
                        {aiError}
                    </Text>
                )}
                <Text variant="bodyLarge" style={styles.defaultSuggestionText}>
                    <Markdown>
                        {getDefaultSuggestion()}
                    </Markdown>
                </Text>
            </View>
        );
    }

    return (
        <View style={[props.style, styles.container]}>
            <ScrollView
                ref={scrollViewRef}
                style={styles.chatContainer}
                onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
            >
                {chatHistory.map((message, index) => (
                    <View
                        key={index}
                        style={[
                            message.role === 'intro' ? styles.introMessage : styles.messageContainer,
                            message.role === 'user' ? styles.userMessage : message.role === 'ai' ? styles.aiMessage : null
                        ]}
                    >
                        {message.role !== 'intro' && (
                            <Text style={styles.messageLabel}>
                                {message.role === 'user' ? 'You' : 'AI Coach'}
                            </Text>
                        )}
                        <Text style={message.role === 'intro' ? styles.introText : styles.messageText}>
                            {message.content || '...'}
                        </Text>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Type your message..."
                    value={followUpMessage}
                    onChangeText={setFollowUpMessage}
                    mode="outlined"
                    dense
                    style={styles.textInput}
                    onKeyPress={handleKeyPress}
                    disabled={loadingSuggestions}
                    multiline
                    maxLength={500}
                />
                <IconButton
                    icon="send"
                    mode="contained"
                    onPress={sendMessage}
                    disabled={loadingSuggestions || !followUpMessage.trim()}
                    iconColor={!loadingSuggestions && followUpMessage.trim() ? theme.colors.primary : theme.colors.disabled}
                />
            </View>

            {aiError && (
                <Text variant="labelSmall" style={styles.buttonHelperText}>
                    {aiError}
                </Text>
            )}
        </View>
    )
}
