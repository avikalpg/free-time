import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import Markdown from "react-native-markdown-renderer";
import { Button, Text, TextInput, useTheme, IconButton, Menu, Divider } from 'react-native-paper';
import { calculateRemainingTime, getDisplayHours, validateHours } from "./utils/utils";
import {
    storeApiKey, listStoredProviders, deleteApiKey,
    getSelectedProvider, setSelectedProvider, sendRelayMessage,
    TIME_COACH_SYSTEM_PROMPT,
} from "./relay";

// ── Provider definitions ─────────────────────────────────────────────────────

const RELAY_PROVIDERS = [
    { key: 'anthropic', label: 'Claude (Anthropic)', placeholder: 'sk-ant-...' },
    { key: 'google', label: 'Gemini (Google)', placeholder: 'AIza...' },
];

// ── System prompt — shared with relay backend (imported from relay.js) ───────

const SYSTEM_PROMPT_CONTENT = TIME_COACH_SYSTEM_PROMPT;

const INTRO_MESSAGE = "Do you know, we have 168 hours in a week? Most full time jobs demand only 40-48 hours of work in a week. This means that we have almost 3-times as much time in our week as we devote to our full-time jobs.\n\nThe purpose of this tool is gaining self-awareness about the amount of free time you have in your week.";
const OPENING_QUESTION = "What is the one thing you want to achieve in the next 1 year?";

// ── Shared API key setup panel (used in both uninitialized + chat views) ─────
function ApiKeySetupPanel({
    setupProvider, storedProviders, apiKeyInput, savingKey,
    onChangeText, onSave, onRemove, onClose, autoFocus = false, styles, theme,
}) {
    const provider = RELAY_PROVIDERS.find(p => p.key === setupProvider);
    return (
        <View style={styles.apiKeySetup}>
            <Text style={styles.apiKeyTitle}>
                {provider ? `Add ${provider.label} key` : 'Manage API keys'}
            </Text>
            {provider ? (
                <>
                    <Text style={styles.apiKeyHint}>
                        Your key is stored encrypted on our relay server and never returned.
                        {'\n'}Get a key: {setupProvider === 'anthropic' ? 'console.anthropic.com' : 'aistudio.google.com'}
                    </Text>
                    <View style={styles.apiKeyRow}>
                        <TextInput
                            mode="outlined"
                            dense
                            placeholder={provider.placeholder}
                            value={apiKeyInput}
                            onChangeText={onChangeText}
                            secureTextEntry
                            style={styles.apiKeyInput}
                            autoFocus={autoFocus}
                        />
                        <Button mode="contained" onPress={onSave} disabled={savingKey || !apiKeyInput.trim()} loading={savingKey} compact>Save</Button>
                        <Button mode="text" onPress={onClose} compact>Cancel</Button>
                    </View>
                </>
            ) : (
                <>
                    {RELAY_PROVIDERS.filter(p => storedProviders.includes(p.key)).map(p => (
                        <View key={p.key} style={[styles.apiKeyRow, { marginBottom: 8 }]}>
                            <Text style={{ flex: 1 }}>{p.label}</Text>
                            <Button mode="text" onPress={() => onRemove(p.key)} textColor={theme.colors.error} compact>Remove</Button>
                        </View>
                    ))}
                    {storedProviders.length === 0 && <Text style={styles.apiKeyHint}>No keys stored yet.</Text>}
                    <Button mode="text" onPress={onClose} compact>Close</Button>
                </>
            )}
        </View>
    );
}

