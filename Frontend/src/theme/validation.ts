import {
  SUPPORTED_COLOR_OVERRIDE_KEYS,
  type ColorOverrides,
  type SupportedColorOverrideKey,
  type ThemeJSON,
  type ThemeState,
} from './types'

export type ValidationResult =
  | { success: true; data: ThemeJSON }
  | { success: false; error: string }

const HEX_COLOR_REGEX = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/

export function isValidHexColor(value: unknown): value is string {
  return typeof value === 'string' && HEX_COLOR_REGEX.test(value.trim())
}

/**
 * Validates a parsed JSON object or raw JSON string against the ThemeJSON v1 schema.
 * Rejects unsupported keys, malformed data, or missing required attributes.
 */
export function validateThemeJSON(input: unknown): ValidationResult {
  let parsed: unknown = input

  if (typeof input === 'string') {
    try {
      parsed = JSON.parse(input)
    } catch {
      return { success: false, error: 'Invalid JSON format: Unable to parse string.' }
    }
  }

  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    return { success: false, error: 'Theme definition must be a valid JSON object.' }
  }

  const obj = parsed as Record<string, unknown>

  // Strict root property check
  const allowedRootKeys = new Set(['version', 'name', 'basePreset', 'overrides'])
  for (const key of Object.keys(obj)) {
    if (!allowedRootKeys.has(key)) {
      return { success: false, error: `Unrecognized root property: "${key}".` }
    }
  }

  // Version check
  if (obj.version !== 1) {
    return {
      success: false,
      error: `Unsupported schema version: ${String(obj.version)}. Expected version 1.`,
    }
  }

  // Name check
  if (typeof obj.name !== 'string' || obj.name.trim().length === 0) {
    return { success: false, error: 'Theme "name" must be a non-empty string.' }
  }

  // Base preset check
  if (obj.basePreset !== 'light') {
    return {
      success: false,
      error: `Unsupported basePreset: "${String(obj.basePreset)}". Only "light" is supported.`,
    }
  }

  // Overrides check
  if (typeof obj.overrides !== 'object' || obj.overrides === null || Array.isArray(obj.overrides)) {
    return { success: false, error: 'Theme "overrides" must be an object of key-value pairs.' }
  }

  const overridesObj = obj.overrides as Record<string, unknown>
  const validatedOverrides: ColorOverrides = {}

  for (const [key, val] of Object.entries(overridesObj)) {
    if (!SUPPORTED_COLOR_OVERRIDE_KEYS.includes(key as SupportedColorOverrideKey)) {
      return { success: false, error: `Unsupported override token key: "${key}".` }
    }

    if (!isValidHexColor(val)) {
      return {
        success: false,
        error: `Invalid color value for "${key}": "${String(val)}". Expected valid hex color (e.g. #2563EB).`,
      }
    }

    validatedOverrides[key as SupportedColorOverrideKey] = (val as string).trim()
  }

  return {
    success: true,
    data: {
      version: 1,
      name: obj.name.trim(),
      basePreset: 'light',
      overrides: validatedOverrides,
    },
  }
}

/**
 * Formats theme state into a versioned JSON string.
 */
export function exportThemeJSON(theme: ThemeState): string {
  const exportData: ThemeJSON = {
    version: 1,
    name: theme.name || 'Custom Theme',
    basePreset: 'light',
    overrides: theme.overrides,
  }

  return JSON.stringify(exportData, null, 2)
}
