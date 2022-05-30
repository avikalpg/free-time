import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, IconButton, TextInput, useTheme } from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import { ActivityPeriods } from './EnumActivityPeriod';

export const ActivityList = (props) => {
    const { activities, setActivities } = props;

    // styles
    const theme = useTheme();
    const styles = StyleSheet.create({
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
            minWidth: '120px'
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
        deleteActivityButton: {
            margin: 0,
            top: 0,
            alignSelf: 'flex-start',
            height: 'auto',
            width: 'auto',
            borderRadius: '8px'
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
            activityNewHours = parseFloat(activityNewHours)
            activityNewHours = Math.round(activityNewHours * 100) / 100
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

    const deleteActivity = (activityIndex) => {
        setActivities([
            ...activities.slice(0, activityIndex),
            ...activities.slice(activityIndex + 1)]);
    }

    return (
        <View style={props.style}>
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
                    <IconButton
                        icon='close-circle'
                        size={16}
                        onPress={() => deleteActivity(index)}
                        color={theme.colors.primary}
                        style={styles.deleteActivityButton}
                    />
                </View>
            ))}
            <Button icon='plus' mode='contained' style={styles.addActivityButton} onPress={addActivity}>
                Add Activity
            </Button>
        </View>
    )
}