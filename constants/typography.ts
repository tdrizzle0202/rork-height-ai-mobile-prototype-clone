export const FONT_FAMILY = "System" as const;

export const FONT_WEIGHTS = {
  regular: "500" as const,
  medium: "600" as const,
  semibold: "700" as const,
  bold: "800" as const,
  heavy: "900" as const,
} as const;

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
    fontFamily: FONT_FAMILY,
  },
  h2: {
    fontSize: FONT_SIZES["3xl"],
    fontWeight: FONT_WEIGHTS.heavy,
    fontFamily: FONT_FAMILY,
  },
  h3: {
    fontSize: FONT_SIZES["2xl"],
    fontWeight: FONT_WEIGHTS.bold,
    fontFamily: FONT_FAMILY,
  },
  h4: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.semibold,
    fontFamily: FONT_FAMILY,
  },
  body: {
    fontSize: FONT_SIZES.base,
    fontWeight: FONT_WEIGHTS.regular,
    fontFamily: FONT_FAMILY,
  },
  bodyMedium: {
    fontSize: FONT_SIZES.base,
    fontWeight: FONT_WEIGHTS.medium,
    fontFamily: FONT_FAMILY,
  },
  bodySemibold: {
    fontSize: FONT_SIZES.base,
    fontWeight: FONT_WEIGHTS.semibold,
    fontFamily: FONT_FAMILY,
  },
  caption: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.regular,
    fontFamily: FONT_FAMILY,
  },
  button: {
    fontSize: FONT_SIZES.base,
    fontWeight: FONT_WEIGHTS.bold,
    fontFamily: FONT_FAMILY,
  },
} as const;