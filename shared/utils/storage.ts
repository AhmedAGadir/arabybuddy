import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Storage Utilities
 * Wrapper around AsyncStorage for type-safe storage operations
 */

export const storage = {
  /**
   * Get an item from storage
   */
  async getItem<T>(key: string): Promise<T | null> {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error reading from storage:', error);
      return null;
    }
  },

  /**
   * Set an item in storage
   */
  async setItem<T>(key: string, value: T): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error writing to storage:', error);
    }
  },

  /**
   * Remove an item from storage
   */
  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from storage:', error);
    }
  },

  /**
   * Clear all items from storage
   */
  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  },
};

// Storage keys
export const STORAGE_KEYS = {
  ONBOARDING_COMPLETED: 'onboarding_completed',
  LAST_SELECTED_TAB: 'last_selected_tab',
  AUDIO_CACHE: 'audio_cache',
} as const;

