import React from "react";
import { StyleSheet, View } from "react-native";
import { Caption, Headline } from 'react-native-paper';

export function HighLevelAssessment(props) {
    const { activities } = props;

    const totalHoursInWeek = 168;

    const [hoursRemaining, setHoursRemaining] = React.useState(168);
    const calculateRemainingTime = () => {
        let totalOccupiedHours = 0;
        for (const activity of activities) {
            totalOccupiedHours += activity.hours
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
        <View style={styles.container}>
            <Caption>You have</Caption>
            <Headline>{getDisplayHours(hoursRemaining)} / {totalHoursInWeek}</Headline>
            <Caption>free hours in your week</Caption>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '50%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})