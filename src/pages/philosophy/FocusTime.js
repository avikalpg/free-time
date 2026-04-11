import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { Footer } from '../../Footer';
import { StatusBar } from 'expo-status-bar';

export default function FocusTime() {
    const theme = useTheme();
    const styles = makeStyles(theme);

    return (
        <ScrollView contentContainerStyle={{ minHeight: '100%' }}>
            <View style={styles.container}>
                <Text style={styles.eyebrow}>Time & Productivity</Text>
                <Text style={styles.title}>Free Hours Aren't Enough — You Need Free Blocks</Text>
                <Text style={styles.subtitle}>
                    Why fragmented time is nearly worthless, and how protecting focus blocks changes everything.
                </Text>

                <Text style={styles.body}>
                    Here's something counterintuitive: you can have plenty of free time on paper and still feel like you never have enough time to actually do anything meaningful.
                </Text>
                <Text style={styles.body}>
                    The culprit isn't the amount of time. It's the shape of it.
                </Text>
                <Text style={styles.body}>
                    If your day looks like this — 20 minutes free, then a meeting, then 35 minutes free, then a call, then lunch, then another meeting, then maybe an hour before dinner — you technically have 3 or 4 free hours. But you'll struggle to ship anything that requires deep thinking. Writing, coding, designing, practicing an instrument, preparing a presentation — these all require you to warm up, get into a state of flow, and then stay there. That takes at least 20 to 30 minutes just to get started. If your next interruption is 35 minutes away, you're not getting into flow. You're just treading water.
                </Text>

                <Text style={styles.sectionHeader}>The Hidden Cost of Context Switching</Text>
                <Text style={styles.body}>
                    Every time you shift from one task to another — or even anticipate having to — you pay a cognitive tax. Research suggests it can take 20 minutes or more to fully regain deep focus after an interruption. So a schedule full of small gaps between obligations isn't just inconvenient. It's structurally incompatible with doing meaningful work.
                </Text>
                <Text style={styles.body}>
                    This is why a person who works 6 focused hours can produce more than someone who "works" 10 fragmented ones. Output isn't just a function of hours — it's a function of hours multiplied by depth.
                </Text>

                <Text style={styles.sectionHeader}>Meetings Are the Main Offender</Text>
                <Text style={styles.body}>
                    In a professional context, meetings are usually the biggest source of fragmentation. Two back-to-back meetings at 10am and 3pm don't just take 2 hours. They can consume an entire day's cognitive capacity, because the anxiety of "I have a meeting in a few hours" prevents the kind of deep absorption that meaningful work requires.
                </Text>
                <Text style={styles.body}>
                    I discovered this firsthand when I started using a tool called Clockwise. It does one simple thing: it reschedules flexible meetings to cluster them together, leaving longer uninterrupted blocks for focus work. The effect was immediate. I started finishing my core work earlier in the day — not because I was working harder, but because I had unbroken time to actually think.
                </Text>
                <Text style={styles.body}>
                    And once my job got done at a reasonable hour, I had my evenings back. Not half-hour fragments — real stretches of time I could use intentionally. For fitness. For projects I cared about. For the things that don't fit in cracks.
                </Text>

                <Text style={styles.sectionHeader}>Scheduling Is a Skill Worth Taking Seriously</Text>
                <Text style={styles.body}>
                    Most people treat their calendar as a passive record of obligations — something that happens to them. The better approach is to treat it as a tool you actively manage.
                </Text>
                <Text style={styles.body}>
                    Some practical principles that help:
                </Text>
                <Text style={styles.listItem}>
                    <Text style={styles.bold}>Batch your meetings.</Text> If you have control over when you schedule calls and check-ins, push them to mornings or afternoons — not scattered across the day. Protect one contiguous block every day for deep work.
                </Text>
                <Text style={styles.listItem}>
                    <Text style={styles.bold}>Create a "no meeting" block.</Text> Even one 2-3 hour block per day where you're genuinely unreachable makes a significant difference to what you can accomplish.
                </Text>
                <Text style={styles.listItem}>
                    <Text style={styles.bold}>Name your free time.</Text> "Free time" is easy to fill with nothing in particular. If you decide in advance that 7–9pm is for your project, or 6–7am is for exercise, it's much more likely to actually happen.
                </Text>
                <Text style={styles.listItem}>
                    <Text style={styles.bold}>Think in blocks, not minutes.</Text> When evaluating whether you have time for something, ask: do I have a 90-minute unbroken block for this? Not "do I have 90 free minutes somewhere?"
                </Text>

                <Text style={styles.sectionHeader}>What This Means for the Tool</Text>
                <Text style={styles.body}>
                    The free-time calculator shows you total hours. That's the starting point — and it's important, because most people underestimate even that number. But the next level of awareness is asking: are those hours usable?
                </Text>
                <Text style={styles.body}>
                    If you have 40 free hours a week scattered across 10-minute gaps, you effectively have close to zero for meaningful work. If you have 20 free hours in concentrated blocks, you have more than enough to build something remarkable.
                </Text>
                <Text style={styles.body}>
                    Hours are raw material. Focus blocks are where the work actually gets done.
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
        marginBottom: 14,
        paddingLeft: 16,
    },
    bold: {
        fontWeight: 'bold',
    },
    italic: {
        fontStyle: 'italic',
    },
});
