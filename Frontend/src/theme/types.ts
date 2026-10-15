import type { ColorOverrides } from './adapter'
export type { ColorOverrides }

export type ThemePreset = 'light' | 'custom'

export const SUPPORTED_COLOR_OVERRIDE_KEYS = [
  'primary',
  'primaryHover',
  'primaryText',
  'secondaryText',
  'canvas',
  'surface',
  'border',
  'success',
  'warning',
  'danger',
] as const

export type SupportedColorOverrideKey = (typeof SUPPORTED_COLOR_OVERRIDE_KEYS)[number]

export interface ThemeState {
  preset: ThemePreset
  name: string
  overrides: ColorOverrides
}

export interface ThemeJSON {
  version: 1
  name: string
  basePreset: 'light'
  overrides: ColorOverrides
}
