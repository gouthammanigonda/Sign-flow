/**
 * Tests for canonical tokens and the Ant Design theme adapter.
 *
 * Coverage:
 * - Token default values match the SIGNFLOW_PHASE_EXECUTION_GUIDE spec.
 * - buildAntdTheme produces correct Ant Design token values from defaults.
 * - buildAntdTheme applies overrides correctly.
 * - buildAntdTheme does not mutate the canonical token source.
 */
import { tokens, colorTokens, typographyTokens, radiusTokens, controlTokens } from './index'
import { buildAntdTheme } from '../theme/adapter'

// ---------------------------------------------------------------------------
// Canonical token defaults
// ---------------------------------------------------------------------------

describe('colorTokens — spec values', () => {
  it('has correct primary color', () => {
    expect(colorTokens.primary).toBe('#2563EB')
  })
  it('has correct primaryHover', () => {
    expect(colorTokens.primaryHover).toBe('#1D4ED8')
  })
  it('has correct primaryText (navy)', () => {
    expect(colorTokens.primaryText).toBe('#14213D')
  })
  it('has correct secondaryText', () => {
    expect(colorTokens.secondaryText).toBe('#64748B')
  })
  it('has correct canvas background', () => {
    expect(colorTokens.canvas).toBe('#F8FAFC')
  })
  it('has correct surface background', () => {
    expect(colorTokens.surface).toBe('#FFFFFF')
  })
  it('has correct border color', () => {
    expect(colorTokens.border).toBe('#E2E8F0')
  })
  it('has correct success color', () => {
    expect(colorTokens.success).toBe('#16A34A')
  })
  it('has correct warning color', () => {
    expect(colorTokens.warning).toBe('#D97706')
  })
  it('has correct danger color', () => {
    expect(colorTokens.danger).toBe('#DC2626')
  })
  it('has correct primarySubtle', () => {
    expect(colorTokens.primarySubtle).toBe('#EFF6FF')
  })
  it('has correct focusBorder', () => {
    expect(colorTokens.focusBorder).toBe('#93C5FD')
  })
  it('has correct dangerSubtle', () => {
    expect(colorTokens.dangerSubtle).toBe('#FEF2F2')
  })
})

describe('typographyTokens — spec values', () => {
  it('has correct base font size', () => {
    expect(typographyTokens.fontSizeBase).toBe(14)
  })
  it('has correct caption font size', () => {
    expect(typographyTokens.fontSizeCaption).toBe(12)
  })
  it('has correct label font size', () => {
    expect(typographyTokens.fontSizeLabel).toBe(13)
  })
  it('has correct heading font size', () => {
    expect(typographyTokens.fontSizeHeading).toBe(20)
  })
  it('has correct display font size', () => {
    expect(typographyTokens.fontSizeDisplay).toBe(30)
  })
  it('has correct line height', () => {
    expect(typographyTokens.lineHeightBase).toBe(1.55)
  })
  it('includes Inter in font family', () => {
    expect(typographyTokens.fontFamily).toMatch(/^Inter/)
  })
})

describe('radiusTokens — spec values', () => {
  it('has correct small radius', () => {
    expect(radiusTokens.sm).toBe(7)
  })
  it('has correct medium radius', () => {
    expect(radiusTokens.md).toBe(10)
  })
  it('has correct large radius', () => {
    expect(radiusTokens.lg).toBe(14)
  })
  it('has correct pill radius', () => {
    expect(radiusTokens.pill).toBe(999)
  })
})

describe('controlTokens — spec values', () => {
  it('has correct default control height', () => {
    expect(controlTokens.controlHeight).toBe(40)
  })
})

// ---------------------------------------------------------------------------
// buildAntdTheme — default (no overrides)
// ---------------------------------------------------------------------------

describe('buildAntdTheme — default mapping', () => {
  const theme = buildAntdTheme()

  it('maps primary color to colorPrimary', () => {
    expect(theme.token?.colorPrimary).toBe(tokens.color.primary)
  })
  it('maps danger color to colorError', () => {
    expect(theme.token?.colorError).toBe(tokens.color.danger)
  })
  it('maps success color to colorSuccess', () => {
    expect(theme.token?.colorSuccess).toBe(tokens.color.success)
  })
  it('maps warning color to colorWarning', () => {
    expect(theme.token?.colorWarning).toBe(tokens.color.warning)
  })
  it('maps primaryText to colorText', () => {
    expect(theme.token?.colorText).toBe(tokens.color.primaryText)
  })
  it('maps canvas to colorBgLayout', () => {
    expect(theme.token?.colorBgLayout).toBe(tokens.color.canvas)
  })
  it('maps fontFamily', () => {
    expect(theme.token?.fontFamily).toBe(tokens.typography.fontFamily)
  })
  it('maps fontSizeBase to fontSize', () => {
    expect(theme.token?.fontSize).toBe(tokens.typography.fontSizeBase)
  })
  it('maps radius.md to borderRadius', () => {
    expect(theme.token?.borderRadius).toBe(tokens.radius.md)
  })
  it('maps controlHeight', () => {
    expect(theme.token?.controlHeight).toBe(tokens.control.controlHeight)
  })
})

// ---------------------------------------------------------------------------
// buildAntdTheme — with overrides
// ---------------------------------------------------------------------------

describe('buildAntdTheme — overrides', () => {
  const override = { primary: '#7C3AED', primaryHover: '#6D28D9' }
  const theme = buildAntdTheme(override)

  it('applies primary override to colorPrimary', () => {
    expect(theme.token?.colorPrimary).toBe('#7C3AED')
  })
  it('applies primaryHover override to Button.colorPrimaryHover', () => {
    expect(theme.components?.Button?.colorPrimaryHover).toBe('#6D28D9')
  })
  it('does not alter non-overridden tokens', () => {
    expect(theme.token?.colorError).toBe(tokens.color.danger)
  })

  it('does not mutate the canonical token source', () => {
    // Calling buildAntdTheme with an override must not change tokens.color
    expect(tokens.color.primary).toBe('#2563EB')
  })
})
