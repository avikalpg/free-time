import React from "react";
import { View, StyleSheet } from "react-native";
import { Caption, Headline } from 'react-native-paper';
import { ActivityPie } from "./analytics/ActivityPie";
import { calculateRemainingTime, getDisplayHours, totalHoursInWeek, validateHours } from "./utils/utils";

export function HighLevelAssessment(props) {
    const { activities } = props;
    const validActivities = activities.filter((activity) => validateHours(activity).valid)

    const [hoursRemaining, setHoursRemaining] = React.useState(168);

    React.useEffect(() => {
        setHoursRemaining(calculateRemainingTime(validActivities));
    }, [validActivities])

    return (
        <View style={props.style}>
            <View style={styles.totalFreeHoursText}>
                <Caption>You have</Caption>
                <Headline>{getDisplayHours(hoursRemaining)} / {totalHoursInWeek}</Headline>
                <Caption style={{ textAlign: 'center' }}>free hours in<br />your week</Caption>
            </View>
            <ActivityPie activities={validActivities} totalHoursInWeek={totalHoursInWeek} style={styles.activityPie} >
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