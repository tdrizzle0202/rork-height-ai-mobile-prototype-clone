import { Platform } from 'react-native';

export const FONT_FAMILY = Platform.select({
  web: 'Sour Gummy, system-ui, -apple-system, sans-serif',
  default: 'System'
});

export const FONT_WEIGHTS = {
  regular: "400" as const,
  medium: "500" as const,
  semibold: "600" as const,
  bold: "700" as const,
  heavy: "800" as const,
} as const;

// Font family variants for different weights
export const FONT_FAMILIES = {
  regular: Platform.select({
    web: 'Sour Gummy, system-ui, -apple-system, sans-serif',
    default: 'System'
  }),
  medium: Platform.select({
    web: 'Sour Gummy, system-ui, -apple-system, sans-serif',
    default: 'System'
  }),
  semibold: Platform.select({
    web: 'Sour Gummy, system-ui, -apple-system, sans-serif',
    default: 'System'
  }),
  bold: Platform.select({
    web: 'Sour Gummy, system-ui, -apple-system, sans-serif',
    default: 'System'
  }),
  heavy: Platform.select({
    web: 'Sour Gummy, system-ui, -apple-system, sans-serif',
    default: 'System'
  }),
};

export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  "2xl": 24,
  "3xl": 28,
  "4xl": 32,
  "5xl": 36,
} as const;

// Common text styles with consistent font family
export const TEXT_STYLES = {
  h1: {
    fontSize: FONT_SIZES["4xl"],
    fontWeight: FONT_WEIGHTS.heavy,
    fontFamily: FONT_FAMILIES.heavy,
  },
  h2: {
    fontSize: FONT_SIZES["3xl"],
    fontWeight: FONT_WEIGHTS.heavy,
    fontFamily: FONT_FAMILIES.heavy,
  },
  h3: {
    fontSize: FONT_SIZES["2xl"],
    fontWeight: FONT_WEIGHTS.bold,
    fontFamily: FONT_FAMILIES.bold,
  },
  h4: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.semibold,
    fontFamily: FONT_FAMILIES.semibold,
  },
  body: {
    fontSize: FONT_SIZES.base,
    fontWeight: FONT_WEIGHTS.regular,
    fontFamily: FONT_FAMILIES.regular,
  },
  bodyMedium: {
    fontSize: FONT_SIZES.base,
    fontWeight: FONT_WEIGHTS.medium,
    fontFamily: FONT_FAMILIES.medium,
  },
  bodySemibold: {
    fontSize: FONT_SIZES.base,
    fontWeight: FONT_WEIGHTS.semibold,
    fontFamily: FONT_FAMILIES.semibold,
  },
  caption: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.regular,
    fontFamily: FONT_FAMILIES.regular,
  },
  button: {
    fontSize: FONT_SIZES.base,
    fontWeight: FONT_WEIGHTS.bold,
    fontFamily: FONT_FAMILIES.bold,
  },
} as const;