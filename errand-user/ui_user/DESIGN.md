---
name: Efficient Urban Service
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#424656'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#727687'
  outline-variant: '#c2c6d8'
  surface-tint: '#0054d6'
  primary: '#0050cb'
  on-primary: '#ffffff'
  primary-container: '#0066ff'
  on-primary-container: '#f8f7ff'
  inverse-primary: '#b3c5ff'
  secondary: '#515f74'
  on-secondary: '#ffffff'
  secondary-container: '#d5e3fd'
  on-secondary-container: '#57657b'
  tertiary: '#565a5b'
  on-tertiary: '#ffffff'
  tertiary-container: '#6f7274'
  on-tertiary-container: '#f6f8fa'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae1ff'
  primary-fixed-dim: '#b3c5ff'
  on-primary-fixed: '#001849'
  on-primary-fixed-variant: '#003fa4'
  secondary-fixed: '#d5e3fd'
  secondary-fixed-dim: '#b9c7e0'
  on-secondary-fixed: '#0d1c2f'
  on-secondary-fixed-variant: '#3a485c'
  tertiary-fixed: '#e0e3e5'
  tertiary-fixed-dim: '#c4c7c9'
  on-tertiary-fixed: '#191c1e'
  on-tertiary-fixed-variant: '#444749'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  margin-page: 16px
  gutter-grid: 12px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 24px
---

## Brand & Style
The design system focuses on "Reliability through Clarity." It is tailored for an urban errand service where speed and trust are paramount. The aesthetic is **Corporate / Modern**, leaning heavily into a functional, systematic approach that eliminates visual noise to help users complete tasks quickly.

The interface evokes a sense of professional efficiency. By using a "Safety Blue" as the primary anchor against a sterile white environment, the system communicates security and officiality. The emotional response should be one of relief and confidence—knowing that a task is in capable hands.

## Colors
This design system utilizes a high-contrast palette to ensure legibility in various outdoor lighting conditions, typical for users on the go.

- **Primary (#0066FF):** Used for primary actions, progress indicators, and brand touchpoints.
- **Secondary (#334155):** A deep slate blue used for text headings to maintain high contrast without the harshness of pure black.
- **Background/Tertiary (#F8FAFC):** A very soft, cool gray used for page backgrounds to reduce eye strain and define card boundaries.
- **Neutral (#64748B):** Used for secondary text, icons, and borders.
- **Semantic Colors:** Success (Green), Warning (Amber), and Error (Red) should follow standard accessibility ratios against the white background.

## Typography
The typography system prioritizes Chinese character legibility within a mobile mini-program context. **Plus Jakarta Sans** is used for headlines to provide a modern, slightly rounded, and friendly professional look. **Inter** is used for all body and functional text due to its exceptional clarity at small sizes.

For Chinese text rendering, use system fallbacks: `PingFang SC`, `Hiragino Sans GB`, and `Microsoft YaHei`. Maintain a minimum body size of 14px for general information and 16px for critical instructions to ensure accessibility for all age groups.

## Layout & Spacing
The layout follows a **Fluid Grid** model optimized for mobile viewports. A 4px base unit governs all spatial relationships.

- **Margins:** A standard 16px horizontal margin is applied to all screens to prevent content from touching the edge of the device.
- **Vertical Rhythm:** Components are stacked using 16px (medium) or 24px (large) increments to create clear logical groupings.
- **Safe Areas:** Ensure bottom-fixed buttons (like "Place Order") respect the mobile device's safe area insets, adding a minimum of 12px padding above the home indicator.

## Elevation & Depth
This design system uses **Tonal Layers** combined with **Ambient Shadows** to create a sense of hierarchy. Depth is used functionally, not decoratively.

- **Level 0 (Base):** Background color `#F8FAFC`.
- **Level 1 (Cards):** Pure White (`#FFFFFF`) with a very soft, diffused shadow: `0px 4px 12px rgba(0, 0, 0, 0.05)`.
- **Level 2 (Floating/Modals):** Pure White with a more pronounced shadow: `0px 8px 24px rgba(0, 0, 0, 0.10)`.
- **Borders:** Use 1px solid `#E2E8F0` for level-1 elements to ensure definition against the background if the shadow is too subtle on some displays.

## Shapes
The shape language is consistently **Rounded**, using 12px to 16px corners to soften the professional tone and make the app feel approachable.

- **Standard Containers:** 12px (`rounded-md`).
- **Large Cards & Modals:** 16px (`rounded-lg`).
- **Interactive Elements:** Buttons and Input fields should match the 12px standard for a cohesive look.
- **Search Bars:** May use a full pill-shape (circular ends) to distinguish them as a unique global utility.

## Components
- **Buttons:** Primary buttons use a solid `#0066FF` fill with white text. Secondary buttons use a light blue tint or a 1px border. Height should be a minimum of 48px for easy thumb tapping.
- **Cards:** White background with 12px rounded corners. Content inside cards should follow the 16px internal padding rule.
- **Input Fields:** Use a light gray background (`#F1F5F9`) with 12px rounded corners. On focus, the border should transition to Primary Blue.
- **Chips:** Small status indicators (e.g., "Pending," "In Transit") use a low-saturation background of the semantic color with high-saturation text for readability.
- **Lists:** Use "In-set" lists where items are grouped inside a rounded card. Items are separated by a 1px soft gray line, stopping short of the card edges.
- **Icons:** Use a linear, 2px stroke weight. Icons should be encased in a subtle circular or square-rounded background to indicate interactivity.
- **Order Tracking:** Use a vertical "Step" component with a solid blue line for completed stages and a dashed gray line for upcoming ones.