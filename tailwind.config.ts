import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      colors: {
        primary: {
          DEFAULT: '#0055FF',
          foreground: '#FFFFFF'
        },
        secondary: {
          DEFAULT: '#00D4AA',
          foreground: '#0A0A1A'
        },
        yes: '#00D4AA',
        no: '#FF4D6D',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        panel: 'hsl(var(--panel))',
        border: 'hsl(var(--border))',
        muted: 'hsl(var(--muted))',
        'muted-foreground': 'hsl(var(--muted-foreground))'
      },
      borderRadius: {
        DEFAULT: '8px',
        lg: '8px',
        md: '6px',
        sm: '4px'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
} satisfies Config
