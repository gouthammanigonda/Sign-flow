import { createContext } from 'react'
import type { ThemeConfig } from 'antd'
import type { ColorOverrides } from './adapter'
import type {
  SupportedColorOverrideKey,
  ThemePreset,
  ThemeState,
} from './types'

export interface ThemeContextValue {
  themeState: ThemeState
  themeConfig: ThemeConfig
  setPreset: (preset: ThemePreset) => void
  setOverride: (key: SupportedColorOverrideKey, value: string) => void
  setOverrides: (overrides: ColorOverrides) => void
  resetTheme: () => void
  exportJSON: () => string
  importJSON: (input: string | unknown) => { success: boolean; error?: string }
}

export const DEFAULT_THEME_STATE: ThemeState = {
  preset: 'light',
  name: 'SignFlow Light',
  overrides: {},
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)
