/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				// Tokyo Night Color Palette
				'void': '#0f0f14',
				'surface': {
					DEFAULT: '#1a1b26',
					light: '#24283b',
					lighter: '#414868'
				},
				'accent': {
					cyan: '#7dcfff',
					magenta: '#bb9af7',
					violet: '#9d7cd8',
					pink: '#f7768e',
					green: '#9ece6a',
					orange: '#ff9e64',
					blue: '#7aa2f7'
				},
				'text': {
					DEFAULT: '#c0caf5',
					muted: '#565f89',
					bright: '#ffffff'
				}
			},
			fontFamily: {
				'display': ['"Space Grotesk"', 'system-ui', 'sans-serif'],
				'body': ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
				'mono': ['"JetBrains Mono"', 'monospace']
			},
			animation: {
				'fade-in': 'fadeIn 0.3s ease-out',
				'slide-up': 'slideUp 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
				'typing': 'typing 3.5s steps(40, end)'
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				slideUp: {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				typing: {
					'from': { width: '0' },
					'to': { width: '100%' }
				}
			},
			backgroundImage: {
				'dot-grid': 'radial-gradient(circle, rgba(125, 207, 255, 0.15) 1px, transparent 1px)',
			},
			backgroundSize: {
				'dot-grid': '24px 24px'
			}
		},
	},
	plugins: [],
}
