/**
 * Ant Design theme adapter.
 *
 * Maps SignFlow canonical tokens (src/tokens/index.ts) to Ant Design's
 * ThemeConfig shape for use in ConfigProvider.
 *
 * This is the ONLY place where SignFlow tokens are translated to Ant Design
 * values. No other file should duplicate this mapping.
 */
import type { ThemeConfig } from 'antd'
import { tokens } from '../tokens'

// ---------------------------------------------------------------------------
// Color override type
// Only the subset of colorTokens that are meaningfully mapped to Ant Design
// theme tokens. Other tokens (e.g. shadow, breakpoint) are not part of the
// Ant Design token system and are handled via CSS/component props instead.
// ---------------------------------------------------------------------------

export type ColorOverrides = Partial<Record<
  | 'primary'
  | 'primaryHover'
  | 'primaryText'
  | 'secondaryText'
  | 'canvas'
  | 'surface'
  | 'border'
  | 'success'
  | 'warning'
  | 'danger',
  string
>>

// ---------------------------------------------------------------------------
// Adapter
// ---------------------------------------------------------------------------

/**
 * Builds an Ant Design ThemeConfig from SignFlow canonical tokens.
 *
 * Accepts optional color overrides so the Custom theme preset can layer
 * user edits on top of the Light baseline without touching the token file.
 *
 * @param overrides - Partial color token overrides (user customizations)
 */
export function buildAntdTheme(overrides: ColorOverrides = {}): ThemeConfig {
  const c = { ...tokens.color, ...overrides }
  const t = tokens.typography
  const r = tokens.radius
  const ctrl = tokens.control

  return {
    token: {
      // --- Brand colors ---
      colorPrimary: c.primary,
      colorLink: c.primary,

      // --- Semantic colors ---
      colorSuccess: c.success,
      colorWarning: c.warning,
      colorError: c.danger,

      // --- Text ---
      colorText: c.primaryText,
      colorTextSecondary: c.secondaryText,

      // --- Backgrounds ---
      colorBgLayout: c.canvas,
      colorBgContainer: c.surface,

      // --- Borders ---
      colorBorder: c.border,
      colorBorderSecondary: c.border,

      // --- Typography ---
      fontFamily: t.fontFamily,
      fontSize: t.fontSizeBase,
      lineHeight: t.lineHeightBase,

      // --- Radius ---
      borderRadius: r.md,
      borderRadiusSM: r.sm,
      borderRadiusLG: r.lg,

      // --- Controls ---
      controlHeight: ctrl.controlHeight,

      // --- Focus ---
      // Ant Design handles focus ring via colorPrimaryBorder; we map our
      // focusBorder token here.
      colorPrimaryBorder: tokens.color.focusBorder,
    },
    components: {
      Button: {
        // Hover background derives from primaryHover. Ant Design applies this
        // automatically via colorPrimaryHover when colorPrimary is set, but
        // we make it explicit so the spec value is guaranteed.
        colorPrimaryHover: overrides.primaryHover ?? tokens.color.primaryHover,
      },
    },
  }
}

// ---------------------------------------------------------------------------
// Light preset (default)
// The baseline theme — no user overrides.
// ---------------------------------------------------------------------------

export const lightTheme: ThemeConfig = buildAntdTheme()
