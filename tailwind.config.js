/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      black: '#272E36',
      white: '#F0E9E6',
      gray: '#9095A1'
    },
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
    },
    extend: {
      spacing: {
        80: '80px',
        90: '90px'
      },
      letterSpacing: {
        headline: '0.5em', // кастомное значение
      },
      fontSize: {
        xs: '0.75rem', // 12px
        sm: '0.875rem', // 14px
        base: '1rem', // 16px
        lg: '1.125rem', // 18px
        xl: '1.25rem', // 20px
        '2xl': '1.5rem', // 24px
        '3xl': '1.875rem', // 30px
        '4xl': '2.25rem', // 36px
        '5xl': '3rem', // 48px
        '6xl': '3.75rem', // 60px
        '7xl': '4.5rem', // 72px
        // Кастомные размеры
        headline: '2.5rem', // 40px
        subheadline: '1.75rem', // 28px
      },
      borderRadius: {
        '': '10px'
      }
    },
  },
  plugins: [],
}

