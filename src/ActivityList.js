import React from 'react';
import { TextInput } from 'react-native-paper';

export const ActivityList = (props) => {
    const { activities, setActivities } = props;

    const changeNameOfActivity = (activityIndex, activityNewName) => {
        setActivities([
            ...activities.slice(0, activityIndex),
            {
                name: activityNewName,
                hours: activities[activityIndex].hours
            },
            ...activities.slice(activityIndex + 1)]);
    }

    const changeHoursOfActivity = (activityIndex, activityNewHours) => {
        if (activityNewHours == "") {
            activityNewHours = 0;
        }
        else {
            activityNewHours = parseInt(activityNewHours)
        }
        setActivities([
            ...activities.slice(0, activityIndex),
            {
                name: activities[activityIndex].name,
                hours: activityNewHours
            },
            ...activities.slice(activityIndex + 1)]);
    }

    return (
        <>
            {activities.map((activity, index) => (
                <React.Fragment key={index}>
                    <TextInput value={activity.name} onChangeText={activityName => changeNameOfActivity(index, activityName)} />
                    <TextInput value={activity.hours.toString()} onChangeText={hours => changeHoursOfActivity(index, hours)} />
                </React.Fragment>
            ))}
        </>
    )
}