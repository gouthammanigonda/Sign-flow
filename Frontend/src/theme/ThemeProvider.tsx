import React, { useEffect, useMemo, useState, type ReactNode } from 'react'
import { ConfigProvider } from 'antd'
import { buildAntdTheme, type ColorOverrides } from './adapter'
import { DEFAULT_THEME_STATE, ThemeContext, type ThemeContextValue } from './context'
import { clearStoredTheme, loadStoredTheme, saveStoredTheme } from './storage'
import type { SupportedColorOverrideKey, ThemeJSON, ThemePreset, ThemeState } from './types'
import { exportThemeJSON, validateThemeJSON } from './validation'

export interface ThemeProviderProps {
  children: ReactNode
  initialState?: ThemeState
  persist?: boolean
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialState,
  persist = true,
}) => {
  const [themeState, setThemeState] = useState<ThemeState>(() => {
    if (initialState) {
      return initialState
    }
    if (persist) {
      const stored = loadStoredTheme()
      if (stored) {
        return stored
      }
    }
    return DEFAULT_THEME_STATE
  })

  // Synchronize with local storage on state change
  useEffect(() => {
    if (persist) {
      saveStoredTheme(themeState)
    }
  }, [themeState, persist])

  const setPreset = (preset: ThemePreset) => {
    setThemeState((prev) => ({
      ...prev,
      preset,
    }))
  }

  const setOverride = (key: SupportedColorOverrideKey, value: string) => {
    setThemeState((prev) => ({
      ...prev,
      preset: 'custom',
      overrides: {
        ...prev.overrides,
        [key]: value,
      },
    }))
  }

  const setOverrides = (overrides: ColorOverrides) => {
    setThemeState((prev) => ({
      ...prev,
      preset: 'custom',
      overrides: {
        ...prev.overrides,
        ...overrides,
      },
    }))
  }

  const resetTheme = () => {
    setThemeState(DEFAULT_THEME_STATE)
    if (persist) {
      clearStoredTheme()
    }
  }

  const exportJSON = () => {
    return exportThemeJSON(themeState)
  }

  const importJSON = (input: string | unknown): { success: boolean; error?: string } => {
    const result = validateThemeJSON(input)
    if (!result.success) {
      // Must not alter active theme state on failure
      return { success: false, error: result.error }
    }

    const validData: ThemeJSON = result.data
    setThemeState({
      preset: 'custom',
      name: validData.name,
      overrides: validData.overrides,
    })

    return { success: true }
  }

  const themeConfig = useMemo(() => {
    if (themeState.preset === 'light') {
      return buildAntdTheme()
    }
    return buildAntdTheme(themeState.overrides)
  }, [themeState.preset, themeState.overrides])

  const contextValue: ThemeContextValue = {
    themeState,
    themeConfig,
    setPreset,
    setOverride,
    setOverrides,
    resetTheme,
    exportJSON,
    importJSON,
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>
    </ThemeContext.Provider>
  )
}
