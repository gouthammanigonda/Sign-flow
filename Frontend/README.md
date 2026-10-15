# SignFlow UI Kit

A reusable, themeable React component system built on Ant Design, featuring a live theme editor, versioned JSON schema validation, and custom component preview page.

---

## 1. Project Overview & Architecture

SignFlow UI Kit implements a **token-first architecture** with Ant Design as the foundational UI layer:

```
src/
├── tokens/               # Single canonical source of truth for design values
│   └── index.ts          # Colors, typography, spacing, radii, shadows, breakpoints
├── theme/                # Theme runtime, adapter, storage & JSON validation
│   ├── adapter.ts        # Maps canonical tokens -> Ant Design ThemeConfig
│   ├── types.ts          # ThemeState, ThemeJSON v1, ThemePreset, ColorOverrides
│   ├── validation.ts     # Versioned JSON schema validation & export serialization
│   ├── storage.ts        # LocalStorage persistence with safe fallback
│   ├── context.ts        # Central ThemeContext definition
│   ├── useTheme.ts       # React hook for theme state, presets, and overrides
│   ├── ThemeProvider.tsx # Provider wrapping Ant Design's ConfigProvider
│   └── index.ts          # Barrel export
├── components/           # Justified SignFlow wrapper components
│   ├── SFButton/         # Button with SignFlow variants, sizes & subtle styling
│   ├── SFText/           # Typography with SignFlow 5-tier type scale & weights
│   ├── SFCard/           # Card with SignFlow elevation, hover lift & padding scale
│   ├── README.md         # Wrapper justification & native component rationale
│   └── index.ts          # Barrel export
├── preview/              # Component gallery & live theme editor
│   ├── ThemeEditor.tsx   # Live theme controls, preset switcher, JSON import/export
│   ├── ComponentGallery.tsx # Gallery of wrappers & themed native Ant Design primitives
│   ├── PreviewPage.tsx   # Responsive preview page layout
│   ├── preview.css       # Layout & sticky panel styles
│   └── index.ts          # Barrel export
└── app/                  # Application root
    ├── App.tsx           # Mounts ThemeProvider + PreviewPage
    └── App.css           # Global shell layout
```

### Architectural Principles

1. **Ant Design First**: Native Ant Design components and props are used directly whenever possible.
2. **One Canonical Token Source**: Design values live strictly in `src/tokens/index.ts` and are translated through one central adapter (`src/theme/adapter.ts`).
3. **Justified Wrappers**: Wrappers exist only when they deliver concrete SignFlow value (`SFButton`, `SFText`, `SFCard`). Native components (`Input`, `Select`, `Table`, `Alert`, etc.) inherit the theme directly via `ConfigProvider`.
4. **Safe Theme Runtime**: Theme state supports live switching, localStorage persistence, and versioned JSON export/import with runtime schema validation.

---

## 2. Setup & Execution Commands

### Prerequisites
- Node.js `>= 20.0.0`
- npm `>= 10.0.0`

### Installation
```bash
npm install --legacy-peer-deps
```

### Development Server
```bash
npm run dev
```

### Type Checking
```bash
npm run typecheck
```

### Running Tests
```bash
npm test
```

### Linting
```bash
npm run lint
```

### Production Build
```bash
npm run build
```

---

## 3. Canonical Token Conventions

All design tokens are defined as `as const` structures in `src/tokens/index.ts`:

- **Colors (`colorTokens`)**:
  - `primary`: `#2563EB` (SignFlow brand blue)
  - `primaryHover`: `#1D4ED8`
  - `primaryText`: `#14213D` (Navy display and body text)
  - `secondaryText`: `#64748B` (Muted gray)
  - `canvas`: `#F8FAFC` (Page background)
  - `surface`: `#FFFFFF` (Card/container background)
  - `border`: `#E2E8F0` (Default border)
  - `success`: `#16A34A`
  - `warning`: `#D97706`
  - `danger`: `#DC2626`
  - `primarySubtle`: `#EFF6FF`
  - `focusBorder`: `#93C5FD`
  - `dangerSubtle`: `#FEF2F2`
  - `sidebarSelectedBg`: `#EFF6FF`
  - `sidebarSelectedText`: `#2563EB`

- **Typography (`typographyTokens`)**:
  - Font Family: `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
  - Scale: `xs: 12px`, `s: 13px`, `m: 14px` (line-height `1.55`), `l: 20px`, `xl: 30px`
  - Weights: `regular: 400`, `semibold: 600`, `bold: 700`

- **Radii (`radiusTokens`)**:
  - `sm: 7px`, `md: 10px`, `lg: 14px`, `pill: 999px`

- **Shadows (`shadowTokens`)**:
  - `card`: `0 1px 2px rgba(15, 23, 42, 0.025)`
  - `hover`: `0 8px 20px rgba(15, 23, 42, 0.08)`

---

## 4. How to Add a New Component Wrapper

Before creating a new wrapper, evaluate whether native Ant Design already satisfies requirements via `ConfigProvider` theme tokens. If a wrapper is justified:

1. **Create Component Folder**:
   ```
   src/components/SFNewComponent/
   ├── SFNewComponent.tsx
   ├── SFNewComponent.css (only if custom styles cannot be handled via tokens)
   └── index.ts
   ```

2. **Wrap Native Component**:
   Expose an explicit, strongly typed interface. Pass through necessary props (ARIA attributes, keyboard navigation, refs) to the underlying Ant Design primitive.

3. **Export from Components Barrel**:
   Add `export * from './SFNewComponent'` in `src/components/index.ts`.

4. **Document Justification**:
   Update `src/components/README.md` with the explicit reason this wrapper exists.

---

## 5. Editing Presets & Runtime Overrides

Use the `useTheme()` hook anywhere inside `<ThemeProvider>`:

```tsx
import { useTheme } from '../theme'

function Example() {
  const { themeState, setPreset, setOverride, resetTheme } = useTheme()

  // Switch to custom preset and update primary color live
  const makePurple = () => {
    setOverride('primary', '#7C3AED')
    setOverride('primaryHover', '#6D28D9')
  }

  // Switch back to default Light baseline
  const reset = () => {
    resetTheme()
  }

  return (
    <div>
      <button onClick={makePurple}>Make Purple</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}
```

---

## 6. Theme JSON Schema (Version 1)

Theme state can be exported and imported using the versioned JSON v1 schema:

```json
{
  "version": 1,
  "name": "Emerald Workflow",
  "basePreset": "light",
  "overrides": {
    "primary": "#059669",
    "primaryHover": "#047857",
    "success": "#16A34A"
  }
}
```

### Validation Rules (`src/theme/validation.ts`):
- `version`: Must be `1`.
- `name`: Non-empty string.
- `basePreset`: Must be `'light'`.
- `overrides`: Object containing only recognized keys from `SUPPORTED_COLOR_OVERRIDE_KEYS`.
- Values: Must be valid hex colors (`#RGB`, `#RRGGBB`, `#RRGGBBAA`).
- **Safety guarantee**: If validation fails, the active theme is **never** partially modified. A descriptive error is returned.

---

## 7. Known Limitations & Roadmap

1. **Dark Theme**: Explicitly out of scope for current phases; tokens and theme adapter are designed so a dark preset can be plugged in without refactoring.
2. **Additional Overrides**: Non-color tokens (shadows, spacing, radii) are currently static canonical tokens and not serialized in Theme JSON v1.
