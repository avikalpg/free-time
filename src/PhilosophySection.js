import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Divider, useTheme } from 'react-native-paper';

const SECTIONS = [
    {
        emoji: '⏰',
        title: '168 Hours',
        body: 'Every single person on earth gets exactly 168 hours in a week — no more, no less. A full-time job takes around 40–48 of those. Sleep takes roughly 56. That still leaves 64–72 hours unaccounted for. Where does that time go?',
    },
    {
        emoji: '🔍',
        title: 'The Awareness Gap',
        body: "Most of us have a vague sense that we're \"busy,\" but we rarely stop to measure it. We underestimate how much time disappears into commutes, errands, and passive screen time — and overestimate how much is left for the things we actually care about: hobbies, family, health, side projects, or simply resting.",
    },
    {
        emoji: '🧮',
        title: 'What This Tool Does',
        body: 'My Free-time in a Week helps you see your week clearly. Enter the activities that take up your time — work, sleep, chores, exercise, commute — and the tool instantly shows you how much free time you actually have. No sign-up, no tracking, no data sent to any server. Everything stays in your browser.',
    },
    {
        emoji: '💡',
        title: 'Why It Matters',
        body: "Self-awareness is the first step to intentional living. Once you see your week laid out in numbers, you can make conscious decisions: cut the things that don't bring joy, protect time for the things that do, or simply stop feeling guilty about rest when you can see you've genuinely earned it.",
    },
    {
        emoji: '🕊️',
        title: 'Our Philosophy',
        body: 'We believe free time is not wasted time — it is the raw material of a meaningful life. This tool exists to help you reclaim it, understand it, and use it on your own terms. Productivity is a means, not an end. The goal is a life that feels full, not just a calendar that looks full.',
    },
];

export function PhilosophySection() {
    const theme = useTheme();

    const styles = StyleSheet.create({
        container: {
            maxWidth: 800,
            alignSelf: 'center',
            width: '100%',
            paddingHorizontal: '5%',
            paddingVertical: 40,
        },
        heading: {
            fontSize: 26,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 8,
            color: theme.colors.text,
        },
        subheading: {
            fontSize: 15,
            textAlign: 'center',
            color: theme.colors.placeholder,
            marginBottom: 36,
        },
        divider: {
            marginBottom: 36,
        },
        card: {
            marginBottom: 28,
        },
        cardTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 8,
            color: theme.colors.text,
        },
        cardEmoji: {
            fontSize: 22,
            marginRight: 8,
        },
        cardTitleRow: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 8,
        },
        cardBody: {
            fontSize: 15,
            lineHeight: 24,
            color: theme.colors.text,
        },
    });

    return (
        <View style={styles.container}>
            <Divider style={styles.divider} />
            <Text style={styles.heading}>Why Free Time Matters</Text>
            <Text style={styles.subheading}>
                The philosophy behind myfreetimeinaweek.in
            </Text>
            {SECTIONS.map((section) => (
                <View key={section.title} style={styles.card}>
                    <View style={styles.cardTitleRow}>
                        <Text style={styles.cardEmoji}>{section.emoji}</Text>
                        <Text style={styles.cardTitle}>{section.title}</Text>
                    </View>
                    <Text style={styles.cardBody}>{section.body}</Text>
                </View>
            ))}
        </View>
    );
}
