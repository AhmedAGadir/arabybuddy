import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import {
  Tajawal_400Regular,
  Tajawal_500Medium,
  Tajawal_700Bold,
} from '@expo-google-fonts/tajawal';
import { LuckiestGuy_400Regular } from '@expo-google-fonts/luckiest-guy';

/**
 * Font configuration for the app
 *
 * Fonts:
 * - LuckiestGuy: English headings (display font)
 * - DGBebo: Arabic headings
 * - Inter: English body text
 * - Tajawal: Arabic body text
 */
export const appFonts = {
  // English heading font (display)
  LuckiestGuy: LuckiestGuy_400Regular,

  // Arabic heading font (loaded from assets)
  DGBebo: require('../../assets/fonts/DGBebo-Regular.ttf'),
  'DGBebo-Bold': require('../../assets/fonts/DGBebo-Bold.ttf'),

  // English body font
  Inter: Inter_400Regular,
  'Inter-Medium': Inter_500Medium,
  'Inter-SemiBold': Inter_600SemiBold,
  'Inter-Bold': Inter_700Bold,

  // Arabic body font
  Tajawal: Tajawal_400Regular,
  'Tajawal-Medium': Tajawal_500Medium,
  'Tajawal-Bold': Tajawal_700Bold,
} as const;

