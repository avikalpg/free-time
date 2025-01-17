export const randomColor = () =>
    ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)

/**
     * Evaluates whether an activity has valid hours & period of activity
     * @param {{name: string, hours: number, duration: {text: string, multiplier: number}, color: string, errorText: null}} activity
     * @returns {{valid: boolean, reason: string}}
     */
export const validateHours = (activity) => {
    // Check if the input is a valid number
    if (isNaN(activity.hours)) {
        return { valid: false, reason: "Invalid input. Please enter a number." };
    }
    // Check if the input is within a reasonable range
    const hoursPerWeek = activity.hours * activity.duration.multiplier;
    if (hoursPerWeek < 0) {
        return { valid: false, reason: "Hours cannot be negative." };
    }
    if (hoursPerWeek > 168) {
        return { valid: false, reason: "Hours exceed 168 hours per week." };
    }
    return { valid: true, reason: "" };
}