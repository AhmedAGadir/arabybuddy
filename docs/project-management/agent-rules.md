# ArabyBuddy - Coding Agent Rules

You are an expert React Native/Expo developer working on ArabyBuddy, a cross-platform language learning app that teaches Arabic dialects through fun and immersive activities.

---

## Table of Contents

- [Related Documents](#related-documents)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Workflow](#workflow)

---

## Related Documents

- `docs/Product.md` - App overview, features, branding
- `docs/MVP.md` - Detailed MVP implementation tracking
- `docs/PostMVP.md` - Post-MVP features and roadmap
- `docs/Backlog.md` - Technical debt tracking

---

## Tech Stack

### Core

- **Framework:** Expo React Native
- **Language:** TypeScript (strict mode)
- **Routing:** Expo Router (file-based)
- **Styling:** Tailwind CSS (NativeWind) + Gluestack UI *(not yet configured)*

### 3D & Animation

- **3D Rendering:** Three.js via react-three-fiber
- **State Machines:** XState for character animation states and lesson flow
- **UI Animation:** react-native-reanimated
- **Celebrations:** react-native-fiesta

### State & Data

- **Server State:** TanStack Query (React Query)
- **Animation State:** XState state machines
- **Validation:** Zod
- **Forms:** React Hook Form + Zod resolver

### Backend

- **Database:** Supabase Postgres
- **Auth:** Supabase Auth
- **Functions:** Supabase Edge Functions (Deno)
- **Storage:** Supabase Storage

### Monetization

- **Subscriptions:** RevenueCat

### MCP Servers

| Server | Purpose |
|--------|---------|
| Supabase MCP | Database operations, migrations, Edge Functions |
| Expo MCP | Build, preview, device testing |
| Gluestack MCP | Component documentation and usage |
| RevenueCat MCP | Subscription and purchase management |

---

## Project Structure (TODO: requires refinement)

```
├── app/                    # Expo Router pages
│   ├── (auth)/             # Auth-required routes
│   ├── (public)/           # Public routes
│   ├── _layout.tsx         # Root layout
│   └── index.tsx           # Entry point
├── src/
│   ├── components/         # Shared components
│   │   ├── ui/             # Base UI components
│   │   ├── lesson/         # Lesson-specific components
│   │   ├── games/          # Game components
│   │   └── ...
│   ├── features/           # Feature modules
│   │   ├── auth/
│   │   ├── lessons/
│   │   ├── games/
│   │   ├── account/
│   │   └── ...
│   ├── hooks/              # Custom hooks
│   │   └── queries/        # React Query hooks
│   ├── lib/                # Utilities, helpers
│   ├── machines/           # XState state machines
│   ├── services/           # API service layer
│   ├── types/              # TypeScript types
│   │   ├── index.ts        # Manual types
│   │   └── database.types.ts  # Generated from DB
│   ├── utils/              # Utility functions
│   └── validation/         # Zod schemas
├── assets/                 # Static assets
│   ├── fonts/
│   ├── images/
│   └── models/             # 3D character models
├── supabase/
│   ├── functions/          # Edge Functions
│   └── migrations/         # Database migrations
└── docs/
    └── app/                # App documentation
```

---

## Coding Standards

### TypeScript

- Strict mode enabled
- Explicit return types on exported functions
- Prefer `unknown` over `any`

### Styling

> **Note:** NativeWind/Tailwind and Gluestack UI are not yet configured. Currently using basic React Native StyleSheet.

- Once configured: Use Tailwind classes via `className` prop
- Extract repeated patterns to component variants
- Follow mobile-first responsive design
- Respect RTL layout for Arabic content

### Arabic Content

- Use Tajawal font family for Arabic body text
- Use DGBebo font family for Arabic heading text
- Ensure text direction is correct in mixed content

### State Management

- Server state: TanStack Query
- Animation/Lesson flow state: XState state machines
- Form state: React Hook Form
- User preferences: Stored in database (user_profiles table)
- Never duplicate server state in client stores

### Error Handling

- Use error boundaries for component trees
- Handle API errors in service layer
- Display user-friendly error messages
- Log errors to Sentry in production

### Performance

- Lazy load screens with `React.lazy`
- Memoize expensive computations
- Monitor bundle size

### Security

**API Keys & Secrets:**
- Never expose API keys client-side - all sensitive keys must be in Edge Functions
- Store secrets in environment variables, never in code
- Use different keys for dev/staging/prod

**Input Validation:**
- Validate all user input with Zod schemas
- Sanitize data before display (prevent XSS)
- Validate on both client and server (Edge Functions)

**Authentication:**
- Use Supabase Auth for all auth flows
- Implement proper session management
- Handle token refresh correctly

**General:**
- Never log sensitive data (passwords, tokens, PII)
- Follow App Store security guidelines
- Implement rate limiting on sensitive endpoints

### Platform Support

- Code must work on iOS, Android, and Web

---

## Testing

We follow the testing pyramid:

### Unit Tests (Jest + React Native Testing Library)

- All utility functions
- Custom hooks
- Complex component logic
- Zod schemas

### Component Tests (RNTL)

- Component rendering
- User interactions
- State changes
- Accessibility

### E2E Tests (Maestro)

- Critical user flows
- Happy paths
- Key error paths
- Cross-platform (iOS + Android)

### Visual Regression

- Expo MCP snapshots for UI changes
- Review before merging

### Commands

```bash
npm run test          # Unit + component tests
npm run test:e2e      # Maestro E2E tests
npm run test:coverage # Coverage report
```

### Coverage Targets

| Type | Target | Focus Areas |
|------|--------|-------------|
| **Unit Tests** | 80%+ | Utilities, hooks, business logic |
| **Component Tests** | Critical UI | Forms, interactive components |
| **E2E Tests** | Critical paths | Auth, lessons, purchases |

---

## Workflow

### Before Starting

1. Read `Product.md` for product context
2. Check `MVP.md` for current status
3. Understand related features and dependencies
4. If suitable, write tests ahead of code.

### During Development

1. Follow established patterns in codebase
2. Write tests alongside code
3. Keep components small and focused
4. Use UI components from Gluestack (once configured)
5. Validate all inputs with Zod schemas

### After Completing

1. Run linting: `npm run lint`
2. Run type check: `npm run typecheck`
3. Run tests: `npm run test`
4. Update `MVP.md` if completing a tracked item
5. If database schema changed, regenerate types: `npm run database:types`

### Updating Documentation

- When updating docs, **update the Table of Contents** if present
- Cross-reference related documents when adding new features
