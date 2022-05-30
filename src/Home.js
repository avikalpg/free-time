import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Paragraph, Button } from 'react-native-paper';
import { ActivityList } from './ActivityList';
import { HighLevelAssessment } from './HighLevelAssessment';

function Home(props) {
    const [activities, setActivities] = useState([
        {
            name: "Full-time Job",
            hours: 40,
        },
        {
            name: "Sleep",
            hours: 56,
        },
        {
            name: "Chores",
            hours: 14,
        },
        {
            name: "Leisure",
            hours: 14
        },
    ]);

    return (
        <View style={styles.container}>
            <View style={styles.description}>
                <Paragraph>Do you know, we have 168 hours in a week. Most full time jobs demand only 40-48 hours of work in a week.
                    This means that we have almost 3-times as much time in our week as we devote to our full-time jobs.
                    How do you spend this time?
                </Paragraph>
                <Paragraph>The purpose of this website is gaining self-awareness about the amount of free time you have in your week</Paragraph>
            </View>
            <View style={styles.freeTimeWidget}>
                <ActivityList activities={activities} setActivities={setActivities} />
                <HighLevelAssessment activities={activities} />
            </View>
            <StatusBar style="auto" />
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        maxWidth: '1200px',
        alignSelf: 'center',
    },
    description: {
        width: '80%',
        alignSelf: 'center',
        flexWrap: 'wrap',
        padding: '2em'
    },
    freeTimeWidget: {
        flexDirection: 'row',
    }
});

export default Home;