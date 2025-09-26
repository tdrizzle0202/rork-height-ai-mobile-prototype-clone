import { Platform } from 'react-native';

// Base font family - use this for most text
export const FONT_FAMILY = Platform.select({
  web: 'Rubik, system-ui, -apple-system, sans-serif',
  ios: 'Rubik_400Regular',
  android: 'Rubik_400Regular',
  default: 'Rubik_400Regular'
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
    web: 'Rubik, system-ui, -apple-system, sans-serif',
    ios: 'Rubik_400Regular',
    android: 'Rubik_400Regular',
    default: 'Rubik_400Regular'
  }),
  medium: Platform.select({
    web: 'Rubik, system-ui, -apple-system, sans-serif',
    ios: 'Rubik_500Medium',
    android: 'Rubik_500Medium',
    default: 'Rubik_500Medium'
  }),
  semibold: Platform.select({
    web: 'Rubik, system-ui, -apple-system, sans-serif',
    ios: 'Rubik_600SemiBold',
    android: 'Rubik_600SemiBold',
    default: 'Rubik_600SemiBold'
  }),
  bold: Platform.select({
    web: 'Rubik, system-ui, -apple-system, sans-serif',
    ios: 'Rubik_700Bold',
    android: 'Rubik_700Bold',
    default: 'Rubik_700Bold'
  }),
  heavy: Platform.select({
    web: 'Rubik, system-ui, -apple-system, sans-serif',
    ios: 'Rubik_800ExtraBold',
    android: 'Rubik_800ExtraBold',
    default: 'Rubik_800ExtraBold'
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