# ArabyBuddy - Monorepo Migration Plan

This document outlines the plan to migrate ArabyBuddy from a single Expo app to a monorepo architecture with workspaces for the mobile app, Node.js backend, and shared code.

---

## Table of Contents

- [Motivation](#motivation)
- [Benefits](#benefits)
- [Proposed Structure](#proposed-structure)
- [Key Configurations](#key-configurations)
- [Backend Options](#backend-options)
- [Migration Steps](#migration-steps)
- [Things to Watch Out For](#things-to-watch-out-for)

---

## Motivation

Our current architecture relies on Supabase Edge Functions for backend processing. Edge Functions have cold start latency that may be too slow for core lesson activities (speech evaluation, real-time feedback). A dedicated Node.js backend provides:

- **Lower latency** - No cold starts, persistent connections
- **More flexibility** - WebSockets, streaming responses, complex processing
- **Better debugging** - Full Node.js tooling and logging

---

## Benefits

| Benefit | Description |
|---------|-------------|
| **Shared code** | Zod schemas, types, and business logic between app & API |
| **Better performance** | Dedicated Node.js server vs cold-start Edge Functions |
| **Type safety** | End-to-end TypeScript across mobile + backend |
| **Atomic changes** | Update API + app in single commit |
| **Single repo** | Easier to maintain, review, and deploy |

---

## Proposed Structure

```
arabybuddy/
├── apps/
│   ├── mobile/                 # Expo React Native app
│   │   ├── app/                # Expo Router routes
│   │   ├── features/           # Feature modules
│   │   ├── components/         # UI components
│   │   ├── shared/             # Mobile-specific shared code
│   │   ├── assets/
│   │   ├── app.json
│   │   ├── metro.config.js
│   │   ├── tailwind.config.js
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   └── api/                    # Node.js backend
│       ├── src/
│       │   ├── routes/         # API route handlers
│       │   ├── services/       # Business logic
│       │   ├── middleware/     # Auth, validation, etc.
│       │   └── index.ts        # Entry point
│       ├── tsconfig.json
│       └── package.json
│
├── packages/
│   └── common/                 # Shared across mobile + api
│       ├── src/
│       │   ├── schemas/        # Zod validation schemas
│       │   ├── types/          # TypeScript types
│       │   ├── constants/      # Shared constants
│       │   └── utils/          # Shared utilities
│       ├── tsconfig.json
│       └── package.json
│
├── supabase/                   # Database migrations (stays at root)
│   └── migrations/
│
├── docs/                       # Documentation (stays at root)
│
├── package.json                # Root workspace config
├── turbo.json                  # Build orchestration
├── tsconfig.base.json          # Shared TS config
└── README.md
```

---

## Key Configurations

### Root `package.json` with Workspaces

```json
{
  "name": "arabybuddy-monorepo",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "scripts": {
    "dev:mobile": "npm run dev -w @arabybuddy/mobile",
    "dev:api": "npm run dev -w @arabybuddy/api",
    "build": "turbo run build",
    "typecheck": "turbo run typecheck",
    "test": "turbo run test",
    "lint": "turbo run lint"
  },
  "devDependencies": {
    "turbo": "^2.0.0"
  }
}
```

### Metro Config for Monorepo (`apps/mobile/metro.config.js`)

```javascript
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

// Find the project root (monorepo root)
const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// Watch all files in the monorepo
config.watchFolders = [monorepoRoot];

// Let Metro know where to resolve packages
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];

module.exports = config;
```

### Common Package (`packages/common/package.json`)

```json
{
  "name": "@arabybuddy/common",
  "version": "1.0.0",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts",
    "./schemas": "./src/schemas/index.ts",
    "./types": "./src/types/index.ts",
    "./constants": "./src/constants/index.ts"
  },
  "dependencies": {
    "zod": "^4.3.5"
  }
}
```

### Mobile Package (`apps/mobile/package.json`)

```json
{
  "name": "@arabybuddy/mobile",
  "version": "1.0.0",
  "main": "expo-router/entry",
  "dependencies": {
    "@arabybuddy/common": "*",
    // ... existing dependencies
  }
}
```

### Shared TypeScript Config (`tsconfig.base.json`)

```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "declaration": true,
    "declarationMap": true
  }
}
```

### Turbo Config (`turbo.json`)

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "typecheck": {
      "dependsOn": ["^build"]
    },
    "test": {
      "dependsOn": ["^build"]
    },
    "lint": {},
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

---

## Backend Options

For lesson activities that need low latency, consider these options:

| Option | Pros | Cons | Recommendation |
|--------|------|------|----------------|
| **Hono on Cloudflare Workers** | Fast cold starts (~0ms), edge deployment, great DX, built-in Zod validation | Stateless, no WebSocket persistence, 30s execution limit | ✅ Good for stateless APIs |
| **Fastify on Fly.io** | Full Node.js, keeps machines warm, WebSockets, low latency | More infra to manage, need to configure scaling | ✅ Best for real-time features |
| **Express on Railway/Render** | Simple deployment, familiar, good for MVPs | Fewer edge locations, may have cold starts | OK for starting out |
| **Keep Supabase Edge Functions** | Already integrated, no new infra | Cold starts, limited runtime, Deno not Node | Current state |

### Recommended Approach

**Start with Hono on Cloudflare Workers** for:
- Lesson evaluation endpoints
- Speech processing proxies
- Any API that needs low latency

**Consider Fly.io later** if you need:
- WebSocket connections for real-time features
- Long-running processes
- Stateful connections

---

## Migration Steps

### Phase 1: Restructure Files

1. Create root `package.json` with workspaces config
2. Create `apps/` and `packages/` directories
3. Move all current code to `apps/mobile/`
4. Update paths in:
   - `tsconfig.json` (path aliases)
   - `metro.config.js` (workspace resolution)
   - `babel.config.js` (module resolution)
   - `tailwind.config.js` (content paths)
5. Update `app.json` if needed

### Phase 2: Create Common Package

1. Create `packages/common/` structure
2. Move shared code from `apps/mobile/shared/`:
   - Zod schemas → `packages/common/src/schemas/`
   - Types → `packages/common/src/types/`
   - Constants → `packages/common/src/constants/`
3. Update imports in mobile app to use `@arabybuddy/common`
4. Keep mobile-specific shared code in `apps/mobile/shared/`

### Phase 3: Create API Package

1. Create `apps/api/` structure
2. Set up Hono or Fastify
3. Import schemas from `@arabybuddy/common`
4. Implement lesson activity endpoints
5. Configure deployment (Cloudflare/Fly.io/etc.)

### Phase 4: Update Build & Deploy

1. Update `eas.json` to point to `apps/mobile`
2. Update CI/CD workflows for monorepo
3. Add API deployment pipeline
4. Test builds on all platforms

---

## Things to Watch Out For

### EAS Build Configuration

Update `eas.json` to specify the correct paths:

```json
{
  "cli": {
    "appVersionSource": "remote"
  },
  "build": {
    "base": {
      "node": "20.x"
    },
    "development": {
      "extends": "base",
      "developmentClient": true,
      "distribution": "internal"
    }
  }
}
```

And update `app.json` or use EAS environment variables to handle the new paths.

### NativeWind/Tailwind

Update `tailwind.config.js` content paths:

```javascript
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './features/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './shared/**/*.{js,jsx,ts,tsx}',
    // Don't include packages/common - it shouldn't have UI code
  ],
  // ...
};
```

### Path Aliases

Update `tsconfig.json` in `apps/mobile/`:

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"],
      "@arabybuddy/common": ["../../packages/common/src"],
      "@arabybuddy/common/*": ["../../packages/common/src/*"]
    }
  }
}
```

### What Stays at Root

- `supabase/` - Database migrations
- `docs/` - Documentation
- `.github/` - CI/CD workflows
- Root configs (`turbo.json`, `tsconfig.base.json`)

### What Moves to `apps/mobile/`

- `app/` - Expo Router routes
- `features/` - Feature modules
- `components/` - UI components
- `shared/` - Mobile-specific shared code
- `assets/` - Images, fonts
- All Expo/RN config files

---

## Resources

- [Expo Monorepos Documentation](https://docs.expo.dev/guides/monorepos/)
- [Turborepo with Expo](https://turbo.build/repo/docs/guides/tools/expo)
- [Hono Documentation](https://hono.dev/)
- [Fly.io Node.js Guide](https://fly.io/docs/languages-and-frameworks/node/)

