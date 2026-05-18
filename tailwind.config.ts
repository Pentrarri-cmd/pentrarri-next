import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0a0a0a',
          elevated: '#1a1a1a',
          soft: '#202020',
        },
        ink: {
          DEFAULT: '#f5f5f5',
          muted: '#a0a0a0',
          soft: '#666666',
        },
        gold: {
          DEFAULT: '#d4af37',
          glow: '#f0d878',
          dim: '#8a7228',
        },
        glow: {
          purple: '#6b46c1',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(2.75rem, 6vw, 5.5rem)', { lineHeight: '1.0', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
        'display-md': ['clamp(1.5rem, 2.5vw, 2.25rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
      },
      letterSpacing: {
        'mono-label': '0.18em',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'glow-pulse': 'glowPulse 8s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
