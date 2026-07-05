---
name: Reentry Fleet Operations
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#404944'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#707974'
  outline-variant: '#bfc9c3'
  surface-tint: '#2b6954'
  primary: '#003527'
  on-primary: '#ffffff'
  primary-container: '#064e3b'
  on-primary-container: '#80bea6'
  inverse-primary: '#95d3ba'
  secondary: '#855300'
  on-secondary: '#ffffff'
  secondary-container: '#fea619'
  on-secondary-container: '#684000'
  tertiary: '#1f2f43'
  on-tertiary: '#ffffff'
  tertiary-container: '#35455a'
  on-tertiary-container: '#a2b2cb'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b0f0d6'
  primary-fixed-dim: '#95d3ba'
  on-primary-fixed: '#002117'
  on-primary-fixed-variant: '#0b513d'
  secondary-fixed: '#ffddb8'
  secondary-fixed-dim: '#ffb95f'
  on-secondary-fixed: '#2a1700'
  on-secondary-fixed-variant: '#653e00'
  tertiary-fixed: '#d3e4fe'
  tertiary-fixed-dim: '#b7c8e1'
  on-tertiary-fixed: '#0b1c30'
  on-tertiary-fixed-variant: '#38485d'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  data-mono:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 16px
  headline-md-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  container-max: 1440px
  sidebar-width: 260px
---

## Brand & Style

This design system is engineered for high-utility administrative environments where data density and operational clarity are paramount. The brand personality is professional, reliable, and systematic, catering to fleet managers who require rapid information retrieval and task execution.

The aesthetic follows a **Corporate / Modern** approach with a focus on structural integrity. It prioritizes a "functional elegance" that balances the weight of complex data tables with generous white space and a precise typographic hierarchy. The emotional response is one of organized control—reducing the cognitive load of managing large vehicle inventories through clear visual anchoring and intentional color application.

## Colors

The palette is anchored by a deep Forest Green (`#064E3B`), signaling stability and growth while maintaining high contrast against light surfaces. A refined Gold (`#F59E0B`) is used sparingly as a "high-utility" accent for special actions and highlights, ensuring they stand out without overwhelming the primary brand color.

The background utilizes a clean layering of whites and cool grays to define UI boundaries. Status colors are standardized to provide immediate "at-a-glance" updates on vehicle documentation and maintenance alerts:
- **Success (Verde):** All documents current.
- **Warning (Amarillo):** Expiration approaching (within 30 days).
- **Error (Rojo):** Critical alert or expired documentation.

## Typography

The design system utilizes **Hanken Grotesk** as the primary typeface. Its clean, sharp geometry offers exceptional legibility in dense administrative layouts. For technical data—such as VIN numbers, license plates, and timestamps—**JetBrains Mono** is employed to ensure character distinction and a technical feel.

All typographic scales are optimized for a Spanish-language interface, accounting for typically longer word lengths. Labels use uppercase styling with slight letter-spacing to improve scannability in tight headers.

## Layout & Spacing

The layout utilizes a **12-column fluid grid** for desktop, optimized for a maximum width of 1440px. A permanent sidebar at 260px provides high-level navigation, collapsing into a hidden drawer on mobile devices.

Spacing follows a strict **4px baseline grid**. 
- **Desktop:** 24px page margins with 16px gutters between cards/modules. 
- **Mobile:** 16px page margins.
- **Density:** To accommodate the data-heavy nature of fleet management, vertical padding in tables and lists is reduced to 12px (md) to maximize information density without sacrificing touch targets.

## Elevation & Depth

Visual hierarchy is established through **Tonal Layers** and subtle shadows. The primary canvas is `$neutral-color-hex` (#F8FAFC), with cards and interactive surfaces set in pure White (#FFFFFF).

- **Level 0 (Background):** Page canvas.
- **Level 1 (Cards/Tables):** White surface with a 1px border (`#E2E8F0`) and a very soft, diffused shadow (0px 2px 4px rgba(0,0,0,0.05)).
- **Level 2 (Modals/Dropdowns):** Elevated white surface with a more pronounced shadow (0px 10px 15px rgba(0,0,0,0.1)) to indicate focus.

We avoid heavy shadows to maintain the clean, "operational" aesthetic required for a dashboard environment.

## Shapes

The design system uses a **Soft (0.25rem / 4px)** base roundedness to maintain a professional and structured appearance. 
- **Cards and Containers:** Use `rounded-lg` (8px) to soften the large surface areas.
- **Buttons and Inputs:** Use the base 4px radius for a crisp, functional feel.
- **Status Badges:** Use a fully rounded "pill" shape (100px) to distinguish them from interactive buttons.

## Components

### Buttons
- **Primary:** Forest Green background, white text. Always includes a 20px icon (left-aligned) for rapid recognition.
- **Secondary:** White background, 1px Gray-300 border, Green text.
- **Action (Gold):** Used exclusively for "Special Actions" (e.g., *Renovar Documentación*).

### Tables
- **Header:** Light Gray background (#F1F5F9), uppercase label-md typography.
- **Cells:** 12px vertical padding. Use `data-mono` for numeric IDs and license plates.
- **Indicators:** Leading colored dots or pill-shaped badges for status (e.g., *Activo, En Taller, Baja*).

### Form Fields
- **Inputs:** 1px border, 8px horizontal padding. Labels are always visible above the field (never just placeholder text).
- **Validation:** Clear red text below the field for errors in Spanish.

### Navigation
- **Desktop Sidebar:** Dark theme (Primary Green background) to create a strong visual anchor. Active states use a gold left-border indicator.
- **Mobile Drawer:** Slide-in from left, full height, featuring large touch targets for drivers/field operators.

### Cards
- **Stat Cards:** Large `headline-md` numbers with `label-md` descriptions and a small trend icon in the corner.
- **Vehicle Cards:** Image thumbnail on the left, primary details in the center, and a "Status Badge" in the top-right corner.