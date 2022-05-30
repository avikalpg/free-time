import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';

const ActivityPeriods = Object.freeze({
    DAY: {
        text: "per day",
        mutliplier: 7,
    },
    WEEK: {
        text: "per week",
        mutliplier: 1,
    },
    MONTH: {
        text: "per month",
        mutliplier: 7 * 12 / 365,
    },
})

export const ActivityList = (props) => {
    const { activities, setActivities } = props;

    function getTimeDetailsFromActivities(activities) {
        const timeDetails = [];
        for (const activity of activities) {
            timeDetails.push({
                hours: activity.hours,
                duration: ActivityPeriods.WEEK
            })
        }
        return timeDetails;
    }
    const [timeDetails, setTimeDetails] = React.useState(getTimeDetailsFromActivities(activities));

    // styles
    const theme = useTheme();
    const styles = StyleSheet.create({
        container: {
            flexDirection: 'column',
            width: '50%'
        },
        row: {
            flexDirection: 'row',
            width: '96%',
            paddingHorizontal: '5px',
            paddingTop: '5px',
            paddingBottom: '10px',
            marginHorizontal: '2%',
            marginVertical: '5px',
            alignItems: 'flex-end',
            backgroundColor: theme.colors.surface,
            borderRadius: theme.roundness
        },
        activityName: {
            flexGrow: 4,
            marginHorizontal: '5px'
        },
        activityHours: {
            flex: 2,
            marginHorizontal: '5px',
            minWidth: '100px'
        },
        activityPeriodButton: {
            flex: 2,
            marginHorizontal: '5px',
            backgroundColor: theme.colors.background,
            borderWidth: '1px',
            borderRadius: theme.roundness,
            borderColor: theme.colors.disabled,
            height: '90%',
            minWidth: '108px'
        },
        activityPeriodDropdownText: {
            color: theme.colors.text,
            textAlign: 'left',
            fontFamily: theme.fonts.regular.fontFamily,
            fontWeight: theme.fonts.regular.fontWeight,
            fontSize: '16px'
        },
        activityPeriodDropdown: {
            backgroundColor: theme.colors.surface,
            height: 'auto',
            maxHeight: '118px'
        },
        activityPeriodRow: {
            paddingVertical: '10px',
            backgroundColor: theme.colors.background
        },
    })

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
        setTimeDetails([
            ...timeDetails.slice(0, activityIndex),
            {
                hours: activityNewHours,
                duration: timeDetails[activityIndex].duration
            },
            ...timeDetails.slice(activityIndex + 1)]);
        let activityNewHoursPerWeek = activityNewHours * timeDetails[activityIndex].duration.mutliplier;
        setActivities([
            ...activities.slice(0, activityIndex),
            {
                name: activities[activityIndex].name,
                hours: activityNewHoursPerWeek
            },
            ...activities.slice(activityIndex + 1)]);
    }

    const changePeriodOfActivity = (activityIndex, activityNewPeriod) => {
        setTimeDetails([
            ...timeDetails.slice(0, activityIndex),
            {
                hours: timeDetails[activityIndex].hours,
                duration: activityNewPeriod
            },
            ...timeDetails.slice(activityIndex + 1)]);
        let activityNewHours = timeDetails[activityIndex].hours * activityNewPeriod.mutliplier;
        setActivities([
            ...activities.slice(0, activityIndex),
            {
                name: activities[activityIndex].name,
                hours: activityNewHours
            },
            ...activities.slice(activityIndex + 1)]);
    }

    return (
        <View style={styles.container}>
            {activities.map((activity, index) => (
                <View style={styles.row} key={index}>
                    <TextInput
                        label="Activity"
                        value={activity.name}
                        onChangeText={activityName => changeNameOfActivity(index, activityName)}
                        style={styles.activityName}
                        mode="outlined"
                    />
                    <TextInput
                        label={"Time"}
                        value={timeDetails[index].hours.toString()}
                        onChangeText={timeVal => changeHoursOfActivity(index, timeVal)}
                        style={styles.activityHours}
                        right={<TextInput.Affix text='Hours' />}
                        mode="outlined"
                    />
                    <SelectDropdown
                        data={Object.values(ActivityPeriods)}
                        onSelect={(selectedPeriod, unitIdx) => {
                            changePeriodOfActivity(index, selectedPeriod)
                        }}
                        buttonTextAfterSelection={(selectedPeriod, unitIdx) => selectedPeriod.text}
                        rowTextForSelection={(selectedPeriod, unitIdx) => selectedPeriod.text}
                        defaultValue={ActivityPeriods.WEEK}
                        buttonStyle={styles.activityPeriodButton}
                        buttonTextStyle={styles.activityPeriodDropdownText}
                        dropdownStyle={styles.activityPeriodDropdown}
                        rowStyle={styles.activityPeriodRow}
                        rowTextStyle={styles.activityPeriodDropdownText}
                    />
                </View>
            ))}
        </View>
    )
}