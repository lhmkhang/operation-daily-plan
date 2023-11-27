import type { Config } from 'tailwindcss'

const config: Config = {
  corePlugins: {
    preflight: false,
  },
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  important: true,
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#306bd1',
        primary_shade: '#768CB1',
        background_blur: 'rgba(170,209,237,0.91)'
      },
      boxShadow: {
        '3xl': '2px 0px 10px #000'
      },
      borderRadius: {
        '6_1': '50% 10%'
      },
      translate: {
        '0.8': '80%'
      }
    },
  },
  plugins: [],
  themes: [
    {
      light: {
        secondary: '#f3f4f6',
        accent: '#8892b0',
        background: '#fff',
      }
    },
    {
      dark: {
        secondary: '#1f2937',
        accent: '#4b5563',
        background: '#111827',
      }
    }
  ]
}
export default config
