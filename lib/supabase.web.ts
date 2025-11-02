import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

// TODO: fix this to use async storage instead of localStorage
// NOTE: REMOVED THIS LINE AS IT WAS CAUSING ERRORS IN IOS 
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { createClient } from '@supabase/supabase-js';
// import 'react-native-url-polyfill/auto';

// const ExpoWebSecureStoreAdapter = {
//   getItem: (key: string) => {
//     console.debug("getItem", { key })
//     return AsyncStorage.getItem(key)
//   },
//   setItem: (key: string, value: string) => {
//     return AsyncStorage.setItem(key, value)
//   },
//   removeItem: (key: string) => {
//     return AsyncStorage.removeItem(key)
//   },
// };
// Use localStorage for web (browser)

const ExpoWebSecureStoreAdapter = {
  getItem: (key: string) => {
    if (typeof window !== 'undefined') {
      return Promise.resolve(window.localStorage.getItem(key));
    }
    return Promise.resolve(null);
  },
  setItem: (key: string, value: string) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, value);
    }
    return Promise.resolve();
  },
  removeItem: (key: string) => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(key);
    }
    return Promise.resolve();
  },
};

export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL ?? '',
  process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? '',
  {
    auth: {
      storage: ExpoWebSecureStoreAdapter,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
);
