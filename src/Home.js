import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Paragraph, Text, Button } from 'react-native-paper';
import { ActivityList } from './ActivityList';

function Home(props) {

    const totalHoursInWeek = 168;

    const [hoursRemaining, setHoursRemaining] = useState(168);
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

    const calculateRemainingTime = () => {
        let totalOccupiedHours = 0;
        for (const activity of activities) {
            totalOccupiedHours += activity.hours
        }
        setHoursRemaining(totalHoursInWeek - totalOccupiedHours)
    }

    React.useEffect(() => {
        calculateRemainingTime();
    }, [activities])

    return (
        <View style={styles.container}>
            <Paragraph>Do you know, we have 168 hours in a week. Most full time jobs demand only 40-48 hours of work in a week.
                This means that we have almost 3-times as much time in our week as we devote to our full-time jobs.
                How do you spend this time?
            </Paragraph>
            <Paragraph>The purpose of this website is gaining self-awareness about the amount of free time you have in your week</Paragraph>

            <ActivityList activities={activities} setActivities={setActivities} />

            <Text>{hoursRemaining} / {totalHoursInWeek}</Text>
            <Button mode='text' onPress={() => props.navigation.navigate('PrivacyPolicy')} >Privacy Policy</Button>
            <StatusBar style="auto" />
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Home;