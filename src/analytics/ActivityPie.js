import React from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import ErrorBoundary from "../components/ErrorBoundary";
import { getFirstNWords } from "../utils/utils";

export function ActivityPie(props) {
    const FREE_TIME_KEY = "free-time";
    const { activities, totalHoursInWeek } = props;
    const [data, setData] = React.useState([])
    const theme = useTheme();
    const [activeIndex, setActiveIndex] = React.useState(null);

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
            key: FREE_TIME_KEY,
            color: theme.colors.background,
            name: "Free Time",
            stroke: theme.colors.placeholder,
            strokeWidth: 2,
            cornerRadius: 10,
        })
        return pieData
    }

    React.useEffect(() => {
        setData(constructDataFromActivities(activities));
    }, [activities, theme])

    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };

    const onPieLeave = (_) => {
        setActiveIndex(null);
    };

    const renderActiveShape = (props) => {
        const RADIAN = Math.PI / 180;
        const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;
        const final_fill = (payload.key === FREE_TIME_KEY) ? theme.colors.placeholder : fill;
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const mx = cx + (outerRadius + 30) * cos;
        const my = cy + (outerRadius + 30) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? 'start' : 'end';

        return (
            <g>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={(payload.key === FREE_TIME_KEY) ? theme.colors.background : fill}
                    stroke={final_fill}
                    strokeWidth={(payload.key === FREE_TIME_KEY) ? 3 : 0}
                    cornerRadius={(payload.key === FREE_TIME_KEY) ? 10 : 5}
                />
                <Sector
                    cx={cx}
                    cy={cy}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={outerRadius + 6}
                    outerRadius={outerRadius + 10}
                    fill={final_fill}
                />
                <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={final_fill} fill="none" />
                <circle cx={ex} cy={ey} r={2} fill={final_fill} stroke="none" />
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${getFirstNWords(payload.name, 2)}`}</text>
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                    {Number(payload.value.toFixed(1))} hr
                </text>
            </g>
        );
    };

    return (
        <View style={props.style}>
            <ErrorBoundary >
                <ResponsiveContainer style={styles.pieChart}>
                    <PieChart width={600} height={600}>
                        <Pie
                            data={data}
                            dataKey='value'
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            fill="#8884d8"
                            activeIndex={activeIndex}
                            activeShape={renderActiveShape}
                            onMouseEnter={onPieEnter}
                            onMouseLeave={onPieLeave}
                            startAngle={90}
                            endAngle={450}
                            paddingAngle={2}
                            cornerRadius={5}
                        >
                            {data.map((entry, index) => (
                                <Cell key={index} fill={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
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