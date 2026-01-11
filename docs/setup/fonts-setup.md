# Font Setup Guide

## Required Fonts

ArabyBuddy uses custom fonts for branding and Arabic text:

1. **Luckiest Guy** - Display font for playful English headings
2. **DG Bebo** - Arabic display font for Arabic headings
3. **Poppins** - Sans-serif font for English body text
4. **Tajawal** - Sans-serif font for Arabic body text

## Installation Steps

### 1. Download Fonts

- **Luckiest Guy**: [Google Fonts](https://fonts.google.com/specimen/Luckiest+Guy)
- **Poppins**: [Google Fonts](https://fonts.google.com/specimen/Poppins)
- **Tajawal**: [Google Fonts](https://fonts.google.com/specimen/Tajawal)
- **DG Bebo**: Download from Arabic font repositories or purchase

### 2. Add Font Files

Place font files in `/assets/fonts/`:

```
assets/
└── fonts/
    ├── LuckiestGuy-Regular.ttf
    ├── Poppins-Regular.ttf
    ├── Poppins-Medium.ttf
    ├── Poppins-SemiBold.ttf
    ├── Poppins-Bold.ttf
    ├── Tajawal-Regular.ttf
    ├── Tajawal-Medium.ttf
    ├── Tajawal-Bold.ttf
    ├── DGBebo-Regular.ttf
    └── DGBebo-Bold.ttf
```

### 3. Load Fonts in Root Layout

Update `/app/_layout.tsx`:

```typescript
import { useFonts } from 'expo-font';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'LuckiestGuy-Regular': require('../assets/fonts/LuckiestGuy-Regular.ttf'),
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Tajawal-Regular': require('../assets/fonts/Tajawal-Regular.ttf'),
    'Tajawal-Medium': require('../assets/fonts/Tajawal-Medium.ttf'),
    'Tajawal-Bold': require('../assets/fonts/Tajawal-Bold.ttf'),
    'DGBebo-Regular': require('../assets/fonts/DGBebo-Regular.ttf'),
    'DGBebo-Bold': require('../assets/fonts/DGBebo-Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  // ... rest of layout
}
```

### 4. Usage

Fonts are loaded in `_layout.tsx`. Use them with the `fontFamily` style property:

**English display heading:**
```tsx
<Text style={{ fontFamily: 'LuckiestGuy', fontSize: 32 }}>Welcome!</Text>
```

**Arabic heading:**
```tsx
<Text style={{ fontFamily: 'DGBebo-Bold', fontSize: 24 }}>مرحبا</Text>
```

**English body text:**
```tsx
<Text style={{ fontFamily: 'Poppins' }}>This is body text</Text>
```

**Arabic body text:**
```tsx
<Text style={{ fontFamily: 'Tajawal' }}>هذا نص عربي</Text>
```

> **Note:** Once NativeWind/Tailwind CSS is configured, these will be available as utility classes.

## Font Weights

- Poppins: Regular (400), Medium (500), SemiBold (600), Bold (700)
- Tajawal: Regular (400), Medium (500), Bold (700)
- Luckiest Guy: Regular only
- DG Bebo: Regular, Bold

## Notes

- Fonts are loaded asynchronously on app start
- Splash screen stays visible until fonts are loaded
- Consider font subsetting for production to reduce bundle size

> **TODO:** Configure Tailwind/NativeWind font utilities once styling is set up.

