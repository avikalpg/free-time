export const randomColor = () =>
    ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)

export const totalHoursInWeek = 168;

// Cadence multipliers — mirrors ActivityPeriods in EnumActivityPeriod.js
// Centralised here so runScheduleSimulation uses the same logic as the calculator.
export const SIMULATE_CADENCE_MULTIPLIERS = {
    'day':      7,          // per day  → ×7
    'workday':  5,          // per workday → ×5
    'working':  5,          // alias for workday
    'holiday':  2,          // per holiday/weekend → ×2
    'weekend':  2,          // alias for holiday
    'week':     1,          // per week → ×1 (default)
    'month':    7 * 12 / 365, // per month → same as ActivityPeriods.MONTH
};

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
    // Guard: text must be a non-empty string
    if (typeof text !== 'string' || !text) return null;
    // Only match when the tag is on its own line to avoid false positives on
    // explanatory text that mentions the tag format (e.g. in the system prompt)
    const match = text.match(/^\s*\[SIMULATE:\s*([^\]]+)\]\s*$/im);
    if (!match) return null;

    const entries = match[1].split(',').map(s => s.trim()).filter(Boolean);
    if (entries.length === 0) return { error: 'No activities provided in SIMULATE tag', rawTag: match[0] };
    const activities = [];
    let parseError = null;

    for (const entry of entries) {
        // Match "Activity Name = Xh/week" or "Activity Name = Xh/day"
        // Use strict numeric pattern (\d+(?:\.\d+)?) to reject malformed values like 1..5 or 1.2.3
        const m = entry.match(/^(.+?)\s*=\s*(\d+(?:\.\d+)?)\s*h\s*(?:\/\s*(workday|working\s*day|weekend|holiday|day|week|month))?$/i);
        if (!m) { parseError = `Could not parse: "${entry}"`; break; }
        const name = m[1].trim();
        const hours = parseFloat(m[2]);
        const period = (m[3] || 'week').toLowerCase().replace(/\s+/g, '');
        const multiplier = SIMULATE_CADENCE_MULTIPLIERS[period] ?? 1;
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
        summary: `Simulation result: ${activities.map(a => `${a.name} (${a.hoursPerWeek}h/week)`).join(', ')} → ${freeHours}h/week free (${Math.round(10 * totalUsed) / 10}h/week used out of 168).`,
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