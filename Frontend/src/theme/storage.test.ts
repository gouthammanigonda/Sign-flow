import { clearStoredTheme, loadStoredTheme, saveStoredTheme, THEME_STORAGE_KEY } from './storage'
import type { ThemeState } from './types'

describe('storage module', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  const sampleState: ThemeState = {
    preset: 'custom',
    name: 'Saved Theme',
    overrides: {
      primary: '#10B981',
    },
  }

  it('saves and reloads theme state from localStorage', () => {
    const saved = saveStoredTheme(sampleState)
    expect(saved).toBe(true)

    const loaded = loadStoredTheme()
    expect(loaded).toEqual({
      preset: 'custom',
      name: 'Saved Theme',
      overrides: {
        primary: '#10B981',
      },
    })
  })

  it('clears stored theme from localStorage', () => {
    saveStoredTheme(sampleState)
    expect(loadStoredTheme()).not.toBeNull()

    const cleared = clearStoredTheme()
    expect(cleared).toBe(true)
    expect(loadStoredTheme()).toBeNull()
  })

  it('returns null when no theme is stored', () => {
    expect(loadStoredTheme()).toBeNull()
  })

  it('handles corrupted JSON in localStorage gracefully without throwing', () => {
    localStorage.setItem(THEME_STORAGE_KEY, '{ invalid json...')
    expect(() => {
      const res = loadStoredTheme()
      expect(res).toBeNull()
    }).not.toThrow()
  })

  it('handles invalid schema in localStorage gracefully', () => {
    localStorage.setItem(
      THEME_STORAGE_KEY,
      JSON.stringify({
        preset: 'custom',
        name: 'Invalid',
        overrides: {
          primary: 'not-a-color',
        },
      }),
    )
    expect(loadStoredTheme()).toBeNull()
  })

  it('handles localStorage getItem throwing an error without crashing', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('SecurityError: Access is denied')
    })

    expect(() => {
      const res = loadStoredTheme()
      expect(res).toBeNull()
    }).not.toThrow()
  })

  it('handles localStorage setItem throwing an error without crashing', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError')
    })

    expect(() => {
      const res = saveStoredTheme(sampleState)
      expect(res).toBe(false)
    }).not.toThrow()
  })

  it('handles localStorage removeItem throwing an error without crashing', () => {
    vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
      throw new Error('SecurityError: Access is denied')
    })

    expect(() => {
      const res = clearStoredTheme()
      expect(res).toBe(false)
    }).not.toThrow()
  })
})
