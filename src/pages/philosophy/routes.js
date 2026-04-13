/**
 * Philosophy section route registry — single source of truth.
 * To add a new essay:
 *   1. Create the page component in this folder
 *   2. Add an entry to PHILOSOPHY_ROUTES below (name, path, component, title, eyebrow, summary)
 * No changes to App.js are needed.
 */

import PhilosophyIndex from './PhilosophyIndex';
import OriginStory from './OriginStory';
import FocusTime from './FocusTime';
import Buffers from './Buffers';
import Recovery from './Recovery';
import LifeGoals from './LifeGoals';

export const PHILOSOPHY_ROUTES = [
    {
        name: 'Philosophy',
        path: 'philosophy',
        component: PhilosophyIndex,
        title: 'Philosophy of Free Time',
        eyebrow: null,
        summary: null,
    },
    {
        name: 'PhilosophyOrigin',
        path: 'philosophy/origin',
        component: OriginStory,
        title: 'You Have More Time Than You Think',
        eyebrow: 'The Story Behind the Tool',
        summary: 'Why this tool was built — the mindset of abundance, and how seeing the numbers changes everything.',
    },
    {
        name: 'PhilosophyFocus',
        path: 'philosophy/focus',
        component: FocusTime,
        title: "Free Hours Aren't Enough — You Need Free Blocks",
        eyebrow: 'Time & Productivity',
        summary: 'Why fragmented time is nearly worthless, and how protecting focus blocks changes what you can actually accomplish.',
    },
    {
        name: 'PhilosophyBuffers',
        path: 'philosophy/buffers',
        component: Buffers,
        title: 'Never Schedule to Zero',
        eyebrow: 'Time & Planning',
        summary: 'Why intentional slack in your schedule is one of the most productive things you can build into your week.',
    },
    {
        name: 'PhilosophyRecovery',
        path: 'philosophy/recovery',
        component: Recovery,
        title: 'Rest Is Not the Absence of Work',
        eyebrow: 'Time & Wellbeing',
        summary: 'Why recovery deserves a real place on your calendar — and how ignoring it costs you far more than it saves.',
    },
    {
        name: 'PhilosophyLifeGoals',
        path: 'philosophy/life-goals',
        component: LifeGoals,
        title: 'Busy Every Day, Going Nowhere',
        eyebrow: 'Time & Purpose',
        summary: 'Why optimising your days without asking where they lead is the most common form of productive procrastination.',
    },
];

/**
 * TODO: Add NavigationContainer linking config here once the app is upgraded
 * to Expo SDK 49+ / React Navigation 6.3+ where deep linking for web is
 * fully stable. Each route has a `path` field ready to use.
 *
 * Example:
 *   linking = {
 *     prefixes: ['https://myfreetimeinaweek.in'],
 *     config: {
 *       screens: {
 *         Home: '', Help: 'help', PrivacyPolicy: 'privacy',
 *         ...Object.fromEntries(PHILOSOPHY_ROUTES.map(({name, path}) => [name, path]))
 *       }
 *     }
 *   }
 */
