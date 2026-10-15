import type { ThemeState } from './types'
import { validateThemeJSON } from './validation'

export const THEME_STORAGE_KEY = 'signflow_theme_state_v1'

/**
 * Safely reads the stored theme state from localStorage.
 * If storage is unavailable, throws, or contains corrupted data,
 * returns null without throwing or crashing the application.
 */
export function loadStoredTheme(): ThemeState | null {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return null
    }

    const raw = window.localStorage.getItem(THEME_STORAGE_KEY)
    if (!raw) {
      return null
    }

    const parsed = JSON.parse(raw) as unknown
    if (!parsed || typeof parsed !== 'object') {
      return null
    }

    const item = parsed as Record<string, unknown>
    const preset = item.preset === 'custom' ? 'custom' : 'light'

    // Validate the overrides using our validation logic
    const validation = validateThemeJSON({
      version: 1,
      name: typeof item.name === 'string' ? item.name : 'Stored Theme',
      basePreset: 'light',
      overrides: item.overrides ?? {},
    })

    if (!validation.success) {
      return null
    }

    return {
      preset,
      name: validation.data.name,
      overrides: validation.data.overrides,
    }
  } catch {
    // Graceful degradation when localStorage is blocked or throws SecurityError
    return null
  }
}

/**
 * Safely persists theme state to localStorage.
 * Returns true if successfully saved, false if storage is unavailable or failed.
 */
export function saveStoredTheme(state: ThemeState): boolean {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return false
    }

    const toStore = {
      preset: state.preset,
      name: state.name,
      overrides: state.overrides,
    }

    window.localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(toStore))
    return true
  } catch {
    return false
  }
}

/**
 * Safely clears stored theme state.
 */
export function clearStoredTheme(): boolean {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return false
    }

    window.localStorage.removeItem(THEME_STORAGE_KEY)
    return true
  } catch {
    return false
  }
}
