import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Paragraph } from 'react-native-paper';
import { useStylesheet } from 'react-native-responsive-ui';
import merge from 'deepmerge';
import ReactGA from 'react-ga4';
import { ActivityList } from './ActivityList';
import { HighLevelAssessment } from './HighLevelAssessment';
import { ActivityPeriods } from './EnumActivityPeriod';
import { Footer } from './Footer';
import { randomColor } from './utils/utils';
import { TimeUtilizationSuggestions } from './TimeUtilizationSuggestions';

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
    const styles = merge(commonStyles, useStylesheet(responsiveStyles));

    const setActivities = (activities) => {
        setActivitiesState(activities);
        localStorage.setItem("activities", JSON.stringify(activities));
    }

    React.useEffect(() => {
        const storedActivities = localStorage.getItem("activities");
        console.log(`storedActivities: ${JSON.stringify(storedActivities)}`)
        if (storedActivities && storedActivities !== "null") setActivitiesState(JSON.parse(storedActivities));
    }, [])

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ minHeight: '100%' }}>
            <View style={styles.content}>
                <View style={styles.description}>
                    <Paragraph>Do you know, we have 168 hours in a week. Most full time jobs demand only 40-48 hours of work in a week.
                        This means that we have almost 3-times as much time in our week as we devote to our full-time jobs.
                        How do you spend this time?
                    </Paragraph>
                    <Paragraph>The purpose of this website is gaining self-awareness about the amount of free time you have in your week</Paragraph>
                </View>
                <View style={styles.freeTimeWidget}>
                    <ActivityList activities={activities} setActivities={setActivities} style={styles.activityListStyle} />
                    <HighLevelAssessment activities={activities} style={styles.highLevelAssessmentStyle} />
                </View>
                <View>
                    <TimeUtilizationSuggestions activities={activities} style={styles.description} />
                </View>
            </View>
            <Footer />
            <StatusBar style="auto" />
        </ScrollView>
    )

}

const responsiveStyles = [
    {
        query: { minWidth: 900 },
        style: {
            freeTimeWidget: {
                flexDirection: 'row',
            },
            activityListStyle: {
                flexDirection: 'column',
                width: '50%',
            },
            highLevelAssessmentStyle: {
                width: '50%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '300px',
            },
        }
    },
    {
        query: { maxWidth: 900 },
        style: {
            freeTimeWidget: {
                flexDirection: 'column',
                width: '96%',
                alignSelf: 'center',
            },
            activityListStyle: {
                flexDirection: 'column',
                width: '100%',
            },
            highLevelAssessmentStyle: {
                width: '100%',
                height: 'auto',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '300px',
            },
        }
    },
]

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
});

export default Home;