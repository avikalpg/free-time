import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Divider, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Footer } from '../../Footer';
import { StatusBar } from 'expo-status-bar';

const ARTICLES = [
    {
        route: 'PhilosophyOrigin',
        eyebrow: 'The Story Behind the Tool',
        title: 'You Have More Time Than You Think',
        summary: 'Why this tool was built — the mindset of abundance, and how seeing the numbers changes everything.',
    },
    {
        route: 'PhilosophyFocus',
        eyebrow: 'Time & Productivity',
        title: 'Free Hours Aren\'t Enough — You Need Free Blocks',
        summary: 'Why fragmented time is nearly worthless, and how protecting focus blocks changes what you can actually accomplish.',
    },
    {
        route: 'PhilosophyBuffers',
        eyebrow: 'Time & Planning',
        title: 'Never Schedule to Zero',
        summary: 'Why intentional slack in your schedule is one of the most productive things you can build into your week.',
    },
    {
        route: 'PhilosophyRecovery',
        eyebrow: 'Time & Wellbeing',
        title: 'Rest Is Not the Absence of Work',
        summary: 'Why recovery deserves a real place on your calendar — and how ignoring it costs you far more than it saves.',
    },
    {
        route: 'PhilosophyLifeGoals',
        eyebrow: 'Time & Purpose',
        title: 'Busy Every Day, Going Nowhere',
        summary: 'Why optimising your days without asking where they lead is the most common form of productive procrastination.',
    },
];

export default function PhilosophyIndex() {
    const theme = useTheme();
    const navigation = useNavigation();
    const styles = makeStyles(theme);

    return (
        <ScrollView contentContainerStyle={{ minHeight: '100%' }}>
            <View style={styles.container}>
                <Text style={styles.title}>The Philosophy of Free Time</Text>
                <Text style={styles.subtitle}>
                    Essays on time, attention, and the art of living intentionally.
                </Text>
                <Divider style={styles.divider} />
                {ARTICLES.map((article, index) => (
                    <TouchableOpacity
                        key={article.route}
                        onPress={() => navigation.navigate(article.route)}
                        style={styles.card}
                        accessibilityRole="link"
                    >
                        <Text style={styles.cardEyebrow}>{article.eyebrow}</Text>
                        <Text style={styles.cardTitle}>{article.title}</Text>
                        <Text style={styles.cardSummary}>{article.summary}</Text>
                        {index < ARTICLES.length - 1 && <Divider style={styles.cardDivider} />}
                    </TouchableOpacity>
                ))}
            </View>
            <Footer />
            <StatusBar style="auto" />
        </ScrollView>
    );
}

const makeStyles = (theme) => StyleSheet.create({
    container: {
        maxWidth: 720,
        alignSelf: 'center',
        width: '100%',
        paddingHorizontal: '5%',
        paddingVertical: 48,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 17,
        color: theme.colors.placeholder,
        marginBottom: 24,
        lineHeight: 26,
    },
    divider: {
        marginBottom: 32,
    },
    card: {
        paddingVertical: 20,
    },
    cardEyebrow: {
        fontSize: 12,
        fontWeight: '600',
        letterSpacing: 1.1,
        textTransform: 'uppercase',
        color: theme.colors.primary,
        marginBottom: 6,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: 8,
        lineHeight: 28,
    },
    cardSummary: {
        fontSize: 15,
        lineHeight: 24,
        color: theme.colors.placeholder,
        marginBottom: 4,
    },
    cardDivider: {
        marginTop: 16,
    },
});
