import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brown-dark': '#3D2817',
        'brown-mid': '#5C4033',
        'orange': '#E67E22',
        'orange-light': '#F39C12',
        'yellow': '#F4A442',
        'cream': '#F5E6D3',
        'cream-light': '#FAF3E8',
      },
      backgroundImage: {
        'gradient-orange': 'linear-gradient(135deg, #E67E22 0%, #F39C12 100%)',
        'gradient-cream': 'linear-gradient(135deg, #FAF3E8 0%, #F5E6D3 100%)',
      },
      fontSize: {
        'hero': '4rem',
        'section': '2.5rem',
        'feature': '1.4rem',
        'large': '1.2rem',
        'tagline': '1.5rem',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        '2xl': '1rem',
      },
      boxShadow: {
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
}

export default config
