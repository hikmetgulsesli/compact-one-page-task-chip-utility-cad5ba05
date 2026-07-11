---
name: Precision Utility
colors:
  surface: '#f9f9ff'
  surface-dim: '#d3daef'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f3ff'
  surface-container: '#e9edff'
  surface-container-high: '#e1e8fd'
  surface-container-highest: '#dce2f7'
  on-surface: '#141b2b'
  on-surface-variant: '#434655'
  inverse-surface: '#293040'
  inverse-on-surface: '#edf0ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#505f76'
  on-secondary: '#ffffff'
  secondary-container: '#d0e1fb'
  on-secondary-container: '#54647a'
  tertiary: '#943700'
  on-tertiary: '#ffffff'
  tertiary-container: '#bc4800'
  on-tertiary-container: '#ffede6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#ffdbcd'
  tertiary-fixed-dim: '#ffb596'
  on-tertiary-fixed: '#360f00'
  on-tertiary-fixed-variant: '#7d2d00'
  background: '#f9f9ff'
  on-background: '#141b2b'
  surface-variant: '#dce2f7'
typography:
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.02em
  mono-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  space-xxs: 0.125rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
  layout-margin: 2rem
  gutter: 1rem
  sidebar-width: 240px
---

## Brand & Style

The design system is engineered for high-velocity productivity, prioritizing information density without sacrificing visual clarity. The aesthetic follows a **Modern Corporate** direction with a heavy emphasis on **Minimalism** and **Utilitarianism**, drawing inspiration from modern developer tools.

The interface should evoke a sense of "calm efficiency." This is achieved through a restrained color palette, rigorous alignment, and purposeful whitespace. The user is meant to feel in control of a powerful, stable environment where every pixel serves a functional purpose. There are no decorative elements; beauty is derived from the precision of the typography and the subtle interplay of light surfaces and crisp borders.

## Colors

The palette is rooted in a "functional blue" primary, used sparingly for intentional actions and focus states. 

- **Surfaces:** We use a two-tier background system. The main application background is an off-white to reduce eye strain, while active workspaces (cards, panels) use pure white to pop against the base.
- **Accents:** Borders are the primary method of separation. Use the subtle gray for structural containers and a slightly darker gray for interactive elements like input fields.
- **Semantic:** Success, Warning, and Error colors are used exclusively for status indicators (Task Chips) and validation. These should be paired with a 10% opacity background of the same hue to ensure legibility when used as chips.

## Typography

This design system utilizes a compact type scale to support high data density. **Inter** is the workhorse for all UI elements, chosen for its exceptional legibility at small sizes and its "system-tool" aesthetic.

- **Scale:** Headlines are kept small (max 18px-20px) to maintain the utility feel. 
- **Labels:** Use `label-sm` (uppercase) for category headers in sidebars or small metadata descriptors.
- **Density:** Line heights are tight but sufficient to prevent text from feeling cramped. 
- **Mono:** For ID numbers or technical task keys, a monospaced font can be introduced for better character differentiation.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy for the sidebar and a **Fluid** approach for the main content area. This creates a "Single Page App" feel common in productivity utilities.

- **The 4px Base:** All spacing is built on a 4px (0.25rem) increment.
- **Sidebar:** A persistent 240px sidebar houses navigation and workspace switching.
- **Main View:** Content is padded with `space-lg` or `space-xl` depending on the complexity. For dense task lists, use `space-sm` for vertical item spacing.
- **Grids:** Use a 12-column system for dashboard layouts, but default to simple flexbox stacks for task-based lists to ensure vertical density.

## Elevation & Depth

This design system avoids heavy drop shadows, opting instead for **Tonal Layers** and **Low-contrast Outlines**.

- **Level 0 (Base):** The main background (`#f9fafb`).
- **Level 1 (Surface):** Cards and main panels (`#ffffff`). These use a 1px solid border (`#e5e7eb`) rather than a shadow.
- **Level 2 (Popovers/Menus):** For elements that float (dropdowns, tooltips), use a very subtle, highly diffused shadow: `0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)`.
- **Interactive States:** When a card or task is hovered, change the border color slightly or add a 1px "inner" focus ring rather than increasing elevation.

## Shapes

The shape language is "Soft Professional." 

- **Radius:** Standard UI components (buttons, inputs, cards) use a `0.25rem` (4px) corner radius. This is sharp enough to feel technical but soft enough to avoid being harsh.
- **Task Chips:** These are the only exception and can utilize `rounded-xl` for a full "pill" shape to distinguish them clearly from interactive buttons.
- **Active Indicators:** Focus states should use a 2px offset ring to maintain the integrity of the component's shape.

## Components

### Task Chips
Compact badges used for status or metadata. They feature a 12px font size, 4px horizontal padding, and a subtle background tint (10% opacity of the semantic color). They must include a 6px status dot on the left for quick visual scanning.

### Buttons
- **Primary:** Solid `#2563eb` with white text. High contrast, clear intent.
- **Secondary:** White background with a 1px border (`#e5e7eb`). Text is `#111827`.
- **Ghost:** No background or border. Used for icon buttons (trash, edit) in rows to reduce visual noise.

### Forms
Inputs should be 32px or 36px in height to maintain the compact feel. Borders are light gray, darkening to the primary blue on focus. Inline validation should appear immediately below the input in `label-md` error red.

### Metrics
Small numeric counters (e.g., "12 Tasks") should use the `mono-sm` font for alignment. They often appear in the sidebar or at the top of list sections, housed in a subtle gray box with `space-xxs` padding.

### Lists
Task list items should have a hover state that slightly shifts the background color to `#f3f4f6`. Ensure vertical alignment of checkboxes, task titles, and chips across rows.