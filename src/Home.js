import React from 'react';
import { Text, TextInput, StyleSheet, View, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.totalHoursInWeek = 168;

        this.state = {
            hoursRemaining: 168,
            activities: [
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
            ]
        }
    }

    componentDidMount = () => {
        this.calculateRemainingTime();
    }

    changeNameOfActivity = (activityIndex, activityNewName) => {
        const activities = this.state.activities;
        activities[activityIndex].name = activityNewName;
        this.setState({ activities: activities });

        this.calculateRemainingTime();
    }

    changeHoursOfActivity = (activityIndex, activityNewHours) => {
        if (activityNewHours == "") {
            activityNewHours = 0;
        }
        else {
            activityNewHours = parseInt(activityNewHours)
        }
        const activities = this.state.activities;
        activities[activityIndex].hours = activityNewHours;
        this.setState({ activities: activities });

        this.calculateRemainingTime();
    }

    calculateRemainingTime = () => {
        let totalOccupiedHours = 0;
        for (const activity of this.state.activities) {
            totalOccupiedHours += activity.hours
        }

        console.log(this.totalHoursInWeek, totalOccupiedHours, this.totalHoursInWeek - totalOccupiedHours)

        this.setState({ hoursRemaining: this.totalHoursInWeek - totalOccupiedHours })
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>Do you know, we have 168 hours in a week. Most full time jobs demand only 40-48 hours of work in a week.
                    This means that we have almost 3-times as much time in our week as we devote to our full-time jobs.
                    How do you spend this time?
                </Text>
                <Text>The purpose of this website is gaining self-awareness about the amount of free time you have in your week</Text>

                {this.state.activities.map((activity, index) => (
                    <React.Fragment key={index}>
                        <TextInput value={activity.name} onChangeText={activityName => this.changeNameOfActivity(index, activityName)} />
                        <TextInput value={activity.hours.toString()} onChangeText={hours => this.changeHoursOfActivity(index, hours)} />
                    </React.Fragment>
                ))}

                <Text>{this.state.hoursRemaining} / {this.totalHoursInWeek}</Text>
                <Button title='Privacy Policy' onPress={() => this.props.navigation.navigate('PrivacyPolicy')} />
                <StatusBar style="auto" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Home;