export const Palette = {
  primary: {
    light: '#EBF5FF',
    main: '#0066FF',
    dark: '#0052CC',
    contrastText: '#FFFFFF',
  },
  secondary: {
    light: '#F0FDFA',
    main: '#0D9488',
    dark: '#0F766E',
    contrastText: '#FFFFFF',
  },
  error: {
    light: '#FEF2F2',
    main: '#EF4444',
    dark: '#B91C1C',
    contrastText: '#FFFFFF',
  },
  warning: {
    light: '#FFFBEB',
    main: '#F59E0B',
    dark: '#B45309',
    contrastText: '#FFFFFF',
  },
  success: {
    light: '#F0FDF4',
    main: '#22C55E',
    dark: '#15803D',
    contrastText: '#FFFFFF',
  },
  grey: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  background: {
    main: '#F9FAFB',
    paper: '#FFFFFF',
  },
  common: {
    white: '#FFFFFF',
    black: '#000000',
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
  pill: 9999,
};

export const Shadow = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
};

export const Shadows = Shadow;

export const Typography = {
  h1: {
    fontSize: 32,
    fontWeight: '700' as const,
    color: Palette.grey[900],
  },
  h2: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: Palette.grey[900],
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
    color: Palette.grey[900],
  },
  body1: {
    fontSize: 16,
    fontWeight: '400' as const,
    color: Palette.grey[700],
  },
  body2: {
    fontSize: 14,
    fontWeight: '400' as const,
    color: Palette.grey[600],
  },
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    color: Palette.grey[500],
  },
  button: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Palette.common.white,
  },
};

    fontWeight: '600' as const,
    color: Palette.grey[900],
  },
  body1: {
    fontSize: 16,
    fontWeight: '400' as const,
    color: Palette.grey[800],
  },
  body2: {
    fontSize: 14,
    fontWeight: '400' as const,
    color: Palette.grey[600],
  },
  caption: {
    fontSize: 12,
    fontWeight: '500' as const,
    color: Palette.grey[500],
  },
};

export const Theme = {
  light: {
    background: Palette.grey[50],
    paper: '#FFFFFF',
    text: Palette.grey[900],
    textSecondary: Palette.grey[600],
    border: Palette.grey[200],
  },
  dark: {
    background: '#0F172A',
    paper: '#1E293B',
    text: '#F8FAFC',
    textSecondary: '#94A3B8',
    border: '#334155',
  },
};
