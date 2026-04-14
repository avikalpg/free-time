import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme, Text } from 'react-native-paper';
import { useStylesheet } from 'react-native-responsive-ui';
import merge from 'deepmerge';
import ReactGA from 'react-ga4';
import { ActivityList } from './ActivityList';
import { HighLevelAssessment } from './HighLevelAssessment';
import { ActivityPeriods } from './EnumActivityPeriod';
import { Footer } from './Footer';
import { randomColor } from './utils/utils';
import { TimeUtilizationSuggestions } from './TimeUtilizationSuggestions';
import { PhilosophySection } from './PhilosophySection';

const MobileTabs = Object.freeze({
    ACTIVITIES: 'activities',
    AI_COACH: 'ai_coach'
});

function Home(props) {
    ReactGA.send("pageview")
    const [activities, setActivitiesState] = useState([
        {
            name: "Full-time Job",
            hours: 40,
            duration: ActivityPeriods.WEEK,
            color: randomColor(),
        },
        {
            name: "Sleep",
            hours: 8,
            duration: ActivityPeriods.DAY,
            color: randomColor(),
        },
        {
            name: "Chores",
            hours: 2,
            duration: ActivityPeriods.DAY,
            color: randomColor(),
        },
        {
            name: "Leisure",
            hours: 2,
            duration: ActivityPeriods.WORK_DAY,
            color: randomColor(),
        },
    ]);
    const [aiChatStarted, setAiChatStarted] = useState(false);
    const [mobileTab, setMobileTab] = useState(MobileTabs.ACTIVITIES);

    const theme = useTheme();
    const commonStyles = StyleSheet.create({
        container: {
            flex: 1,
        },
        content: {
            flex: 1,
            flexGrow: 1,
            maxWidth: 1250,
            alignSelf: 'center',
            width: '100%',
        },
        description: {
            width: '80%',
            alignSelf: 'center',
            flexWrap: 'wrap',
            paddingVertical: '2em'
        },
        mobileTabContainer: {
            flexDirection: 'row',
            backgroundColor: theme.colors.surface,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.outlineVariant,
        },
        mobileTab: {
            flex: 1,
            paddingVertical: 12,
            alignItems: 'center',
            justifyContent: 'center',
        },
        mobileTabActive: {
            borderBottomWidth: 2,
            borderBottomColor: theme.colors.primary,
        },
        mobileTabText: {
            fontSize: 14,
            fontWeight: '500',
        },
        mobileTabTextActive: {
            color: theme.colors.primary,
            fontWeight: '600',
        },
    });
    const styles = merge(commonStyles, useStylesheet(responsiveStyles));

    const setActivities = (activities) => {
        setActivitiesState(activities);
        localStorage.setItem("activities", JSON.stringify(activities));
    }

    React.useEffect(() => {
        const storedActivities = localStorage.getItem("activities");
        if (storedActivities && storedActivities !== "null") setActivitiesState(JSON.parse(storedActivities));
    }, [])

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ minHeight: '100%' }}>
            <View style={styles.content}>
                {styles.mobileTabContainer && (
                    <View style={styles.mobileTabContainer}>
                        <TouchableOpacity
                            style={[styles.mobileTab, mobileTab === MobileTabs.ACTIVITIES && styles.mobileTabActive]}
                            onPress={() => setMobileTab(MobileTabs.ACTIVITIES)}
                        >
                            <Text style={[styles.mobileTabText, mobileTab === MobileTabs.ACTIVITIES && styles.mobileTabTextActive]}>
                                Your Time
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.mobileTab, mobileTab === MobileTabs.AI_COACH && styles.mobileTabActive]}
                            onPress={() => setMobileTab(MobileTabs.AI_COACH)}
                        >
                            <Text style={[styles.mobileTabText, mobileTab === MobileTabs.AI_COACH && styles.mobileTabTextActive]}>
                                AI Coach
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}

                <View style={styles.freeTimeWidget}>
                    {(!styles.showMobileTabs || mobileTab === MobileTabs.ACTIVITIES) && (
                        <View style={styles.leftColumn}>
                            <HighLevelAssessment activities={activities} style={styles.highLevelAssessmentStyle} />
                            <ActivityList
                                activities={activities}
                                setActivities={setActivities}
                                style={styles.activityFormStyle}
                            />
                        </View>
                    )}

                    {(!styles.showMobileTabs || mobileTab === MobileTabs.AI_COACH) && (
                        <View style={styles.rightColumn}>
                            <TimeUtilizationSuggestions
                                activities={activities}
                                compactMode={aiChatStarted}
                                onChatStart={() => setAiChatStarted(true)}
                                style={styles.aiChatStyle}
                            />
                        </View>
                    )}
                </View>
            </View>
            <PhilosophySection />
            <Footer />
            <StatusBar style="auto" />
        </ScrollView>
    )

}

const responsiveStyles = [
    {
        query: { minWidth: 900 },
        style: {
            mobileTabContainer: {
                display: 'none',
            },
            showMobileTabs: false,
            freeTimeWidget: {
                flexDirection: 'row',
                width: '96%',
                alignSelf: 'center',
                alignItems: 'stretch',
            },
            leftColumn: {
                width: '50%',
                paddingRight: 12,
                flexShrink: 0,
            },
            rightColumn: {
                width: '50%',
                flexShrink: 0,
                paddingLeft: 12,
                height: '800px',
            },
            highLevelAssessmentStyle: {
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '420px',
                marginBottom: 16,
            },
            activityFormStyle: {
                width: '100%',
            },
            description: {
                width: '100%',
                paddingHorizontal: 12,
                paddingVertical: 16,
            },
            aiChatStyle: {
                width: '100%',
            },
        }
    },
    {
        query: { maxWidth: 900 },
        style: {
            showMobileTabs: true,
            freeTimeWidget: {
                flexDirection: 'column',
                width: '100%',
                alignSelf: 'center',
            },
            leftColumn: {
                width: '100%',
            },
            rightColumn: {
                width: '100%',
                height: '600px',
            },
            highLevelAssessmentStyle: {
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '300px',
                marginBottom: 16,
            },
            activityFormStyle: {
                width: '100%',
            },
            description: {
                width: '100%',
                paddingHorizontal: 12,
                paddingVertical: 16,
            },
            aiChatStyle: {
                width: '100%',
            },
        }
    },
]

export default Home;