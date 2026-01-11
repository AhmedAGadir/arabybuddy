import { supabase } from '../lib/supabase';

/**
 * Storage Service
 * Handles file uploads and downloads from Supabase Storage
 */

// Storage buckets
export const BUCKETS = {
  CHARACTER_IMAGES: 'character-images',
  CHARACTER_MODELS: 'character-models',
  LESSON_AUDIO: 'lesson-audio',
  ACTIVITY_IMAGES: 'activity-images',
  USER_AVATARS: 'user-avatars',
} as const;

export const storageService = {
  /**
   * Upload a file to Supabase Storage
   */
  async uploadFile(
    bucket: string,
    path: string,
    file: File | Blob,
    options?: { contentType?: string; cacheControl?: string }
  ) {
    const { data, error } = await supabase.storage.from(bucket).upload(path, file, {
      contentType: options?.contentType,
      cacheControl: options?.cacheControl || '3600',
      upsert: false,
    });

    if (error) throw error;
    return data;
  },

  /**
   * Get public URL for a file
   */
  getPublicUrl(bucket: string, path: string): string {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  },

  /**
   * Download a file from Supabase Storage
   */
  async downloadFile(bucket: string, path: string) {
    const { data, error } = await supabase.storage.from(bucket).download(path);

    if (error) throw error;
    return data;
  },

  /**
   * Delete a file from Supabase Storage
   */
  async deleteFile(bucket: string, path: string) {
    const { error } = await supabase.storage.from(bucket).remove([path]);

    if (error) throw error;
  },

  /**
   * List files in a bucket
   */
  async listFiles(bucket: string, path?: string) {
    const { data, error } = await supabase.storage.from(bucket).list(path);

    if (error) throw error;
    return data;
  },

  /**
   * Get signed URL for private file (expires in 1 hour)
   */
  async getSignedUrl(bucket: string, path: string, expiresIn: number = 3600) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(path, expiresIn);

    if (error) throw error;
    return data.signedUrl;
  },
};

