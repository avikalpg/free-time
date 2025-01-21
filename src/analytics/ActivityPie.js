import React from "react";
import { PieChart, Pie, Sector, Cell } from 'recharts';
import { View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import ErrorBoundary from "../components/ErrorBoundary";

export function ActivityPie(props) {
    const { activities, totalHoursInWeek } = props;
    const [data, setData] = React.useState([])
    const theme = useTheme();

    const constructDataFromActivities = (activities) => {

        let freeHours = totalHoursInWeek;
        const pieData = activities
            .filter((activity) => activity.hours * activity.duration.multiplier > 0)
            .map((activity, index) => {
                const hoursInWeek = activity.hours * activity.duration.multiplier;
                freeHours -= hoursInWeek;
                return {
                    value: hoursInWeek,
                    key: index,
                    color: activity.color,
                    name: activity.name,
                }
            })

        pieData.push({
            value: freeHours,
            key: "free-time",
            color: theme.colors.background,
            name: "Free Time",
        })
        return pieData
    }

    React.useEffect(() => {
        setData(constructDataFromActivities(activities));
    }, [activities, theme])

    return (
        <View style={props.style}>
            <ErrorBoundary >
                <PieChart width={300} height={300}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        fill="#8884d8"
                        label={(entry) => entry.name}
                    >
                        {data.map((entry, index) => (
                            <Cell key={index} fill={entry.color} />
                        ))}
                    </Pie>
                </PieChart>
            </ErrorBoundary>
        </View >
    )
}

const styles = StyleSheet.create({
    pieChart: {
        alignSelf: 'center',
        maxWidth: '100%',
        maxHeight: '100%',
        aspectRatio: 1,
        width: '100%',
    }
})