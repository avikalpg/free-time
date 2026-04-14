import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { Footer } from '../../Footer';
import { StatusBar } from 'expo-status-bar';

export const meta = {
    eyebrow: 'Time & Purpose',
    title: 'Busy Every Day, Going Nowhere',
    summary: 'Why optimising your days without asking where they lead is the most common form of productive procrastination.',
};

export default function LifeGoals() {
    const theme = useTheme();
    const styles = makeStyles(theme);

    return (
        <ScrollView contentContainerStyle={{ minHeight: '100%' }}>
            <View style={styles.container}>
                <Text style={styles.eyebrow}>Time & Purpose</Text>
                <Text style={styles.title}>Busy Every Day, Going Nowhere</Text>
                <Text style={styles.subtitle}>
                    Why optimising your days without asking where they lead is the most common form of productive procrastination.
                </Text>

                <Text style={styles.body}>
                    You can be extremely productive and still be wasting your life.
                </Text>
                <Text style={styles.body}>
                    This is a hard thing to say, and a harder thing to hear — especially if you're the kind of person who keeps a tight to-do list, hits their deadlines, and ends most days having accomplished something. But accomplishing things is not the same as moving toward something meaningful. And for many people, the busyness of daily life has become a very effective way of not having to confront that distinction.
                </Text>

                <Text style={styles.sectionHeader}>The Planning Horizon Problem</Text>
                <Text style={styles.body}>
                    Most people plan their days. Fewer plan their weeks. Fewer still think about their months in a structured way. And almost no one — in a practical, revisited, living sense — plans their life.
                </Text>
                <Text style={styles.body}>
                    This creates a strange situation: you can become very efficient at executing tasks that were never really connected to anything you deeply care about. The inbox reaches zero. The project ships. The meeting agenda is completed. And at the end of a productive year, you look up and realise you haven't moved an inch toward the person you wanted to become or the things you said mattered most to you.
                </Text>
                <Text style={styles.body}>
                    The problem isn't laziness. It's misalignment between the time horizon of your planning and the time horizon of your actual goals.
                </Text>

                <Text style={styles.sectionHeader}>Daily Tasks vs. Life Goals</Text>
                <Text style={styles.body}>
                    Daily tasks are urgent by nature. They have deadlines — today, this week. They come with social accountability. Someone is waiting for your reply. The meeting is at 2pm. If you don't do them, there are immediate consequences.
                </Text>
                <Text style={styles.body}>
                    Life goals are the opposite. They're almost never urgent. There's no deadline for "become a better parent" or "build something I'm proud of" or "get genuinely fit." Nobody is waiting for your reply. There are no immediate consequences for deprioritising them today. But there are enormous long-term consequences for deprioritising them for years.
                </Text>
                <Text style={styles.body}>
                    Because daily urgency always beats long-term importance in a fair fight, life goals lose by default — unless you deliberately, structurally protect time for them.
                </Text>

                <Text style={styles.sectionHeader}>Working Backwards</Text>
                <Text style={styles.body}>
                    The most useful exercise I know is simple: write down the three or four most important things to you at the scale of your whole life. Not this quarter's OKRs. Not what your parents would want to see. What you, honestly, believe would make you feel like your time on earth was well spent.
                </Text>
                <Text style={styles.body}>
                    Then ask: how much time did I actually spend on those things last week?
                </Text>
                <Text style={styles.body}>
                    For most people, the answer is uncomfortable. The things they list as most important — health, relationships, creativity, personal growth — are exactly the things that get squeezed out by the daily churn of tasks that are urgent but not, on reflection, that important.
                </Text>
                <Text style={styles.body}>
                    Working backwards means identifying what your life goals actually require in terms of weekly time investment, and then protecting that time the same way you'd protect a meeting with your most important client. Non-negotiable. On the calendar. Real.
                </Text>

                <Text style={styles.sectionHeader}>The Compound Effect</Text>
                <Text style={styles.body}>
                    Here's the encouraging part: you don't need to reorganise your entire life at once. The compound effect works for time investment the same way it works for money.
                </Text>
                <Text style={styles.body}>
                    Five hours a week on something you genuinely care about is 260 hours a year. In 260 hours, you can learn to play an instrument, write a first draft of a book, build a meaningful fitness habit, or make significant progress on a side project. Not perfectly, not professionally — but meaningfully. Enough to feel like you're actually living the life you say you want.
                </Text>
                <Text style={styles.body}>
                    The question is never "do I have 5 hours a week?" The question is whether you've decided that this thing is important enough to protect from the relentless pull of urgency.
                </Text>

                <Text style={styles.sectionHeader}>What the Tool Can and Can't Do</Text>
                <Text style={styles.body}>
                    The free-time calculator shows you the raw material: how many hours you have that aren't already committed. That's the first piece of information you need.
                </Text>
                <Text style={styles.body}>
                    But the tool can't tell you what to do with those hours. That answer requires a different kind of thinking — slower, more personal, less about efficiency and more about direction.
                </Text>
                <Text style={styles.body}>
                    If the calculator shows you have 40 free hours a week, the question worth sitting with isn't "how do I fill them?" It's: <Text style={styles.italic}>what matters enough to me that I want to give it some of these hours?</Text>
                </Text>
                <Text style={styles.body}>
                    Start there. Plan downward from your life to your year to your month to your week. Let the daily tasks earn their place, rather than filling the space by default.
                </Text>
                <Text style={styles.body}>
                    The goal isn't a busier life. It's a more directed one.
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
