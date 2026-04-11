import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { Footer } from '../../Footer';
import { StatusBar } from 'expo-status-bar';

export default function Buffers() {
    const theme = useTheme();
    const styles = makeStyles(theme);

    return (
        <ScrollView contentContainerStyle={{ minHeight: '100%' }}>
            <View style={styles.container}>
                <Text style={styles.eyebrow}>Time & Planning</Text>
                <Text style={styles.title}>Never Schedule to Zero</Text>
                <Text style={styles.subtitle}>
                    Why leaving empty time on purpose is one of the most productive things you can do.
                </Text>

                <Text style={styles.body}>
                    When most people use a time-management tool, they feel a pull to fill everything up. Every hour accounted for, every block assigned a purpose. The calendar looks full, the plan looks complete, and there's a satisfying sense of control.
                </Text>
                <Text style={styles.body}>
                    Then Monday arrives. And the plan falls apart almost immediately.
                </Text>
                <Text style={styles.body}>
                    A meeting runs long. Someone needs something unexpected. A task takes twice as long as estimated. By Tuesday afternoon, you're already behind — and the psychological toll of falling behind a supposedly perfect plan is often worse than having no plan at all.
                </Text>
                <Text style={styles.body}>
                    The problem wasn't the goals. The problem was the assumption of zero slack.
                </Text>

                <Text style={styles.sectionHeader}>Buffers Are Not Wasted Time</Text>
                <Text style={styles.body}>
                    There's a common belief that unscheduled time is wasted time — that if a block on your calendar doesn't have a task assigned, you're being inefficient. This is exactly backwards.
                </Text>
                <Text style={styles.body}>
                    Buffers — intentional gaps in your schedule — are structural insurance. They're the space that absorbs the inevitable overflow of life: the unexpected phone call, the task that took longer than expected, the day you just couldn't focus, the friend who needed you. Without buffers, these things become crises. With them, they're just things that happened.
                </Text>
                <Text style={styles.body}>
                    In engineering and manufacturing, buffers are not optional — they're designed into systems precisely because no real system runs at 100% capacity without breaking down. Your week is a system too. It needs slack to function reliably.
                </Text>

                <Text style={styles.sectionHeader}>The 80% Rule</Text>
                <Text style={styles.body}>
                    A useful heuristic: don't plan more than 80% of your available time. If you have 40 free hours, commit to things that take at most 32. Leave 8 hours genuinely unassigned.
                </Text>
                <Text style={styles.body}>
                    Those 8 hours will be used — they always are. But you'll use them on the things that actually need them, not on things you arbitrarily pre-assigned days ago when you didn't know what the week would hold.
                </Text>
                <Text style={styles.body}>
                    This is especially important for creative and intellectual work, which is notoriously hard to estimate. Writers, developers, designers, and researchers routinely underestimate how long things take by a factor of two or three. Buffers are what turn "I'll finish this Friday" from a hope into a reasonable expectation.
                </Text>

                <Text style={styles.sectionHeader}>What a Buffer Looks Like</Text>
                <Text style={styles.body}>
                    Buffers don't have to be long or formally scheduled. They might look like:
                </Text>
                <Text style={styles.listItem}>
                    A 15-minute gap between every meeting, so you're never rushing from one to another
                </Text>
                <Text style={styles.listItem}>
                    One afternoon per week kept deliberately unplanned — a "catch-up" or "flex" block
                </Text>
                <Text style={styles.listItem}>
                    Leaving Friday afternoons light instead of scheduling work till 6pm
                </Text>
                <Text style={styles.listItem}>
                    Building in time for transitions — meals, commutes, wind-down — rather than pretending they don't exist
                </Text>
                <Text style={styles.body}>
                    The key is intentionality. A buffer is only a buffer if you consciously protect it from being filled. If you treat unscheduled time as "available for more tasks," you'll immediately fill it and lose the benefit entirely.
                </Text>

                <Text style={styles.sectionHeader}>Buffers and the Free-Time Calculator</Text>
                <Text style={styles.body}>
                    When you use this tool and see that you have, say, 45 hours of free time per week, resist the urge to immediately assign all of it. That number is a ceiling, not a target.
                </Text>
                <Text style={styles.body}>
                    A good practice: after you've identified what you want to do with your free time, build a buffer activity into the tool itself. Call it "Overflow" or "Buffer" and give it 10–15% of your total time. Then plan around that constrained number.
                </Text>
                <Text style={styles.body}>
                    The goal isn't to be maximally productive. It's to have a week that reliably delivers what you intended, without the constant feeling that you're failing to keep up with your own plan.
                </Text>
                <Text style={styles.body}>
                    A week with built-in slack is a week you can actually live in.
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
    listItem: {
        fontSize: 16,
        lineHeight: 28,
        color: theme.colors.text,
        marginBottom: 10,
        paddingLeft: 16,
    },
    bold: {
        fontWeight: 'bold',
    },
});
