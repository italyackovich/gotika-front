/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      black: '#272E36',
      white: '#F0E9E6',
      gray: '#9095A1',
      lightGray: '#E2D8D2'
    },
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
    },
    extend: {
      boxShadow: {
        'strong': '0 4px 15px rgba(0, 0, 0, 0.25)', // Сильная тень
        'extra-strong': '0 8px 30px rgba(0, 0, 0, 0.35)', // Очень сильная тень
        'subtle': '0 2px 10px rgba(0, 0, 0, 0.15)' // Легкая
      },
      spacing: {
        150: '150px',
        158: '158px',
        159: '159px',
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

