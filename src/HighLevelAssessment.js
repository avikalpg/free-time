import React from "react";
import { View } from "react-native";
import { Caption, Headline } from 'react-native-paper';

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
            <Caption>You have</Caption>
            <Headline>{getDisplayHours(hoursRemaining)} / {totalHoursInWeek}</Headline>
            <Caption>free hours in your week</Caption>
        </View>
    )
}