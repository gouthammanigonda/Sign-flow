import { exportThemeJSON, validateThemeJSON } from './validation'

describe('validateThemeJSON', () => {
  const validThemeObj = {
    version: 1,
    name: 'Brand Purple',
    basePreset: 'light',
    overrides: {
      primary: '#7C3AED',
      primaryHover: '#6D28D9',
    },
  }

  it('accepts a valid ThemeJSON object', () => {
    const result = validateThemeJSON(validThemeObj)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.version).toBe(1)
      expect(result.data.name).toBe('Brand Purple')
      expect(result.data.basePreset).toBe('light')
      expect(result.data.overrides.primary).toBe('#7C3AED')
      expect(result.data.overrides.primaryHover).toBe('#6D28D9')
    }
  })

  it('accepts a valid ThemeJSON string', () => {
    const jsonStr = JSON.stringify(validThemeObj)
    const result = validateThemeJSON(jsonStr)
    expect(result.success).toBe(true)
  })

  it('rejects invalid JSON syntax', () => {
    const result = validateThemeJSON('{ bad json ...')
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toContain('Unable to parse string')
    }
  })

  it('rejects non-object types (e.g. primitives, arrays, null)', () => {
    expect(validateThemeJSON(null).success).toBe(false)
    expect(validateThemeJSON([]).success).toBe(false)
    expect(validateThemeJSON(123).success).toBe(false)
  })

  it('rejects unknown root properties', () => {
    const result = validateThemeJSON({
      ...validThemeObj,
      extraProp: 'forbidden',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toContain('Unrecognized root property')
    }
  })

  it('rejects unsupported schema version', () => {
    const result = validateThemeJSON({
      ...validThemeObj,
      version: 2,
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toContain('Unsupported schema version: 2')
    }
  })

  it('rejects empty or whitespace-only name', () => {
    const result = validateThemeJSON({
      ...validThemeObj,
      name: '   ',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toContain('Theme "name" must be a non-empty string')
    }
  })

  it('rejects unsupported basePreset', () => {
    const result = validateThemeJSON({
      ...validThemeObj,
      basePreset: 'dark',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toContain('Unsupported basePreset: "dark"')
    }
  })

  it('rejects unsupported token keys in overrides', () => {
    const result = validateThemeJSON({
      ...validThemeObj,
      overrides: {
        unknownToken: '#123456',
      },
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toContain('Unsupported override token key: "unknownToken"')
    }
  })

  it('rejects invalid color strings in overrides', () => {
    const result = validateThemeJSON({
      ...validThemeObj,
      overrides: {
        primary: 'not-a-color',
      },
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toContain('Invalid color value for "primary"')
    }
  })
})

describe('exportThemeJSON', () => {
  it('formats ThemeState into a valid versioned JSON string', () => {
    const state = {
      preset: 'custom' as const,
      name: 'Custom Ocean',
      overrides: {
        primary: '#0284C7',
      },
    }

    const exported = exportThemeJSON(state)
    const parsed = JSON.parse(exported)

    expect(parsed).toEqual({
      version: 1,
      name: 'Custom Ocean',
      basePreset: 'light',
      overrides: {
        primary: '#0284C7',
      },
    })

    // Must pass its own validation
    const validation = validateThemeJSON(exported)
    expect(validation.success).toBe(true)
  })
})
