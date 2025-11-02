<!-- OAUTH SIGN IN WITH APPLE -->

If you're using the OAuth flow (web, Flutter web, Kotlin non-iOS platforms), Apple requires you to generate a new secret key every 6 months using the signing key (.p8 file). This is a critical maintenance task that will cause authentication failures if missed.

THERES A FORM IN THIS LINK - THE ACCOUNT ID, SERVICE ID AND KEY ID ARE ALL IN .ENV:
- APPLE_DEVELOPER_ACCOUNT_ID
- APPLE_SERVICE_ID
- APPLE_SIGN_IN_KEY_ID

https://supabase.com/docs/guides/auth/social-login/auth-apple?queryGroups=framework&framework=nextjs&queryGroups=platform&platform=react-nativew