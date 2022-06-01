import React from "react";
import { PieChart } from "react-native-svg-charts";
import { View } from "react-native";
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
                    svg: {
                        fill: activity.color,
                        onPress: () => console.log('press', activity.name),
                    }
                }
            })

        pieData.push({
            value: freeHours,
            key: "free-time",
            svg: {
                fill: theme.colors.background,
                stroke: theme.colors.placeholder,
                strokeWidth: 2,
                onPress: () => console.log('press', 'free-time'),
            },
            arc: { outerRadius: '100%', cornerRadius: 10, }
        })
        console.log(pieData);
        return pieData
    }

    React.useEffect(() => {
        setData(constructDataFromActivities(activities));
    }, [activities])

    return (
        <View style={props.style}>
            <ErrorBoundary>
                <PieChart
                    style={{ height: 200 }}
                    data={data}
                    sort={(a, b) => (b.key === "free-time") ? 1
                        : (a.key === "free-time") ? -1
                            : b.value - a.value
                    }
                >
                </PieChart>
            </ErrorBoundary>
        </View >
    )
}