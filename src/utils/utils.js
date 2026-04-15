export const randomColor = () =>
    ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)

export const totalHoursInWeek = 168;

/**
 * Evaluates whether an activity has valid hours & period of activity
 * @param {{name: string, hours: number, duration: {text: string, multiplier: number}, color: string, errorText: null}[]} validActivities
 * @returns @number
 */
export const calculateRemainingTime = (validActivities) => {
    let totalOccupiedHours = 0;
    for (const activity of validActivities) {
        totalOccupiedHours += activity.hours * activity.duration.multiplier
    }
    return totalHoursInWeek - totalOccupiedHours;
}

export const getDisplayHours = (hours) => (
    Math.round(10 * hours) / 10
)

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

/**
 *
 * @param {string} str string from which we want the substring
 * @param {number} n number of words you want to extract
 * @returns n-word long prefix substring from str
 */
/**
 * Parse a [SIMULATE: ...] tag from an AI response and compute free hours.
 * Format: [SIMULATE: Activity1=Xh/week, Activity2=Yh/day, ...]
 * Returns null if no valid SIMULATE tag found, or a result object.
 */
export function runScheduleSimulation(text) {
    const match = text.match(/\[SIMULATE:\s*([^\]]+)\]/i);
    if (!match) return null;

    const entries = match[1].split(',').map(s => s.trim()).filter(Boolean);
    const activities = [];
    let parseError = null;

    for (const entry of entries) {
        // Match "Activity Name = Xh/week" or "Activity Name = Xh/day"
        const m = entry.match(/^(.+?)\s*=\s*([\d.]+)\s*h\s*(?:\/\s*(week|day|month))?$/i);
        if (!m) { parseError = `Could not parse: "${entry}"`; break; }
        const name = m[1].trim();
        const hours = parseFloat(m[2]);
        const period = (m[3] || 'week').toLowerCase();
        const multiplier = period === 'day' ? 7 : period === 'month' ? 7 / 30 : 1;
        const hoursPerWeek = hours * multiplier;
        if (isNaN(hoursPerWeek) || hoursPerWeek < 0) { parseError = `Invalid hours for "${name}"`; break; }
        // Skip "free" or "free time" entries — those are outputs, not inputs
        if (/^free(\s*time)?$/i.test(name)) continue;
        activities.push({ name, hoursPerWeek: Math.round(10 * hoursPerWeek) / 10 });
    }

    if (parseError) return { error: parseError, rawTag: match[0] };

    const totalUsed = activities.reduce((sum, a) => sum + a.hoursPerWeek, 0);
    const freeHours = Math.round(10 * (168 - totalUsed)) / 10;

    return {
        rawTag: match[0],
        activities,
        totalUsed: Math.round(10 * totalUsed) / 10,
        freeHours,
        summary: `Simulation result: ${activities.map(a => `${a.name} (${a.hoursPerWeek}h/week)`).join(', ')} → ${freeHours}h/week free (${totalUsed}h/week used out of 168).`,
    };
}

export function getFirstNWords(str, n) {
    if (typeof str !== 'string' || str.trim() === "") {
        return ""; // Or handle invalid input as needed (e.g., throw an error)
    }

    const words = str.trim().split(/\s+/); // Split by any whitespace (including multiple spaces)
    if (words.length >= n) {
        return words.slice(0, n).join(" ");
    } else if (words.length === 1) {
        return words[0];
    }
    else {
        return ""; // or null, or whatever you want to return if it's an empty string.
    }
}