import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

export default {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/widgets/**/*.{js,ts,jsx,tsx}',
  ],
  corePlugins: {
    container: false,
  },
  daisyui: {
    themes: [
      {
        light: {
          primary: '#FF7518',
          'primary-content': '#fff',
          secondary: '#FFF1DB',
          'secondary-content': '#FF7518',
          accent: '#37cdbe',
          'accent-content': '#E7E7EE',
          neutral: '#202027',
          'neutral-content': '#fff',
          'base-100': '#fff',
          'base-200': '#F4F4F8',
          'base-300': '#E7E7EE',
          'base-400': '#D1D1E2',
          'base-500': '#7F7E94',
          'base-content': '#7F7E94',
          info: '',
          'info-content': '',
          success: '#06B943',
          'success-content': '#fff',
          warning: '',
          'warning-content': '',
          error: '#C74952',
          'error-content': '#fff',
        },
      },
    ],
  },
  theme: {
    screens: {
      '2xl': { max: '1379px' },
      xl: { max: '1279px' },
      lg: { max: '1023px' },
      md: { max: '767px' },
      sm: { max: '639px' },
    },
    extend: {
      colors: {
        black: '#202027',
        white: '#fff',
        gray: '#F4F4F8',
        red: '#FF7518',
        gray_2: '#C8C8D4',
        gray_3: '#7F7E94',
        gray_4: '#E7E7EE',
        pink: '#FFE8E9',
        error: '#C74952',
        alert: '#EA4F24',
        transparent: 'transparent',
        currentColor: 'currentColor',
        //
        pumpkin: '#FF7518',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#000',
            strong: '#000',
            blockquote: {
              padding: '36px 24px',
              color: '#fff',
              fontSize: '20px',
              fontWeight: 500,
              lineHeight: '120%',
              fontStyle: 'normal',
              background: '#3A58F8',
              borderRadius: '1.5rem',
              border: 'none',
              p: {
                margin: 0,
                '&::before': {
                  content: 'none',
                },
              },
              '@screen md': {
                padding: '30px 16px',
                fontSize: '16px',
                lineHeight: '150%',
                borderRadius: '1rem',
              },
            },
            a: {
              color: '#3A58F8',
              '&:hover': {
                opacity: 0.8,
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwind-children'),
    require('daisyui'),
    plugin(function ({ addVariant, addComponents }) {
      addVariant('hocus', ['&:hover', '&:focus']);
      addComponents({
        '.container': {
          width: '100%',
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 32px',
          '@screen md': {
            padding: '0 16px',
          },
        },
      });
    }),
  ],
} satisfies Config;
