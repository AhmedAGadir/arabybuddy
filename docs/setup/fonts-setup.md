# Font Setup Guide

## Font Strategy

ArabyBuddy uses custom fonts for branding and bilingual (English/Arabic) text:

| Purpose | Font | Usage |
|---------|------|-------|
| English Headings | **Luckiest Guy** | Display/hero text, app branding |
| Arabic Headings | **DG Bebo** | Arabic display text, headings |
| English Body | **Inter** | UI text, paragraphs, buttons |
| Arabic Body | **Tajawal** | Arabic UI text, paragraphs |

## Font Sources

- **Luckiest Guy**: `@expo-google-fonts/luckiest-guy`
- **Inter**: `@expo-google-fonts/inter`
- **Tajawal**: `@expo-google-fonts/tajawal`
- **DG Bebo**: Local files in `/assets/fonts/`

## Tailwind Font Classes

Use these utility classes in your components:

```tsx
// English headings
<Text className="font-heading-en text-4xl">Welcome!</Text>

// Arabic headings
<Text className="font-heading-ar text-2xl">مرحبا</Text>
<Text className="font-heading-ar-bold text-2xl">مرحبا بك</Text>

// English body text
<Text className="font-body-en">This is body text</Text>
<Text className="font-body-en-medium">Medium weight</Text>
<Text className="font-body-en-semibold">Semi-bold weight</Text>
<Text className="font-body-en-bold">Bold weight</Text>

// Arabic body text
<Text className="font-body-ar">هذا نص عربي</Text>
<Text className="font-body-ar-medium">نص متوسط</Text>
<Text className="font-body-ar-bold">نص عريض</Text>
```

## Font Weights Available

| Font | Weights |
|------|---------|
| Luckiest Guy | Regular only |
| DG Bebo | Regular, Bold |
| Inter | Regular (400), Medium (500), SemiBold (600), Bold (700) |
| Tajawal | Regular (400), Medium (500), Bold (700) |

## Inline Style Usage

You can also use fonts directly with the `fontFamily` style property:

```tsx
// English display heading
<Text style={{ fontFamily: 'LuckiestGuy', fontSize: 32 }}>Welcome!</Text>

// Arabic heading
<Text style={{ fontFamily: 'DGBebo-Bold', fontSize: 24 }}>مرحبا</Text>

// English body text
<Text style={{ fontFamily: 'Inter' }}>This is body text</Text>

// Arabic body text
<Text style={{ fontFamily: 'Tajawal' }}>هذا نص عربي</Text>
```

## Configuration Files

- Font loading: `/shared/config/fonts.ts`
- Tailwind config: `/tailwind.config.js` (fontFamily section)
- Root layout: `/app/_layout.tsx` (uses `useFonts` hook)

## Notes

- Fonts are loaded asynchronously on app start via `expo-font`
- Splash screen stays visible until fonts are loaded
- Google Fonts are loaded via `@expo-google-fonts/*` packages
- DG Bebo is loaded from local TTF files in `/assets/fonts/`

