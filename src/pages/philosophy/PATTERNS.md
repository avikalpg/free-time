# Philosophy Section — Patterns & Design Decisions

This document describes the architectural patterns and design decisions for the Philosophy essay section. Read this before adding, editing, or restructuring essays.

---

## Information Architecture

### What is a Philosophy essay?

Each essay is a self-contained, long-form piece (~800–1500 words) expressing a belief or perspective about time, attention, and intentional living. Essays are authored by Avikalp and reflect his personal experience and philosophy.

Essays are **not** how-to guides, product documentation, or marketing copy. They are editorial pieces written in first person where it fits, opinionated, and direct.

### The `eyebrow`

The **eyebrow** (sometimes called an "overline" or "kicker" in editorial design) is a short category label displayed above the article headline. It orients the reader to the essay's thematic cluster before they read the title.

Current eyebrow categories:
- `The Story Behind the Tool` — the origin/mission essay
- `Time & Productivity` — essays about focus, output, and scheduling
- `Time & Planning` — essays about structure, buffers, and calendars
- `Time & Wellbeing` — essays about rest, recovery, and sustainability
- `Time & Purpose` — essays about life direction and long-term goals

When adding a new essay, either reuse an existing eyebrow category or introduce a new `Time & <Theme>` pattern. Keep eyebrows short (2–4 words).

### The `summary`

The **summary** is a single sentence (max ~20 words) that appears on the Philosophy index page below the title. It should:
- Complete the promise made by the title
- Give the reader a reason to click
- Not repeat the title verbatim

---

## File Structure Pattern

Each essay lives in `src/pages/philosophy/` as its own `.js` file.

### Required exports from every essay file

```js
// 1. Named export: meta object — owned by the essay author
export const meta = {
    eyebrow: 'Time & Productivity',       // category label
    title: 'Your Essay Title Here',        // headline shown everywhere
    summary: 'One sentence that explains what the reader will get.', // index card text
};

// 2. Default export: the React component
export default function MyEssay() { ... }
```

The `meta` export is the **single source of truth** for all article metadata. Do not duplicate titles, eyebrows, or summaries anywhere else.

### Registering a new essay in `routes.js`

```js
import MyEssay, { meta as myEssayMeta } from './MyEssay';

// Add to PHILOSOPHY_ROUTES:
{
    name: 'PhilosophyMyEssay',       // unique screen name for React Navigation
    path: 'philosophy/my-essay',     // kebab-case URL path (for future linking config)
    component: MyEssay,
    title: myEssayMeta.title,
    eyebrow: myEssayMeta.eyebrow,
    summary: myEssayMeta.summary,
},
```

`routes.js` is the **only** file that needs to change when adding an essay (besides the new essay file itself). No changes to `App.js` or `PhilosophyIndex.js` are needed.

---

## Component Structure Pattern

Each essay page follows this structure:

```js
export default function MyEssay() {
    const theme = useTheme();
    const styles = makeStyles(theme);

    return (
        <ScrollView contentContainerStyle={{ minHeight: '100%' }}>
            <View style={styles.container}>
                <Text style={styles.eyebrow}>{meta.eyebrow}</Text>
                <Text style={styles.title}>{meta.title}</Text>
                <Text style={styles.subtitle}>subtitle / pull quote</Text>

                {/* Body sections */}
                <Text style={styles.body}>Opening paragraph...</Text>
                <Text style={styles.sectionHeader}>Section Title</Text>
                <Text style={styles.body}>...</Text>
            </View>
            <Footer />
            <StatusBar style="auto" />
        </ScrollView>
    );
}

// Styles defined as a function of theme — keeps dark mode support
const makeStyles = (theme) => StyleSheet.create({ ... });
```

### Style keys (use consistently across all essays)

| Key | Usage |
|---|---|
| `container` | Max-width wrapper, centered, horizontal padding |
| `eyebrow` | Small all-caps category label above title |
| `title` | Main headline (32px bold) |
| `subtitle` | Italic subheading / pull quote below title |
| `sectionHeader` | Section heading within the essay (20px bold) |
| `body` | Body paragraph (16px, line-height 28) |
| `listItem` | Indented list item (use instead of `<ul>/<li>`) |
| `bold` | Inline bold span |
| `italic` | Inline italic span |

---

## Navigation

Essays are navigable via:
1. The **Philosophy index page** (`/Philosophy` route) — linked from the footer on every page
2. Direct navigation from the footer "Philosophy" link

The Philosophy index derives its article list automatically from `PHILOSOPHY_ROUTES` (filtering out the index page itself by `eyebrow === null`). No manual list maintenance is needed.

---

## Future: URL Deep Linking

Every route entry has a `path` field (e.g. `philosophy/origin`) ready for use once the app is upgraded to Expo SDK 49+ / React Navigation 6.3+. At that point, a `linking` config can be added to `NavigationContainer` in `App.js` to enable stable crawlable URLs like `myfreetimeinaweek.in/philosophy/origin`.

See the TODO comment in `routes.js` for the exact config template.
