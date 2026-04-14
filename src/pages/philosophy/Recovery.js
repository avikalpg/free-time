import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { Footer } from '../../Footer';
import { StatusBar } from 'expo-status-bar';

export const meta = {
    eyebrow: 'Time & Wellbeing',
    title: 'Rest Is Not the Absence of Work',
    summary: 'Why recovery deserves a real place on your calendar — and how ignoring it costs you far more than it saves.',
};

export default function Recovery() {
    const theme = useTheme();
    const styles = makeStyles(theme);

    return (
        <ScrollView contentContainerStyle={{ minHeight: '100%' }}>
            <View style={styles.container}>
                <Text style={styles.eyebrow}>Time & Wellbeing</Text>
                <Text style={styles.title}>Rest Is Not the Absence of Work</Text>
                <Text style={styles.subtitle}>
                    Why recovery deserves a place on your calendar — and how ignoring it costs you far more than it saves.
                </Text>

                <Text style={styles.body}>
                    There is a certain kind of person who is very proud of how hard they work. They wear exhaustion like a badge. They mention how little sleep they got the way other people mention their fitness achievements. Busyness, for them, is a status signal — proof that they're serious, that they matter, that they're going somewhere.
                </Text>
                <Text style={styles.body}>
                    I understand that impulse. I've felt it myself. But I've also watched it quietly destroy the output, health, and joy of people who were genuinely talented and genuinely motivated.
                </Text>
                <Text style={styles.body}>
                    Recovery is not optional. It's part of the system.
                </Text>

                <Text style={styles.sectionHeader}>What Recovery Actually Is</Text>
                <Text style={styles.body}>
                    Recovery isn't just sleep, though sleep is the most foundational piece. Recovery is any activity that replenishes your capacity to perform — physically, mentally, and emotionally.
                </Text>
                <Text style={styles.body}>
                    For some people, that's a morning run. For others, it's cooking a slow dinner, reading fiction, spending time with a close friend with no agenda, or sitting outside without a phone. The specific activity matters less than its effect: you come out of it more capable than you went in.
                </Text>
                <Text style={styles.body}>
                    What recovery is <Text style={styles.italic}>not</Text> is passive consumption. Scrolling through social media for two hours isn't recovery — it's stimulation without restoration. Your brain is still processing, reacting, comparing. You might feel like you rested, but you didn't.
                </Text>

                <Text style={styles.sectionHeader}>The Athlete's Lesson</Text>
                <Text style={styles.body}>
                    Professional athletes have understood this for decades. Elite training programmes are structured around work-to-rest ratios. Coaches don't just design workout schedules — they design recovery schedules. Overtraining without adequate recovery doesn't just slow progress; it causes regression. Muscles break down faster than they rebuild. Performance drops. Injury risk rises.
                </Text>
                <Text style={styles.body}>
                    The same physiology applies to knowledge work, creative output, and emotional labour. You cannot sustainably perform at high levels without deliberately building in recovery time. The question isn't whether you need it — you do. The question is whether you acknowledge it and plan for it, or whether you ignore it until your body and mind force the issue.
                </Text>
                <Text style={styles.body}>
                    Most people ignore it — until they burn out, get sick, or quietly lose motivation for work they used to love.
                </Text>

                <Text style={styles.sectionHeader}>Planning at the Right Time Horizons</Text>
                <Text style={styles.body}>
                    Recovery needs to be factored in at every time horizon — not just daily, but weekly and monthly.
                </Text>
                <Text style={styles.body}>
                    <Text style={styles.bold}>Daily:</Text> Build wind-down time into the evening. Don't schedule work until midnight and expect to be sharp at 7am. Your brain needs transition time between "productive mode" and sleep.
                </Text>
                <Text style={styles.body}>
                    <Text style={styles.bold}>Weekly:</Text> Protect at least one day — or significant portion of a day — that is genuinely low-obligation. This isn't wasted time. It's the maintenance window for a human being.
                </Text>
                <Text style={styles.body}>
                    <Text style={styles.bold}>Monthly:</Text> Look at the cadence of intense weeks. If you have three back-to-back weeks of high output — travel, deadlines, big projects — plan for a lighter week after. Don't fill that lighter week with all the things you "fell behind on." Let it be lighter.
                </Text>

                <Text style={styles.sectionHeader}>Recovery in the Calculator</Text>
                <Text style={styles.body}>
                    When you use the free-time tool, consider adding recovery as its own activity. Not sleep — that's already there. But the other forms: exercise, leisure, time with people you love, or simply doing nothing in particular.
                </Text>
                <Text style={styles.body}>
                    If your free time calculator shows 50 free hours but none of them are assigned to recovery, that's useful information. It means either you're not recovering (and you'll pay for it eventually), or you are recovering but treating it as waste (and you're probably undervaluing it and under-protecting it).
                </Text>
                <Text style={styles.body}>
                    A life well-lived has rest woven through it. Not as a reward for completing enough tasks — as a non-negotiable, like eating or sleeping. The goal isn't to maximise output. It's to be someone who can keep going, keep creating, keep contributing — for years, not just for sprints.
                </Text>
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
    eyebrow: {
        fontSize: 13,
        fontWeight: '600',
        letterSpacing: 1.2,
        textTransform: 'uppercase',
        color: theme.colors.primary,
        marginBottom: 12,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: 12,
        lineHeight: 42,
    },
    subtitle: {
        fontSize: 17,
        color: theme.colors.placeholder,
        marginBottom: 36,
        lineHeight: 26,
        fontStyle: 'italic',
    },
    sectionHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginTop: 36,
        marginBottom: 14,
    },
    body: {
        fontSize: 16,
        lineHeight: 28,
        color: theme.colors.text,
        marginBottom: 18,
    },
    bold: {
        fontWeight: 'bold',
    },
    italic: {
        fontStyle: 'italic',
    },
});
