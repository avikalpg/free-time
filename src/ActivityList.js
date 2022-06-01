import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, IconButton, TextInput, useTheme } from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import ReactGA from 'react-ga';
import { ActivityPeriods } from './EnumActivityPeriod';
import { randomColor } from './utils';

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
            backgroundColor: theme.colors.surface,
            borderRadius: theme.roundness,
            flexWrap: 'wrap'
        },
        activityName: {
            flexGrow: 1,
            marginHorizontal: '5px'
        },
        activityDetails: {
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'nowrap',
            height: 'auto',
            alignItems: 'flex-end',
            minWidth: 256,
        },
        activityHours: {
            flex: 1,
            minWidth: 108,
            marginHorizontal: '5px',
        },
        activityPeriodButton: {
            flex: 1,
            minWidth: 128,
            height: '90%',
            marginHorizontal: '5px',
            backgroundColor: theme.colors.background,
            borderWidth: '1px',
            borderRadius: theme.roundness,
            borderColor: theme.colors.disabled,
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
            position: 'absolute',
            margin: 0,
            top: -8,
            right: -8,
            alignSelf: 'flex-start',
            height: 'auto',
            width: 'auto',
            borderRadius: 8
        },
    })

    const changeNameOfActivity = (activityIndex, activityNewName) => {
        ReactGA.event({
            category: "ActivityList",
            action: "Changed Name",
            value: activityIndex,
            dimension1: activityNewName,
            dimension2: activities[activityIndex].duration.text,
            metric1: activities[activityIndex].hours,
            metric2: activities[activityIndex].duration.multiplier,
        });
        setActivities([
            ...activities.slice(0, activityIndex),
            {
                ...activities[activityIndex],
                name: activityNewName,
            },
            ...activities.slice(activityIndex + 1)]);
    }

    const changeHoursOfActivity = (activityIndex, activityNewHours) => {
        ReactGA.event({
            category: "ActivityList",
            action: "Changed Hours",
            value: activityIndex,
            dimension1: activities[activityIndex].name,
            dimension2: activities[activityIndex].duration.text,
            metric1: activityNewHours,
            metric2: activities[activityIndex].duration.multiplier,
        });
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
                ...activities[activityIndex],
                hours: activityNewHours,
            },
            ...activities.slice(activityIndex + 1)]);
    }

    const changePeriodOfActivity = (activityIndex, activityNewPeriod) => {
        ReactGA.event({
            category: "ActivityList",
            action: "Changed Duration",
            value: activityIndex,
            dimension1: activities[activityIndex].name,
            dimension2: activityNewPeriod.text,
            metric1: activities[activityIndex].hours,
            metric2: activityNewPeriod.multiplier,
        });
        setActivities([
            ...activities.slice(0, activityIndex),
            {
                ...activities[activityIndex],
                duration: activityNewPeriod
            },
            ...activities.slice(activityIndex + 1)]);
    }

    const addActivity = () => {
        ReactGA.event({
            category: "ActivityList",
            action: "Added Activity",
            value: activities.length,
        });
        setActivities([
            ...activities,
            {
                name: '',
                hours: 0,
                duration: ActivityPeriods.WEEK,
                color: randomColor(),
            }
        ]);
    }

    const deleteActivity = (activityIndex) => {
        ReactGA.event({
            category: "ActivityList",
            action: "Deleted Activity",
            value: activityIndex,
            dimension1: activities[activityIndex].name,
            dimension2: activities[activityIndex].duration.text,
            metric1: activities[activityIndex].hours,
            metric2: activities[activityIndex].duration.multiplier,
        });
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
                        dense
                    />
                    <View style={styles.activityDetails}>
                        <TextInput
                            label={"Time"}
                            value={activity.hours.toString()}
                            onChangeText={timeVal => changeHoursOfActivity(index, timeVal)}
                            style={styles.activityHours}
                            right={<TextInput.Affix text='Hours' />}
                            mode="outlined"
                            dense
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