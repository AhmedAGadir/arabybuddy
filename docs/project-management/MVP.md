# ArabyBuddy - MVP

This document tracks MVP features in detail. Check items as they are completed.

For post-MVP features, see `PostMVP.md`. For technical debt, see `Backlog.md`.

---

## Table of Contents

- [Setup](#setup)
- [Authentication](#authentication)
- [Onboarding](#onboarding)
- [Navigation](#navigation)
- [Account](#account)
- [Activities](#activities)
  - [Lesson Engine](#lesson-engine)
  - [Game Engine](#game-engine)
- [Monetization](#monetization)
- [Legal & Compliance](#legal--compliance)
- [Legend](#legend)

---

## Setup

### Project Initialization
- [x] Initialize Expo project with TypeScript
- [x] Configure Expo Router
- [x] Set up project folder structure (feature-based)

### Styling
- [ ] Configure Tailwind CSS (NativeWind)
- [ ] Set up Gluestack UI Components
- [x] Import custom fonts (Luckiest Guy, DG Bebo, Poppins, Tajawal) - Documentation created
- [ ] Define color tokens/CSS variables for both light and dark themes
- [ ] RTL support configuration

### Backend Integration
- [x] Set up Supabase client
- [x] Configure Supabase Auth
- [ ] Set up Edge Functions structure
- [x] Configure Supabase Storage (character assets, audio files)
- [x] Database schema migrations - Schema exists and verified via MCP
- [x] Environment variables management (.env files)
- [ ] Enable connection pooling (Supavisor)

### Security
- [ ] Move API keys to Edge Functions
  - AC: No API keys in client-side code
  - AC: Separate keys for dev/staging/prod (TODO: look into what this means)
- [ ] Secure token storage
  - AC: Use expo-secure-store for sensitive data
  - AC: Never store tokens in AsyncStorage
- [ ] Input validation setup
  - AC: Zod schemas for all API inputs
  - AC: Sanitize user-generated content
- [ ] Rate limiting on AI endpoints
  - AC: Prevent abuse of expensive API calls
  - AC: Return appropriate error codes (429)

### Testing Infrastructure
- [ ] Jest configuration
- [ ] React Native Testing Library setup
- [ ] Maestro for E2E tests
- [ ] Test utilities and mocks
- [ ] CI integration for tests

### DevOps
- [ ] EAS Build configuration
  - AC: iOS and Android build profiles
  - AC: Development, preview, and production builds
- [ ] Environment management
  - AC: dev/staging/prod configurations
  - AC: Environment-specific API endpoints
- [ ] Error tracking (Sentry)
  - AC: Source maps uploaded for stack traces
  - AC: Release tracking enabled
  - AC: User context attached to errors
- [ ] Analytics setup (Mixpanel or PostHog)
  - AC: Key events defined and tracked
  - AC: User identification on auth
  - AC: Conversion funnels configured
- [ ] CI/CD pipeline (GitHub Actions)
  - AC: Lint + typecheck + test on PR
  - AC: Automated EAS builds on merge to main
  - AC: Preview builds for PRs (optional)

### MCP Servers
- [x] Supabase MCP - database operations
- [x] Expo MCP - build, preview, snapshots.
- [ ] Gluestack MCP - component documentation (pending Gluestack setup)
- [ ] RevenueCat MCP - subscription management

### State & Forms
- [x] Zustand store configuration
- [x] React Hook Form setup with Zod resolver

### Assets & Branding
- [ ] Lucide Icons integration
- [ ] react-native-fiesta for celebrations
- [ ] App icons (iOS + Android)
- [ ] Splash/Launch screen assets

---

## Authentication

### Email Authentication
- [ ] Sign up with email/password
  - AC: Validates email format
  - AC: Password strength requirements (8+ chars, mixed case, number)
  - AC: Sends verification email
- [ ] Sign in with email/password
  - AC: Error handling for invalid credentials
  - AC: Rate limiting (5 attempts per minute)
- [ ] Password reset flow
  - AC: Sends reset email
  - AC: Reset link expiration (1 hour)
- [ ] Email verification
  - AC: Resend verification option

### OAuth Providers
- [ ] Google Sign In
  - AC: Works on iOS
  - AC: Works on Android
  - AC: Works on Web
- [ ] Apple Sign In (required for App Store)
  - AC: Works on iOS
  - AC: Fallback for Android/Web

### Session Management
- [ ] Session persistence (secure storage)
- [ ] Token refresh
- [ ] Logout functionality

### Auth Guards
- [ ] Protected route wrapper
- [ ] Redirect to sign-in when unauthenticated
- [ ] Deep link handling with auth state

---

## Onboarding

### Flow
- [ ] Welcome screen
- [ ] Dialect selection
- [ ] Pronoun selection
- [ ] Level selection (or placement assessment)
- [ ] Goal setting (optional)
- [ ] Username (pre-filled with auto generated one - changeable later)

### Permissions
- [ ] Microphone permission request
  - AC: Explains why needed (speech input)
  - AC: Graceful fallback if denied
- [ ] Notification permission request (TODO: look into -> I dont think apple allow this - maybe better to ask after user starts/completes their first activity)
  - AC: Explains benefits (reminders, streaks)
  - AC: Can be skipped

### Account Creation
- [ ] Auth method selection
- [ ] Account creation
- [ ] Initial preferences save
- [ ] Auto-generate username (Postgres trigger) --> TOOD: do we create account on DB trigger for sign up right away and then show onboarding where they update things -> or do we create account after they finish onboarding. probably the former because if they dont complete onboarding then well lose them -> we should set defaults for onboarding stuff and then in onboarding they update it. verify if this is the right way to do things

---

## Navigation

### Splash Screen
- [ ] Splash screen with app branding
- [ ] Auto-navigation to appropriate screen (onboarding vs home)

### Tab Navigation (2 pages)
- [ ] Learn Page
- [ ] Account Page

### Learn Page

**Difficulty Tabs:**
- [ ] 3 tabs: Easy (A1-A2), Medium (B1-B2), Hard (C1-C2)
- [ ] Tab state persisted across sessions
- [ ] Each tab filters activities by CEFR level

**Activities Trail:**
- [ ] Vertical scrollable trail of activities (lessons + games)
- [ ] Curved path with footsteps connecting activities
- [ ] Circular thumbnails showing activity images
- [ ] Alternating positions (left, center, right pattern)
- [ ] Status indicators:
  - [ ] Completed checkmark badge
  - [ ] Locked overlay with lock icon (future gating)
- [ ] Clickable thumbnails open Activity Details Drawer

**Activity Details Drawer:**
- [ ] Activity image (large, rounded)
- [ ] Title
- [ ] Character name ("with Urayb")
- [ ] Description
- [ ] Info badges:
  - [ ] Difficulty level (color-coded)
  - [ ] Estimated duration
  - [ ] XP reward
  - [ ] Credit cost (if not purchased)
  - [ ] "Purchased" or "Completed" status
- [ ] Action button:
  - "Purchase & Start" (if not purchased)
  - "Start Lesson/Game" (if purchased)
  - "Restart" (if completed)
- [ ] Cancel button

**Purchase Flow:**
- [ ] Purchase modal with cost confirmation
- [ ] Shows current credits balance
- [ ] Confirm deducts credits and starts activity
- [ ] Error handling for insufficient credits

**Activity Screen Navigation:**
- [ ] Drawer closes → Activity screen opens
- [ ] Lesson → Lesson screen → Results screen
- [ ] Game → Game screen → Results screen

### Account Page

- [ ] Account → Learning Preferences
- [ ] Account → Alphabet Reference
- [ ] Account → Settings
- [ ] Account → Notifications
- [ ] Account → Theme
- [ ] Account → Manage Subscription
- [ ] Account → Legal pages (ToS, Privacy)

### General

- [ ] Deep linking support
- [ ] Back navigation handling

---

## Account

### Profile Card
- [ ] Avatar display with edit badge
- [ ] Username display
- [ ] Email display

### Username System
- [ ] Auto-generate username on signup
  - Format: `adjective-noun-xxxxx` (e.g., `curious-scholar-x7k2m`)
  - AC: Postgres function `generate_random_username` via trigger
  - AC: Arabic-themed word lists (adjectives + nouns)
- [ ] Edit username modal
  - AC: Rate limited to once per 30 days
  - AC: Validation (length, allowed characters)
  - AC: Uniqueness check

### Account Settings
- [ ] Timezone picker
  - AC: List of common timezones
  - AC: Auto-detect on first launch

### Learning Preferences
- [ ] Select target dialect
- [ ] Select pronouns (he/him, she/her)
- [ ] Set difficulty/CEFR level

### Alphabet Reference

Interactive Arabic alphabet guide accessible from Account page.

**Letter Display:**
- [ ] Grid/list of all 28 Arabic letters
- [ ] Each letter shows isolated form
- [ ] Tappable to open letter detail view

**Letter Detail View:**
- [ ] Letter in large display (isolated form)
- [ ] Letter forms: isolated, initial, medial, final
- [ ] Vowel signs (harakat) variations:
  - [ ] With Fatha (فَتْحة) - "a" sound
  - [ ] With Damma (ضَمَّة) - "u" sound  
  - [ ] With Kasra (كَسْرة) - "i" sound
  - [ ] With Sukun (سُكُون) - no vowel
  - [ ] With Shadda (شَدَّة) - doubled consonant
- [ ] Audio playback for each variation
  - AC: Clear, native pronunciation
  - AC: Tap to play, auto-stops previous
- [ ] Pronunciation tip text
  - AC: English approximation (e.g., "like 'th' in 'think'")
  - AC: Articulation guidance (tongue/mouth position)
- [ ] Transliteration

**Navigation:**
- [ ] "Alphabet" menu item in Account page
- [ ] Opens alphabet screen/modal
- [ ] Back navigation to Account

### Appearance
- [ ] Theme picker (light/dark/system)

### App Settings
- [ ] Sound effects toggle
- [ ] Haptic feedback toggle
- [ ] Auto-play audio toggle
- [ ] Data collection toggle

### Notifications
- [ ] Notification settings modal
- [ ] Push notifications toggle
- [ ] Daily practice reminder toggle

### Subscription
- [ ] View current plan
- [ ] View credits balance
- [ ] Next renewal date (if subscribed)
- [ ] Upgrade/downgrade flow

### Support
- [ ] Contact Support (opens email with pre-filled info)
- [ ] Rate the App
  - AC: Deep link to App Store / Play Store listing
  - AC: Platform detection (iOS vs Android)
- [ ] Help & FAQ (placeholder for MVP)

### Legal
- [ ] Terms of Service (opens browser)
- [ ] Privacy Policy (opens browser)

### About
- [ ] App version display
- [ ] Build number

### Danger Zone
- [ ] Delete account
  - AC: Email confirmation required
  - AC: Confirmation modal with warning
  - AC: Data deletion within 30 days
  - AC: RevenueCat subscription handling

### Footer
- [ ] Sign out button with confirmation dialog
- [ ] App version text

---

## Activities

### Performance (Activities)

Optimizations required for smooth activity experience:

- [ ] 3D character lazy loading
  - AC: Characters load async, don't block app startup
  - AC: Loading state shown while character loads
- [ ] GLB model compression
  - AC: Models optimized with Draco compression
  - AC: < 5MB per character model
- [ ] Audio prefetching
  - AC: Prefetch next step audio while current plays
  - AC: Cache audio in memory during lesson
- [ ] Image optimization
  - AC: WebP format for all images
  - AC: Proper sizing (1x, 2x, 3x)
  - AC: Lazy load off-screen images

### Lesson Engine

> ⚠️ **UNRESOLVED: Real-time Architecture Decision**
> 
> Will REST + Supabase Edge Functions provide acceptable latency for the speech → evaluation → feedback loop? Current target is < 3 seconds end-to-end.
> 
> **Options to evaluate:**
> - [ ] REST + Edge Functions (current approach) - simplest, but cold starts may cause delays
> - [ ] WebSockets - persistent connection, lower latency, more complex state management
> - [ ] Dedicated backend server - full control, but adds infrastructure
> - [ ] Realtime AI agents (e.g., OpenAI Realtime API) - streaming responses, voice-native
> - [ ] Hybrid approach - REST for non-critical, WebSockets for conversation flow
> 
> **Impact if change needed:** Significant architecture changes across client, backend, and deployment. Should be validated early with latency benchmarks.

#### 3D Character Rendering
- [ ] Three.js / react-three-fiber setup
- [ ] Load GLB/glTF character models
- [ ] Camera and lighting configuration
- [ ] Environment presets (light/dark themes)
- [ ] Mobile performance optimization
- [ ] Fallback for low-end devices (2D image)

#### Animation State Machine (XState)
- [ ] Define animation states
  - [ ] `intro` - lesson start entrance
  - [ ] `idle` - default breathing/blinking loop
  - [ ] `idleLong` - extended idle variation
  - [ ] `idlePrompt` - prompt user to engage
  - [ ] `speaking` - lip sync with audio
  - [ ] `listening` - voice recording active
  - [ ] `listeningText` - text input focused
  - [ ] `thinking` - processing/evaluating
  - [ ] `successWarm1` - mild positive feedback
  - [ ] `successWarm2` - warm positive feedback
  - [ ] `successCelebratory` - perfect score celebration
  - [ ] `disappointmentMild` - retry needed
  - [ ] `disappointmentSevere` - multiple failures
  - [ ] `errorMinor` - minor system error
  - [ ] `errorBroken` - major system error
  - [ ] `completion` - lesson finished
  - [ ] `outro` - exit animation
- [ ] State transitions with XState
- [ ] Animation blending between states
- [ ] Random idle variations after timeout

#### Character Turn
- [ ] Display Arabic message with interactive words
- [ ] Auto-play character audio on step load
- [ ] Word-level highlight sync with audio timestamps
- [ ] Translation display (toggleable via preferences)
- [ ] Audio controls
  - [ ] Pause/Resume button
  - [ ] Replay button
  - [ ] Mute/Unmute button
- [ ] "Next" button to advance after audio

#### User Turn
- [ ] Display objective (English instruction)
- [ ] Input methods
  - [ ] Speech recording with transcription
  - [ ] Text input with Arabic keyboard
- [ ] Hint system
  - [ ] "Need a hint?" button reveals hint text
  - [ ] "Show answer" button (after hint viewed)
- [ ] Attempt tracking (max 3 attempts)
  - AC: Model answer auto-revealed after 3rd failure
- [ ] Model answer display with audio playback

#### Interactive Arabic Text
- [ ] Tappable/clickable words
- [ ] Word popover on tap showing:
  - [ ] Word with vowel signs (harakat)
  - [ ] Transliteration (if enabled)
  - [ ] Translation
- [ ] Active word highlighting during audio playback

#### Speech Recording
- [ ] Microphone permission handling
- [ ] Audio recording with visual indicator
- [ ] Transcribed text populates input field
- [ ] Submit button to trigger evaluation

#### AI Integration

**Speech-to-Text:**
- [ ] Provider selection (Whisper API / Deepgram / AssemblyAI)
  - AC: Supports Arabic dialects + MSA
  - AC: < 2 second transcription time
- [ ] Audio format handling (WebM, MP3, WAV)
- [ ] Error handling for failed transcriptions
- [ ] Fallback for poor audio quality

**Evaluation Engine:**
- [ ] Provider selection (OpenAI / Claude / Custom)
- [ ] Supabase Edge Function implementation
- [ ] Structured JSON output with Zod validation
- [ ] Parse 5 evaluation categories (0-5 scale each):
  - [ ] Task Fulfillment (20%, Critical)
  - [ ] Coherence and Cohesion (20%, Critical)
  - [ ] Grammatical Accuracy and Complexity (20%)
  - [ ] Lexical Resource and Precision (20%)
  - [ ] Dialect Sensitivity (20%)
- [ ] Calculate weighted total score
- [ ] Pass/fail determination
  - AC: Instant fail if Task Fulfillment or Coherence ≤ 2
  - AC: < 3 second end-to-end response time
  - AC: Graceful degradation on failure

**Character Audio (TTS):**
- [ ] Provider selection (ElevenLabs / OpenAI TTS / Azure)
  - AC: Natural Arabic dialect voices
  - AC: Multiple character voices
- [ ] Audio file generation and caching
- [ ] Word-level timestamp generation for sync

#### Feedback UI
- [ ] Display evaluation result card
- [ ] Show character feedback message
- [ ] Visual pass/fail indication
- [ ] Retry button (if failed, attempts remaining)
- [ ] Continue button (if passed)
- [ ] Attempts remaining indicator

#### Lesson Flow
- [ ] Load lesson variation by dialect + pronouns
- [ ] Progress bar showing step completion
- [ ] Alternate between character and user turns
- [ ] Track step completion state
- [ ] Handle interruptions (app background/foreground)
- [ ] Lesson preferences toggle (transliteration, translation)

#### Lesson Results
- [ ] Display aggregated scores per category
- [ ] Calculate overall lesson score
- [ ] XP rewards with performance multiplier
- [ ] Celebration animation on completion
- [ ] "Back to Lessons" navigation

#### Score Persistence
- [ ] Save lesson completion to database
- [ ] Record scores per category
- [ ] Update user XP and rank

### Game Engine

#### Shared Game Infrastructure
- [ ] Game state management
- [ ] Timer component
- [ ] Score tracking
- [ ] Completion detection
- [ ] Results screen

#### Crossword
- [ ] Grid rendering
- [ ] Clue display (English ↔ Arabic)
- [ ] Input handling (Arabic keyboard)
- [ ] Validation
- [ ] Hint system

#### Matching Pairs
- [ ] Card grid layout
- [ ] Flip animation
- [ ] Match detection
- [ ] Score calculation
- [ ] Timer

#### Sentence Reordering
- [ ] Draggable word chips
- [ ] Drop zones
- [ ] Order validation
- [ ] RTL handling
- [ ] Hint/solution reveal

#### Multiple Choice Quiz
- [ ] Question display
- [ ] Answer options
- [ ] Selection feedback
- [ ] Score tracking
- [ ] Results summary

---

## Monetization

### RevenueCat Integration
- [ ] SDK setup (iOS, Android)
- [ ] Product configuration
- [ ] Entitlements setup
- [ ] Offering configuration

### Subscription Flow
- [ ] Display subscription options
- [ ] Purchase flow
- [ ] Restore purchases
- [ ] Receipt validation
- [ ] Webhook handling (server-side)

### Credits System
- [ ] Display credit balance
- [ ] Deduct credits on activity purchase
- [ ] Monthly credit refresh on renewal
- [ ] Low credits warning
- [ ] Upsell to Pro prompt

### Free Tier
- [ ] Define limitations (500 credits/month)
- [ ] Gate content appropriately
- [ ] Upgrade prompts at key moments

---

## Legal & Compliance

### Apple App Store
- [ ] Apple Sign In implementation
  - AC: Required if other OAuth providers are offered
- [ ] Privacy nutrition labels
  - AC: Accurate data collection disclosure
- [ ] App privacy policy
  - AC: Accessible from App Store listing
  - AC: Accessible within app
- [ ] IDFA disclosure
  - AC: App Tracking Transparency if using IDFA
- [ ] In-app purchase compliance
  - AC: Follow subscription guidelines
  - AC: Restore purchases functionality

### Google Play Store
- [ ] Data safety section
  - AC: Complete data collection questionnaire
- [ ] Privacy policy
  - AC: Link in store listing
  - AC: Link in app
- [ ] Target audience declaration
  - AC: Accurate age rating
- [ ] Permissions justification
  - AC: Microphone usage explained
  - AC: Only request necessary permissions

### Privacy Regulations
- [ ] GDPR compliance (EU users)
  - AC: Consent mechanism for data collection
  - AC: Right to access data
  - AC: Right to delete data
  - AC: Data processing disclosure
- [ ] CCPA compliance (California users)
  - AC: "Do Not Sell" option if applicable
  - AC: Privacy notice
- [ ] COPPA compliance
  - AC: Determine if targeting children under 13
  - AC: Parental consent if required

### Legal Documents
- [ ] Terms of Service
  - AC: Accessible during sign-up
  - AC: Accessible from account settings
- [ ] Privacy Policy
  - AC: Plain language explanation
  - AC: Updated for all data practices
- [ ] Account deletion capability
  - AC: Self-service deletion option
  - AC: Data deleted within 30 days
  - AC: Confirmation email sent

---

## Legend

- `[ ]` - Not started
- `[x]` - Completed
- `AC:` - Acceptance Criteria
