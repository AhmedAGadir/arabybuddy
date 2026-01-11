# ArabyBuddy - Product

Language learning app that teaches Arabic dialects through fun and immersive activities.

Supported dialects: **Modern Standard Arabic**, **Levantine**, **Egyptian**, **Gulf**, **Sudanese**, **Darija**, and **Iraqi**.

---

## Table of Contents

- [Related Documents](#related-documents)
- [Platforms](#platforms)
- [User Journey](#user-journey)
- [Features](#features)
  - [Activities](#activities)
  - [Credits System](#credits-system)
  - [Account Page](#account-page)
- [Branding](#branding)
- [Technical Foundation](#technical-foundation)
- [External Systems](#external-systems)

---

## Related Documents

- `MVP.md` - Detailed MVP implementation tracking
- `PostMVP.md` - Post-MVP features and roadmap
- `Backlog.md` - Technical debt tracking
- `agent-rules.md` - Technical implementation details

---

## Platforms

- Apple App Store (iOS)
- Google Play Store (Android)
- Web (Progressive Web App)

---

## User Journey

```
┌─────────────┐     ┌─────────────┐     ┌─────────────────────────────────────┐
│   Splash    │────▶│  Onboarding │────▶│              Home                   │
└─────────────┘     └─────────────┘     │  ┌─────────────┬─────────────┐      │
                          │             │  │   Learn     │   Account   │ tabs │
                          ▼             │  └─────────────┴─────────────┘      │
                   ┌─────────────┐      └─────────────────────────────────────┘
                   │  Sign In/Up │                    │
                   └─────────────┘         ┌──────────┴──────────┐
                                           ▼                     ▼
                                    ┌─────────────┐       ┌─────────────┐
                                    │  Learn Tab  │       │ Account Tab │
                                    └─────────────┘       └─────────────┘    
                                           │              
                                    ┌──────┴──────┐       
                                    ▼             ▼
                             ┌─────────────┐ ┌─────────────┐
                             │   Lesson    │ │    Game     │
                             └─────────────┘ └─────────────┘
                                    │              │
                                    ▼              ▼
                             ┌─────────────┐ ┌─────────────┐
                             │  Feedback   │ │   Results   │
                             └─────────────┘ └─────────────┘
```

---

## Features

### Activities

The core of the app. Activities align with CEFR levels ensuring clear progression:

| Level | Name |
|-------|------|
| A1 | Beginner |
| A2 | Elementary |
| B1 | Intermediate |
| B2 | Upper Intermediate |
| C1 | Advanced |
| C2 | Mastery |

Activities are organized into **Modules** → **Lessons/Games**

#### Lesson Activities

Users participate in character-driven, roleplay-like conversations based on real-life scenarios.

**Experience Flow:**
1. User selects and purchases a lesson
2. 3D character is rendered with intro animation
3. Character speaks their part (audio + synced word highlighting)
4. User is shown an **objective** (English prompt describing what to say)
5. User responds via speech or text input in Arabic
6. AI evaluates response across 5 categories
7. Character provides animated feedback based on score
8. User can retry up to 3 attempts before model answer is revealed
9. Repeat until lesson complete
10. Final score and rewards displayed

**User Turn Mechanics:**
- **Objective**: English instruction shown to guide what the user should express in Arabic
- **Input**: Users can either record or type their utterance
- **Hint**: User can request a hint at any time during their turn
- **Reveal Answer**: After viewing hint, user can reveal the model answer
- **Attempts**: Up to 3 tries before the correct answer is shown automatically
- **Interactive Words**: User can tap/click any Arabic word to see:
  - Word with vowel signs (harakat)
  - Transliteration (if enabled)
  - Translation

**Character Turn Mechanics:**
- **Message Display**: Character's Arabic text shown with interactive words
- **Audio Playback**: Auto-plays with synced word highlighting
- **Word Sync**: Each word highlights as it's spoken (timestamp-based)
- **Interactive Words**: Tap/click any word to see metadata (same as user turn)
- **Translation**: English translation shown below (if enabled in preferences)
- **Audio Controls**: Pause/Replay and Mute/Unmute buttons
- **Proceed**: User clicks "Next" to advance after audio completes

**AI Evaluation:**

| Category | Weight | Description |
|----------|--------|-------------|
| Task Fulfillment | 20% (Critical) | Does the response fully meet the prompt requirements? |
| Coherence and Cohesion | 20% (Critical) | Is the response logically structured and easy to follow? |
| Grammatical Accuracy and Complexity | 20% | How accurate and complex is the grammar used? |
| Lexical Resource and Precision | 20% | How precise and varied is the vocabulary? |
| Dialect Sensitivity | 20% | How well does the response match the specified dialect? |

*Scores: 0-5 per category. Total weighted score determines pass/fail:*
- **4.0 - 5.0** → Pass with positive reinforcement
- **3.1 - 4.0** → Pass with improvements noted
- **2.1 - 3.0** → Pass with recast correction
- **0.0 - 2.0** → Fail (retry with guidance)

*Note: Instant fail if Task Fulfillment or Coherence ≤ 2*

**AI Services (Current Demo):**

| Service | Provider | Model |
|---------|----------|-------|
| Speech-to-Text | OpenAI Whisper | `whisper-1` |
| Evaluation | OpenAI Chat | `gpt-4o` |

**Characters:**

| Character | Arabic | Personality | 
|-----------|--------|-------------|
| **Urayb** | أُرَيْب | Playful, magical, confidence-building |
| **Rawi** | راوي | Dramatic storyteller, literary | 

**Animation States:**

| State | Trigger |
|-------|---------|
| `intro` | Lesson start |
| `idle` | Default state |
| `idleLong` | Extended idle (random) |
| `idlePrompt` | Prompt user to engage |
| `speaking` | Character audio playing |
| `listening` | Voice recording active |
| `listeningText` | Text input focused |
| `thinking` | Processing/evaluating |
| `successWarm1/2` | Passed with good score |
| `successCelebratory` | Perfect score |
| `disappointmentMild` | Retry needed |
| `disappointmentSevere` | Multiple failures |
| `errorMinor` | Minor system error |
| `errorBroken` | Major system error |
| `completion` | Lesson finished |
| `outro` | Exiting lesson |

#### Game Activities

Four game types for vocabulary and grammar practice:

| Game | Purpose | Mechanics |
|------|---------|-----------|
| **Crossword** | Vocabulary building | Fill Arabic words from clues |
| **Matching Pairs** | Word-meaning connections | Match Arabic to English/images |
| **Sentence Reordering** | Grammar and syntax | Drag words to form sentences |
| **Multiple Choice Quiz** | Comprehension and recall | Select correct answers |

---

### Credits System

Users spend credits to unlock activities. Once purchased, activities can be replayed for free.

**Activity Costs by CEFR Level:**

| Level | Cost |
|-------|------|
| A1/A2 (Beginner) | 50 credits |
| B1/B2 (Intermediate) | 100 credits |
| C1/C2 (Advanced) | 150 credits |

**Subscription Plans:**

| Plan | Credits/Month | Price |
|------|---------------|-------|
| Free | 500 | $0 |
| Pro | 5,000 | $9.99/month |
| Premium | 20,000 | $29.99/month |

---

### Account Page

Central hub for user profile, settings, and subscription management.

| Section | Features |
|---------|----------|
| **Profile** | Username (auto-generated, editable), avatar |
| **Account** | Timezone selection |
| **Learning Preferences** | Dialect selection, pronoun selection |
| **Alphabet Reference** | Arabic letters with audio, vowel signs, pronunciation tips |
| **Settings** | Theme (light/dark/system) |
| **Subscription** | Current plan, credits balance, upgrade/manage |
| **Support** | Contact Support, Rate the App, Help & FAQ |
| **Legal** | Terms of Service, Privacy Policy |
| **About** | App version, build info |
| **Account Actions** | Sign out, delete account |

**Auto Username Generation:**

New users are automatically assigned a username on signup: `adjective-noun-xxxxx`

Examples: `curious-scholar-x7k2m`, `desert-falcon-9ab3f`, `wise-poet-m3k8n`

Generated via Postgres trigger using curated Arabic-themed word lists. Users can edit their username from the Account page (rate limited to once per 30 days).

---

## Branding

### Typography

| Usage | Font | Language |
|-------|------|----------|
| Title | Luckiest Guy | English |
| Title | DG Bebo | Arabic |
| Body | Poppins | English |
| Body | Tajawal | Arabic |

### Colors

**Primary:**

| Name | Hex | Usage |
|------|-----|-------|
| Purple | `#5e17eb` | Primary brand |
| Pink | `#ff00ff` | Accent |
| Cyan | `#03ffff` | Accent |
| Sky Blue | `#39b7ff` | Secondary |

**Semantic:**

| Name | Hex | Usage |
|------|-----|-------|
| Yellow | `#ffde59` | Warning, highlights |
| Green | `#00bf63` | Success |
| Red | `#ff3131` | Error |
| Light Grey | `#f1f5f9` | Backgrounds |
| Darker Grey | `#cad5e2` | Borders, disabled |

### Icons

- **Lucide Icons** - Primary icon library

### Animations

- **react-native-fiesta** - Celebration animations for milestones/achievements
- **Three.js** - Character animations
- **Reanimated** - UI micro-interactions

---

## Technical Foundation

See `agent-rules.md for full technical details.

### Infrastructure

| Category | Service | Purpose |
|----------|---------|---------|
| **Error Tracking** | Sentry | Crash reporting, error monitoring |
| **Analytics** | Mixpanel / PostHog | Key event tracking, conversion funnels |
| **CI/CD** | EAS Build + GitHub Actions | Automated builds and deployments |
| **Backend** | Supabase | Database, Auth, Edge Functions |
| **Payments** | RevenueCat | Subscription management |
| **Secrets** | Edge Functions | API keys server-side only |

### Performance (MVP)

| Area | Optimization | Why It Matters |
|------|--------------|----------------|
| **3D Characters** | Lazy loading + GLB compression | Large models shouldn't block app startup |
| **Audio** | Prefetch next step audio | Seamless transitions between turns |
| **Images** | WebP format, proper sizing | Fast load times, reduced bandwidth |

---

## External Systems

### ArabyBuddy Classroom

A separate admin application for content management:

- Create and edit activities
- Organize activities into modules
- Manage character assets
- Preview lessons
- All data persisted to shared Supabase instance
