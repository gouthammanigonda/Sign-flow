/**
 * SignFlow canonical design tokens.
 *
 * These are the single source of truth for all SignFlow design values.
 * Values sourced directly from SIGNFLOW_PHASE_EXECUTION_GUIDE.md are marked [spec].
 * Values proposed/inferred to fill gaps are marked [proposed].
 *
 * Ant Design theme configuration is derived from these tokens in src/theme/adapter.ts.
 * Do NOT add hardcoded color or sizing values anywhere else in the codebase.
 */

// ---------------------------------------------------------------------------
// Color tokens
// ---------------------------------------------------------------------------

export const colorTokens = {
  /** Primary action color [spec] */
  primary: '#2563EB',
  /** Primary action hover [spec] */
  primaryHover: '#1D4ED8',
  /** Primary text / navy heading color [spec] */
  primaryText: '#14213D',
  /** Secondary / muted text [spec] */
  secondaryText: '#64748B',
  /** Page/canvas background [spec] */
  canvas: '#F8FAFC',
  /** Card/modal surface background [spec] */
  surface: '#FFFFFF',
  /** Default border color [spec] */
  border: '#E2E8F0',
  /** Success semantic color [spec] */
  success: '#16A34A',
  /** Warning semantic color [spec] */
  warning: '#D97706',
  /** Danger/error semantic color [spec] */
  danger: '#DC2626',
  /** Subtle primary background (e.g. selected sidebar) [spec] */
  primarySubtle: '#EFF6FF',
  /** Focus ring border color [spec] */
  focusBorder: '#93C5FD',
  /** Subtle danger background [spec] */
  dangerSubtle: '#FEF2F2',
  /** Selected sidebar background [spec] */
  sidebarSelectedBg: '#EFF6FF',
  /** Selected sidebar text [spec] */
  sidebarSelectedText: '#2563EB',
} as const

export type ColorTokens = typeof colorTokens

// ---------------------------------------------------------------------------
// Typography tokens
// ---------------------------------------------------------------------------

export const typographyTokens = {
  /** Font stack [spec] */
  fontFamily:
    'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  /** Caption text size [spec] */
  fontSizeCaption: 12,
  /** Label text size [spec] */
  fontSizeLabel: 13,
  /** Body text size (Ant Design base) [spec] */
  fontSizeBase: 14,
  /** Heading text size [spec] */
  fontSizeHeading: 20,
  /** Page title / display text size [spec] */
  fontSizeDisplay: 30,
  /** Body line height [spec] */
  lineHeightBase: 1.55,
  /** Regular weight [spec] */
  fontWeightRegular: 400,
  /** Semibold weight [spec] */
  fontWeightSemibold: 600,
  /** Bold weight [spec] */
  fontWeightBold: 700,
} as const

export type TypographyTokens = typeof typographyTokens

// ---------------------------------------------------------------------------
// Spacing tokens
// ---------------------------------------------------------------------------

/** Spacing scale in px [spec] */
export const spacingTokens = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 28,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 56,
  '7xl': 72,
} as const

export type SpacingTokens = typeof spacingTokens

// ---------------------------------------------------------------------------
// Border radius tokens
// ---------------------------------------------------------------------------

/** Border radius scale in px [spec] */
export const radiusTokens = {
  /** Small radius — e.g. tags, badges [spec] */
  sm: 7,
  /** Medium radius — default for buttons/inputs [spec] */
  md: 10,
  /** Large radius — modals, cards [spec] */
  lg: 14,
  /** Pill radius — fully rounded [spec] */
  pill: 999,
} as const

export type RadiusTokens = typeof radiusTokens

// ---------------------------------------------------------------------------
// Shadow tokens
// ---------------------------------------------------------------------------

/** Box shadow values [spec] */
export const shadowTokens = {
  /** Resting card shadow [spec] */
  card: '0 1px 2px rgba(15, 23, 42, 0.025)',
  /** Interactive hover shadow [spec] */
  hover: '0 8px 20px rgba(15, 23, 42, 0.08)',
} as const

export type ShadowTokens = typeof shadowTokens

// ---------------------------------------------------------------------------
// Control tokens
// ---------------------------------------------------------------------------

/** Interactive control sizing [spec] */
export const controlTokens = {
  /** Default button/input height in px [spec] */
  controlHeight: 40,
} as const

export type ControlTokens = typeof controlTokens

// ---------------------------------------------------------------------------
// Focus token
// ---------------------------------------------------------------------------

/** Focus ring box-shadow [spec] */
export const focusTokens = {
  ring: '0 0 0 3px rgba(37, 99, 235, 0.2)',
} as const

export type FocusTokens = typeof focusTokens

// ---------------------------------------------------------------------------
// Responsive breakpoint tokens
// ---------------------------------------------------------------------------

/** Responsive breakpoints [spec] */
export const breakpointTokens = {
  /** Mobile breakpoint max-width [spec] */
  mobile: 760,
} as const

export type BreakpointTokens = typeof breakpointTokens

// ---------------------------------------------------------------------------
// Aggregated token export
// ---------------------------------------------------------------------------

export const tokens = {
  color: colorTokens,
  typography: typographyTokens,
  spacing: spacingTokens,
  radius: radiusTokens,
  shadow: shadowTokens,
  control: controlTokens,
  focus: focusTokens,
  breakpoint: breakpointTokens,
} as const

export type Tokens = typeof tokens
