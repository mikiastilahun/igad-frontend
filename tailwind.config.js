const defaultTheme = require('tailwindcss/defaultTheme');
/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Open Sans', ...defaultTheme.fontFamily.sans]
			},
			colors: {
				primary: {
					DEFAULT: '#00833F',
					50: '#e6f3ec',
					100: '#cce6d9',
					200: '#99cdb2',
					300: '#66b58c',
					400: '#339c65',
					500: '#00833f',
					600: '#006932',
					700: '#004f26',
					800: '#003419',
					900: '#001a0d'
				},
				secondary: {
					DEFAULT: '#F4BE49',
					50: '#fef9ed',
					100: '#fdf2db',
					200: '#fbe5b6',
					300: '#f8d892',
					400: '#f6cb6d',
					500: '#f4be49',
					600: '#c3983a',
					700: '#92722c',
					800: '#624c1d',
					900: '#31260f'
				}
			}
		}
	},
	plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')]
};
