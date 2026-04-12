/**
 * Philosophy section route registry.
 * To add a new essay:
 *   1. Create the page component in this folder
 *   2. Add an entry to PHILOSOPHY_ROUTES below
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
        component: PhilosophyIndex,
        title: 'Philosophy of Free Time',
    },
    {
        name: 'PhilosophyOrigin',
        component: OriginStory,
        title: "You Have More Time Than You Think",
    },
    {
        name: 'PhilosophyFocus',
        component: FocusTime,
        title: "Free Hours Aren't Enough — You Need Free Blocks",
    },
    {
        name: 'PhilosophyBuffers',
        component: Buffers,
        title: 'Never Schedule to Zero',
    },
    {
        name: 'PhilosophyRecovery',
        component: Recovery,
        title: 'Rest Is Not the Absence of Work',
    },
    {
        name: 'PhilosophyLifeGoals',
        component: LifeGoals,
        title: 'Busy Every Day, Going Nowhere',
    },
];
