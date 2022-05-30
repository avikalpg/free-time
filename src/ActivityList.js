import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import { ActivityPeriods } from './EnumActivityPeriod';

export const ActivityList = (props) => {
    const { activities, setActivities } = props;

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
            borderRadius: theme.roundness,
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
            minWidth: '128px'
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
            maxHeight: '197px',
            borderRadius: theme.roundness
        },
        activityPeriodRow: {
            paddingVertical: '10px',
            backgroundColor: theme.colors.background
        },
        addActivityButton: {
            width: '96%',
            paddingHorizontal: '5px',
            paddingVertical: '5px',
            marginHorizontal: '2%',
            marginVertical: '5px'
        },
    })

    const changeNameOfActivity = (activityIndex, activityNewName) => {
        setActivities([
            ...activities.slice(0, activityIndex),
            {
                name: activityNewName,
                hours: activities[activityIndex].hours,
                duration: activities[activityIndex].duration,
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
                hours: activityNewHours,
                duration: activities[activityIndex].duration,
            },
            ...activities.slice(activityIndex + 1)]);
    }

    const changePeriodOfActivity = (activityIndex, activityNewPeriod) => {
        setActivities([
            ...activities.slice(0, activityIndex),
            {
                name: activities[activityIndex].name,
                hours: activities[activityIndex].hours,
                duration: activityNewPeriod
            },
            ...activities.slice(activityIndex + 1)]);
    }

    const addActivity = () => {
        setActivities([
            ...activities,
            {
                name: '',
                hours: 0,
                duration: ActivityPeriods.WEEK
            }
        ]);
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
                        value={activity.hours.toString()}
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
                        defaultValue={activity.duration}
                        buttonStyle={styles.activityPeriodButton}
                        buttonTextStyle={styles.activityPeriodDropdownText}
                        dropdownStyle={styles.activityPeriodDropdown}
                        rowStyle={styles.activityPeriodRow}
                        rowTextStyle={styles.activityPeriodDropdownText}
                    />
                </View>
            ))}
            <Button icon='plus' mode='contained' style={styles.addActivityButton} onPress={addActivity}>
                Add Activity
            </Button>
        </View>
    )
}