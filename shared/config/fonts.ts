import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
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
 * - Poppins: English UI text
 * - Tajawal: Arabic body text
 * - DGBebo: Arabic headings
 * - LuckiestGuy: Playful display text
 */
export const appFonts = {
  // Display font
  LuckiestGuy: LuckiestGuy_400Regular,

  // English UI font
  Poppins: Poppins_400Regular,
  'Poppins-Medium': Poppins_500Medium,
  'Poppins-SemiBold': Poppins_600SemiBold,
  'Poppins-Bold': Poppins_700Bold,

  // Arabic body font
  Tajawal: Tajawal_400Regular,
  'Tajawal-Medium': Tajawal_500Medium,
  'Tajawal-Bold': Tajawal_700Bold,

  // Arabic heading font (loaded from assets)
  DGBebo: require('../../assets/fonts/DGBebo-Regular.ttf'),
  'DGBebo-Bold': require('../../assets/fonts/DGBebo-Bold.ttf'),
} as const;

