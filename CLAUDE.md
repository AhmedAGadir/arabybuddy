# ArabyBuddy - Coding Agent Rules

You are an expert React Native/Expo developer working on ArabyBuddy, a cross-platform language learning app that teaches Arabic dialects through fun and immersive activities.

---

## Table of Contents

- [Related Documents](#related-documents)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Feature-Based Architecture](#feature-based-architecture)
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
- **Styling:** Tailwind CSS (NativeWind) + Gluestack UI

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

## Project Structure

We use **feature-based architecture** with **thin routes**. Route files in `app/` are minimal re-exports; all business logic lives in `features/`.

```
arabybuddy/
│
├── app/                                    # EXPO ROUTER - Thin routes only
│   ├── _layout.tsx                         # Root layout (providers)
│   ├── login.tsx                           # → export { LoginScreen } from '@/features/auth'
│   ├── forgot-password.tsx                 # → export { ForgotPasswordScreen } from '@/features/auth'
│   ├── reset-password.tsx                  # → export { ResetPasswordScreen } from '@/features/auth'
│   ├── auth/
│   │   └── callback.tsx                    # OAuth callback handler
│   └── (tabs)/
│       ├── _layout.tsx                     # Tab navigator config
│       ├── index.tsx                       # → export { HomeScreen } from '@/features/lessons'
│       └── explore.tsx                     # → export { ExploreScreen } from '@/features/lessons'
│
├── features/                               # FEATURE MODULES - All business logic
│   ├── auth/
│   │   ├── components/                     # Auth-specific components
│   │   │   ├── AppleSignInButton/
│   │   │   ├── GoogleSignInButton/
│   │   │   └── SignOutButton.tsx
│   │   ├── screens/                        # Auth screen components
│   │   │   ├── LoginScreen.tsx
│   │   │   ├── ForgotPasswordScreen.tsx
│   │   │   └── ResetPasswordScreen.tsx
│   │   ├── hooks/
│   │   │   └── useAuthContext.tsx
│   │   ├── providers/
│   │   │   └── AuthProvider.tsx
│   │   ├── services/
│   │   │   └── authService.ts
│   │   ├── validation/
│   │   │   └── authSchemas.ts
│   │   └── index.ts                        # Public API barrel
│   │
│   ├── lessons/
│   │   ├── components/
│   │   ├── screens/
│   │   │   ├── HomeScreen.tsx
│   │   │   └── ExploreScreen.tsx
│   │   ├── hooks/
│   │   │   ├── useLesson.ts
│   │   │   └── useActivities.ts
│   │   ├── services/
│   │   │   ├── lessonsService.ts
│   │   │   └── activitiesService.ts
│   │   ├── machines/                       # XState lesson flow
│   │   └── index.ts
│   │
│   ├── account/
│   │   ├── hooks/
│   │   │   └── useUserProfile.ts
│   │   ├── validation/
│   │   │   └── profileSchemas.ts
│   │   └── index.ts
│   │
│   ├── games/
│   ├── onboarding/
│   └── subscriptions/
│
├── shared/                                 # SHARED - Cross-cutting concerns
│   ├── components/
│   │   ├── SplashScreenController.tsx
│   │   ├── HelloWave.tsx
│   │   └── ui/                             # Design system (Gluestack)
│   ├── hooks/
│   │   └── useColorScheme.ts
│   ├── lib/
│   │   ├── supabase.ts
│   │   ├── supabase.web.ts
│   │   ├── queryClient.ts
│   │   └── utils.ts
│   ├── services/
│   │   └── storageService.ts
│   ├── constants/
│   │   ├── dialects.ts
│   │   ├── cefrLevels.ts
│   │   └── ...
│   ├── types/
│   │   ├── index.ts
│   │   └── database.types.ts               # Generated from Supabase
│   ├── utils/
│   │   ├── cn.ts
│   │   ├── format.ts
│   │   └── storage.ts
│   └── testing/                            # Test infrastructure
│       ├── renderWithProviders.tsx
│       └── mocks/
│
├── components/                             # Legacy components (being migrated)
│   └── ui/
│       └── gluestack-ui-provider/
│
├── assets/
│   ├── fonts/
│   └── images/
│
├── supabase/
│   ├── config.toml
│   └── migrations/
│
├── .maestro/                               # E2E Tests (Maestro)
│   └── flows/
│
└── docs/
    └── project-management/
```

---

## Feature-Based Architecture

### Key Principles

1. **Thin Routes**: Route files in `app/` are one-line re-exports:
   ```typescript
   // app/login.tsx
   export { LoginScreen as default } from '@/features/auth';
   ```

2. **Feature Encapsulation**: Each feature exports a clean public API via `index.ts`:
   ```typescript
   // features/auth/index.ts
   export { LoginScreen } from './screens/LoginScreen';
   export { authService } from './services/authService';
   export { useAuthContext } from './hooks/useAuthContext';
   ```

3. **Colocated Tests**: Test files live next to source files:
   ```
   features/auth/services/
   ├── authService.ts
   └── authService.test.ts
   ```

4. **Shared Only When Cross-Cutting**: Only truly shared utilities go in `shared/`

### File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `LoginScreen.tsx` |
| Hooks | camelCase with `use` prefix | `useAuthContext.tsx` |
| Services | camelCase with `Service` suffix | `authService.ts` |
| Validation | camelCase with `Schemas` suffix | `authSchemas.ts` |
| Utils | camelCase | `format.ts` |
| Platform files | Keep suffix pattern | `Component.ios.tsx` |

### Import Aliases

```typescript
import { authService } from '@/features/auth';
import { supabase } from '@/shared/lib/supabase';
import { cn } from '@/shared/utils';
```

---

## Coding Standards

### TypeScript

- Strict mode enabled
- Explicit return types on exported functions
- Prefer `unknown` over `any`

### Styling

- Use Tailwind classes via `className` prop (NativeWind)
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

We follow the testing pyramid with **colocated tests**:

### Unit Tests (Jest + React Native Testing Library)

- All utility functions
- Custom hooks
- Complex component logic
- Zod schemas

Tests live next to source files:
```
features/auth/services/
├── authService.ts
└── authService.test.ts
```

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

E2E tests organized by feature:
```
.maestro/flows/
├── auth/
│   ├── signIn.yaml
│   └── signUp.yaml
└── lessons/
    └── completeLessonFlow.yaml
```

### Test Utilities

Import from shared testing module:
```typescript
import { render, screen, createMockUser } from '@/shared/testing';
```

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

1. Follow feature-based architecture patterns
2. Write tests alongside code (colocated)
3. Keep components small and focused
4. Use UI components from Gluestack
5. Validate all inputs with Zod schemas
6. Export only necessary items from feature's `index.ts`

### After Completing

1. Run linting: `npm run lint`
2. Run type check: `npm run typecheck`
3. Run tests: `npm run test`
4. Update `MVP.md` if completing a tracked item
5. If database schema changed, regenerate types: `npm run database:types`

### Updating Documentation

- When updating docs, **update the Table of Contents** if present
- Cross-reference related documents when adding new features
- THIS FILE MUST BE KEPT IN SYNC WITH .cursorrules