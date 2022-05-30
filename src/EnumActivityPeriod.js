export const ActivityPeriods = Object.freeze({
    DAY: {
        text: "per day",
        multiplier: 7,
    },
    WORK_DAY: {
        text: "per workday",
        multiplier: 5,
    },
    WEEK_END: {
        text: "per holiday",
        multiplier: 2,
    },
    WEEK: {
        text: "per week",
        multiplier: 1,
    },
    MONTH: {
        text: "per month",
        multiplier: 7 * 12 / 365,
    },
})