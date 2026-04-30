import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from 'react-native-paper';
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
                <Text variant="bodySmall">You have</Text>
                <Text variant="headlineMedium">{getDisplayHours(hoursRemaining)} / {totalHoursInWeek}</Text>
                <Text variant="bodySmall" style={{ textAlign: 'center' }}>free hours in{"\n"}your week</Text>
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
        position: 'relative',
        width: '90%',
        height: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flex: 1,
        minHeight: 420,
    }
})