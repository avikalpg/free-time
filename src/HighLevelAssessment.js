import React from "react";
import { Text } from 'react-native-paper';

export function HighLevelAssessment(props) {
    const { activities } = props;

    const totalHoursInWeek = 168;

    const [hoursRemaining, setHoursRemaining] = React.useState(168);
    const calculateRemainingTime = () => {
        let totalOccupiedHours = 0;
        for (const activity of activities) {
            totalOccupiedHours += activity.hours
        }
        console.log(totalOccupiedHours, totalHoursInWeek);
        setHoursRemaining(totalHoursInWeek - totalOccupiedHours)
    }

    React.useEffect(() => {
        calculateRemainingTime();
    }, [activities])

    return (<Text>{hoursRemaining} / {totalHoursInWeek}</Text>)
}