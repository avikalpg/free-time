import React from "react";
import { View, StyleSheet } from "react-native";
import { Caption, Headline } from 'react-native-paper';
import { ActivityPie } from "./analytics/ActivityPie";

export function HighLevelAssessment(props) {
    const { activities } = props;

    const totalHoursInWeek = 168;

    const [hoursRemaining, setHoursRemaining] = React.useState(168);
    const calculateRemainingTime = () => {
        let totalOccupiedHours = 0;
        for (const activity of activities) {
            totalOccupiedHours += activity.hours * activity.duration.multiplier
        }
        setHoursRemaining(totalHoursInWeek - totalOccupiedHours)
    }

    const getDisplayHours = (hours) => (
        Math.round(10 * hours) / 10
    )

    React.useEffect(() => {
        calculateRemainingTime();
    }, [activities])

    return (
        <View style={props.style}>
            <View style={styles.totalFreeHoursText}>
                <Caption>You have</Caption>
                <Headline>{getDisplayHours(hoursRemaining)} / {totalHoursInWeek}</Headline>
                <Caption style={{ textAlign: 'center' }}>free hours in<br />your week</Caption>
            </View>
            <ActivityPie activities={activities} totalHoursInWeek={totalHoursInWeek} style={styles.activityPie} >
            </ActivityPie>
        </View>
    )
}

const styles = StyleSheet.create({
    totalFreeHoursText: {
        position: 'absolute',
        width: '50%',
        height: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
    },
    activityPie: {
        position: 'absolute',
        width: '90%',
        height: '90%',
        alignItems: 'center',
        justifyContent: 'center',
    }
})