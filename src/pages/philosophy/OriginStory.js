import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { Footer } from '../../Footer';
import { StatusBar } from 'expo-status-bar';

export const meta = {
    eyebrow: 'The Story Behind the Tool',
    title: 'You Have More Time Than You Think',
    summary: 'Why this tool was built — the mindset of abundance, and how seeing the numbers changes everything.',
};

export default function OriginStory() {
    const theme = useTheme();
    const styles = makeStyles(theme);

    return (
        <ScrollView contentContainerStyle={{ minHeight: '100%' }}>
            <View style={styles.container}>
                <Text style={styles.eyebrow}>The Story Behind the Tool</Text>
                <Text style={styles.title}>You Have More Time Than You Think</Text>
                <Text style={styles.subtitle}>
                    Why this tool was built — and the one belief that changed everything.
                </Text>

                <Text style={styles.body}>
                    People ask me how I get so much done.
                </Text>
                <Text style={styles.body}>
                    I work a full-time job. I work out. I build side projects. I show up for the people I care about. And somehow, I still find time for the things that matter to me most.
                </Text>
                <Text style={styles.body}>
                    When I ask those same people what <Text style={styles.italic}>they</Text> want to do — the things they keep putting off — the answers are always interesting. Some want to get fit. Some want to learn a language or an instrument. Some have a business idea they've been sitting on for years. Some just want to read more, sleep better, or spend a quiet morning with their kids without feeling behind.
                </Text>
                <Text style={styles.body}>
                    And then I ask: "Why haven't you started?"
                </Text>
                <Text style={styles.body}>
                    Almost every time, the answer is the same: <Text style={styles.bold}>"I just don't have the time."</Text>
                </Text>
                <Text style={styles.body}>
                    I find this genuinely puzzling. Not because I think these people are lazy or making excuses — I don't. I think they genuinely believe it. But when I look at their lives, I see the math doesn't add up. They have a 9-to-5 job. They sleep 7–8 hours. They don't have four kids to chauffeur to extracurriculars. And yet they're convinced their week is full.
                </Text>
                <Text style={styles.body}>
                    So I built this tool to do one thing: show them the numbers.
                </Text>

                <Text style={styles.sectionHeader}>168 Hours Is a Lot</Text>
                <Text style={styles.body}>
                    A week has 168 hours. A full-time job takes 40 to 48. Sleep takes roughly 56 (8 hours a night). That already accounts for just over half your week. The remaining 64 to 72 hours — nearly three full days — are unaccounted for. Where does that time actually go?
                </Text>
                <Text style={styles.body}>
                    For most people, it bleeds away in small, invisible chunks. Commuting. Scrolling. Watching things they didn't plan to watch. Chores that expand to fill the time available. Social obligations they said yes to without thinking. The hours aren't gone — they're just unmanaged.
                </Text>
                <Text style={styles.body}>
                    The tool asks you to name your activities and estimate the time they take. That's it. No calendar sync. No account. No algorithm telling you what to do. Just you, your week, and a number.
                </Text>
                <Text style={styles.body}>
                    Most people are surprised by what they see.
                </Text>

                <Text style={styles.sectionHeader}>The Mindset of Abundance</Text>
                <Text style={styles.body}>
                    Here's what I've come to believe: <Text style={styles.bold}>if you think you have no time, you won't find time. If you believe you have time, you do.</Text>
                </Text>
                <Text style={styles.body}>
                    This isn't motivational fluff. It's about attention and framing. When you believe your schedule is packed, you stop scanning for opportunities. You don't rearrange. You don't say no to the things that consume time without returning value. You just feel stuck.
                </Text>
                <Text style={styles.body}>
                    But when you see — concretely, in numbers — that you have 30 or 40 or 50 free hours in your week, something shifts. You start to ask: what am I actually doing with this? The scarcity narrative breaks down. You stop saying "I don't have time" and start saying "I haven't prioritised this yet." That's a very different sentence. One closes doors; the other opens them.
                </Text>
                <Text style={styles.body}>
                    This is the mindset of abundance. And it's not something you have to manufacture from thin air. Sometimes you just need to see the numbers.
                </Text>

                <Text style={styles.sectionHeader}>Who This Is For</Text>
                <Text style={styles.body}>
                    This tool is for the person who has dreams sitting in a drawer. The person who keeps saying "someday" — someday I'll start that project, that habit, that relationship with my own potential. The person who is genuinely busy but suspects they might be busier than they need to be.
                </Text>
                <Text style={styles.body}>
                    It's not for people who are actually stretched to their limit — those who work multiple jobs, care for sick family members, or are simply surviving. For them, the problem is real and different. This tool won't fix structural inequality or systemic overwork.
                </Text>
                <Text style={styles.body}>
                    But for everyone else — the "comfortable busy" — I think the first step is radical honesty about where the time is really going.
                </Text>
                <Text style={styles.body}>
                    You might have more time than you think. Take 5 minutes and find out.
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
