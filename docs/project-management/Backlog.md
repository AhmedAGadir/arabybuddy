# ArabyBuddy - Technical Debt

This document tracks technical debt, incomplete implementations, and code quality items that need attention.

---

## Table of Contents

- [Active Technical Debt](#active-technical-debt)
- [Priority Levels](#priority-levels)
- [Adding New Items](#adding-new-items)

---

## Active Technical Debt

Items that are stubbed, incomplete, or need improvement in the current codebase.

| Item | Current State | What's Needed | Priority |
|------|---------------|---------------|----------|
| Google OAuth Consent Screen Branding | Default Supabase branding (`<project-id>.supabase.co`) shown to users | Set up custom domain (e.g., `auth.arabybuddy.com`) and verify brand with Google to improve user trust and reduce phishing risk | Medium |
| Google OAuth Configuration Mismatch | Google OAuth settings (authorized redirect URIs, JavaScript origins) terms and conditions and privacy policy URLs don't match frontend configuration | Update Google Cloud Console OAuth settings to match production URLs when new website is deployed. Update privacy policy, ToS, and redirect URLs | High |

**References:** 
- [Supabase Google Auth - Consent Screen Branding](https://supabase.com/docs/guides/auth/social-login/auth-google?queryGroups=platform&platform=react-native&queryGroups=framework&framework=express#setup-consent-screen-branding)
- Google Cloud Console: OAuth 2.0 Client IDs must match production domains

---

## Priority Levels

- **High**: Blocks development or causes user-facing issues
- **Medium**: Improves reliability, maintainability, or developer experience
- **Low**: Nice to have, address when convenient

---

## Adding New Items

When adding technical debt:
1. Describe the current state clearly
2. Explain what's needed to resolve
3. Assign priority based on impact
4. Note any blockers or dependencies
5. Link to relevant code/files if applicable

