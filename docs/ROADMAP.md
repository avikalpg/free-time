# myfreetimeinaweek.in — Product Roadmap

> Strategy: ship in waves. Each wave is a complete, launchable product. Later waves add depth without breaking earlier ones.

---

## Current State (shipped)

- **Time calculator** — enter activities, see free hours remaining out of 168
- **AI Coach (BYOK)** — Gemini/Claude chat via byok-relay; users bring their own API key
- **Philosophy pages** — 5 long-form essays + index; supports AdSense approval
- **Schedule simulator tool** — AI coach can emit `[SIMULATE:]` tags to run hypothetical allocations mid-conversation

---

## Wave 1 — Launch-ready AI Coach (in progress)

_Goal: fix the core AI coaching experience so it's good enough to post on HN and Product Hunt._

| # | Feature | Status | PR |
|---|---------|--------|-----|
| 1.1 | Fix truncated Gemini responses (thinkingBudget + maxOutputTokens) | ✅ Ready | #42 |
| 1.2 | Animated typing indicator (bouncing dots during thinking) | ✅ Ready | #42 |
| 1.3 | Multi-message AI responses via `---` delimiter | ✅ Ready | #42 |
| 1.4 | Schedule simulator tool (SIMULATE tag → free hours calculation) | ✅ Ready | #43 |
| 1.5 | Show HN readiness for byok-relay (startup validation, rate limits, quickstart) | ✅ Merged | relay PR#1 |
| 1.6 | Goal decomposition tool (see below) | 🔲 Not started | — |

**Wave 1 launch targets:** HackerNews Show HN, Product Hunt

---

## Wave 2 — Goal Tracking & Structured Planning

_Goal: turn a one-off coaching session into a structured planning tool. Based on Avi's "Goal tracking" spreadsheet model._

### 2.1 Goal Tracking Data Model

Based on Avi's personal goal tracking spreadsheet, the hierarchy is:

```
Annual Goal
  └── Why achieve it (motivation)
  └── Quarterly Goals (Q1–Q4)
        └── Monthly Goals
              └── Weekly Goals
                    └── Daily Micro Goals
```

Each level tracks: % complete, friction encountered, rewards on completion, reflection notes.

**Daily Routine** is a separate axis:
- Each activity has: name, category (Health & Wellness / Work / Learning & Growth / Personal Care / Leisure / Commute / Distractions), priority (H/M/L), focus status (Most Focused / Focused / Not Focused), and hours per day-of-week
- Dashboard summarises: time by category, focus hours (most focused / focused / not focused), reading speed, screen time

This is the data model the AI coach should eventually understand and query.

### 2.2 Goal Decomposition Tool

The AI coach breaks a high-level goal into estimated weekly time commitments and checks feasibility against the user's schedule.

**AI tool convention (same pattern as SIMULATE):**
```
[GOAL_DECOMPOSE: goal="Launch a funded startup", target="12 months", hours_available=38]
```
Returns: estimated hours/week needed (from benchmarks or model reasoning), suggested habit categories and hours, feasibility assessment.

**New UI component:** `GoalCard` — shows goal, target date, required hours, habits list, progress %. Stored in localStorage initially.

### 2.3 Weekly Plan View

After the AI coach has enough context, it helps the user build a structured weekly plan — activities with category, hours, and focus level. Matches the Daily Routine structure in Avi's spreadsheet. Stored locally, reviewable at any time.

---

## Wave 3 — Auth + Session Persistence

_Goal: make the coach remember users across sessions. Unlock check-ins and accountability._

### 3.1 Authentication

- Email/Google OAuth sign-in (no passwords)
- Session token stored in byok-relay DB (already has user table)
- Conversation history persisted server-side (encrypted, per-user)

**Why this unlocks everything downstream:** without identity, there's no continuity, no check-ins, no habit tracking.

### 3.2 Session Memory

- Coach loads last N conversation turns on every new session
- Opening message becomes: "Welcome back. Last time we talked about [X]. How has that been going?"
- Returning user flow vs new user flow diverge at this point

### 3.3 Weekly Check-in (Scheduled)

- User opts into a weekly check-in (email or WhatsApp)
- At check-in time: AI reviews last week's plan, asks "did you hit your hours for startup work?"
- Adjusts the plan based on responses
- Can be triggered by a cron job that sends a magic link to the user

---

## Wave 4 — Calendar Mode (Ideal Week View)

_Goal: help users understand time fragmentation, not just total free hours._

### 4.1 Ideal Week Calendar

A **visual weekly calendar** (7 days × 24 hours grid) where users lay out their activities time-block style. Key insight: **4 free hours spread across 8 × 30-min slots ≠ 4 usable hours**. The calendar makes fragmentation visible.

- No integration required — user sets their ideal template ("I work 9-6, gym 7-8am, commute 8-9am...")
- Free blocks highlighted; contiguous free blocks shown prominently ("You have one 3h free block on Wednesday afternoon")
- AI coach gets access to this structure, not just totals

### 4.2 Reality Overlay (External Integrations)

Overlay actual vs ideal using data from:

| Source | What it provides | Priority |
|--------|-----------------|----------|
| Google Calendar | Meeting/event data | High |
| RescueTime | App usage time tracking | Medium |
| Rise.io | Sleep + energy data | Medium |
| Google Maps Timeline | Actual commute/travel times | Low |
| Strava | Actual workout times | Low |

The overlay answers: "Your ideal week says 3h/day for deep work. Reality: 1.2h/day (meetings eat the rest)."

**Note on AI coach integration:** these tools become context the coach reads, not tools the coach calls. The coach sees `[Reality data: deep work planned=3h, actual=1.2h, delta=-1.8h]` injected into its context automatically.

---

## Wave 5 — Community & Benchmarking

_Goal: you're not alone in managing your time. Let aggregate data make the coaching smarter._

### 5.1 Anonymous Benchmarking

- Aggregate (anonymised) data: "people with your free hours who launched a startup spent ~15h/week on it on average"
- Research-backed estimates where real data doesn't exist yet
- Shown by the coach as calibration: "Your estimate of 5h/week for a startup is probably too low"

### 5.2 Accountability Pairs (Optional)

- Two users can opt-in to be accountability partners
- Weekly: "Your partner hit 12/15 startup hours this week. How about you?"

---

## Technical Debt / Infrastructure (anytime)

- [ ] Replace `localStorage` relay client with `AsyncStorage` abstraction for future native app
- [ ] Add unit tests for `utils.js` (especially `runScheduleSimulation`, `calculateRemainingTime`)
- [ ] byok-relay: token expiry + rotation
- [ ] byok-relay: swap SQLite for Postgres when scale demands it
- [ ] AdSense: add `<ins>` ad unit tags or enable Auto Ads post-approval
- [ ] NavigationContainer deep-link config (needs Expo SDK ≥ 49 upgrade first)

---

## Open Questions

1. **Goal tracking data model** — need to review Avi's spreadsheet in full to finalise the schema before building Wave 2. See: [Goal tracking sheet](https://docs.google.com/spreadsheets/d/1Y-ZMM43tsIeA-I5cBum8W52KnM30CX45kMIzlYatwpk/edit)
2. **Auth provider** — email magic link vs Google OAuth? Google OAuth is faster to ship but ties us to Google.
3. **Pricing for BYOK** — as auth is added, do we offer a hosted tier (we pay for the API, user doesn't need a key)? Relevant for lower-friction onboarding.
4. **Mobile app** — React Native codebase is already mobile-ready. When does a native app make sense vs PWA?

---

_Last updated: 2026-04-15 by Alokit_
_Each wave is designed to stand alone as a launchable product update._
