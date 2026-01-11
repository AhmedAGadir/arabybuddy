# ArabyBuddy - Post-MVP Features

Features planned for after MVP launch, ordered by priority.

---

## Table of Contents

- [Feature Overview](#feature-overview)
- [Progress Tab](#progress-tab)
- [Performance Optimization](#performance-optimization)
- [Gamification System](#gamification-system)
- [Realtime Features](#realtime-features)
- [More Characters](#more-characters)
- [Localization](#localization)
- [Smart Notifications](#smart-notifications)
- [Saved Words](#saved-words)
- [Offline Mode](#offline-mode)
- [Community & Social](#community--social)
- [Accessibility](#accessibility)
- [Infrastructure (Enhanced)](#infrastructure-enhanced)
- [Account: Reset Progress](#account-reset-progress)
- [Onboarding: Character Introduction](#onboarding-character-introduction)
- [Lesson Engine: Evaluation Prompt Versioning](#lesson-engine-evaluation-prompt-versioning)
- [Friends & Shared Streaks](#friends--shared-streaks)
- [Avatar Shop](#avatar-shop)
- [Teams & Organizations (B2B)](#teams--organizations-b2b)
- [Maybes](#maybes)
- [Rejected](#rejected)
- [Notes](#notes)

---

## Feature Overview

| Feature | Tag | Priority | Effort | Dependencies |
|---------|-----|----------|--------|--------------|
| Progress Tab | `Engagement` | High | Medium | Gamification |
| Performance Optimization | `Technical` | High | Medium | Profiling |
| Gamification System | `Engagement` | Medium | Medium | None |
| Realtime Features | `Core` | Medium | Large | Ink System |
| More Characters | `Content` | Medium | Large | 3D pipeline |
| Localization | `Technical` | Medium | Medium | i18n framework |
| Smart Notifications | `Engagement` | Medium | Small | Push infra |
| Saved Words | `Learning` | Low | Small | None |
| Offline Mode | `Technical` | Low | Large | Caching strategy |
| Community & Social | `Social` | Low | Medium | Leaderboard |
| Accessibility | `Technical` | Low | Medium | Audit |
| Infrastructure (Enhanced) | `Technical` | Low | Medium | MVP infra |
| Account: Reset Progress | `Enhancement` | Low | Small | Data model |
| Onboarding: Character Introduction | `Content` | Low | Small | Characters |
| Lesson Engine: Evaluation Prompt Versioning | `Technical` | Low | Small | Edge Functions |
| Friends & Shared Streaks | `Social` | Low | Medium | User base growth |
| Avatar Shop | `Monetization` | Low | Large | Characters, IAP |
| Teams & Organizations (B2B) | `Business` | Low | Large | B2B pivot decision |

**Tags:**
- `Core` - Essential functionality
- `Engagement` - User retention and motivation
- `Content` - Learning materials and characters
- `Learning` - Educational features
- `Social` - Community and competition
- `Technical` - Infrastructure and polish
- `Enhancement` - Small improvements
- `Monetization` - Revenue opportunities
- `Business` - B2B / enterprise features

---

## Progress Tab

**Tag:** `Engagement`

Users can track their learning journey and achievements.

**Features:**
- [ ] Learning streak tracker
- [ ] Time spent learning stats
- [ ] Rank progression visualization
- [ ] XP display
- [ ] Credits remaining display
- [ ] Ink count display (when Ink system exists)
- [ ] Conversation quality radar chart (average scores across 5 categories)
- [ ] Recent badges with requirements on hover

**Priority:** High  
**Effort:** Medium  
**Dependencies:** Gamification System

---

## Performance Optimization

**Tag:** `Technical`

Building on MVP performance foundations for scale and polish.

#### App Performance
- [ ] Screen lazy loading (React.lazy)
- [ ] Bundle size analysis and reduction
- [ ] Startup time optimization (< 3 seconds cold start)
- [ ] Memory management (prevent leaks)

#### Asset Optimization
- [ ] 3D LOD (Level of Detail) for different devices
- [ ] Audio streaming vs full download based on network
- [ ] Aggressive caching strategies

#### Profiling & Monitoring
- [ ] Performance profiling setup (React DevTools, Flipper)
- [ ] APM integration for production monitoring
- [ ] Performance budgets and CI checks

**Priority:** High  
**Effort:** Medium  
**Dependencies:** MVP performance in place, profiling tools

---

## Gamification System

**Tag:** `Engagement`

Rewards and progression to drive engagement.

#### Reward Triggers
- [ ] Activity completion rewards (XP, Ink, badges)
- [ ] Daily login bonus (XP, Ink)
- [ ] Streak milestone rewards
- [ ] First activity of the day bonus

#### XP & Ranks

| Rank | Arabic | XP Required | Unlocks |
|------|--------|-------------|---------|
| Kasra | كَسْرة | 0 | Starting rank |
| Damma | ضَمَّة | TBD | TBD |
| Fatha | فَتْحة | TBD | TBD |
| Poet | شاعر | TBD | All unlocked |

*XP requirements scale exponentially*

#### Badges & Achievements
- [ ] Milestone badges (first lesson, 10 lessons, etc.)
- [ ] Streak badges (7 days, 30 days, 100 days)
- [ ] Mastery badges (complete a module, perfect score)
- [ ] Badge display in profile

#### Profile Integration
- [ ] XP and rank badge in profile card
- [ ] Rank-up celebration triggers

**Priority:** Medium  
**Effort:** Medium  
**Dependencies:** None

---

## Realtime Features

**Tag:** `Core`

Realtime conversation experiences powered by streaming AI. These features share infrastructure and use the Ink currency system.

> **Note:** Realtime features use OpenAI's Realtime API with ephemeral tokens. This requires a backend server to generate tokens securely—a good reason to deploy a dedicated backend rather than relying solely on Edge Functions.

### Ink Currency

Secondary currency for managing realtime API costs.

**Purpose:**
- Rate limit expensive realtime API usage
- Prevent abuse of streaming features
- Additional monetization path

**Earning Ink:**
- [ ] Complete activities (bonus Ink)
- [ ] Daily login bonuses
- [ ] Achievement rewards
- [ ] Streak milestones

**Spending Ink:**
- [ ] End of Module Tests (fixed cost per attempt)
- [ ] Chat Playground (cost per minute)

**Purchasing Ink:**
- [ ] In-app purchase packs
- [ ] Subscription bonus Ink (Pro/Premium get monthly Ink)

**Concerns to Address:**
- Dual currency UX complexity
- Pricing strategy
- App Store compliance for virtual currencies

### Chat Playground

Freeform conversation practice with any character.

**Features:**
- [ ] Character selection
- [ ] Open-ended conversation (no objectives)
- [ ] Billed per minute using Ink
- [ ] No scoring or evaluation
- [ ] Transcript history
- [ ] Export conversation

### End of Module Tests

Assessed conversations at module completion.

> ⚠️ **Needs Further Scoping**

**Concept:**
- [ ] Freeform conversation with character
- [ ] Evaluated on comprehensive criteria
- [ ] Pass/fail with detailed feedback
- [ ] Costs Ink to attempt
- [ ] Required to "complete" a module

**Questions to Answer:**
- Assessment rubric and scoring criteria
- Duration limits
- Retry policy and costs
- How results affect progression
- Failure consequences

**Priority:** Medium  
**Effort:** Large  
**Dependencies:** RevenueCat, clear product requirements, realtime API

---

## More Characters

**Tag:** `Content`

Additional characters with unique personalities and teaching styles.

| Character | Arabic | Personality | Target Use Case |
|-----------|--------|-------------|-----------------|
| Tariq | طارق | Supportive, encouraging | Struggling learners |
| Leila | ليلى | Witty, dry humor | Young adults |
| Yara | يارا | Analytical, investigative | Technical learners |
| Samir | سمير | Optimistic, tech-focused | Professional contexts |
| Amira | أميرة | Bold, energetic | Active learners |
| Juha | جحا | Wise, uses riddles/proverbs | Cultural immersion |

**Priority:** Medium  
**Effort:** Large (3D models, animations, voice acting)  
**Dependencies:** Character pipeline from Classroom app

---

## Localization

**Tag:** `Technical`

Support for multiple UI languages.

- [ ] Arabic app interface
- [ ] Additional UI languages (French, Spanish, etc.)
- [ ] RTL layout switching
- [ ] Locale-aware date/time formatting
- [ ] i18n framework setup

**Priority:** Medium  
**Effort:** Medium  
**Dependencies:** i18n framework (react-i18next or similar)

---

## Smart Notifications

**Tag:** `Engagement`

Intelligent notification system for engagement and retention.

#### Notification Types
- [ ] Daily practice reminders
  - Customizable time
  - Smart timing based on user patterns
- [ ] Streak protection alerts
  - "You're about to lose your streak!"
  - Sent before midnight
- [ ] Achievement celebrations
  - Rank-ups, badges earned
- [ ] Weekly progress summary
  - XP earned, lessons completed, streak status
- [ ] New content announcements
  - New lessons, characters, features

#### Settings
- [ ] Per-notification-type toggles
- [ ] Quiet hours configuration
- [ ] Frequency controls (daily, weekly, never)

**Priority:** Medium  
**Effort:** Small  
**Dependencies:** Push notification infrastructure

---

## Saved Words

**Tag:** `Learning`

Personal vocabulary management and review.

**Features:**
- [ ] Save words from lessons (tap to save)
- [ ] Custom word lists
- [ ] Flashcard review mode
- [ ] Spaced repetition scheduling
- [ ] Export to CSV
- [ ] Export to Anki format

**Priority:** Low  
**Effort:** Small  
**Dependencies:** None

---

## Offline Mode

**Tag:** `Technical`

Enable limited app functionality without internet.

**Features:**
- [ ] Cache purchased lesson content for offline playback
- [ ] Queue settings changes to sync when online
- [ ] Show cached modules/lessons list
- [ ] Clear offline indicator when disconnected
- [ ] Automatic sync when connection restored

**Limitations (even with offline mode):**
- AI evaluation requires internet
- Speech-to-text requires internet
- Purchases require internet
- New content requires internet

**Use Cases:**
- Reviewing previously completed lessons
- Commuters with spotty connections
- Travelers without data

**Priority:** Low  
**Effort:** Large  
**Dependencies:** Caching strategy, sync queue implementation

---

## Community & Social

**Tag:** `Social`

Social and competitive features.

**Features:**
- [ ] Discord community link
- [ ] Monthly/seasonal challenges
- [ ] Global leaderboard
- [ ] Friend leaderboards
- [ ] Challenge sharing

**Settings Required:**
- Leaderboard visibility toggle (opt-in/opt-out)
- Username vs anonymous display

**Priority:** Low  
**Effort:** Medium  
**Dependencies:** User profile system, backend leaderboard

---

## Accessibility

**Tag:** `Technical`

Full accessibility compliance for inclusive user experience.

- [ ] Screen reader support (VoiceOver, TalkBack)
- [ ] RTL layout support (Arabic UI)
- [ ] Font scaling (respect system settings)
- [ ] Color contrast compliance (WCAG AA)
- [ ] Reduced motion support
- [ ] Focus management for keyboard/switch navigation
- [ ] Accessibility labels for all interactive elements

**Priority:** Low  
**Effort:** Medium  
**Dependencies:** Accessibility audit

---

## Infrastructure (Enhanced)

**Tag:** `Technical`

Building on MVP infrastructure for scale and reliability.

#### Monitoring & Observability
- [ ] APM (Application Performance Monitoring)
- [ ] Log aggregation (centralized logging)
- [ ] Uptime monitoring (external health checks)
- [ ] Alerting (Slack/PagerDuty integration)

#### Performance & Scale
- [ ] CDN for 3D assets and audio files
- [ ] Enhanced rate limiting
- [ ] Query performance optimization

#### Developer Experience
- [ ] Staging environment (full mirror of prod)
- [ ] Feature flags (gradual rollouts)
- [ ] Automated E2E tests in CI
- [ ] Preview deployments for PRs

**Priority:** Low  
**Effort:** Medium  
**Dependencies:** MVP infra in place, usage patterns

---

## Account: Reset Progress

**Tag:** `Enhancement`

Allow users to reset learning progress without deleting their account.

**Features:**
- [ ] Reset progress action in Danger Zone
- [ ] Confirmation modal with explicit warning
- [ ] Define reset scope
  - AC: Clears completions, XP, streaks (if applicable)
  - AC: Keeps account and preferences

**Priority:** Low  
**Effort:** Small  
**Dependencies:** Clear data model + backend support

---

## Onboarding: Character Introduction

**Tag:** `Content`

Introduce characters during onboarding to build emotional connection.

**Features:**
- [ ] Character intro screen (1–2 characters)
- [ ] Short personality blurbs + images/animations
- [ ] Skip option

**Priority:** Low  
**Effort:** Small  
**Dependencies:** Character assets

---

## Lesson Engine: Evaluation Prompt Versioning

**Tag:** `Technical`

Allow controlled iteration on evaluation prompts while keeping results comparable.

**Features:**
- [ ] Store prompt version identifier with evaluation result
- [ ] Ability to pin evaluation to a default version
- [ ] Migration plan for changing rubric weights/categories (if ever needed)

**Priority:** Low  
**Effort:** Small  
**Dependencies:** Edge Functions, evaluation storage schema

---

## Friends & Shared Streaks

**Tag:** `Social`

Add friends and maintain streaks together for social accountability.

**Features:**
- [ ] Friend requests (by username or link)
- [ ] Friends list view
- [ ] Shared streaks (both must practice to maintain)
- [ ] Friend activity feed (X completed a lesson)
- [ ] Streak leaderboard among friends

**Why Later:**
User base will be too small initially to benefit from social features. Requires critical mass to be valuable.

**Priority:** Low  
**Effort:** Medium  
**Dependencies:** User base growth, friend system infrastructure

---

## Avatar Shop

**Tag:** `Monetization`

Cosmetic purchases for character customization.

**Features:**
- [ ] Character skins (outfits, colors)
- [ ] Props and accessories
- [ ] Seasonal/limited edition items
- [ ] Gift items to friends
- [ ] Preview before purchase
- [ ] Owned items gallery

**Monetization:**
- In-app purchases (one-time)
- Premium subscription exclusive items
- Earned through achievements (free tier)

**Why Later:**
Requires established character system and user base. Cosmetics only valuable when users are invested in the experience.

**Priority:** Low  
**Effort:** Large  
**Dependencies:** More Characters, Friends system (for gifting), IAP infrastructure

---

## Teams & Organizations (B2B)

**Tag:** `Business`

Enterprise features for schools, companies, and language programs.

**Features:**
- [ ] Organization accounts
- [ ] Admin dashboard (manage learners)
- [ ] Bulk seat licensing
- [ ] Progress reporting for managers/teachers
- [ ] Custom content/modules
- [ ] SSO integration (SAML, OAuth)
- [ ] Usage analytics and exports

**Why Later:**
Early days—focus on B2C product-market fit first. B2B requires sales motion, support infrastructure, and compliance work.

**Priority:** Low  
**Effort:** Large  
**Dependencies:** B2B pivot decision, stable B2C product

---

## Maybes

Features we might implement depending on user feedback and resources.

| Feature | Description | Consideration |
|---------|-------------|---------------|
| | | |

---

## Rejected

Features we've considered and decided against.

| Feature | Description | Reason |
|---------|-------------|--------|
| Billing & Purchase History | In-app transaction history view | App Store / Play Store already provide this; adds complexity without user value |
| Session Management | View/revoke active sessions across devices | Low upside; most users on single device; medium effort for edge case |

---

## Notes

### Adding New Features

When adding to this document:
1. Clearly describe the feature
2. Assign a tag (Core, Engagement, Content, Learning, Social, Technical, Enhancement)
3. Set priority (High/Medium/Low)
4. Estimate effort (Small/Medium/Large)
5. List dependencies
6. Note any open questions

### Review Cadence

- Reprioritize based on user feedback post-launch
- Move to MVP.md when ready to implement
- Move completed items to changelog
