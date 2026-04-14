import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Divider, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { PHILOSOPHY_ROUTES } from './routes';
import { Footer } from '../../Footer';
import { StatusBar } from 'expo-status-bar';

export default function PhilosophyIndex() {
    const theme = useTheme();
    const navigation = useNavigation();
    const styles = makeStyles(theme);

    // Computed inside the component to avoid circular import initialization issues.
    // routes.js imports this component, so top-level access to PHILOSOPHY_ROUTES
    // can fail before the module finishes initializing.
    const articles = React.useMemo(
        () => PHILOSOPHY_ROUTES.filter((r) => r.eyebrow !== null),
        []
    );

    return (
        <ScrollView contentContainerStyle={{ minHeight: '100%' }}>
            <View style={styles.container}>
                <Text style={styles.title}>The Philosophy of Free Time</Text>
                <Text style={styles.subtitle}>
                    Essays on time, attention, and the art of living intentionally.
                </Text>
                <Divider style={styles.divider} />
                {articles.map((article, index) => (
                    <TouchableOpacity
                        key={article.name}
                        onPress={() => navigation.navigate(article.name)}
                        style={styles.card}
                        accessibilityRole="link"
                    >
                        <Text style={styles.cardEyebrow}>{article.eyebrow}</Text>
                        <Text style={styles.cardTitle}>{article.title}</Text>
                        <Text style={styles.cardSummary}>{article.summary}</Text>
                        {index < articles.length - 1 && <Divider style={styles.cardDivider} />}
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