export function TimeUtilizationSuggestions(props) {
    const { activities, compactMode = false, onChatStart } = props;
    const validActivities = activities.filter((activity) => validateHours(activity).valid);

    // ── Browser Prompt API state ──────────────────────────────────────────────
    const [promptAISession, setPromptAISession] = React.useState(null);
    const [initializingModel, setInitializingModel] = React.useState(false);

    // ── Relay / cloud AI state ────────────────────────────────────────────────
    const [selectedProvider, setSelectedProviderState] = React.useState(null); // null = use browser
    const [storedProviders, setStoredProviders] = React.useState([]);
    const [showApiKeySetup, setShowApiKeySetup] = React.useState(false);
    const [setupProvider, setSetupProvider] = React.useState(null);
    const [apiKeyInput, setApiKeyInput] = React.useState('');
    const [savingKey, setSavingKey] = React.useState(false);
    const [providerMenuVisible, setProviderMenuVisible] = React.useState(false);

    // ── Shared chat state ─────────────────────────────────────────────────────
    const [chatHistory, setChatHistory] = React.useState([]);
    const [followUpMessage, setFollowUpMessage] = React.useState("");
    const [aiError, setAiError] = React.useState("");
    const [loadingSuggestions, setLoadingSuggestions] = React.useState(false);
    const [hoursRemaining, setHoursRemaining] = React.useState(168);
    const scrollViewRef = React.useRef(null);

    const theme = useTheme();

    // ── Styles ────────────────────────────────────────────────────────────────
    const styles = StyleSheet.create({
        container: { flex: 1, display: 'flex', flexDirection: 'column', height: '100%' },
        providerBar: {
            flexDirection: 'row', alignItems: 'center',
            paddingHorizontal: 12, paddingVertical: 6,
            borderBottomWidth: 1, borderBottomColor: '#E0E0E0',
            backgroundColor: '#FAFAFA',
        },
        providerLabel: { fontSize: 12, color: '#666', marginRight: 4 },
        chatContainer: { flex: 1, paddingHorizontal: 12, paddingTop: 8 },
        messageContainer: {
            marginVertical: 6, padding: 12, borderRadius: 12, maxWidth: '85%',
        },
        userMessage: { alignSelf: 'flex-end', backgroundColor: '#DCF8C6' },
        aiMessage: { alignSelf: 'flex-start', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E0E0E0' },
        introMessage: {
            alignSelf: 'flex-start', backgroundColor: '#E3F2FD',
            marginVertical: 6, padding: 12, borderRadius: 12, maxWidth: '95%',
        },
        messageLabel: { fontSize: 11, fontWeight: '600', marginBottom: 4, color: theme.colors.primary },
        messageText: { fontSize: 14, color: '#000000' },
        introText: { fontSize: 14, color: '#000000', lineHeight: 20 },
        inputContainer: {
            flexDirection: 'row', alignItems: 'center',
            paddingHorizontal: 12, paddingVertical: 12,
            borderTopWidth: 1, borderTopColor: '#E0E0E0',
            backgroundColor: '#F5F5F5',
        },
        textInput: { flex: 1, marginRight: 8 },
        buttonHelperText: {
            textAlign: 'center', paddingVertical: 4,
            color: theme.colors.error, fontSize: 12,
        },
        uninitializedContainer: {
            flex: 1, justifyContent: 'center', alignItems: 'center',
            paddingHorizontal: 20, paddingVertical: 20,
        },
        defaultSuggestionText: {
            textAlign: 'left', paddingHorizontal: 20, paddingBottom: 10, paddingTop: 20,
        },
        apiKeySetup: {
            padding: 16, margin: 12, borderRadius: 12,
            backgroundColor: '#F5F5F5', borderWidth: 1, borderColor: '#E0E0E0',
        },
        apiKeyTitle: { fontSize: 15, fontWeight: '600', marginBottom: 8 },
        apiKeyHint: { fontSize: 12, color: '#666', marginBottom: 10 },
        apiKeyRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
        apiKeyInput: { flex: 1 },
        providerChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
    });

    // ── Init: load stored providers and selected provider ─────────────────────
    React.useEffect(() => {
        const init = async () => {
            const providers = await listStoredProviders();
            setStoredProviders(providers);
            const saved = getSelectedProvider();
            if (saved && providers.includes(saved)) {
                setSelectedProviderState(saved);
            }
        };
        init();

        // Also try to init browser Prompt API in background
        if (typeof window !== 'undefined' && typeof window.LanguageModel !== 'undefined') {
            window.LanguageModel.create({
                initialPrompts: [
                    { role: 'system', content: SYSTEM_PROMPT_CONTENT },
                    { role: 'user', content: 'I want to ensure that I am spending my time doing the right things.' },
                ],
                expectedOutputs: [{ type: 'text', languages: ['en'] }],
            }).then(session => {
                setPromptAISession(session);
            }).catch(err => {
                if (err?.name !== 'NotAllowedError') {
                    console.warn('Browser LM auto-init failed:', err?.message);
                }
            });
        }
    }, []);

    React.useEffect(() => {
        setHoursRemaining(calculateRemainingTime(validActivities));
    }, [validActivities]);

    // Populate intro messages when a session is ready
    React.useEffect(() => {
        const isReady = selectedProvider ? storedProviders.includes(selectedProvider) : !!promptAISession;
        if (isReady && chatHistory.length === 0) {
            setChatHistory([
                { role: 'intro', content: INTRO_MESSAGE },
                { role: 'ai', content: OPENING_QUESTION },
            ]);
        }
    }, [promptAISession, selectedProvider, storedProviders]);

    // ── Browser Prompt API initialization ─────────────────────────────────────
    const initializeLanguageModel = async () => {
        if (typeof window === 'undefined' || typeof window.LanguageModel === 'undefined') {
            setAiError("PromptAPI not found. Visit Help to set up Chrome Prompt API, or use Claude/Gemini below.");
            return;
        }
        if (initializingModel) return;
        try {
            setInitializingModel(true);
            setAiError("Initializing language model...");
            const config = {
                initialPrompts: [
                    { role: 'system', content: SYSTEM_PROMPT_CONTENT },
                    { role: 'user', content: 'I want to ensure that I am spending my time doing the right things.' },
                ],
                expectedOutputs: [{ type: 'text', languages: ['en'] }],
            };
            config.monitor = (m) => {
                m.addEventListener("downloadprogress", (e) => {
                    const pct = Math.round((e.loaded / e.total) * 100);
                    setAiError(`Downloading model... ${pct}%`);
                });
            };
            const session = await window.LanguageModel.create(config);
            setPromptAISession(session);
            setAiError("");
        } catch (err) {
            setAiError("Error initializing language model. Please check the help section.");
        } finally {
            setInitializingModel(false);
        }
    };

    // ── API key setup ─────────────────────────────────────────────────────────
    const handleSaveApiKey = async () => {
        if (!setupProvider || !apiKeyInput.trim()) return;
        setSavingKey(true);
        try {
            await storeApiKey(setupProvider, apiKeyInput.trim());
            const updated = await listStoredProviders();
            setStoredProviders(updated);
            setApiKeyInput('');
            setShowApiKeySetup(false);
            // Auto-select the newly added provider
            setSelectedProviderState(setupProvider);
            setSelectedProvider(setupProvider);
            setAiError('');
        } catch (err) {
            setAiError(`Failed to save key: ${err.message}`);
        } finally {
            setSavingKey(false);
        }
    };

    const handleSelectProvider = (providerKey) => {
        setProviderMenuVisible(false);
        if (providerKey === 'browser') {
            setSelectedProviderState(null);
            setSelectedProvider(null);
        } else {
            setSelectedProviderState(providerKey);
            setSelectedProvider(providerKey);
        }
        // Reset chat when switching provider
        setChatHistory([]);
    };

    const handleRemoveKey = async (providerKey) => {
        await deleteApiKey(providerKey);
        const updated = await listStoredProviders();
        setStoredProviders(updated);
        if (selectedProvider === providerKey) {
            setSelectedProviderState(null);
            setSelectedProvider(null);
        }
    };

    // ── Message sending ───────────────────────────────────────────────────────
    const sendMessage = async () => {
        if (!followUpMessage.trim() || loadingSuggestions) return;

        const isReady = selectedProvider
            ? storedProviders.includes(selectedProvider)
            : !!promptAISession;

        if (!isReady) {
            if (!selectedProvider) await initializeLanguageModel();
            return;
        }

        const isFirstMessage = chatHistory.length === 2 && chatHistory[0].role === 'intro';
        if (isFirstMessage && onChatStart) onChatStart();

        const userMsg = followUpMessage.trim();
        setFollowUpMessage('');

        const newHistory = [...chatHistory, { role: 'user', content: userMsg }];
        setChatHistory([...newHistory, { role: 'ai', content: '' }]);
        setLoadingSuggestions(true);
        setAiError('');

        if (selectedProvider && storedProviders.includes(selectedProvider)) {
            // Use relay (Claude or Gemini)
            const messagesForRelay = newHistory.filter(m => m.role === 'user' || m.role === 'ai');
            // Include schedule context in the first user message (not index-based — chat
            // history always starts with intro/AI messages so index 0 is never a user msg)
            let addedScheduleContext = false;
            const contextualMessages = messagesForRelay.map((m) => {
                if (m.role === 'user' && !addedScheduleContext) {
                    addedScheduleContext = true;
                    return {
                        ...m,
                        content: `${m.content}\n\n[User has ${getDisplayHours(hoursRemaining)} free hours/week. Schedule: ${validActivities.map(a => `${a.name} (${a.hours}h ${a.duration.text})`).join(', ')}]`,
                    };
                }
                return m;
            });

            await sendRelayMessage(
                selectedProvider,
                contextualMessages,
                (chunk) => {
                    setChatHistory(prev => {
                        const updated = [...prev];
                        updated[updated.length - 1] = {
                            role: 'ai',
                            content: (updated[updated.length - 1].content || '') + chunk,
                        };
                        return updated;
                    });
                    setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
                },
                () => setLoadingSuggestions(false),
                (err) => { setAiError(err); setLoadingSuggestions(false); }
            );
        } else {
            // Use browser Prompt API
            try {
                const contextPrompt = `${userMsg}\n\n[User's schedule: ${validActivities.map(a => `${a.name} for ${a.hours}h ${a.duration.text}`).join(', ')}. Free hours: ${getDisplayHours(hoursRemaining)}/week]`;
                const stream = await promptAISession.promptStreaming(contextPrompt);
                const reader = stream.getReader();
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    setChatHistory(prev => {
                        const updated = [...prev];
                        updated[updated.length - 1] = {
                            role: 'ai',
                            content: (updated[updated.length - 1].content || '') + value,
                        };
                        return updated;
                    });
                }
                setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
                setLoadingSuggestions(false);
            } catch (err) {
                setAiError('Error generating response. Please try again.');
                setLoadingSuggestions(false);
            }
        }
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
        return "Congratulations, you are making the most of your life. But if you aren't happy, you should probably reassess the importance and priority of some of these activities.";
    };

    const isReady = selectedProvider
        ? storedProviders.includes(selectedProvider)
        : !!promptAISession;

    const activeProviderLabel = selectedProvider
        ? RELAY_PROVIDERS.find(p => p.key === selectedProvider)?.label || selectedProvider
        : promptAISession ? 'Browser AI' : null;

    // ── Render: uninitialized (no session, no stored key) ─────────────────────
    if (!isReady && chatHistory.length === 0) {
        return (
            <View style={[props.style, styles.container]}>
                <View style={styles.uninitializedContainer}>
                    {/* Browser Prompt API option */}
                    <Button
                        mode="outlined"
                        onPress={initializeLanguageModel}
                        disabled={initializingModel}
                        loading={initializingModel}
                        style={{ marginBottom: 8, width: '100%' }}
                    >
                        {initializingModel ? 'Initializing...' : 'Use Browser AI (Chrome Prompt API)'}
                    </Button>
                    {aiError ? (
                        <Text style={styles.buttonHelperText}>{aiError}</Text>
                    ) : null}

                    <Text style={{ textAlign: 'center', color: '#999', marginVertical: 12, fontSize: 13 }}>
                        — or use your own API key —
                    </Text>

                    {/* Cloud AI options */}
                    {showApiKeySetup ? (
                        <ApiKeySetupPanel
                            setupProvider={setupProvider}
                            storedProviders={storedProviders}
                            apiKeyInput={apiKeyInput}
                            savingKey={savingKey}
                            onChangeText={setApiKeyInput}
                            onSave={handleSaveApiKey}
                            onRemove={handleRemoveKey}
                            onClose={() => setShowApiKeySetup(false)}
                            autoFocus
                            styles={styles}
                            theme={theme}
                        />
                    ) : (
                        <View style={styles.providerChips}>
                            {RELAY_PROVIDERS.map(p => (
                                <Button
                                    key={p.key}
                                    mode={storedProviders.includes(p.key) ? 'contained' : 'outlined'}
                                    onPress={() => {
                                        if (storedProviders.includes(p.key)) {
                                            handleSelectProvider(p.key);
                                        } else {
                                            setSetupProvider(p.key);
                                            setShowApiKeySetup(true);
                                        }
                                    }}
                                    compact
                                >
                                    {storedProviders.includes(p.key) ? `✓ ${p.label}` : `Add ${p.label}`}
                                </Button>
                            ))}
                        </View>
                    )}

                    <Divider style={{ width: '100%', marginVertical: 16 }} />
                    <Text style={styles.defaultSuggestionText}>
                        <Markdown>{getDefaultSuggestion()}</Markdown>
                    </Text>
                </View>
            </View>
        );
    }

    // ── Render: chat UI ────────────────────────────────────────────────────────
    return (
        <View style={[props.style, styles.container]}>
            {/* Provider switcher bar */}
            <View style={styles.providerBar}>
                <Text style={styles.providerLabel}>AI:</Text>
                <Menu
                    visible={providerMenuVisible}
                    onDismiss={() => setProviderMenuVisible(false)}
                    anchor={
                        <Button
                            mode="text"
                            compact
                            onPress={() => setProviderMenuVisible(true)}
                            icon="chevron-down"
                        >
                            {activeProviderLabel || 'Choose AI'}
                        </Button>
                    }
                >
                    {promptAISession && (
                        <Menu.Item
                            onPress={() => handleSelectProvider('browser')}
                            title="Browser AI (Prompt API)"
                            leadingIcon={!selectedProvider ? 'check' : undefined}
                        />
                    )}
                    {RELAY_PROVIDERS.map(p => (
                        <Menu.Item
                            key={p.key}
                            onPress={() => {
                                if (storedProviders.includes(p.key)) {
                                    handleSelectProvider(p.key);
                                } else {
                                    setProviderMenuVisible(false);
                                    setSetupProvider(p.key);
                                    setShowApiKeySetup(true);
                                }
                            }}
                            title={storedProviders.includes(p.key) ? `${p.label} ✓` : `${p.label} (add key)`}
                            leadingIcon={selectedProvider === p.key ? 'check' : undefined}
                        />
                    ))}
                    <Divider />
                    <Menu.Item
                        onPress={() => { setProviderMenuVisible(false); setSetupProvider(null); setShowApiKeySetup(true); }}
                        title="Manage API keys..."
                        leadingIcon="key"
                    />
                </Menu>
            </View>

            {/* API key setup overlay */}
            {showApiKeySetup && (
                <ApiKeySetupPanel
                    setupProvider={setupProvider}
                    storedProviders={storedProviders}
                    apiKeyInput={apiKeyInput}
                    savingKey={savingKey}
                    onChangeText={setApiKeyInput}
                    onSave={handleSaveApiKey}
                    onRemove={handleRemoveKey}
                    onClose={() => setShowApiKeySetup(false)}
                    styles={styles}
                    theme={theme}
                />
            )}

            {/* Chat messages */}
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
                            message.role === 'user' ? styles.userMessage
                                : message.role === 'ai' ? styles.aiMessage : null,
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

            {/* Input */}
            {aiError ? <Text style={styles.buttonHelperText}>{aiError}</Text> : null}
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
        </View>
    );
}
