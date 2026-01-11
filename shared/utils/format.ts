/**
 * Formatting Utilities
 */

/**
 * Format a date to a human-readable string
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);
}

/**
 * Format a duration in milliseconds to MM:SS
 */
export function formatDuration(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Format XP number with commas
 */
export function formatXP(xp: number): string {
  return new Intl.NumberFormat('en-US').format(xp);
}

/**
 * Get CEFR level color (for badges/labels)
 */
export function getCEFRLevelColor(level: string): string {
  const colors: Record<string, string> = {
    A1: 'bg-ab-fresh-green',
    A2: 'bg-ab-bright-blue',
    B1: 'bg-ab-warm-yellow',
    B2: 'bg-ab-soft-orange',
    C1: 'bg-ab-coral-pink',
    C2: 'bg-ab-lavender',
  };
  return colors[level] || 'bg-muted';
}

/**
 * Get activity type icon name (for Lucide icons)
 */
export function getActivityTypeIcon(type: string): string {
  const icons: Record<string, string> = {
    lesson: 'BookOpen',
    game: 'Gamepad2',
    test: 'ClipboardCheck',
  };
  return icons[type] || 'Circle';
}

