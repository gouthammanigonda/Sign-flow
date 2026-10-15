# SignFlow UI Kit — Component Wrappers

This folder contains the justified, production-grade SignFlow wrappers over native Ant Design components.
In accordance with non-negotiable engineering rule #6, **every wrapper must earn its place** by delivering concrete SignFlow-specific value.

---

## 1. Justified Wrappers

### `SFButton` (`src/components/SFButton`)
- **Reason to exist:**
  - Normalizes button sizing to SignFlow's vocabulary (`small | medium | large`), mapping cleanly to Ant Design's (`small | middle | large`).
  - Adds the document workflow `subtle` variant (`tokens.color.primarySubtle` `#EFF6FF` background with `#2563EB` text) not provided natively by Ant Design.
  - Exposes an explicit, strongly typed variant API (`primary | secondary | subtle | danger | text`).
  - Preserves Ant Design Button keyboard navigation, focus ring, loading state, disabled behavior, and ARIA attributes.

### `SFText` (`src/components/SFText`)
- **Reason to exist:**
  - Bridges Ant Design's generic `Typography.Text` to the strict SignFlow 5-tier type scale:
    - `xs` (12px caption)
    - `s` (13px label)
    - `m` (14px body, line-height 1.55)
    - `l` (20px heading)
    - `xl` (30px display)
  - Maps SignFlow font weights (`regular` 400, `semibold` 600, `bold` 700).
  - Normalizes semantic color tones (`default` navy `#14213D`, `secondary` muted `#64748B`, `primary` brand `#2563EB`, `success`, `warning`, `danger`).
  - Preserves Ant Design text features such as `copyable`, `editable`, `ellipsis`, `code`, `mark`, `strong`, and `delete`.

### `SFCard` (`src/components/SFCard`)
- **Reason to exist:**
  - Enforces SignFlow document-workflow elevation specifications:
    - Resting card shadow: `0 1px 2px rgba(15, 23, 42, 0.025)`
    - Interactive hover shadow: `0 8px 20px rgba(15, 23, 42, 0.08)`
    - Large border-radius: `14px` (`tokens.radius.lg`)
    - Border color: `#E2E8F0` (`tokens.color.border`)
  - Adds the `interactive` prop to enable smooth elevation lift and pointer affordance on clickable cards.
  - Standardizes card body padding presets (`small` 12px, `medium` 16px, `large` 24px, `none` 0px).
  - Preserves Ant Design Card capabilities (headers, `extra`, `actions`, `cover`, `loading`, tabs).

---

## 2. Components Left Native Ant Design

The following components satisfy all requirements via central Ant Design `ConfigProvider` theme tokens without needing wrappers:

- **`Input` / `Input.TextArea`**: Styled globally via `controlHeight: 40`, `borderRadius: 10`, `colorBorder`, `colorPrimaryBorder`.
- **`Radio` / `Radio.Group`**: Fully configured via brand tokens and theme adapter.
- **`Checkbox`**: Matches brand colors and radius via `colorPrimary` and `borderRadiusSM`.
- **`Tag`**: Handled via Ant Design's native semantic color props (`color="blue"`, `color="green"`, etc.) and `borderRadiusSM: 7`.
- **`Alert`**: Semantic status messages match `colorSuccess`, `colorWarning`, `colorError` via theme tokens.
- **`Modal` / `Drawer`**: Standard overlay styling, animations, focus traps, and accessibility are preserved directly.
- **`Table`**: Complex data grid functionality (pagination, sorting, filtering) is handled natively with theme tokens.
- **`Space`**: Layout spacing aligns with standard Ant Design gap tokens.

Leaving these native avoids redundant code, prevents maintenance drift, and guarantees full accessibility out of the box.
