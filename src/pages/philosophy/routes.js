/**
 * Philosophy section route registry.
 *
 * HOW TO ADD A NEW ESSAY:
 *   1. Create the page component in this folder (e.g. MyTopic.js)
 *   2. Export a `meta` object from that file:
 *        export const meta = { eyebrow, title, summary };
 *   3. Add one entry to PHILOSOPHY_ROUTES below — import the component
 *      and its meta, supply a unique `name` and `path`.
 *   No other files need to change.
 *
 * See PATTERNS.md in this folder for full design documentation.
 */

import PhilosophyIndex from './PhilosophyIndex';
import OriginStory, { meta as originMeta } from './OriginStory';
import FocusTime, { meta as focusMeta } from './FocusTime';
import Buffers, { meta as buffersMeta } from './Buffers';
import Recovery, { meta as recoveryMeta } from './Recovery';
import LifeGoals, { meta as lifeGoalsMeta } from './LifeGoals';

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
        title: originMeta.title,
        eyebrow: originMeta.eyebrow,
        summary: originMeta.summary,
    },
    {
        name: 'PhilosophyFocus',
        path: 'philosophy/focus',
        component: FocusTime,
        title: focusMeta.title,
        eyebrow: focusMeta.eyebrow,
        summary: focusMeta.summary,
    },
    {
        name: 'PhilosophyBuffers',
        path: 'philosophy/buffers',
        component: Buffers,
        title: buffersMeta.title,
        eyebrow: buffersMeta.eyebrow,
        summary: buffersMeta.summary,
    },
    {
        name: 'PhilosophyRecovery',
        path: 'philosophy/recovery',
        component: Recovery,
        title: recoveryMeta.title,
        eyebrow: recoveryMeta.eyebrow,
        summary: recoveryMeta.summary,
    },
    {
        name: 'PhilosophyLifeGoals',
        path: 'philosophy/life-goals',
        component: LifeGoals,
        title: lifeGoalsMeta.title,
        eyebrow: lifeGoalsMeta.eyebrow,
        summary: lifeGoalsMeta.summary,
    },
];

/**
 * TODO: Add NavigationContainer linking config here once the app is upgraded
 * to Expo SDK 49+ / React Navigation 6.3+ where deep linking for web is
 * fully stable. Each route already has a `path` field ready to use.
 *
 * Example config:
 *   {
 *     prefixes: ['https://myfreetimeinaweek.in'],
 *     config: {
 *       screens: {
 *         Home: '', Help: 'help', PrivacyPolicy: 'privacy',
 *         ...Object.fromEntries(PHILOSOPHY_ROUTES.map(({name, path}) => [name, path]))
 *       }
 *     }
 *   }
 */
