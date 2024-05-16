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
					DEFAULT: '#00833F'
				},
				secondary: {
					DEFAULT: '#F4BE49'
				}
			}
		}
	},
	plugins: [require('@tailwindcss/typography')]
};
